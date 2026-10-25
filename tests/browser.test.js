/**
 * @file Browser runtime tests for the <code>codemelted.js</code> module.
 * @author Mark Shaffer
 * @copyright © 2024-26 Mark Shaffer. All Rights Reserved.
 * @license MIT <br />
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 * <br /><br />
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * <br /><br />
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 * @see https://medium.com/dailyjs/running-mocha-tests-as-native-es6-modules-in-a-browser-882373f2ecb0
 */

// deno-lint-ignore no-import-prefix
import {assert} from "https://unpkg.com/chai@6.2.2/index.js";
// deno-lint-ignore no-import-prefix
import "https://unpkg.com/mocha@11.7.5/mocha.js";
import {
  PROTOCOL_TYPE,
  CModuleError,
  CProtocol,
  CProtocolEvent,
  CResult,
  runtime_event,
  EVENT_REQUEST,
  json_btoa,
  json_atob,
  json_check_type,
  json_create_array,
  json_create_object,
  json_has_key,
  json_parse,
  json_stringify,
  CLogRecord,
  LOGGER,
  logger_handler,
  logger_level,
  logger_log,
  async_sleep,
  async_task,
  CFuture,
  CTimerEvent,
  async_timer,
  async_worker,
  CWorkerEvent,
  PROTOCOL_EVENT,
  AVAILABILITY_REQUEST,
  runtime_available
} from "./codemelted.js";

logger_level(LOGGER.Off);
mocha.setup('bdd');

// ============================================================================
// [CORE MODULE VALIDATION] ===================================================
// ============================================================================

describe("CORE MODULE VALIDATION", () => {
  it("CModuleError Test", () => {
    try {
      throw new CModuleError("test");
    } catch (err) {
      assert.isTrue(err.toString().length > 0);
    }
  });

  it("CProtocol Object Test", () => {
    let obj = null;
    // Validate failed construction
    try {
      obj = new CProtocol({name: null, rx_handler: null, type: null});
      assert.fail("Should Throw CModuleError");
    } catch (err) {
      assert.isTrue(err instanceof CModuleError);
    }

    try {
      obj = new CProtocol({name: "id", rx_handler: null, type: null});
      assert.fail("Should Throw CModuleError");
    } catch (err) {
      assert.isTrue(err instanceof CModuleError);
    }

    try {
      obj = new CProtocol({
        name: "id",
        rx_handler: (evt) => {},
        type: null
      });
      assert.fail("Should Throw CModuleError");
    } catch (err) {
      assert.isTrue(err instanceof CModuleError);
    }

    // Ensure proper base class construct
    obj = new CProtocol({
      name: "id",
      rx_handler: (evt) => {},
      type: PROTOCOL_TYPE.Timer
    });
    assert.equal(obj.name(), "id");
    assert.equal(obj.type(), PROTOCOL_TYPE.Timer);
    assert.throws(() => obj.post_message(), CModuleError);
    assert.throws(() => obj.terminate(), CModuleError);
  });

  it("CResult Object Test", () => {
    let obj = new CResult();

    // Validate ok no data.
    assert.isTrue(obj.is_ok());
    assert.isFalse(obj.is_error());
    assert.isNull(obj.value());
    assert.isNull(obj.error());

    // Validate ok with data.
    obj = new CResult({value: 42});
    assert.isTrue(obj.is_ok());
    assert.isFalse(obj.is_error());
    assert.equal(42, obj.value());
    assert.isNull(obj.error());

    // Validate error no data.
    obj = new CResult({error: "Oh no"});
    assert.isFalse(obj.is_ok());
    assert.isTrue(obj.is_error());
    assert.isNull(obj.value());
    assert.equal("Oh no", obj.error());

    obj = new CResult({error: new Error("Oh no")});
    assert.isFalse(obj.is_ok());
    assert.isTrue(obj.is_error());
    assert.isNull(obj.value());
    assert.isTrue(obj.error() instanceof Error);

    // Validate invalid state
    try {
      new CResult({value: 42, error: "Oh no"});
      assert.fail("should throw CModuleError");
    } catch (err) {
      assert.isNotNull(err);
    }
  });
});

// ============================================================================
// [ASYNC USE CASE VALIDATION] ================================================
// ============================================================================

describe("ASYNC USE CASE VALIDATION", () => {
  it("async_sleep() Test", async () => {
    const start = Date.now();
    await async_sleep(500);
    const end = Date.now();
    const exec_time = end - start;
    assert.equal(exec_time >= 498, true);
    try {
      await async_sleep("duh");
      assert.fail("should throw");
    } catch (err) {
      assert.equal(err instanceof CModuleError, true);
    }
  });

  it("async_task() Test", async () => {
    let task = (data) => { return data + 20; };
    assert.throws(() => async_task());
    assert.throws(() => async_task({task: "duh"}), CModuleError);
    assert.throws(() => async_task({task: task, delay: "duh"}), CModuleError);

    // Now lets play with our future.
    let future = async_task({task: task, data: 22, delay: 500});
    assert.equal(future.has_completed(), false);
    let result = await future.result();
    assert.equal(result.value(), 42);
    assert.equal(result.is_error(), false);
    assert.equal(result.is_ok(), true);
    assert.equal(future.has_completed(), true);

    // We are going to execute again, but cancel.
    future.execute(20);
    assert.equal(future.has_completed(), false);
    future.cancel();
    assert.equal(future.has_completed(), true);
    result = await future.result();
    assert.equal(result.is_error(), true);
    assert.equal(result.is_ok(), false);
  });

  it("async_timer() Test", async () => {
    // API Violations
    assert.throws(() => async_timer());
    assert.throws(() => async_timer({name: 42, interval: "", rx_handler: null}), CModuleError);
    assert.throws(() => async_timer({name: "CTimerProtocol", interval: "", rx_handler: null}), CModuleError);
    assert.throws(() => async_timer({name: "CTimerProtocol", interval: 250, rx_handler: null}), CModuleError);

    // Now lets see this thing work
    let counter = 0;
    let rx_handler = (evt) => {
      counter += 1;
    };
    let timer_protocol = async_timer({name: "CTimerProtocol", interval: 250, rx_handler: rx_handler});
    await async_sleep(1100);
    timer_protocol.terminate();
    assert.equal(counter >= 4, true);
  });

  it("async_worker() Test", async () => {
    // API Failures
    assert.throws(() => async_worker());
    assert.throws(() => async_worker({name: 42, rx_handler: 42, options: 42, url: 42}));
    assert.throws(() => async_worker({name: "worker_protocol", rx_handler: 42, options: 42, url: 42}));
    assert.throws(() => async_worker({name: "worker_protocol", rx_handler: (evt) => {}, options: 42, url: 42}));
    assert.throws(() => async_worker({name: "worker_protocol", rx_handler: (evt) => {}, url: 42}));

    // Now lets hook this up and demo it.
    // It will also go through a series of worker tests as part of the last
    // post

    // Setup our test conditions
    let test_post_message_rx = false;
    let test_on_message_error_rx = false;
    let test_on_error_rx = false;
    let rx_handler = (evt) => {
      if (evt.event_fired() === PROTOCOL_EVENT.Message) {
        test_post_message_rx = true;
      } else if (evt.event_fired() === PROTOCOL_EVENT.Error) {
        test_on_error_rx = true;
      } else if (evt.event_fired() === PROTOCOL_EVENT.MessageError) {
        test_on_message_error_rx = true;
      }
    };

    // Go do some communication.
    let worker = async_worker({
      name: "worker_protocol",
      rx_handler: rx_handler,
      url: "./worker.test.js"
    });
    worker.post_message("test_post_message");
    await async_sleep(100);
    worker.post_message("test_on_error");
    await async_sleep(100);
    worker.terminate();
    await async_sleep(100);

    // See if we got our expected messages
    assert.equal(test_post_message_rx, true);
    assert.equal(test_on_error_rx, true);
    assert.equal(test_on_message_error_rx, false);
  });
});

// ============================================================================
// [JSON USE CASE VALIDATION] =================================================
// ============================================================================

describe("JSON USE CASE VALIDATION", () => {
  it("json_atob() / json_btoa() Test", () => {
    // API violations
    assert.throws(() => json_atob());
    assert.throws(() => json_atob(42));
    assert.throws(() => json_btoa());
    assert.throws(() => json_btoa(42));

    // Invalid encoding / decoding, returns null
    let encoded = json_btoa("Hello 🌍");
    assert.equal(null, encoded);
    let decoded = json_atob("Hello");
    assert.equal(null, decoded);

    // Valid encoding / decoding.
    const hello = "Hello World!";
    encoded = json_btoa(hello);
    assert.equal(true, encoded != hello);
    decoded = json_atob(encoded);
    assert.equal(hello, decoded);
  });

  it("json_check_type() Test", () => {
    // Invalid API setup
    assert.throws(() => json_check_type());

    // Now throws because it was not an expected type
    assert.throws(() => json_check_type({type: "string", data: 42, should_throw: true}));
    assert.throws(() => json_check_type({type: Uint8Array, data: 42, should_throw: true}));
    assert.throws(() => json_check_type({type: "function", data: () => {}, count: 2, should_throw: true}))

    // Now checks with no throws
    assert.equal(false, json_check_type({type: "string", data: 42}));
    assert.equal(true, json_check_type({type: "number", data: 42}));
    assert.equal(false, json_check_type({type: Uint8Array, data: 42}));
    assert.equal(true, json_check_type({type: Uint8Array, data: new Uint8Array()}));
    assert.equal(false, json_check_type({type: "function", data: () => {}, count: 2}));
    assert.equal(true, json_check_type({type: "function", data: (a, b) => {}, count: 2}));
  });

  it("json_create_array() / json_create_object() Test", () => {
    // Create empty array / objects based on no parameters or invalid ones
    let array = json_create_array();
    assert.equal(0, array.length);
    array = json_create_array("duh");
    assert.equal(0, array.length);

    let obj = json_create_object();
    assert.equal(0, Object.keys(obj).length);
    obj = json_create_object("duh");
    assert.equal(0, Object.keys(obj).length);

    // Now create valid copies of data
    array = json_create_array([
      "dog", 1, true, null, { id: 1 }, [1, 2, 4]
    ]);
    assert.equal(6, array.length);
    obj = json_create_object({
      id: 1,
      name: "Awesome",
      valid: false,
      stuff: [0, 1, 2, 3],
      another_obj: { id: null},
      comment: null,
    });
    assert.equal(6, Object.keys(obj).length);
  });

  it("json_has_key() Test", () => {
    // API violations
    assert.throws(() => json_has_key());
    assert.throws(() => json_has_key({obj: "duh"}));
    assert.throws(() => json_has_key({obj: {}, key: 42}));

    // Now throws because we instruct it to
    assert.throws(() => json_has_key({obj: {}, key: "field_name", should_throw: true}));

    // Now valid check returns
    assert.equal(false, json_has_key({obj: {id: ""}, key: "field_name"}));
    assert.equal(true, json_has_key({obj: {id: ""}, key: "id"}));
  });

  it("json_parse() / json_stringify() Test", () => {
    // First invalid parse and stringify items
    let test_func = (a, b) => { return a + b; }
    assert.equal(null, json_stringify(test_func));
    assert.equal(null, json_parse(test_func));

    // Now some valid items
    let obj = {
      id: 1,
      name: "Awesome",
      valid: false,
      stuff: [0, 1, 2, 3],
      another_obj: { id: null},
      comment: null,
    };
    let array = [
      "dog",
      1,
      true,
      null,
      { id: 1 },
      [1, 2, 4]
    ];
    let stringified = json_stringify(obj);
    let parsed = json_parse(stringified);
    assert.equal(stringified, json_stringify(parsed));

    stringified = json_stringify(array);
    parsed = json_parse(stringified);
    assert.equal(stringified, json_stringify(parsed));
  });
});

// ============================================================================
// [LOGGER USE CASE VALIDATION] ===============================================
// ============================================================================

describe("LOGGER USE CASE VALIDATION", () => {
  it("logger_handler() Test", () => {
    assert.throws(() => logger_handler(42));
    assert.throws(() => logger_handler(() => {}));
    assert.doesNotThrow(() => logger_handler((record) => {}));
    assert.doesNotThrow(() => logger_handler());
  });

  it("logger_level() Test", () => {
    assert.throws(() => logger_level({}));
    assert.throws(() => logger_level(42));
    assert.isTrue(LOGGER.Info.label === logger_level(LOGGER.Info));
    assert.isFalse(LOGGER.Debug.label === logger_level());
    logger_level(LOGGER.Off);
  });

  it("logger_log() Test", () => {
    // API violation tests
    assert.throws(() => logger_log());
    assert.throws(() => logger_log({level: {}, data: null}));
    assert.throws(() => logger_log({level: LOGGER.Debug, data: null}));

    // Validate log levels only log events based on log settings.
    let counter = 0;
    let log_handler = (record) => { counter += 1; };
    logger_handler(log_handler);
    logger_level(LOGGER.Debug);
    logger_log({level: LOGGER.Debug, data: "Debug Event"});
    logger_log({level: LOGGER.Info, data: "Info Event"});
    logger_log({level: LOGGER.Warning, data: "Warning Event"});
    logger_log({level: LOGGER.Error, data: "Error Event"});
    assert.equal(4, counter);

    counter = 0;
    logger_level(LOGGER.Info);
    logger_log({level: LOGGER.Debug, data: "Debug Event"});
    logger_log({level: LOGGER.Info, data: "Info Event"});
    logger_log({level: LOGGER.Warning, data: "Warning Event"});
    logger_log({level: LOGGER.Error, data: "Error Event"});
    assert.equal(3, counter);

    counter = 0;
    logger_level(LOGGER.Warning);
    logger_log({level: LOGGER.Debug, data: "Debug Event"});
    logger_log({level: LOGGER.Info, data: "Info Event"});
    logger_log({level: LOGGER.Warning, data: "Warning Event"});
    logger_log({level: LOGGER.Error, data: "Error Event"});
    assert.equal(2, counter);

    counter = 0;
    logger_level(LOGGER.Error);
    logger_log({level: LOGGER.Debug, data: "Debug Event"});
    logger_log({level: LOGGER.Info, data: "Info Event"});
    logger_log({level: LOGGER.Warning, data: "Warning Event"});
    logger_log({level: LOGGER.Error, data: "Error Event"});
    assert.equal(1, counter);

    counter = 0;
    logger_level(LOGGER.Off);
    logger_log({level: LOGGER.Debug, data: "Debug Event"});
    logger_log({level: LOGGER.Info, data: "Info Event"});
    logger_log({level: LOGGER.Warning, data: "Warning Event"});
    logger_log({level: LOGGER.Error, data: "Error Event"});
    assert.equal(0, counter);

    // Confirm when no handler is attached, noting is sent forward.
    counter = 0;
    logger_handler();
    logger_level(LOGGER.Debug);
    logger_log({level: LOGGER.Debug, data: "Debug Event"});
    logger_log({level: LOGGER.Info, data: "Info Event"});
    logger_log({level: LOGGER.Warning, data: "Warning Event"});
    logger_log({level: LOGGER.Error, data: "Error Event"});
    assert.equal(0, counter);

    logger_level(LOGGER.Off);
  });
});

// ============================================================================
// [RUNTIME USE CASE VALIDATION] ==============================================
// ============================================================================

describe("RUNTIME USE CASE VALIDATION", () => {
  it("runtime_event() Test", () => {
    // API violations
    let handler = (evt) => { };
    assert.throws(() => {runtime_event()});
    assert.throws(() => {runtime_event({request: EVENT_REQUEST.Add, type: 42})}, CModuleError);
    assert.throws(() => {runtime_event({request: EVENT_REQUEST.Add, type: "message", handler: 42})}, CModuleError);
    assert.throws(() => {runtime_event({request: EVENT_REQUEST.Add, type: "message", handler: handler, target: 42})}, CModuleError);
    assert.throws(() => {runtime_event({request: 42, type: "message", handler: handler})}, CModuleError);

    // Now to a valid handler
    runtime_event({request: EVENT_REQUEST.Add, type: "message", handler: handler});
    runtime_event({request: EVENT_REQUEST.Remove, type: "message", handler: handler});
  });

  it("runtime_available() Test", () => {
    // API Violations
    assert.throws(() => runtime_available());
    assert.throws(() => runtime_available({request: 42}), CModuleError);
    assert.throws(() => runtime_available({request: AVAILABILITY_REQUEST.AskRuntime, obj: 42}), CModuleError);
    assert.throws(() => runtime_available({request: AVAILABILITY_REQUEST.AskRuntime, name: 42}), CModuleError);

    // Now go perform all the queries.
    assert.equal(json_stringify(runtime_available({request: AVAILABILITY_REQUEST.Audio})).length > 0, true);
    assert.equal(json_stringify(runtime_available({request: AVAILABILITY_REQUEST.Beacon})).length > 0, true);
    assert.equal(json_stringify(runtime_available({request: AVAILABILITY_REQUEST.Bluetooth})).length > 0, true);
    assert.equal(json_stringify(runtime_available({request: AVAILABILITY_REQUEST.BroadcastChannel})).length > 0, true);
    assert.equal(json_stringify(runtime_available({request: AVAILABILITY_REQUEST.Browser})).length > 0, true);
    assert.equal(json_stringify(runtime_available({request: AVAILABILITY_REQUEST.CookieStore})).length > 0, true);
    assert.equal(json_stringify(runtime_available({request: AVAILABILITY_REQUEST.EventSource})).length > 0, true);
    assert.equal(json_stringify(runtime_available({request: AVAILABILITY_REQUEST.LocalStorage})).length > 0, true);
    assert.equal(json_stringify(runtime_available({request: AVAILABILITY_REQUEST.IFrame})).length > 0, true);
    assert.equal(json_stringify(runtime_available({request: AVAILABILITY_REQUEST.Midi})).length > 0, true);
    assert.equal(json_stringify(runtime_available({request: AVAILABILITY_REQUEST.Open})).length > 0, true);
    assert.equal(json_stringify(runtime_available({request: AVAILABILITY_REQUEST.Orientation})).length > 0, true);
    assert.equal(json_stringify(runtime_available({request: AVAILABILITY_REQUEST.Pwa})).length > 0, true);
    assert.equal(json_stringify(runtime_available({request: AVAILABILITY_REQUEST.SecureContext})).length > 0, true);
    assert.equal(json_stringify(runtime_available({request: AVAILABILITY_REQUEST.SerialPort})).length > 0, true);
    assert.equal(json_stringify(runtime_available({request: AVAILABILITY_REQUEST.SessionStorage})).length > 0, true);
    assert.equal(json_stringify(runtime_available({request: AVAILABILITY_REQUEST.Share})).length > 0, true);
    assert.equal(json_stringify(runtime_available({request: AVAILABILITY_REQUEST.TextToSpeech})).length > 0, true);
    assert.equal(json_stringify(runtime_available({request: AVAILABILITY_REQUEST.TouchEnabled})).length > 0, true);
    assert.equal(json_stringify(runtime_available({request: AVAILABILITY_REQUEST.Usb})).length > 0, true);
    assert.equal(json_stringify(runtime_available({request: AVAILABILITY_REQUEST.Vibrate})).length > 0, true);
    assert.equal(json_stringify(runtime_available({request: AVAILABILITY_REQUEST.WebRTC})).length > 0, true);
    assert.equal(json_stringify(runtime_available({request: AVAILABILITY_REQUEST.WebSocket})).length > 0, true);
    assert.equal(json_stringify(runtime_available({request: AVAILABILITY_REQUEST.WebTransport})).length > 0, true);
    assert.equal(json_stringify(runtime_available({request: AVAILABILITY_REQUEST.WorkerAvailable})).length > 0, true);
    assert.equal(json_stringify(runtime_available({request: AVAILABILITY_REQUEST.WorkerRuntime})).length > 0, true);
  });
});

// ============================================================================
// [RUN THE TESTS] ============================================================
// ============================================================================

mocha.checkLeaks();
mocha.run();
