// @ts-check
// ============================================================================
/**
 * <cm-page-header></cm-page-header>
 *
 * | Key       | Value                                                        |
 * | --------- | ------------------------------------------------------------ |
 * | AUTHOR    | mark.shaffer@codemelted.com / dev.codemelted.com             |
 * | COPYRIGHT | © 2025-Present Mark Shaffer. All Rights Reserved.            |
 * | VERSION   | v26.0.0-alpha (Last Updated 2026-OCT-12)                     |
 *
 * # FEATURES
 *
 * The `codemelted.js` is an ES6 developed module focusing on client-side
 * front end domain use cases. This is accomplished by leveraging the Web APIs
 * available within a Browser / Web Worker runtimes. The Web APIs provide
 * everything a client-side app requires to build Single Page App (SPA),
 * Progressive Web App (PWA), or just general static websites. All of this
 * without the need of a heavy framework.
 *
 * > Any module API violation will result in a `CModuleError` thrown with a
 * full stack trace of the violation.
 *
 * # GETTING STARTED
 *
 * ## Clone / Fork
 *
 * When you clone / fork the *codemelted.js Project* repo, you will need to
 * install tools to properly build the project. The following represents how to
 * set up those tools.
 *
 * 1. Install [PowerShell Core](https://learn.microsoft.com/en-us/powershell/scripting/install/install-powershell)
 * for your given operating system.
 * 2. Navigate to *codemelted.js Project* repo location.
 * 3. Open a terminal and execute `./build.ps1 --setup`. Follow the
 * instructions to install all the necessary repo tooling.
 * 4. Once completed, execute `./build.ps1 --help` to gain an understanding
 * of how to build the project in the future.
 *
 * ## Content Delivery Network (CDN)
 *
 * The `codemelted.js` module is hosted on GitHub and delivered via the
 * `jsdelivr` CDN. The following represents the URLs for accessing the module.
 * These can be utilized with `import` statements within JavaScript
 * or as part of the `<script type="module"></script>` tags of a website.
 *
 * - **Latest Version (Risky):**
 *
 * ```txt
 * https://cdn.jsdelivr.net/gh/codemelteddev/codemelted.js/codemelted.js
 * ```
 *
 * - **Version Controlled (Safest):**
 *
 * ```txt
 * https://cdn.jsdelivr.net/gh/codemelteddev/codemelted.js@XX.Y.Z/codemelted.js
 * ```
 *
 * **NOTES:**
 * 1. The `@XX.Y.Z` corresponds to the releases of the *codemelted.js Project*
 * as identified on GitHub.
 * 2. `XX` corresponds to the year of the release. A change in this value resets
 * `Y` and `Z` to `0` respectively.
 * 3. `Y` corresponds to an API breaking change. A change in this number
 * resets `Z`.
 * 4. `Z` corresponds to a newly delivered feature / bug fix that should not break
 * other API functions.
 *
 * # USAGE
 *
 * **ES6 Module Import Example**
 *
 * ```js
 * // Import whole module statically via URL or local path
 * import * as codemelted from "path/to/codemelted.js";
 *
 * // Import elements to use statically via URL or local path
 * import { exported_element } from "path/to/codemelted.js";
 *
 * // Dynamically import all module elements to named variable
 * let codemelted = await import("path/to/codemelted.js");
 * ```
 *
 * **Via Script Tag in HTML File**
 *
 * ```html
 * <script type="module">
 * // Use the import examples above to utilize the script functions.
 * </script>
 * ```
 *
 * And with your imports in place, explore the [SDK](#sdk) to utilize the
 * domain use case API of your choice. They will have the details of the API
 * call along with examples.
 *
 * # TODOS
 *
 * - Research and implement async_lock() from the Web Locks API.
 * - Research and implement ui_xxx() functions for Fullscreen API,
 * Picture in Picture API, Navigation API, Resize Observer API, and Screen
 * Wake Lock API.
 * - Research Web Cryptography API and how to apply to the module.
 * - db_xxx() use case. Define IndexedDB portion and expose.
 * - hw_xxx() use case. Implement currently researched protocols and expose.
 * - hw_xxx() use case. Implement not yet researched protocols and expose.
 * - network_xxx() use case. Get fetch and beacon done. Move queryable items
 * to runtime
 * - network_xxx() use case. Get client side CBroadcastChannel / CEventSource
 * hooked up and exposed
 * - network_xxx() sue case. Get client side socket based protocols implemented
 * and exposed.
 * - npu_compute() use case. Develop tests and expose to the greater project.
 * - runtime_xxx() use case. Add runtime_query() to query different values from
 * the runtime. This will not throw just return a signal of "unknown" for the
 * value.
 * - ui_xxx() use case. Build out protocols
 * - ui_xxx() use case. Finish the ui_notify with custom dialog.
 * - ui_xxx() use case. Start building UI components and come up with a standard
 * for using them within HTML to build user interfaces.
 * - ui_xxx() use case. Define tests to fully flesh and test this out.
 *
 * # LICENSE
 *
 * MIT License
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the 'Software'),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge,  publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 *
 * # SDK
 *
 * The following lists represent the implementation of the `codemelted.js`
 * module. The *Functions* represents the actual domain use case API
 * functions. All other items represent the supporing objects of the
 * *Functions* API.
 *
 * @module codemelted.js SDK
 */
// ============================================================================
// [MODULE CORE] ==============================================================
// ============================================================================

// [ENUMS] --------------------------------------------------------------------

/**
 * Identifies the event handled via the fired {@link CProtocolEvent} handled
 * via the {@link CProtocolEventHandler} callback when a protocol is opened.
 * @readonly
 * @enum {string}
 * @property {string} Close Signifies an onclose listener received an
 * CloseEvent.
 * @property {string} Error Signifies an onerror listener received an
 * ErrorEvent.
 * @property {string} Message Signifies a onmessage listener received a
 * MessageEvent that contains received data via its data property
 * @property {string} MessageError Signifies a onmessageerror listener
 * received MessageEvent containing an error accessible via its data
 * property.
 * @property {string} ModuleError Signifies an unhandled error occurred
 * where one was not expected. It will be treated as a ModuleError as it
 * should not occur with the protocols and either means developer is not
 * doing something properly within the protocol or a bug exists with the
 * module itself that requires a GitHub Issue to be filed.
 * @property {string} Open Signifies a {@link CProtocol} has opened a
 * connection to a distant system.
 */
export const PROTOCOL_EVENT = Object.freeze({
  Close: "close",
  Error: "error",
  Message: "message",
  MessageError: "message_error",
  ModuleError: "module_error",
  Open: "open",
});

/**
 * Provides the different asynchronous {@link CProtocol} that can be created
 * via the codemelted modules.
 * @readonly
 * @enum {string}
 * @property {string} Audio
 * @property {string} BroadcastChannel
 * @property {string} Bluetooth
 * @property {string} EventSource
 * @property {string} Gamepad
 * @property {string} MIDI
 * @property {string} Orientation
 * @property {string} Timer Supports the creation of the
 *  {@link CTimerProtocol}
 * @property {string} SerialPort
 * @property {string} TextToSpeech
 * @property {string} USB
 * @property {string} WebSocket
 * @property {string} WebRTC
 * @property {string} WebTransport
 * @property {string} Worker Supports the creation of the
 *  {@link CWorkerProtocol}
 */
export const PROTOCOL_TYPE = Object.freeze({
  Audio: "audio",
  Bluetooth: "bluetooth",
  BroadcastChannel: "broadcast_channel",
  EventSource: "event_source",
  Gamepad: "gamepad",
  MIDI: "midi",
  Orientation: "orientation",
  Timer: "timer",
  SerialPort: "serial_port",
  TextToSpeech: "text_to_speech",
  USB: "usb",
  WebSocket: "web_socket",
  WebRTC: "web_rtc",
  WebTransport: "web_transport",
  Worker: "worker",
});

// [DATA TYPES] ---------------------------------------------------------------

/**
 * Class that represents any codemelted.js API violations or caught exceptions
 * that were not handled properly as this module is intended to never throw
 * so any "unknown / unhandled" exception is either an API violation or an
 * exception not properly handled by this module.
 */
export class CModuleError extends Error {
  /**
   * Identifies a misuse of the module API.
   * @readonly
   * @type {string}
   */
  static get MISUSE() { return "Module logic was not used properly!"; }

  /**
   * Identifies a not implemented feature of the module.
   * @readonly
   * @type {string}
   */
  static get NOT_IMPLEMENTED() { return "NOT IMPLEMENTED!"; }

  /**
   * Identifies an unexpected parameter type with a module function call.
   * @readonly
   * @type {string}
   */
  static get TYPE_VIOLATION() { return "Data was not an expected data type!"; }

  /**
   * Identifies an unsupported JavaScript runtime was called with a public
   * function.
   * @readonly
   * @type {string}
   */
  static get UNSUPPORTED_RUNTIME() {return "Unsupported JavaScript Runtime!"; }

  /**
   * Utility function to chain together a stack trace of module API failures.
   * @param {any} err The error caught to log and rethrow.
   */
  static handle_error(err) {
    console.error("codemelted.js module error encountered.", err);
  }

  static check_runtime() {
    const valid_runtime = "HTMLElement" in globalThis ||
      "WorkerGlobalScope" in globalThis;
    if (!valid_runtime) {
      throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
    }
  }

  /**
   * Provides custom printout of the module error providing the name, message,
   * and stack_trace to chain together the call failure sequence.
   * @override
   * @returns {string}
   */
  toString() {
    const name = this.name ? this.name : "UnknownError";
    const msg = this.message ? this.message : "unknown message";
    const stack_trace = this.stack ? this.stack : "no stack trace";
    return `${name}: ${msg}\n${stack_trace}`;
  }

  /**
   * Constructor for the module error.
   * @param {string} message The module API violation.
   * @param {any} [cause] Capture a chaining of failure detections to create
   * a stack trace for debugging.
   */
  constructor(message, cause) {
    super(message, cause ? {cause: cause} : undefined);
    if ("captureStackTrace" in Error) {
      // @ts-ignore Check above ensures this will work.
      Error.captureStackTrace(this, CModuleError);
    }
  }
}
CModuleError.check_runtime();

/**
 * Provides a result where either the value or the error can be signaled for
 * later usage. A better construct then throwing exceptions and is adapted
 * from Rust programming concepts.
 * @template T The data type that will be held by the value().
 */
export class CResult {
  /** @type {string | Error | null} */
  #error;
  /** @type {T?} */
  #value;

  /**
   * Holds any error message associated with a failed transaction request.
   * @returns {string | Error | null}
   */
  error() { return this.#error; }

  /**
   * Signals whether an error was captured or not.
   * @returns {boolean}
   */
  is_error() { return this.error() != null; }

  /**
   * Signals the transaction completed with no errors.
   * @returns {boolean}
   */
  is_ok() { return !this.is_error(); }

  /**
   * Hold the value of the given result or nothing if the CResult is
   * being used to signal there was no error.
   * @returns {T?}
   */
  value() { return this.#value; }

  /**
   * Constructor for the class.
   * @param {object} params The named parameters for the object.
   * @param {T?} [params.value] The value associated with the result.
   * @param {any} [params.error] The error associated with the result.
   */
  constructor({value = null, error = null} = {}) {
    try {
      if (value && error) {
        throw new CModuleError(CModuleError.MISUSE);
      }
      this.#value = value;
      if (error instanceof Error || typeof error === "string") {
        this.#error = error;
      } else if (typeof error === "object" && error != null) {
        this.#error = JSON.stringify(error);
      } else {
        // Assumed to be null at this point
        this.#error = error;
      }
    } catch (err) {
      CModuleError.handle_error(err);
      throw new CModuleError("CLogRecord construction error.", err);
    }
  }
}

// [PROTOCOL BASE DEFINITION] -------------------------------------------------

/**
 * An event handled by a currently opened {@link CProtocol}. The event is
 * handled via the {@link CProtocolEventHandler}.
 * @template T The event objects a protocol is working with.
 */
export class CProtocolEvent {
  /** @type {CProtocol<T>} */
  #protocol;
  /** @type {T} */
  #data;
  /** @type {PROTOCOL_EVENT} */
  #event_fired;

  /**
   * Identification of the protocol. Utilized for logging purposes.
   * @returns {CProtocol<T>}
   */
  protocol() { return this.#protocol; }

  /**
   * The data received by the event. Utilize the as_xxx() functions to
   * retrieve a specific data type for the given protocol_type().
   * @returns {T}
   */
  data() {return this.#data; }

  /**
   * Retrieves the event that was fired with the open protocol.
   * @returns {PROTOCOL_EVENT}
   */
  event_fired() { return this.#event_fired; }

  /**
   * Constructor for the event.
   * @param {object} params The named parameters.
   * @param {CProtocol<T>} params.protocol The protocol associated with the
   * event.
   * @param {any} params.data The data handled by the protocol.
   * @param {PROTOCOL_EVENT} params.event_fired The event that was handled.
   */
  constructor({protocol, data, event_fired}) {
    try {
      json_check_type({type: CProtocol, data: protocol, should_throw: true});
      json_has_value({
        obj: PROTOCOL_EVENT,
        value: event_fired,
        should_throw: true
      });
      this.#protocol = protocol;
      this.#data = data;
      this.#event_fired = event_fired;
    } catch (err) {
      CModuleError.handle_error(err);
      throw new CModuleError("CProtocolEvent construction error.", err);
    }
  }
}

/**
 * @template T The event objects the protocol event wraps.
 * @public
 * @callback CProtocolEventHandler  Supports the {@link CProtocol} for data
 * received as part of a protocol.
 * @param {CProtocolEvent<T>} evt The event handled by an open protocol.
 */

/**
 * Defines the "rules" for objects that will setup a protocol that directly
 * exchanges data with an external item, will continuously run until
 * terminated, requires the ability to know it is running, and get any
 * errors that have occurred during its run.
 * @template T
 */
export class CProtocol {
  /** @type {string} */
  #name;
  /** @type {CProtocolEventHandler<T>} */
  #rx_handler;
  /** @type {PROTOCOL_TYPE} */
  #type;

  /**
   * Helper function for the implementing protocols to report events.
   * @protected
   * @param {object} params The named parameters.
   * @param {PROTOCOL_EVENT} params.event_fired The event handled by the
   * protocol.
   * @param {any} params.data The data associated with the given event.
   */
  report({event_fired, data}) {
    const evt = new CProtocolEvent({
      protocol: this,
      data: data,
      event_fired: event_fired,
    });
    this.#rx_handler(evt);
  }

  /**
   * A log identification.
   * @returns {string}
   */
  name() { return this.#name; }

  /**
   * Identifies the type of protocol.
   * @returns {PROTOCOL_TYPE}
   */
  type() { return this.#type; }

  /**
   * Posts a given message to the given implementing protocol.
   * @param {any} [data] The data to post for the given protocol.
   * @returns {void}
   */
  post_message(data) {
    throw new CModuleError(`${CModuleError.NOT_IMPLEMENTED} - ${data}`);
  }

  /**
   * Terminates the given protocol.
   * @returns {void}
   */
  terminate() {
    throw new CModuleError(CModuleError.NOT_IMPLEMENTED);
  }

  /**
   * Constructor for the class.
   * @param {object} params The named parameters.
   * @param {string} params.name The name to associate with the
   * protocol for logging purposes.
   * @param {CProtocolEventHandler<T>} params.rx_handler The callback for
   * received data.
   * @param {PROTOCOL_TYPE} params.type The type of protocol.
   */
  constructor({name, rx_handler, type}) {
    try {
      json_check_type({
        type: "function",
        data: rx_handler,
        count: 1,
        should_throw: true
      });
      json_check_type({type: "string", data: name, should_throw: true});
      json_check_type({type: "string", data: type, should_throw: true});
      this.#name = name;
      this.#rx_handler = rx_handler;
      this.#type = type;
    } catch (err) {
      CModuleError.handle_error(err);
      throw new CModuleError("CProtocol construction error.", err);
    }
  }
}

// ============================================================================
// [ASYNC USE CASE IMPLEMENTATION] ============================================
// ============================================================================

// [DATA DEFINITION] ----------------------------------------------------------

/**
 * The resulting object from the {@link async_task} function call with a
 * promise of the future {@link CResult}.
 * @template T The data associated with the {@link CResult.value} function
 * call.
 */
export class CFuture {
  /** @type {T} */
  #data;
  /** @type {number} */
  #delay;
  /** @type {CTaskCB<T>} */
  #task;
  /** @type {Promise<CResult<T>>} */
  #result;
  /** @type {number} */
  #timeout_id = -1;

  /**
   * Will cancel a currently running task. If no task is running then this
   * action is a no-op.
   */
  cancel() {
    if (!this.has_completed()) {
      globalThis.clearTimeout(this.#timeout_id);
      this.#timeout_id = -1;
      this.#result = new Promise((resolve) => {
        resolve(new CResult({error: "future canceled"}));
      })
    }
  }

  /**
   * Allows for re-execution of the {@link CFuture} wrapped task.
   * @param {any} [data] The optional data to pass if necessary when
   * re-executing the task.
   * @returns {void}
   */
  execute(data) {
    try {
      // Ensure we have completed the previous task before kicking off
      // the task again.
      if (!this.has_completed()) {
        throw new CModuleError(
          `${CModuleError.MISUSE}: task has not completed.`
        );
      }

      // Go re-execute the wrapped task.
      this.#data = data;
      this.#result = this.#do_execute();
    } catch (err) {
      CModuleError.handle_error(err);
      throw new CModuleError("CFuture::execute() error.", err);
    }
  }

  /**
   * Determines if the task has completed or not.
   * @returns {boolean} true if completed, false otherwise.
   */
  has_completed() { return this.#timeout_id === -1; }

  /**
   * Holds the result of the {@link async_task} function call.
   * @returns {Promise<CResult<T>>} The result of the asynchronous
   * processing.
   */
  result() {
    try {
      return this.#result;
    } catch (err) {
      CModuleError.handle_error(err);
      throw new CModuleError("CFuture::result() error.", err);
    }
  }

  /**
   * Result for the {@link async_task} function call. Must call execute() to
   * kick-off the future task.
   * @param {object} params The named parameters.
   * @param {CTaskCB<T>} params.task The task to run.
   * @param {T} params.data The optional data to pass to the task.
   * @param {number} [params.delay=0] The delay to schedule the task in the
   * future. Defaults to 0 if not specified.
   */
  constructor({task, data, delay=0}) {
    try {
      json_check_type({type: "function", data: task, should_throw: true});
      json_check_type({type: "number", data: delay, should_throw: true});
      this.#task = task;
      this.#data = data;
      this.#delay = delay;
      this.#result = this.#do_execute();
    } catch (err) {
      CModuleError.handle_error(err);
      throw new CModuleError("CFuture construction error.", err);
    }
  }

  /**
   * Performs the execution of the task.
   * @returns {Promise<CResult<T>>}
   */
  #do_execute() {
    return new Promise((resolve) => {
      this.#timeout_id = setTimeout(() => {
        try {
          const answer = this.#task(this.#data);
          this.#timeout_id = -1;
          resolve(new CResult({value: answer}));
        } catch (err) {
          this.#timeout_id = -1;
          resolve(new CResult({error: err}));
        }
      }, this.#delay);
    });
  }
}

/**
 * @callback CTaskCB The task to run as part of the {@link async_task} call.
 * @param {T} data Data to pass to the task.
 * @returns {T} The result of the task completing.
 * @template T The data associated with the CResult object accessed via the
 * result() function call.
 */

// [PROTOCOL IMPLEMENTATIONS] -------------------------------------------------

/**
 * Represents a firing timer for an open {@link PROTOCOL_TYPE} Timer.
 */
export class CTimerEvent {
  /** @type {number} */
  #interval;

  /**
   * The interval of the firing timer event.
   * @returns {number}
   */
  interval() { return this.#interval; }

  /**
   * Constructor for the class.
   * @param {number} interval The interval of the firing timer.
   */
  constructor(interval) {
    try {
      json_check_type({type: "number", data: interval});
      this.#interval = interval;
    } catch (err) {
      CModuleError.handle_error(err);
      throw new CModuleError("CTimerEvent construction error.", err);
    }
  }
}

/**
 * Creates an asynchronous timer that fires on the specified interval until
 * terminated via the {@link async_timer} function.
 * @extends {CProtocol<CTimerEvent>}
 */
export class CTimerProtocol extends CProtocol {
  /** @type {number} */
  #interval;
  /** @type {number} */
  #timer_id = -1;

  /**
   * @inheritdoc
   * @override
   */
  terminate() {
    try {
      globalThis.clearInterval(this.#timer_id);
      this.#timer_id = -1;
    } catch (err) {
      CModuleError.handle_error(err);
      this.report({
        event_fired: PROTOCOL_EVENT.ModuleError,
        data: err
      });
    }
  }

  /**
   * Constructor for the protocol.
   * @param {object} params The named parameters.
   * @param {string} params.name The name to give to the protocol.
   * @param {number} params.interval How often to fire the timer.
   * @param {CProtocolEventHandler<CTimerEvent>} params.rx_handler Handler for
   * the protocol.
   */
  constructor({name, interval, rx_handler}) {
    super({
      name: name,
      type: PROTOCOL_TYPE.Timer,
      rx_handler: rx_handler,
    });
    try {
      json_check_type({type: "number", data: interval, should_throw: true});
      this.#interval = interval;
      this.#timer_id = globalThis.setInterval(() => {
        this.report({
          event_fired: PROTOCOL_EVENT.Message,
          data: new CTimerEvent(this.#interval),
        });
      }, interval);
    } catch (err) {
      CModuleError.handle_error(err);
      throw new CModuleError("CTimerProtocol construction error.", err);
    }
  }
}

/**
 * Identifies event handled by the {@link PROTOCOL_TYPE.Worker}
 * protocol.
 */
export class CWorkerEvent {
  /** @type {ErrorEvent | MessageEvent} */
  #event;
  /** @type {boolean} */
  #is_error;

  /**
   * Treats the wrapped event as an error event.
   * @returns {ErrorEvent?}
   */
  as_error_event() {
    return this.#event instanceof ErrorEvent
      ? this.#event
      : null;
  }

  /**
   * Treats the wrapped event as a message event.
   * @returns {MessageEvent?}
   */
  as_message_event() {
    return this.#event instanceof MessageEvent
      ? this.#event
      : null;
  }

  /**
   * The event captured by the protocol.
   * @returns {ErrorEvent | MessageEvent}
   */
  event() { return this.#event; }

  /**
   * Indicates if the event captured was an error.
   * @returns {boolean}
   */
  is_error() { return this.#is_error; }

  /**
   * Constructor for the protocol event.
   * @param {object} params The named parameters
   * @param {ErrorEvent | MessageEvent} params.event The event handled by the
   * protocol.
   * @param {boolean} params.is_error true if it was an error event,
   * false otherwise.
   */
  constructor({event, is_error}) {
    try {
      if (!json_check_type({type: MessageEvent, data: event}) &&
          !json_check_type({type: ErrorEvent, data: event})) {
        throw new CModuleError(CModuleError.TYPE_VIOLATION);
      }
      json_check_type({type: "boolean", data: is_error, should_throw: true});
      this.#event = event;
      this.#is_error = is_error;
    } catch (err) {
      CModuleError.handle_error(err);
      throw new CModuleError(
        "CWorkerEvent construction error.", err
      );
    }
  }
}

/**
 * An object containing option properties that can be set when creating the
 * object instance. Available properties are as follows.
 * @typedef {object} CWorkerOptions
 * @property {string} [credentials] A string specifying whether the browser
 * sends credentials when importing modules into a module worker. The allowed
 * values are the same as can be passed to the fetch()
 * request: omit, same-origin, or include.  The default is same-origin
 * (only include credentials for same-origin requests). This is ignored for
 * classic workers.
 * @property {string} [name] A string specifying an identifying name for the
 * DedicatedWorkerGlobalScope representing the scope of the worker, which is
 * mainly useful for debugging purposes.
 * @property {string} [type] A string specifying the type of worker to create.
 * The value can be classic or module. The default is classic.
 */

/**
 * Constructs a dedicated background worker off the JavaScript runtime main
 * thread via the {@link async_worker} function.
 * @extends {CProtocol<CWorkerEvent>}
 */
export class CWorkerProtocol extends CProtocol {
  /** @type {Worker} */
  #worker;

  /**
   * Identifies the number of background threads are available to the worker.
   * @returns {number}
   */
  static cpu_count() {
    return runtime_available({
      request: AVAILABILITY_REQUEST.AskRuntime,
      name: "hardwareConcurrency",
      obj: globalThis["navigator"]
    })
      ? globalThis.navigator.hardwareConcurrency
      : 1;
  }

  /**
   * Sends a message, which can be of any kind of Object, to the background
   * worker for processing based on how it was setup to be processed.
   * @override
   * @param {any} [data] The data to post. The data is serialized using the
   * structured clone algorithm. This means you can pass a broad variety of
   * data objects safely to the background for processing without having to
   * serialize them yourself.
   * @returns {void}
   */
  post_message(data) {
    try {
      this.#worker.postMessage(data);
    } catch (err) {
      CModuleError.handle_error(err);
      this.report({
        event_fired: PROTOCOL_EVENT.ModuleError,
        data: err
      });
    }
  }

  /**
   * @inheritdoc
   * @override
   */
  terminate() {
    try {
      this.#worker.terminate();
    } catch (err) {
      CModuleError.handle_error(err);
      this.report({
        event_fired: PROTOCOL_EVENT.ModuleError,
        data: err
      });
    }
  }

  /**
   * Constructs a worker protocol for asynchronous processing off the main
   * runtime thread.
   * @param {object} params The named parameters.
   * @param {string} params.name The optional name to give to the
   * protocol.
   * @param {CWorkerOptions} [params.options] Options for further
   * configuration of the worker. Defaults to a "module" type.
   * @param {CProtocolEventHandler<CWorkerEvent>} params.rx_handler The receive
   * handler for data and state changes.
   * @param {string} params.url The URL associated with the worker thread.
   */
  constructor({name, options = {type: "module"}, rx_handler, url}) {
    super({
      name: name,
      rx_handler: rx_handler,
      type: PROTOCOL_TYPE.Worker
    });
    try {
      if (!runtime_available({request: AVAILABILITY_REQUEST.WorkerAvailable})) {
        throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
      }
      json_check_type({type: "string", data: url, should_throw: true});
      json_check_type({type: "object", data: options, should_throw: true});
      this.#worker = new globalThis.Worker(
        new URL(url, import.meta.url).href,
        // @ts-ignore CWorkerOptions is a reflections of what a Worker takes.
        options
      );
      this.#worker.onerror = (evt) => {
        this.report({
          event_fired: PROTOCOL_EVENT.Error,
          data: new CWorkerEvent({event: evt, is_error: true})
        });
        evt.preventDefault();
      }
      this.#worker.onmessageerror = (evt) => {
        this.report({
          event_fired: PROTOCOL_EVENT.MessageError,
          data: new CWorkerEvent({event: evt, is_error: true})
        });
        evt.preventDefault();
      }
      this.#worker.onmessage = (evt) => {
        this.report({
          event_fired: PROTOCOL_EVENT.Message,
          data: new CWorkerEvent({event: evt, is_error: false})
        });
        evt.preventDefault();
      }
    } catch (err) {
      CModuleError.handle_error(err);
      throw new CModuleError("CWorkerProtocol construction error.", err);
    }
  }
}

// [PUBLIC API] ---------------------------------------------------------------

/**
 * Will put a currently running async task to sleep for a specified delay
 * in milliseconds.
 * @param {number} delay Time is milliseconds to delay the task.
 * @returns {Promise<void>} The promise to await on for the delay.
 * A rejected promise represents an API violation.
 * @example
 * // From within an async function, sleep 2 seconds.
 * await async_sleep(2000);
 */
export function async_sleep(delay) {
  return new Promise((resolve, reject) => {
    try {
      json_check_type({type: "number", data: delay, should_throw: true});
      setTimeout(() => {
        resolve();
      }, delay);
    } catch (err) {
      CModuleError.handle_error(err);
      reject(err);
    }
  });
}

/**
 * Will execute an asynchronous task and get its result in the future.
 * @template T The data to be processed through the {@link CFuture}.
 * @param {object} params The named parameters.
 * @param {CTaskCB<T>} params.task The task to run.
 * @param {T} params.data The optional data to pass to the task.
 * @param {number} [params.delay=0] The delay to schedule the task in the
 * future. Defaults to 0 if not specified.
 * @returns {CFuture<T>} An object to execute the asynchronous task. You can
 * also re-execute the future by calling the {@link CFuture.execute} method.
 * @example
 * // Schedule a task for getting a future result and write it to the
 * // console.
 * let future = async_task({
 *   task: (data) => { return data + 20; },
 *   data: 22,
 *   delay: 1000,
 *   execute: true,
 * });
 * let result = await future.result();
 * console.log("result = ", result.value());
 */
export function async_task({task, data, delay=0}) {
  try {
    const future = new CFuture({task: task, data: data, delay: delay});
    return future;
  } catch (err) {
    CModuleError.handle_error(err);
    throw new CModuleError("async_task() error.", err);
  }
}

/**
 * Create an asynchronous timer set on a specified interval. When the event
 * is fired, the rx_handler will receive the event.
 * @param {object} params The named parameters
 * @param {string} params.name Identification for the protocol.
 * @param {number} params.interval The interval the timer protocol will
 * fire a {@link CTimerEvent}.
 * @param {CProtocolEventHandler<CTimerEvent>} params.rx_handler The receive
 * handler for processing the event.
 * @returns {CTimerProtocol}
 * @example
 * // Create a timer protocol that fires on a given interval
 * let timer = async_timer({
 *   name: "timer",
 *   interval: 250, // 250 millisecond interval
 *   rx_handler: (evt) => {
 *     // Handle timer firing events.
 *   }
 * });
 *
 * // Later when done.
 * timer.terminate();
 */
export function async_timer({name, interval, rx_handler}) {
  try {
    return new CTimerProtocol({
      name: name,
      interval: interval,
      rx_handler: rx_handler
    });
  } catch (err) {
    CModuleError.handle_error(err);
    throw new CModuleError("async_task() error.", err);
  }
}

/**
 * Creates an background worker to offload processing to a background thread.
 * @param {object} params The named parameters.
 * @param {string} params.name The optional name to give to the
 * protocol.
 * @param {CWorkerOptions} [params.options] Options for further
 * configuration of the worker. Defaults to a "module" type.
 * @param {CProtocolEventHandler<CWorkerEvent>} params.rx_handler The receive
 * handler for data and state changes.
 * @param {string} params.url The URL associated with the worker thread.
 * @returns {CWorkerProtocol}
 * @example
 * // Build a worker for a dedicated background thread
 * if (runtime_availability({request: AVAILABILITY_REQUEST.WorkerAvailable})) {
 *   const worker = async_worker({
 *     name: "worker",
 *     rx_handler: (evt) => { },
 *     url: "./worker.js"
 *   });
 * }
 *
 * // Later when done
 * worker.terminate();
 */
export function async_worker({
  name,
  options = {type: "module"},
  rx_handler,
  url})
{
  try {
    return new CWorkerProtocol({
      name: name,
      options: options,
      rx_handler: rx_handler,
      url: url,
    });
  } catch (err) {
    CModuleError.handle_error(err);
    throw new CModuleError("async_task() error.", err);
  }
}

// ============================================================================
// [CONSOLE USE CASE] =========================================================
// ============================================================================

// TBD

// ============================================================================
// [DB USE CASE] ==============================================================
// ============================================================================

/**
 * <mark>FUTURE DEVELOPMENT. DO NOT USE!</mark>
 * @private
 * @example
 * // TBD
 */
export function db_exists() {
  // TODO: IndexDB for browser / worker
  try {
    throw new CModuleError(CModuleError.NOT_IMPLEMENTED);
  } catch (err) {
    CModuleError.handle_error(err);
    throw new CModuleError("db_exists() error.", err);
  }
}

/**
 * <mark>FUTURE DEVELOPMENT. DO NOT USE!</mark>
 * @private
 * @example
 * // TBD
 */
export function db_manage() {
  // TODO: IndexDB for browser / worker
  try {
    throw new CModuleError(CModuleError.NOT_IMPLEMENTED);
  } catch (err) {
    CModuleError.handle_error(err);
    throw new CModuleError("db_manage() error.", err);
  }
}

/**
 * <mark>FUTURE DEVELOPMENT. DO NOT USE!</mark>
 * @private
 * @example
 * // TBD
 */
export function db_query() {
  // TODO: IndexDB for browser / worker
  try {
    throw new CModuleError(CModuleError.NOT_IMPLEMENTED);
  } catch (err) {
    CModuleError.handle_error(err);
    throw new CModuleError("db_query() error.", err);
  }
}

/**
 * <mark>FUTURE DEVELOPMENT. DO NOT USE!</mark>
 * @private
 * @example
 * // TBD
 */
export function db_update() {
  // TODO: IndexDB for browser / worker
  try {
    throw new CModuleError(CModuleError.NOT_IMPLEMENTED);
  } catch (err) {
    CModuleError.handle_error(err);
    throw new CModuleError("db_update() error.", err);
  }
}

/**
 * <mark>FUTURE DEVELOPMENT. DO NOT USE!</mark>
 * @private
 * @example
 * // TBD
 */
export function db_version() {
  // TODO: IndexDB for browser / worker
  try {
    throw new CModuleError(CModuleError.NOT_IMPLEMENTED);
  } catch (err) {
    CModuleError.handle_error(err);
    throw new CModuleError("db_version() error.", err);
  }
}

// ============================================================================
// [DISK USE CASE] ============================================================
// ============================================================================

// [ENUMS] --------------------------------------------------------------------

/**
 * Defines the data being read from or saved to disk from this module.
 * This is in support of the {@link disk_read_file} and
 * {@link disk_write_file} functions.
 * @readonly
 * @enum {string}
 * @property {string} ArrayBuffer Represents an ArrayBuffer data type.
 * @property {Text} Text Represents a string data type.
 * @property {Uint8Array} Uint8Array Represents a series of bytes data type.
 */
export const DISK_DATA_TYPE = Object.freeze({
  ArrayBuffer: "array_buffer",
  Text: "text",
  Uint8Array: "uint8_array",
});

// [PUBLIC API] ---------------------------------------------------------------

/**
 * Brings up a file chooser to select a file to read its data for later use.
 * @param {object} params The named parameters.
 * @param {DISK_DATA_TYPE} params.data_type The type of data being saved to
 * disk.
 * @param {string} [params.accept="*"] A comma separated list of either file
 * extensions or mime types representing files
 * @returns {Promise<CResult<ArrayBuffer | string | Uint8Array | null>>} The
 * data read from the particular file or null if an error occurred or no file
 * was selected.
 * A rejected promise represents a module API violation.
 * @example
 * // Read a text file from disk.
 * const data = await disk_read_file({
 *   data_type: DISK_DATA_TYPE.Text,
 *   accept: "*.txt"
 * });
 * if (data) {
 *   // Do something with the data.
 *   // Could be null if you don't select a file.
 * }
 */
export function disk_read_file({data_type, accept="*"}) {
  return new Promise((resolve, reject) => {
    try {
      if (!runtime_available({request: AVAILABILITY_REQUEST.Browser})) {
        throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
      }

      json_has_value({
        obj: DISK_DATA_TYPE,
        value: data_type,
        should_throw: true
      });
      json_check_type({type: "string", data: accept, should_throw: true});

      // Go read the file from disk.
      // Build our in-memory control to select the file.
      const w = globalThis.document.createElement('input');
      w.type = "file";
      w.accept = accept;

      // Setup to handle the data read.
      w.onchange = async (/** @type {Event} */ ev) => {
        try {
          let value = null;
          const file = ev.target instanceof HTMLInputElement
            ? ev.target.files != null
              ? ev.target.files[0]
              : null
            : null;
          if (!file) {
            resolve(new CResult());
          }
          switch (data_type) {
            case DISK_DATA_TYPE.ArrayBuffer:
              value = await file?.text();
              break;
            case DISK_DATA_TYPE.Text:
              value = await file?.bytes();
              break;
            case DISK_DATA_TYPE.Uint8Array:
              value = await file?.arrayBuffer();
              break;
          }
          resolve(new CResult({value: value}));
        } catch (err) {
          resolve(new CResult({error: err}));
        }
      };

      // Kick it off.
      w.click();
    } catch (err) {
      CModuleError.handle_error(err);
      reject(err);
    }
  });
}

/**
 * Will save the specified data to a filename in the operating system
 * download directory.
 * @param {object} params The named parameters.
 * @param {ArrayBuffer | string | Uint8Array} params.data The data to write
 * to disk.
 * @param {string} params.filename What to call the file in the download
 * directory.
 * @returns {Promise<CResult<void>>} The result of the save. A rejected
 * promise represents an API violation.
 * @example
 * // Go attempt to download the file contents from a blob
 * let result = await disk_write_file({
 *   data: image_blob,
 *   filename: "picture_of_me.png"
 * });
 * if (result.is_error()) {
 *   // handle the error
 * }
 */
export function disk_write_file({data, filename}) {
  // Async function for the modern way so we can call it within the promise
  const modern_save_file = async (
    /** @type {ArrayBuffer | string | Uint8Array} */ data,
    /** @type {any} */ filename
  ) => {
    try {
      // Show the file save dialog.
      // @ts-ignore A check determines if this is available.
      const handle = await showSaveFilePicker({
        filename,
      });
      // Write the blob to the file.
      const writable = await handle.createWritable();
      // @ts-ignore This is how you send data to the blob.
      const blob = new Blob([data]);
      await writable.write(blob);
      await writable.close();
      return new CResult();
    } catch (err) {
      return new CResult({error: err});
    }
  };
  return new Promise((resolve, reject) => {
    try {
      if (!runtime_available({request: AVAILABILITY_REQUEST.Browser})) {
        throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
      }
      const valid_type = json_check_type({type: ArrayBuffer, data: data}) ||
        json_check_type({type: "string", data: data}) ||
        json_check_type({type: Uint8Array, data: data});
      if (!valid_type) {
        throw new CModuleError(CModuleError.TYPE_VIOLATION);
      }
      json_check_type({type: "string", data: filename, should_throw: true});

      // Determine if we can perform the modern way of saving a file
      const is_modern_available = !runtime_available({
        request: AVAILABILITY_REQUEST.IFrame
      }) && runtime_available({
        request: AVAILABILITY_REQUEST.AskRuntime,
        name: "showSaveFilePicker"
      });

      if (is_modern_available) {
        // We have the modern way available, present the save file picker.
        modern_save_file(data, filename).then((value) => {
          resolve(value);
        });
      } else {
        // Traditional download with name specified shall be utilized.
        try {
          // @ts-ignore
          const blob = new Blob([data]);
          const blobURL = URL.createObjectURL(blob);
          const a = globalThis.document.createElement('a');
          a.href = blobURL;
          a.download = filename;
          a.style.display = "none";
          a.click();
          setTimeout(() => {
            URL.revokeObjectURL(blobURL);
            resolve(new CResult());
          }, 1000);
        } catch (err) {
          resolve(new CResult({error: err}));
        }
      }
    } catch (err) {
      CModuleError.handle_error(err);
      reject(err);
    }
  });
}

// ============================================================================
// [HW USE CASE] ==============================================================
// ============================================================================

// [DATA DEFINITION] ----------------------------------------------------------

// Bring back when ready
// /**
//  * @typedef {object} COrientationOptions
//  * @property {number} [maximumAge] A positive long value indicating the
//  * maximum age in milliseconds of a possible cached position that is
//  * acceptable to return. If set to 0, it means that the device cannot use a
//  * cached position and must attempt to retrieve the real current position.
//  * If set to Infinity the device must return a cached position regardless of
//  * its age. Default: 0.
//  * @property {number} [timeout] A positive long value representing the maximum
//  * length of time (in milliseconds) the device is allowed to take in order to
//  * return a position. The default value is Infinity, meaning that
//  * getCurrentPosition() won't return until the position is available.
//  * @property {boolean} [enableHighAccuracy] boolean value that indicates the
//  * application would like to receive the best possible results. If true and if
//  * the device is able to provide a more accurate position, it will do so. Note
//  * that this can result in slower response times or increased power
//  * consumption (with a GPS chip on a mobile device for example). On the other
//  * hand, if false, the device can take the liberty to save resources by
//  * responding more quickly and/or using less power. Default: false.
//  */

// /**
//  * @typedef {object} DeviceOrientationEvent Defined to support proper typing
//  * in the JSDocs when type checking in a TypeScript environment.
//  * @property {boolean} absolute A boolean that indicates whether or not the
//  * device is providing orientation data absolutely.
//  * @property {number?} alpha A number representing the motion of the device
//  * around the z axis, express in degrees with values ranging from 0
//  * (inclusive) to 360 (exclusive).
//  * @property {number?} beta A number representing the motion of the device
//  * around the x axis, express in degrees with values ranging from -180
//  * (inclusive) to 180 (exclusive). This represents a front to back motion of
//  *  the device.
//  * @property {number?} gamma A number representing the motion of the device
//  * around the y axis, express in degrees with values ranging from -90
//  * (inclusive) to 90 (exclusive). This represents a left to right motion of
//  * the device.
//  */

// /**
//  * @typedef {object} GeolocationCoordinates The GeolocationCoordinates
//  * interface represents the position and altitude of the device on Earth,
//  * as well as the accuracy with which these  properties are calculated. The
//  * geographic position information is provided in terms of World Geodetic
//  * System coordinates (WGS84).
//  * @property {number} latitude Returns a double representing the position's
//  * latitude in decimal degrees.
//  * @property {number} longitude Returns a double representing the position's
//  * longitude in decimal degrees.
//  * @property {number | null} altitude Returns a double representing the
//  * position's altitude in meters, relative to nominal sea level. This value
//  * can be null if the implementation cannot provide the data.
//  * @property {number} accuracy Returns a double representing the accuracy
//  * of the latitude and longitude properties, expressed in meters.
//  * @property {number | null} altitudeAccuracy Returns a double representing
//  * the accuracy of the altitude expressed in meters. This value can be null
//  * if the implementation cannot provide the data.
//  * @property {number | null} heading Returns a double representing the
//  * direction towards which the device is facing. This value, specified in
//  * degrees, indicates how far off from heading true north the device is. 0
//  * degrees represents true north, and the direction is determined clockwise
//  * (which means that east is 90 degrees and west is 270 degrees). If speed
//  * is 0 or the device is unable to provide heading information, heading is
//  * null.
//  * @property {number | null} speed Returns a double representing the
//  * velocity of the device in meters per second. This value can be null.
//  */

// /**
//  * @private
//  * Represents the geodetic data captured from the
//  * {@link PROTOCOL_TYPE.Orientation} opened protocol.
//  */
// export class CGeodeticEvent {
//   /** @type {Date} */
//   #timestamp = new Date();
//   /** @type {number} */
//   #latitude = NaN;
//   /** @type {number} */
//   #longitude = NaN;
//   /** @type {number?} */
//   #altitude = null;
//   /** @type {number} */
//   #heading = NaN;
//   /** @type {number} */
//   #speed = NaN;
//   /** @type {number?} */
//   #alpha = null;
//   /** @type {number?} */
//   #beta = null;
//   /** @type {number?} */
//   #gamma = null;

//   /** @type {number?} */
//   #code;
//   /** @type {string?} */
//   #message;

//   /**
//    * The acquisition of the geolocation information failed because the page
//    * didn't have the necessary permissions.
//    * @readonly
//    * @type {number}
//    */
//   static get PERMISSION_DENIED() { return 1; }

//   /**
//    * The acquisition of the geolocation failed because at least one internal
//    * source of position returned an internal error.
//    * @readonly
//    * @type {number}
//    */
//   static get POSITION_UNAVAILABLE() { return 2; }

//   /**
//    * The time allowed to acquire the geolocation was reached before the
//    * information was obtained.
//    * @readonly
//    * @type {number}
//    */
//   static get TIMEOUT() { return 3; }

//   /**
//    * The code of the error message.
//    * @returns {number?}
//    */
//   code() { return this.#code; }

//   /**
//    * The message associated with the error.
//    * @returns {string?}
//    */
//   message() { return this.#message; }

//   /**
//    * The time the orientation data was last updated.
//    * @returns {Date}
//    */
//   timestamp() { return this.#timestamp; }

//   /**
//    * Returns a double representing the position's latitude in decimal
//    * degrees.
//    * @returns {number}
//    */
//   latitude() { return this.#latitude; }

//   /**
//    * Returns a double representing the position's longitude in decimal
//    * degrees.
//    * @returns {number}
//    */
//   longitude() { return this.#longitude; }

//   /**
//    * Returns a double representing the position's altitude in meters,
//    * relative to sea level. This value can be null if the implementation
//    * cannot provide the data.
//    * @returns {number?}
//    */
//   altitude() { return this.#altitude; }

//   /**
//    * Returns a double representing the direction towards which the
//    * device is facing. This value, specified in degrees, indicates how
//    * far off from heading true north the device is. 0 degrees represents
//    * true north, and the direction is determined clockwise (which means
//    * that east is 90 degrees and west is 270 degrees). Null if heading could
//    * not be determined. Utilize the {@link calculate_heading} in this
//    * circumstance.
//    * @returns {number?}
//    */
//   heading() { return this.#heading; }

//   /**
//    * Returns a double representing the velocity of the device in meters
//    * per second or null if unable to be determined. Utilize the
//    * {@link calculate_speed} if this occurs.
//    * @return {number?}
//    */
//   speed() { return this.#speed; }

//   /**
//    * A number representing the motion of the device around the z axis,
//    * express in degrees with values ranging from 0 (inclusive) to
//    * 360 (exclusive).
//    * @returns {number?}
//    */
//   alpha() { return this.#alpha; }

//   /**
//    * A number representing the motion of the device around the x axis,
//    * expressed in degrees with values ranging from -180 (inclusive) to
//    * 180 (exclusive). This represents the front to back motion of the
//    * device.
//    * @returns {number?}
//    */
//   beta() { return this.#beta; }

//   /**
//    * A number representing the motion of the device around the y axis,
//    * expressed in degrees with values ranging from -90 (inclusive) to 90
//    * (exclusive). This represents the left to right motion of the device.
//    * @returns {number?}
//    */
//   gamma() { return this.#gamma; }

//   /**
//    * Determines the distance between two geodetic points.
//    * @param {CGeodeticEvent} p The secondary point to determine the distance.
//    * @returns {number} The distance in meters.
//    */
//   calculate_distance(p) {
//     // Convert degrees to radians
//     let lat1 = this.latitude() * Math.PI / 180.0;
//     let lon1 = this.longitude() * Math.PI / 180.0;

//     let lat2 = p.latitude() * Math.PI / 180.0;
//     let lon2 = p.longitude() * Math.PI / 180.0;

//     // radius of earth in metres
//     let r = 6378100.0;

//     // P
//     let rho1 = r * Math.cos(lat1);
//     let z1 = r * Math.sin(lat1);
//     let x1 = rho1 * Math.cos(lon1);
//     let y1 = rho1 * Math.sin(lon1);

//     // Q
//     let rho2 = r * Math.cos(lat2);
//     let z2 = r * Math.sin(lat2);
//     let x2 = rho2 * Math.cos(lon2);
//     let y2 = rho2 * Math.sin(lon2);

//     // Dot product
//     let dot = x1 * x2 + y1 * y2 + z1 * z2;
//     let cos_theta = dot / (r * r);
//     let theta = Math.acos(cos_theta);

//     // Distance in meters
//     return r * theta;
//   }

//   /**
//    * Calculates the geodetic heading.
//    * @param {CGeodeticEvent} p The secondary point to determine heading.
//    * @returns {number} Heading in degrees between 0 (N) - 359
//    */
//   calculate_heading(p) {
//     // Get the initial data from our variables:
//     let lat1 = this.latitude() * (Math.PI / 180.0);
//     let lon1 = this.longitude() * (Math.PI / 180.0);
//     let lat2 = p.latitude() * (Math.PI  / 180.0);
//     let lon2 = p.longitude() * (Math.PI  / 180.0);

//     // Set up our calculations
//     let y = Math.sin(lon2 - lon1) * Math.cos(lat2);
//     let x = (Math.cos(lat1) * Math.sin(lat2)) -
//       (Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1));
//     let rtnval = Math.atan2(y, x) * (180.0 / Math.PI);
//     return (rtnval + 360.0) % 360.0;
//   }

//   /**
//    * Calculates the geodetic speed.
//    * @param {CGeodeticEvent} p The secondary point to determine speed.
//    * @returns {number} The speed in meters per second.
//    */
//    calculate_speed(p) {
//     let dist_meters = this.calculate_distance(p);
//     let time_s = (p.timestamp().getMilliseconds() -
//                   this.timestamp().getMilliseconds()) / 1000.0;
//     return dist_meters / time_s;
//   }

//   /**
//    * Updates the currently held data with the newest iteration of the data
//    * set.
//    * @param {DeviceOrientationEvent | GeolocationCoordinates} data  The data
//    * to update with. Data not of a matching type is ignored.
//    * @returns {void}
//    */
//   update(data) {
//     let now = new Date();
//     if (data instanceof DeviceOrientationEvent) {
//       this.#timestamp = now;
//       this.#alpha = data.alpha;
//       this.#beta = data.beta;
//       this.#gamma = data.gamma;
//     } else if (data instanceof GeolocationCoordinates) {
//       this.#timestamp = now;
//       this.#heading = data.heading;
//       this.#speed = data.speed;
//       this.#latitude = data.latitude;
//       this.#longitude = data.longitude;
//       this.#altitude = data.altitude;
//     }
//   }

//   /**
//    * Constructor for the class.
//    * @param {object} params The named parameters
//    * @param {number} [params.code] The error code detected
//    * @param {string} [params.message] Message associated with the error.
//    */
//   constructor({code, message} = {}) {
//     try {
//       if (code && message) {
//         json_check_type({type: "number", data: code, should_throw: true});
//         json_check_type({type: "string", data: message, should_throw: true});
//         this.#code = code;
//         this.#message = message;
//       } else {
//         this.#code = null;
//         this.#message = null;
//       }
//     } catch (err) {
//       CModuleError.handle_error(err);
//       throw new CModuleError("CGeodeticError construction error.", err);
//     }
//   }
// }

/**
 * @private
 * Represents the data to send to a connected {@link PROTOCOL_TYPE}
 * SerialPort protocol. Supports raising High / Low signals, writing bytes,
 * and requesting a read of the current data available on the port and the
 * current signal status.
 */
export class CSerialPortData {
  /** @type {string} */
  #request;
  /** @type {boolean | Uint8Array | null} */
  #data;

  /**
   * Signals to set the BREAK signal on the serial port.
   * @type {string}
   */
  static get BREAK() { return "break"; }

  /**
   * Signals to write a series of bytes to the serial port.
   * @type {string}
   */
  static get DATA_BYTES() { return "data_bytes_write"; }

  /**
   * Signals to set the DATA_TERMINAL_READY signal on the serial port.
   * @type {string}
   */
  static get DATA_TERMINAL_READY() { return "dataTerminalReady"; }

  /**
   * Signals to set the REQUEST_TO_SEND signal on the serial port.
   * @type {string}
   */
  static get REQUEST_TO_SEND() { return "requestToSend"; }

  /**
   * Signals to query the serial port for the latest signals and any
   * available byte data on the line.
   * @type {string}
   */
  static get QUERY_DATA() { return "query_data"; }

  /**
   * The data associated with the given request.
   * @returns {boolean | Uint8Array | null}
   */
  data() { return this.#data; }

  /**
   * Identifies the request being made of the serial port.
   * @returns {string}
   */
  request() { return this.#request; }

  /**
   * Constructs a request for a {@link protocol_post_message} to an open
   * serial port protocol.
   * @param {object} params The named parameters
   * @param {string} params.request One of the request associated with this
   * object.
   * @param {boolean | Uint8Array} [params.data] The data associated with the
   * request. May only be not specified when just performing a QUERY_DATA
   * request.
   */
  constructor({request, data}) {
    try {
      if (request === CSerialPortData.BREAK ||
          request === CSerialPortData.DATA_TERMINAL_READY ||
          request === CSerialPortData.REQUEST_TO_SEND) {
        json_check_type({type: "boolean", data: data, should_throw: true});
        this.#request = request;
        // @ts-ignore
        this.#data = data;
      } else if (request === CSerialPortData.QUERY_DATA) {
        this.#request = request;
        this.#data = null;
      } else {
        throw new CModuleError(CModuleError.MISUSE);
      }
    } catch (err) {
      CModuleError.handle_error(err);
      throw new CModuleError("CSerialPortData construction error.", err);
    }
  }
}

/**
 * @private
 */
export class CSerialPortEvent {

}

// /**
//  * The SerialPort interface of the Web Serial API provides access to a
//  * serial port on the host device.
//  * @typedef {object} SerialPort
//  * @property {boolean} connected Returns a boolean value that indicates
//  * whether the port is logically connected to the device.
//  * @property {ReadableStream} readable Returns a ReadableStream for
//  * receiving data from the device connected to the port.
//  * @property {WritableStream} writable Returns a WritableStream for sending
//  * data to the device connected to the port.
//  * @property {function} forget Returns a Promise that resolves when access
//  * to the serial port is revoked. Calling this "forgets" the device,
//  * resetting any previously-set permissions so the calling site can no
//  * longer communicate with the port.
//  * @property {function} getInfo Returns an object containing identifying
//  * information for the device available via the port.
//  * @property {function} open Returns a Promise that resolves when the port
//  * is opened. By default the port is opened with 8 data bits, 1 stop bit
//  * and no parity checking.
//  * @property {function} setSignals Sets control signals on the port and
//  * returns a Promise that resolves when they are set.
//  * @property {function} getSignals Returns a Promise that resolves with an
//  * object containing the current state of the port's control signals.
//  * @property {function} close Returns a Promise that resolves when the port
//  * closes.
//  */

// /**
//  * Provides the support to the {@link CSerialPortProtocol.post_message} serial
//  * port communications.
//  * @enum {string}
//  * @property {string} Break Sends a break signal (boolean) to the port.
//  * @property {string} CarrierDetect Line control status of the port reported
//  * as { carrier_detect: boolean }
//  * @property {string} ClearToSend Line control status of the port reported
//  * as { clear_to_send: boolean }
//  * @property {string} DataBytesRead Read data from the serial port reported
//  * as { data_bytes_read: Uint8Array }
//  * @property {string} DataBytesWrite Writes data to the serial port.
//  * @property {string} DataSetReady Line control status of the port reported
//  * as { data_set_ready: boolean }
//  * @property {string} DataTerminalReady Sends a data terminal ready
//  * (boolean) signal to the port.
//  * @property {string} RequestToSend Sends a request to send signal
//  * (boolean) to the port.
//  * @property {string} RingIndicator Line control status of the port reported
//  * as { ring_indicator: boolean }
//  */
// export const SERIAL_PORT_DATA_REQUEST = Object.freeze({
//   Break: "break",
//   CarrierDetect: "carrier_detect",
//   ClearToSend: "clear_to_send",
//   DataBytesRead: "data_bytes_read",
//   DataBytesWrite: "data_bytes_write",
//   DataSetReady: "data_set_ready",
//   DataTerminalReady: "data_terminal_ready",
//   RequestToSend: "request_to_send",
//   RingIndicator: "ring_indicator",
// });

// [PROTOCOL IMPLEMENTATION] --------------------------------------------------

// /**
//  * <mark>UNDER DEVELOPMENT</mark>
//  * @private
//  * @template T
//  * @extends {CProtocol<T>}
//  */
// class CBluetoothProtocol extends CProtocol {

// }

// /**
//  * @private
//  * <mark>UNDER DEVELOPMENT</mark>
//  * @template T
//  * @extends {CProtocol<T>}
//  */
// class CMidiProtocol extends CProtocol {

// }

// /**
//  * @private
//  * Creates the ability to get a devices geodetic orientation
//  * (GPS location, 3D orientation).
//  * @extends {CProtocol<CGeodeticEvent>}
//  */
// export class COrientationProtocol extends CProtocol {
//   /** @type {boolean} */
//   static #is_created = false;
//   /** @type {CGeodeticEvent} */
//   #data = new CGeodeticEvent();
//   /** @type {CEventHandler} */
//   #on_device_orientation;
//   /** @type {number} */
//   #watch_id;

//   /**
//    * @inheritdoc
//    * @override
//    */
//   terminate() {
//     try {
//       globalThis.navigator.geolocation.clearWatch(this.#watch_id);
//       this.#watch_id = -1;
//       globalThis.removeEventListener(
//         "deviceorientation",
//         this.#on_device_orientation
//       );
//       COrientationProtocol.#is_created = false;
//     } catch (err) {
//       CModuleError.handle_error(err);
//       this.report({
//         event_fired: PROTOCOL_EVENT.ModuleError,
//         data: err
//       });
//     }
//   }

//   /**
//    * Constructor for the protocol.
//    * @param {object} params The named parameters.
//    * @param {string} params.name The name to give to the protocol.
//    * @param {object} [params.options={}] Options specific to the protocol.
//    * @param {CProtocolEventHandler<CGeodeticEvent>} params.rx_handler The
//    * handler to receive data.
//    */
//   constructor({name, options={}, rx_handler}) {
//     super({
//       name: name,
//       type: PROTOCOL_TYPE.Orientation,
//       rx_handler: rx_handler,
//     });
//     try {
//       if (COrientationProtocol.#is_created) {
//         throw new CModuleError(
//           `${CModuleError.MISUSE}: only one COrientationProtocol can exist`
//         );
//       }
//       if (!runtime_available({request: AVAILABILITY_REQUEST.Orientation})) {
//         throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
//       }
//       json_check_type({type: "object", data: options, should_throw: true});
//       this.#on_device_orientation =
//         (/** @type {DeviceOrientationEvent} */ evt) => {
//           this.#data.update(evt);
//           this.report({
//             event_fired: PROTOCOL_EVENT.Message,
//             data: Object.assign({}, this.#data)
//           });
//       };
//       globalThis.addEventListener(
//         "deviceorientation",
//         this.#on_device_orientation
//       );
//       this.#watch_id = globalThis.navigator.geolocation.watchPosition(
//         (/** @type {GeolocationPosition} */ evt) => {
//           this.#data.update(evt.coords);
//           this.report({
//             event_fired: PROTOCOL_EVENT.Message,
//             data: Object.assign({}, this.#data)
//           });
//         },
//         (/** @type {GeolocationPositionError} */evt) => {
//           this.report({
//             event_fired: PROTOCOL_EVENT.Error,
//             data: new CGeodeticEvent({code: evt.code, message: evt.message})
//           });
//         },
//         options
//       );
//     } catch (err) {
//       CModuleError.handle_error(err);
//       throw new CModuleError("COrientationProtocol construction error.", err);
//     }
//   }
// }

// /**
//  * Creates a protocol allowing communication with an attached serial port
//  * device. Provides the ability to interact with the device setting signals
//  * data, and querying the current line status of the port. This is all
//  * handled via the {@link SERIAL_PORT_DATA_REQUEST} via
//  * the post_message() call.
//  * @private
//  * @extends {CProtocol}
//  */
// class CSerialPortProtocol extends CProtocol {
//   /** @type {SerialPort} */
//   #port;

//   /**
//    * Carries out either a request for data from an open serial port or to send
//    * data to that open port.
//    * @override
//    * @param {object} params The named parameters.
//    * @param {SERIAL_PORT_DATA_REQUEST} params.request The request to make of the
//    * protocol.
//    * @param {any} [params.data] Any data associated with the given request.
//    * @returns {Promise<void>}
//    */
//   async post_message({request, data}) {
//     try {
//       let resp = null;
//       switch (request) {
//         case SERIAL_PORT_DATA_REQUEST.Break:
//           json_check_type({
//             type: "boolean",
//             data: data,
//             should_throw: true
//           });
//           await this.#port.setSignals("break", data);
//           break;
//         case SERIAL_PORT_DATA_REQUEST.CarrierDetect:
//           resp = await this.#port.getSignals();
//           this.on_data_rx({
//             state: PROTOCOL_EVENT.Message,
//             value: {carrier_detect: resp["carrierDetect"]}
//           });
//           break;
//         case SERIAL_PORT_DATA_REQUEST.ClearToSend:
//           resp = await this.#port.getSignals();
//           this.on_data_rx({
//             state: PROTOCOL_EVENT.Message,
//             value: {clear_to_send: resp["clearToSend"]}
//           });
//           break;
//         case SERIAL_PORT_DATA_REQUEST.DataBytesRead:
//           if (!this.#port.readable) {
//             this.on_data_rx({
//               state: PROTOCOL_EVENT.Message,
//               value: {data_bytes_read: new Uint8Array()}
//             });
//           }
//           const reader = this.#port.readable.getReader();
//           const { value, done } = await reader.read();
//           reader.releaseLock();
//           this.on_data_rx({
//             state: PROTOCOL_EVENT.Message,
//             value: {data_bytes_read: value}
//           });
//           break;
//         case SERIAL_PORT_DATA_REQUEST.DataBytesWrite:
//           json_check_type({
//             type: Uint8Array,
//             data: data,
//             should_throw: true
//           });
//           const writer = this.#port.writable.getWriter();
//           await writer.write(data);
//           writer.releaseLock();
//           break;
//         case SERIAL_PORT_DATA_REQUEST.DataSetReady:
//           resp = await this.#port.getSignals();
//           this.on_data_rx({
//             state: PROTOCOL_EVENT.Message,
//             value: {data_set_ready: resp["dataSetReady"]}
//           });
//           break;
//         case SERIAL_PORT_DATA_REQUEST.DataTerminalReady:
//           json_check_type({
//             type: "boolean",
//             data: data,
//             should_throw: true
//           });
//           await this.#port.setSignals("dataTerminalReady", data);
//           break;
//         case SERIAL_PORT_DATA_REQUEST.RequestToSend:
//           json_check_type({
//             type: "boolean",
//             data: data,
//             should_throw: true
//           });
//           await this.#port.setSignals("requestToSend", data);
//           break;
//         case SERIAL_PORT_DATA_REQUEST.RingIndicator:
//           resp = await this.#port.getSignals();
//           this.on_data_rx({
//             state: PROTOCOL_EVENT.Message,
//             value: {ring_indicator: resp["ringIndicator"]}
//           });
//           break;
//         default:
//           throw new CModuleError(CModuleError.MISUSE);
//       }
//     } catch (err) {
//       CModuleError.handle_error(err);
//       this.report({
//         event_fired: PROTOCOL_EVENT.ModuleError,
//         data: err
//       });
//     }
//   }

//   /**
//    * @inheritdoc
//    * @override
//    */
//   terminate() {
//     try {
//       this.#port.close();
//     } catch (err) {
//       CModuleError.handle_error(err);
//       this.report({
//         event_fired: PROTOCOL_EVENT.ModuleError,
//         data: err
//       });
//     }
//   }

//   /**
//    * Constructor for the protocol.
//    * @param {object} params The named parameters.
//    * @param {CProtocolEventHandler} params.rx_handler  The receive handler
//    * for data from the protocol.
//    * @param {SerialPort} params.port The physical serial port opened by the
//    * protocol.
//    */
//   constructor({rx_handler, port}) {
//     super({
//       id: `CSerialPortProtocol_${port.getInfo().usbVendorId}` +
//       `_${[port.getInfo().usbProductId]}`,
//       rx_handler: rx_handler,
//       type: PROTOCOL_TYPE.SerialPort
//     });
//     try {
//       if (!is_defined({property: "serial",
//                                    obj: globalThis["navigator"]})) {
//         throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
//       }
//       json_check_type({type: SerialPort, data: port, should_throw: true});
//       this.#port = port;
//     } catch (err) {
//       CModuleError.handle_error(err);
//       throw new CModuleError(
//         "CSerialPortProtocol construction error.",
//         err
//       );
//     }
//   }
// }

// /**
//  * <mark>UNDER DEVELOPMENT</mark>
//  * @private
//  * @template T
//  * @extends {CProtocol<T>}
//  */
// class CUsbProtocol extends CProtocol {

// }

// [PUBLIC API] ---------------------------------------------------------------



// ============================================================================
// [JSON USE CASE] ============================================================
// ============================================================================

/**
 * Decodes a string of data which has been encoded using Base64 encoding.
 * @param {string} data Base64 encoded string.
 * @returns {string | null} The decoded string or null if the encoding
 * failed.
 * @example
 * // Encode base64
 * let encoded = json_btoa("Hello World!");
 * // Decode base64
 * let decoded = json_atob(encoded);
 */
export function json_atob(data) {
  try {
    json_check_type({type: "string", data: data, should_throw: true});
    return globalThis.atob(data);
  } catch (err) {
    if (err instanceof CModuleError) {
      CModuleError.handle_error(err);
      throw new CModuleError("json_atob() error.", err);
    }
    return null;
  }
}

/**
 * Creates a Base64-encoded ASCII string from a binary string (i.e. a
 * string in which each character in the string is treated as a byte of
 * binary data).
 * @param {string} data The binary string.
 * @returns {string | null} The base64 encoded string or null if the
 * encoding failed.
 * @example
 * // Encode base64
 * let encoded = json_btoa("Hello World!");
 * // Decode base64
 * let decoded = json_atob(encoded);
 */
export function json_btoa(data) {
  try {
    json_check_type({type: "string", data: data, should_throw: true});
    return globalThis.btoa(data);
  } catch (err) {
    if (err instanceof CModuleError) {
      CModuleError.handle_error(err);
      throw new CModuleError("json_btoa() error.", err);
    }
    return null;
  }
}

/**
 * Utility to check parameters of a function to ensure they are of an
 * expected type.
 * @param {object} params The named parameters
 * @param {string | any} params.type
 * @param {any} params.data The parameter to be checked.
 * @param {number} [params.count] Checks the v parameter function
 * signature to ensure the appropriate number of parameters are specified.
 * @param {boolean} [params.should_throw=false] Whether to throw instead of
 * returning a value upon failure.
 * @returns {boolean} true if it meets the expectations, false otherwise.
 * @example
 * // Check if data is an expected type
 * let is_expected = json_check_type({type: "string", data: some_data});
 * if (is_expected) {
 *   // Do your processing
 * }
 *
 * // Throw if not an expected type
 * json_check_type({type: "string", data: some_data, should_throw: true});
 *
 * // Check complex data type
 * let is_expected = json_check_type({
 *   type: Uint8Array,
 *   data: some_data,
 * });
 *
 * // Check callback function follows expectations of 2 parameters.
 * json_check_type({
 *   type: "function",
 *   data: some_callback,
 *   count: 2,
 *   should_throw: true,
 * });
 */
export function json_check_type({
  type,
  data,
  count = undefined,
  should_throw = false
}) {
  try {
    const is_expected_type = typeof type !== "string"
      ? (data instanceof type)
      : typeof data === type;
    const valid = typeof count === "number"
      ? is_expected_type && data.length === count
      : is_expected_type;
    if (should_throw && !valid) {
      throw new CModuleError(CModuleError.TYPE_VIOLATION);
    }
    return valid;
  } catch (err) {
    CModuleError.handle_error(err);
    throw new CModuleError("json_check_type() error.", err);
  }
}

/**
 * Creates a JavaScript compliant JSON array with ability to copy data
 * from a previous array.
 * @param {any[]} [data] An optional array of data to copy
 * @returns {any[]} The newly created array with optional data.
 * @example
 * // To create an empty array
 * let array = json_create_array();
 *
 * // To make a copy of an array
 * let array_copy = json_create_array(array);
 */
export function json_create_array(data) {
  if (json_check_type({type: Array, data: data})) {
    const stringified = json_stringify(data);
    if (stringified) {
      return json_parse(stringified) ?? [];
    }
  }
  return [];
}

/**
 * Creates a JavaScript compliant JSON object with ability to copy data
 * from a previous array.
 * @param {object} [data] An optional object of data to copy
 * @returns {object} The newly created object with optional data.
 * @example
 * // To create an empty object
 * let obj = json_create_array();
 *
 * // To make a copy of an object
 * let obj_copy = json_create_array(obj);
 */
export function json_create_object(data) {
  if (json_check_type({type: "object", data})) {
    return Object.assign({}, data);
  }
  return {};
}

/**
 * Determines if the specified object has the specified property.
 * @param {object} params
 * @param {object} params.obj The object to check.
 * @param {string} params.key The property to find.
 * @param {boolean} [params.should_throw=false] Whether to throw instead
 * of returning a value upon failure.
 * @returns {boolean} true if property was found, false otherwise.
 * @example
 * // Check if object has field
 * if (json_has_key({obj: obj, key: "id"})) {
 *   // Do your processing
 * }
 *
 * // Throw if not expected
 * json_has_key({obj: obj, key: "id", should_throw: true});
 */
export function json_has_key({obj, key, should_throw = false}) {
  try {
    json_check_type({type: "object", data: obj, should_throw: true});
    json_check_type({type: "string", data: key, should_throw: true});
    const has_key = key in obj;
    if (should_throw && !has_key) {
      throw new CModuleError(CModuleError.TYPE_VIOLATION);
    }
    return has_key;
  } catch (err) {
    CModuleError.handle_error(err);
    throw new CModuleError("json_has_key() error.", err);
  }
}

/**
 * Determines if the specified object has the specified value
 * @param {object} params
 * @param {object} params.obj The object to check.
 * @param {string} params.value The value to find.
 * @param {boolean} [params.should_throw=false] Whether to throw instead
 * of returning a value upon failure.
 * @returns {boolean} true if property was found, false otherwise.
 * @example
 * // Check if object has field
 * if (json_has_value({obj: obj, value: "id"})) {
 *   // Do your processing
 * }
 *
 * // Throw if not expected
 * json_has_value({obj: obj, value: "id", should_throw: true});
 */
export function json_has_value({obj, value, should_throw = false}) {
  try {
    json_check_type({type: "object", data: obj, should_throw: true});
    json_check_type({type: "string", data: value, should_throw: true});
    const has_value = Object.values(obj).includes(value);
    if (should_throw && !has_value) {
      throw new CModuleError(CModuleError.TYPE_VIOLATION);
    }
    return has_value;
  } catch (err) {
    CModuleError.handle_error(err);
    throw new CModuleError("json_has_key() error.", err);
  }
}

/**
 * Converts a string to a supported JSON data type.
 * @param {string} data The data to parse.
 * @returns {any | null} The JSON data type or null if the parsing fails.
 * @example
 * // To parse and stringify JSON data or types supported by JSON
 * // Where data is an object, array, boolean, string, number, or null
 * // Invalid data will return as null.
 * let stringified = json_stringify(data);
 * let parsed = json_parse(stringified);
 */
export function json_parse(data) {
  try {
    const parsed = JSON.parse(data);
    return parsed
      ? parsed
      : null;
  } catch (_ex) {
    return null;
  }
}

/**
 * Converts a JSON supported data type into a string.
 * @param {any} data The data to convert.
 * @returns {string | null} The string representation or null if the
 * stringify failed.
 * @example
 * // To parse and stringify JSON data or types supported by JSON
 * // Where data is an object, array, boolean, string, number, or null
 * // Invalid data will return as null.
 * let stringified = json_stringify(data);
 * let parsed = json_parse(stringified);
 */
export function json_stringify(data) {
  try {
    const stringified = JSON.stringify(data);
    return stringified
      ? stringified
      : null;
  } catch (_ex) {
    return null;
  }
}

// ============================================================================
// [LOGGER USE CASE] ==========================================================
// ============================================================================

// [ENUMS] --------------------------------------------------------------------

/**
 * Holds the logger configuration information for log level and labels for
 * the {@link logger_level} and {@link logger_log} functions.
 *
 * @readonly
 * @enum {object}
 * @property {object} Debug   level (0) / label "DEBUG"
 * @property {object} Info    level (1) / label "INFO"
 * @property {object} Warning level (2) / label "WARNING"
 * @property {object} Error   level (3) / label "ERROR"
 * @property {object} Off     level (4) / label "OFF"
 */
export const LOGGER = Object.freeze({
  Debug:   { level: 0, label: "DEBUG"   },
  Info:    { level: 1, label: "INFO"    },
  Warning: { level: 2, label: "WARNING" },
  Error:   { level: 3, label: "ERROR"   },
  Off:     { level: 4, label: "OFF"     },
});

// [DATA DEFINITION] ----------------------------------------------------------

/**
 * @callback CLogHandler A log handler for further processing of a logged
 * event.
 * @param {CLogRecord} record The record logged.
 * @returns {void}
 */

/**
 * The log record processed via the {@link CLogHandler} post logging event.
 */
export class CLogRecord {
  /** @type {Date} */
  #time = new Date();
  /** @type {LOGGER} */
  #level;
  /** @type {any} */
  #data = undefined;

  /**
   * The time the logged event was created.
   * @returns {Date}
   */
  time() { return this.#time; }

  /**
   * The object representation of the log level.
   * @returns {LOGGER}
   */
  level() { return this.#level; }

  /**
   * The data associated with the log event.
   * @returns {any}
   */
  data() { return this.#data; }

  /**
   * Constructor for the class.
   * @param {object} params The named parameters.
   * @param {LOGGER} params.level object information.
   * @param {any} params.data The data to log.
   */
  constructor({level, data}) {
    try {
      json_check_type({type: "object", data: level, should_throw: true});
      json_has_key({obj: level, key: "level", should_throw: true});
      json_has_key({obj: level, key: "label", should_throw: true});
      this.#level = level;
      this.#data = data;
    } catch (err) {
      CModuleError.handle_error(err);
      throw new CModuleError("CLogRecord construction error.", err);
    }
  }
}

// [PUBLIC API] ---------------------------------------------------------------

/**
 * Holds the current log level of the module
 * @private
 * @type {LOGGER}
 */
let _logger_level = LOGGER.Error;

/**
 * Holds the logger handler for post logging events.
 * @private
 * @type {CLogHandler?}
 */
let _logger_handler = null;

/**
 * Sets the logger handler for post logging processing.
 * @param {CLogHandler} [handler] The handler to utilize.
 * @returns {void}
 * @example
 * // To set a logger for post logging processing
 * function log_handler(record) {
 *   // Do something with the log record.
 * }
 * logger_handler(log_handler);
 *
 * // To unset it
 * logger_handler();
 */
export function logger_handler(handler) {
  try {
    if (handler === null || handler === undefined) {
      _logger_handler = null;
    } else {
      json_check_type({
        type: "function",
        data: handler,
        count: 1,
        should_throw: true
      });
      _logger_handler = handler;
    }
  } catch (err) {
    CModuleError.handle_error(err);
    throw new CModuleError("logger_handler() error.", err);
  }
}

/**
 * Sets / retrieves the current module log level.
 * @param {object | undefined} [level] The optional log level to set
 * based on the {@link LOGGER} object configuration.
 * @returns {string} The string representation of the log level.
 * @example
 * // To determine the current logger level
 * let logger_level = logger_level();
 *
 * // To set the module logger level
 * logger_level(LOGGER.info);
 *
 * // To turn off all logging
 * logger_level(LOGGER.Off);
 */
export function logger_level(level) {
  try {
    if (level) {
      json_check_type({type: "object", data: level, should_throw: true});
      json_has_key({obj: level, key: "level", should_throw: true});
      json_has_key({obj: level, key: "label", should_throw: true});
      _logger_level = level;
    }
    // @ts-ignore
    return _logger_level.label;
  } catch (err) {
    CModuleError.handle_error(err);
    throw new CModuleError("logger_level() error.", err);
  }
}

/**
 * Logs an event with the module logger.
 * @param {object} params The named parameters.
 * @param {LOGGER} params.level The log level for the logged event.
 * @param {any} params.data The data to log with the event.
 * @returns {void}
 * @example
 * // When the logger is on and you want to log an event
 * // It will only log if the log level is set to log those events.
 * logger_log({level: Logger.Warning, data: "A thing happened"});
 */
export function logger_log({level, data}) {
  try {
    json_has_key({obj: level, key: "level", should_throw: true});
    json_has_key({obj: level, key: "label", should_throw: true});
    if (!data) {
      throw new CModuleError(CModuleError.TYPE_VIOLATION);
    }

    // Check to see if our logging is on or off.
    // @ts-ignore
    if (_logger_level.label == "OFF") {
      return;
    }

    // It's on, go create the log record and go log some stuff.
    const record = new CLogRecord({level: level, data: data});
    // @ts-ignore
    if (record.level().level >= _logger_level.level) {
      // @ts-ignore
      switch (record.level().label) {
        case "DEBUG":
        case "INFO":
          console.log(
            record.time().toISOString(),
            // @ts-ignore
            record.level().label,
            record.data()
          );
          break;
        case "WARNING":
          console.warn(
            record.time().toISOString(),
            // @ts-ignore
            record.level().label,
            record.data()
          );
          break;
        case "ERROR":
          console.error(
            record.time().toISOString(),
            // @ts-ignore
            record.level().label,
            record.data()
          );
          break;
      }

      if (_logger_handler) {
        _logger_handler(record);
      }
    }
  } catch (err) {
    CModuleError.handle_error(err);
    throw new CModuleError("logger_log() error.", err);
  }
}

// ============================================================================
// [NETWORK USE CASE] =========================================================
// ============================================================================

// [ENUMS] --------------------------------------------------------------------

/**
 * Provides the support for the {@link network_query} function.
 * @private
 * @enum {string}
 * @property {string} Online
 * @property {string} Hostname
 */
export const NETWORK_REQUEST = Object.freeze({
  Online: "online",
  Hostname: "hostname",
});

// [DATA DEFINITION] ----------------------------------------------------------

/**
 * @private
 * Identifies event handled by the {@link PROTOCOL_TYPE.BroadcastChannel}
 * protocol.
 */
export class CBroadcastChannelEvent {
  /** @type {MessageEvent} */
  #event
  /** @type {boolean} */
  #is_error;

  /**
   * The message event received by the protocol.
   * @returns {MessageEvent}
   */
  event() { return this.#event; }

  /**
   * Indicates whether the wrapped MessageEvent is an error or not.
   * @returns {boolean}
   */
  is_error() { return this.#is_error; }

  /**
   * Constructor for the object.
   * @param {object} params The named parameters.
   * @param {MessageEvent} params.event The event received by the protocol.
   * @param {boolean} params.is_error true if the MessageEvent was
   * associated with an error, false otherwise.
   */
  constructor({event, is_error}) {
    try {
      json_check_type({type: MessageEvent, data: event, should_throw: true});
      json_check_type({type: "boolean", data: is_error, should_throw: true});
      this.#event = event;
      this.#is_error = is_error;
    } catch (err) {
      CModuleError.handle_error(err);
      throw new CModuleError(
        "CBroadcastChannelEvent construction error.", err
      );
    }
  }
}

/**
 * @private
 * Identifies event handled by the {@link PROTOCOL_TYPE.EventSource}
 * protocol.
 */
export class CEventSourceEvent {
  /** @type {Event | MessageEvent} */
  #event;
  /** @type {boolean} */
  #is_error;
  /** @type {number} */
  #ready_state;

  /**
   * Signals the ready_state() is in a connecting state.
   * @readonly
   * @type {number}
   */
  static get CONNECTING() { return 0; }

  /**
   * Signals the ready_state() is in a connecting state.
   * @readonly
   * @type {number}
   */
  static get OPEN() { return 1; }

  /**
   * Signals the ready_state() is in a connecting state.
   * @readonly
   * @type {number}
   */
  static get CLOSED() { return 2; }

  /**
   * Treats the wrapped event as a message event.
   * @returns {MessageEvent?}
   */
  as_message_event() {
    return this.#event instanceof MessageEvent
      ? this.#event
      : null;
  }

  /**
   * The event captured by the protocol.
   * @returns {Event | MessageEvent}
   */
  event() { return this.#event; }

  /**
   * Indicates if the event captured was an error.
   * @returns {boolean}
   */
  is_error() { return this.#is_error; }

  /**
   * The current state of the protocol.
   * @returns {number}
   */
  ready_state() { return this.#ready_state; }

  /**
   * Constructor for the class.
   * @param {object} params The named parameters
   * @param {Event | MessageEvent} params.event The event handled by the
   * protocol.
   * @param {boolean} params.is_error true if it was an error event,
   * false otherwise.
   * @param {number} params.ready_state The current state of the protocol.
   */
  constructor({event, is_error, ready_state}) {
    try {
      if (!json_check_type({type: MessageEvent, data: event}) &&
          !json_check_type({type: Event, data: event})) {
        throw new CModuleError(CModuleError.TYPE_VIOLATION);
      }
      json_check_type({type: "boolean", data: is_error, should_throw: true});
      json_check_type({
        type: "number",
        data: ready_state,
        should_throw: true
      });
      this.#event = event;
      this.#is_error = is_error;
      this.#ready_state = ready_state;
    } catch (err) {
      CModuleError.handle_error(err);
      throw new CModuleError(
        "CEventSourceEvent construction error.", err
      );
    }
  }
}

/**
 * @private
 * The result of a  {@link network_fetch} call containing any data from the
 * call along with the HTTP Status Code  of the transaction.
 */
export class CFetchResult {
  /** @type {number} */
  #status = -1;
  /** @type {any} */
  #data;

  /**
   * Will get the data if it is a Uint8Array or null if not that object
   * type.
   * @returns {Uint8Array?}
   */
  as_binary() {
    return json_check_type({type: Uint8Array, data: this.#data})
        ? this.#data
        : null;
  }

  /**
   * Will get the data if it is a Blob or null if not that object type.
   * @returns {Blob?}
   */
  as_blob() {
    return json_check_type({type: Blob, data: this.#data})
      ? this.#data
      : null;
  }

  /**
   * Will get the value if it is a FormData or null if not that object
   * type.
   * @returns {FormData?}
   */
  as_form_data() {
    return json_check_type({type: FormData, data: this.#data})
      ? this.#data
      : null;
  }

  /**
   * Will get the value if it is a Object or null if not that object
   * type.
   * @returns {object?}
   */
  as_object() {
    return json_check_type({type: "object", data: this.#data})
      ? this.#data
      : null;
  }

  /**
   * Will get the value if it is a string or null if not that object
   * type.
   * @returns {string?}
   */
  as_string() {
    return json_check_type({type: "string", data: this.#data})
      ? this.#data
      : null;
  }

  /**
   * The HTTP Status Code
   * @returns {number}
   */
  status() { return this.#status; }

  /**
   * Constructor for the class.
   * @param {object} params The named parameters.
   * @param {number} params.status The HTTP status code of the fetch request.
   * @param {any} [params.data] Any data associated with the request.
   * @param {any} [params.error] Any captured errors as a result of the
   * request.
   */
  constructor({status, data=null}) {
    try {
      json_check_type({type: "number", data: status, should_throw: true});
      this.#status = status;
      this.#data = data;
    } catch (err) {
      CModuleError.handle_error(err);
      throw new CModuleError("CFetchResult construction error.", err);
    }
  }
}

/**
 * @private
 * Represents the data to send to a connected web socket to a server. Supports
 * the {@link PROTOCOL_TYPE} WebSocket protocol.
 */
export class CWebSocketData {
  /** @type {"arraybuffer" | "blob"} */
  #binary_type;
  /** @type {ArrayBuffer | Blob | string} */
  #data;

  /**
   * Identifies the web sockets primary transmission type across the web
   * socket.
   * @returns {"arraybuffer" | "blob"}
   */
  binary_type() { return this.#binary_type; }

  /**
   * The data to transmit
   * @returns {ArrayBuffer | Blob | string}
   */
  data() { return this.#data; }

  /**
   * Constructor for the data to send to a web socket.
   * @param {object} params The named parameters
   * @param {ArrayBuffer | Blob | string} params.data The data to send to
   * the server.
   * @param {"arraybuffer" | "blob"} [params.binary_type="blob"] How to
   * configure the socket when sending / receiving the data.
   */
  constructor({data, binary_type="blob"}) {
    try {
      if (!json_check_type({type: ArrayBuffer, data: data}) &&
          !json_check_type({type: Blob, data: data}) &&
          !json_check_type({type: "string", data: data})) {
        throw new CModuleError(CModuleError.TYPE_VIOLATION);
      }
      json_check_type({type: "string", data: binary_type, should_throw: true});
      this.#data = data;
      this.#binary_type = binary_type;
    } catch (err) {
      CModuleError.handle_error(err);
      throw new CModuleError("CWebSocketData construction error.", err);
    }
  }
}

/**
 * @private
 * Represents a firing timer for an open {@link PROTOCOL_TYPE} WebSocket.
 */
export class CWebSocketEvent {
  /** @type {number} */
  #buffered_amount;
  /** @type {CloseEvent | Event | MessageEvent} */
  #event;
  /** @type {boolean} */
  #is_error;
  /** @type {number} */
  #ready_state;
  /** @type {string} */
  #url;

  /**
   * Signals the ready_state() is in a connecting state.
   * @readonly
   * @type {number}
   */
  static get CONNECTING() { return 0; }

  /**
   * Signals the ready_state() is in a connecting state.
   * @readonly
   * @type {number}
   */
  static get OPEN() { return 1; }

  /**
   * Signals the ready_state() is in a closing state.
   * @readonly
   * @type {number}
   */
  static get CLOSING() { return 2; }

  /**
   * Signals the ready_state() is in a closed state.
   * @readonly
   * @type {number}
   */
  static get CLOSED() { return 3; }

  /**
   * Treats the captured event as a close event.
   * @returns {CloseEvent?}
   */
  as_close_event() {
    return this.#event instanceof CloseEvent
      ? this.#event
      : null;
  }

  /**
   * Treats the captured event as a message event.
   * @returns {MessageEvent?}
   */
  as_message_event() {
    return this.#event instanceof MessageEvent
      ? this.#event
      : null;
  }

  /**
   * The buffered amount of data to send to the server protocol.
   * @returns {number}
   */
  buffered_amount() { return this.#buffered_amount; }

  /**
   * The event captured by the protocol.
   * @returns {CloseEvent | Event | MessageEvent}
   */
  event() { return this.#event; }

  /**
   * Indicates if the event captured was an error.
   * @returns {boolean}
   */
  is_error() { return this.#is_error; }

  /**
   * The current state of the protocol.
   * @returns {number}
   */
  ready_state() { return this.#ready_state; }

  /**
   * The URL of the server.
   * @returns {string}
   */
  url() { return this.#url; }

  /**
   * Constructor for the class.
   * @param {object} params The named parameters
   * @param {number} params.buffered_amount The amount of data queued to be
   * transmitted to the server.
   * @param {Event | MessageEvent} params.event The event handled by the
   * protocol.
   * @param {boolean} params.is_error true if it was an error event,
   * false otherwise.
   * @param {number} params.ready_state The current state of the protocol.
   * @param {string} params.url The url of the server the protocol is
   * connected.
   */
  constructor({buffered_amount, event, is_error, ready_state, url}) {
    try {
      if (!json_check_type({type: MessageEvent, data: event}) &&
          !json_check_type({type: CloseEvent, data: event}) &&
          !json_check_type({type: Event, data: event})) {
        throw new CModuleError(CModuleError.TYPE_VIOLATION);
      }
      json_check_type({
        type: "number",
        data: buffered_amount,
        should_throw: true
      });
      json_check_type({type: "boolean", data: is_error, should_throw: true});
      json_check_type({
        type: "number",
        data: ready_state,
        should_throw: true
      });
      json_check_type({type: "string", data: url, should_throw: true});
      this.#buffered_amount = buffered_amount;
      this.#event = event;
      this.#is_error = is_error;
      this.#ready_state = ready_state;
      this.#url = url;
    } catch (err) {
      CModuleError.handle_error(err);
      throw new CModuleError(
        "CWebSocketEvent construction error.", err
      );
    }
  }
}

// [PROTOCOL IMPLEMENTATION] --------------------------------------------------

/**
 * @private
 * This protocol represents a named channel that any browsing context of a
 * given origin can subscribe to. It allows communication between different
 * documents (in different windows, tabs, frames, iframes, or worker) of the
 * same origin.
 * @template T
 * @extends {CProtocol<CBroadcastChannelEvent>}
 */
export class CBroadcastChannelProtocol extends CProtocol {
  /** @type {BroadcastChannel} */
  #channel;

  /**
   * Sends a message, which can be of any kind of Object, to each listener
   * in any browsing context with the same origin. The message is
   * transmitted as a message event targeted at each BroadcastChannel
   * bound to the channel.
   * @override
   * @param {any} [data] The data to broadcast. The data is
   * serialized using the structured clone algorithm. This means you can
   * pass a broad variety of data objects safely to the destination window
   * without having to serialize them yourself.
   * @returns {void}
   */
  post_message(data) {
    try {
      this.#channel.postMessage(data);
    } catch (err) {
      CModuleError.handle_error(err);
      this.report({
        event_fired: PROTOCOL_EVENT.ModuleError,
        data: err
      });
    }
  }

  /**
   * @inheritdoc
   * @override
   */
  terminate() {
    try {
      this.#channel.close();
    } catch (err) {
      CModuleError.handle_error(err);
      this.report({
        event_fired: PROTOCOL_EVENT.ModuleError,
        data: err
      });
    }
  }

  /**
   * Constructor for the protocol.
   * @param {object} params The named parameters.
   * @param {string} params.name The name to give to the protocol.
   * @param {string} params.url The URL to connect this broadcast channel on.
   * @param {CProtocolEventHandler<CBroadcastChannelEvent>} params.rx_handler
   * The handler to receive data from the protocol.
   */
  constructor({name, rx_handler, url}) {
    super({
      name: name,
      rx_handler: rx_handler,
      type: PROTOCOL_TYPE.BroadcastChannel
    });
    try {
      if (!runtime_available({request: AVAILABILITY_REQUEST.BroadcastChannel})) {
        throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
      }
      this.#channel = new globalThis.BroadcastChannel(url);
      this.#channel.onmessage = (evt) => {
        this.report({
          event_fired: PROTOCOL_EVENT.Message,
          data: new CBroadcastChannelEvent({event: evt, is_error: false})
        });
        evt.preventDefault();
      };
      this.#channel.onmessageerror = (evt) => {
        this.report({
          event_fired: PROTOCOL_EVENT.MessageError,
          data: new CBroadcastChannelEvent({event: evt, is_error: true})
        });
        evt.preventDefault();
      };
    } catch (err) {
      CModuleError.handle_error(err);
      throw new CModuleError("CBroadcastChannel construction error.", err);
    }
  }
}

/**
 * @private
 * Opens a persistent connection to an HTTP server, which sends events in
 * text/event-stream format. The connection remains open until terminate is
 * called.
 * @extends {CProtocol<CBroadcastChannelEvent>}
 */
export class CEventSourceProtocol extends CProtocol {
  /** @type {EventSource} */
  #sse

  /**
   * @inheritdoc
   * @override
   */
  terminate() {
    try {
      this.#sse.close();
    } catch (err) {
      CModuleError.handle_error(err);
      this.report({
        event_fired: PROTOCOL_EVENT.ModuleError,
        data: err
      });
    }
  }

  /**
   * Constructor for the protocol.
   * @param {object} params The named parameters.
   * @param {string} params.name The name to give to the protocol.
   * @param {CProtocolEventHandler<CBroadcastChannelEvent>} params.rx_handler
   * The protocol handler to receive those events.
   * @param {string} params.url URL of the server sending the events.
   * @param {boolean} [params.with_credentials=false] True to utilize CORS,
   * false otherwise.
   */
  constructor({name, rx_handler, url, with_credentials=false}) {
    super({
      name: name,
      rx_handler: rx_handler,
      type: PROTOCOL_TYPE.EventSource
    });
    try {
      if (!runtime_available({request: AVAILABILITY_REQUEST.EventSource})) {
        throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
      }
      json_check_type({
        type: "boolean",
        data: with_credentials,
        should_throw: true
      });
      this.#sse = new globalThis.EventSource(
        url,
        {withCredentials: with_credentials}
      );
      this.#sse.onerror = (evt) => {
        this.report({
          event_fired: PROTOCOL_EVENT.Error,
          data: new CEventSourceEvent({
            event: evt,
            is_error: true,
            ready_state: this.#sse.readyState
          })
        });
        evt.preventDefault();
      };
      this.#sse.onmessage = (evt) => {
        this.report({
          event_fired: PROTOCOL_EVENT.Message,
          data: new CEventSourceEvent({
            event: evt,
            is_error: false,
            ready_state: this.#sse.readyState
          })
        });
        evt.preventDefault();
      };
      this.#sse.onopen = (evt) => {
        this.report({
          event_fired: PROTOCOL_EVENT.Open,
          data: new CEventSourceEvent({
            event: evt,
            is_error: false,
            ready_state: this.#sse.readyState
          })
        });
        evt.preventDefault();
      };
    } catch (err) {
      CModuleError.handle_error(err);
      throw new CModuleError("CEventSourceProtocol error.", err);
    }
  }
}

// /**
//  * @private
//  * Creates a WebSocket connection to a server allowing a dedicated
//  * bi-directional exchange of data. This socket will continuously attempt
//  * reconnecting to the server on connection loss until the protocol is
//  * terminated. {@link network_connect} creates this protocol.
//  * @extends {CProtocol<CWebSocketEvent>}
//  */
// class CWebSocketProtocol extends CProtocol {
//   /** @type {WebSocket} */
//   #socket;

//   /**
//    * Enqueues the specified data to be transmitted to the server over the
//    * WebSocket connection, increasing the value of bufferedAmount by the
//    * number of bytes needed to contain the data. If the data can't be sent
//    * (for example, because it needs to be buffered but the buffer is full),
//    * the socket is closed automatically.
//    * @override
//    * @param {CWebSocketData} data Data to send to the server
//    * for further processing.
//    * @returns {void}
//    */
//   post_message(data) {
//     try {
//       if (this.#socket.readyState == this.#socket.OPEN) {
//         this.#socket.binaryType = data.binary_type();
//         this.#socket.send(data.data());
//       }
//     } catch (err) {
//       CModuleError.handle_error(err);
//       this.report({
//         event_fired: PROTOCOL_EVENT.ModuleError,
//         data: err
//       });
//     }
//   }

//   /**
//    * @inheritdoc
//    * @override
//    */
//   terminate() {
//     try {
//       this.#socket.close();
//     } catch (err) {
//       CModuleError.handle_error(err);
//       this.report({
//         event_fired: PROTOCOL_EVENT.ModuleError,
//         data: err
//       });
//     }
//   }

//   /**
//    * Constructor for the protocol.
//    * @param {object} params The named parameters.
//    * @param {string} params.name The name to give to the protocol.
//    * @param {CProtocolEventHandler<CWebSocketEvent>} params.rx_handler The
//    * handler for receiving data from this protocol.
//    * @param {string} params.url The URL of the server to connect.
//    */
//   constructor({name, rx_handler, url}) {
//     super({
//       name: name,
//       rx_handler: rx_handler,
//       type: PROTOCOL_TYPE.WebSocket
//     });
//     try {
//       if (!runtime_available({request: AVAILABILITY_REQUEST.WebSocket})) {
//         throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
//       }
//       json_check_type({type: "string", data: url, should_throw: true});
//       this.#socket = new globalThis.WebSocket(url);
//       this.#socket.onclose = (evt) => {
//         this.report({
//           event_fired: PROTOCOL_EVENT.Close,
//           data: new CWebSocketEvent({
//             buffered_amount: this.#socket.bufferedAmount,
//             event: evt,
//             is_error: false,
//             ready_state: this.#socket.readyState,
//             url: this.#socket.url
//           })
//         });
//         evt.preventDefault();
//       }
//       this.#socket.onerror = (evt) => {
//         this.report({
//           event_fired: PROTOCOL_EVENT.Error,
//           data: new CWebSocketEvent({
//             buffered_amount: this.#socket.bufferedAmount,
//             event: evt,
//             is_error: true,
//             ready_state: this.#socket.readyState,
//             url: this.#socket.url
//           })
//         });
//         evt.preventDefault();
//       }
//       this.#socket.onmessage = (evt) => {
//         this.report({
//           event_fired: PROTOCOL_EVENT.Message,
//           data: new CWebSocketEvent({
//             buffered_amount: this.#socket.bufferedAmount,
//             event: evt,
//             is_error: false,
//             ready_state: this.#socket.readyState,
//             url: this.#socket.url
//           })
//         });
//         evt.preventDefault();
//       }
//       this.#socket.onopen = (evt) => {
//         this.report({
//           event_fired: PROTOCOL_EVENT.Open,
//           data: new CWebSocketEvent({
//             buffered_amount: this.#socket.bufferedAmount,
//             event: evt,
//             is_error: false,
//             ready_state: this.#socket.readyState,
//             url: this.#socket.url
//           })
//         });
//         evt.preventDefault();
//       }
//     } catch (err) {
//       CModuleError.handle_error(err);
//       throw new CModuleError("CWebSocketProtocol construction error.", err);
//     }
//   }
// }

// /**
//  * <mark>UNDER DEVELOPMENT - DO NOT USE</mark>
//  * @private
//  * @template T
//  * @extends {CProtocol<T>}
//  */
// class CWebRtcProtocol extends CProtocol {

// }

// /**
//  * <mark>UNDER DEVELOPMENT - DO NOT USE</mark>
//  * @private
//  * @template T
//  * @extends {CProtocol<T>}
//  */
// class CWebTransportProtocol extends CProtocol {

// }

// [PUBLIC API] ---------------------------------------------------------------

/**
 * <mark>Expand with all globalThis.location queries</mark>
 * @private
 * @param {NETWORK_REQUEST} request
 * @returns {boolean | string}
 */
export function network_query(request) {
  try {
    switch (request) {
      case NETWORK_REQUEST.Online:
        return runtime_available({
          request: AVAILABILITY_REQUEST.AskRuntime,
          name: "onLine",
          obj: globalThis["navigator"]
        })
          ? globalThis.navigator.onLine
          : false;
      case NETWORK_REQUEST.Hostname:
        return runtime_available({
          request: AVAILABILITY_REQUEST.AskRuntime,
          name: "location"
        })
          ? globalThis.location.hostname
          : "UNKNOWN";
      default:
        throw new CModuleError(CModuleError.MISUSE);
    }
  } catch (err) {
    CModuleError.handle_error(err);
    throw new CModuleError("network_query() error.", err);
  }
}

/**
 * @private
 * Sends an HTTP POST request containing a small amount of data to a web
 * server.
 * @param {object} params The named parameters
 * @param {string} params.url Where to send the beacon.
 * @param {any | null} [params.data] The data to send with the beacon.
 * @returns {boolean} true if queued up by user agent, false otherwise.
 * @example
 * // TBD
 */
export function network_beacon({url, data}) {
  try {

    if (!runtime_available({request: AVAILABILITY_REQUEST.Beacon})) {
      throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
    }
    json_check_type({type: "string", data: url, should_throw: true});
    return globalThis.navigator.sendBeacon(url, data);
  } catch (err) {
    CModuleError.handle_error(err);
    throw new CModuleError("network_beacon() error.", err);
  }
}

/**
 * @private
 * Provides the ability to make requests from a hosted server REST API.
 * @param {object} params The named parameters
 * @param {string} params.url The URL to the server REST API to
 * communicate.
 * @param {object} params.options The data to configure / go along with
 * the request. See the attached URL for detailed
 * @returns {Promise<CFetchResult>} The result of the request. A rejected
 * promise is an API violation.
 * @example
 * // TBD
 */
export async function network_fetch({url, options}) {
  try {
    json_check_type({type: "string", data: url, should_throw: true});
    json_check_type({type: "object", data: options, should_throw: true});
    const resp = await globalThis.fetch(url, options);
    const contentType = resp.headers.get("Content-Type") ?? "";
    const status = resp.status;
    const data = contentType.includes("application/json")
      ? await resp.json()
      : contentType.includes("form-data")
        ? await resp.formData()
        : contentType.includes("application/octet-stream")
          ? await resp.blob()
          : contentType.includes("text/")
            ? await resp.text()
            : "";
    return new CFetchResult({status: status, data: data});
  } catch (err) {
    if (json_check_type({type: CModuleError, data: err})) {
      CModuleError.handle_error(err);
      throw new CModuleError("network_connect() error.", err);
    }
    return new CFetchResult({status: -1, data: err});
  }
}

// ============================================================================
// [NPU USE CASE] =============================================================
// ============================================================================

/**
 * @private
 * The math formula to execute with the {@link npu_compute} call.
 * @readonly
 * @enum {string}
 * @property {string} GeodeticDistance
 * Distance in meters between two WGS84 points.
 * @property {string} GeodeticHeading
 * Heading in °N true North 0 - 359.
 * @property {string} GeodeticSpeed
 * Speed in meters per second between two WGS84 points.
 * @property {string} TemperatureCelsiusToFahrenheit
 * °F = (°C x 9/5) + 32
 * @property {string} TemperatureCelsiusToKelvin
 * °K = °C + 273.15
 * @property {string} TemperatureFahrenheitToCelsius
 * °C = (°F − 32) × 5/9
 * @property {string} TemperatureFahrenheitToKelvin
 * °K = (°F − 32) × 5/9 + 273.15
 * @property {string} TemperatureKelvinToCelsius
 * °C = °K − 273.15
 * @property {string} TemperatureKelvinToFahrenheit
 * °F = (°K − 273.15) × 9/5 + 32
 */
export const MATH_FORMULA = Object.freeze({
  GeodeticDistance: "GeodeticDistance",
  GeodeticHeading: "GeodeticHeading",
  GeodeticSpeed: "GeodeticSpeed",
  TemperatureCelsiusToFahrenheit: "TemperatureCelsiusToFahrenheit",
  TemperatureCelsiusToKelvin: "TemperatureCelsiusToKelvin",
  TemperatureFahrenheitToCelsius: "TemperatureFahrenheitToCelsius",
  TemperatureFahrenheitToKelvin: "TemperatureFahrenheitToKelvin",
  TemperatureKelvinToCelsius: "TemperatureKelvinToCelsius",
  TemperatureKelvinToFahrenheit: "TemperatureKelvinToFahrenheit"
});

/**
 * Calculate the geodetic distance.
 * @private
 * @param {number} start_latitude
 * @param {number} start_longitude
 * @param {number} end_latitude
 * @param {number} end_longitude
 * @returns {number}
 */
function _geodetic_distance(start_latitude, start_longitude,
    end_latitude, end_longitude) {
  // Convert degrees to radians
  const lat1 = start_latitude * Math.PI / 180.0;
  const lon1 = start_longitude * Math.PI / 180.0;
  const lat2 = end_latitude * Math.PI / 180.0;
  const lon2 = end_longitude * Math.PI / 180.0;

  // radius of earth in metres
  const r = 6378100.0;

  // P
  const rho1 = r * Math.cos(lat1);
  const z1 = r * Math.sin(lat1);
  const x1 = rho1 * Math.cos(lon1);
  const y1 = rho1 * Math.sin(lon1);

  // Q
  const rho2 = r * Math.cos(lat2);
  const z2 = r * Math.sin(lat2);
  const x2 = rho2 * Math.cos(lon2);
  const y2 = rho2 * Math.sin(lon2);

  // Dot product
  const dot = x1 * x2 + y1 * y2 + z1 * z2;
  const cos_theta = dot / (r * r);
  const theta = Math.acos(cos_theta);

  // Distance in meters
  return r * theta;
}

/**
 * Calculates the geodetic heading.
 * @private
 * @param {number} start_latitude
 * @param {number} start_longitude
 * @param {number} end_latitude
 * @param {number} end_longitude
 * @returns {number}
 */
function _geodetic_heading(start_latitude, start_longitude,
    end_latitude, end_longitude) {
  // Get the initial data from our variables:
  const lat1 = start_latitude * (Math.PI / 180.0);
  const lon1 = start_longitude * (Math.PI / 180.0);
  const lat2 = end_latitude * (Math.PI  / 180.0);
  const lon2 = end_longitude * (Math.PI  / 180.0);

  // Set up our calculations
  const y = Math.sin(lon2 - lon1) * Math.cos(lat2);
  const x = (Math.cos(lat1) * Math.sin(lat2)) -
    (Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1));
  const rtnval = Math.atan2(y, x) * (180.0 / Math.PI);
  return (rtnval + 360.0) % 360.0;
}

/**
 * Calculates the geodetic speed.
 * @private
 * @param {number} start_milliseconds
 * @param {number} start_latitude
 * @param {number} start_longitude
 * @param {number} end_milliseconds
 * @param {number} end_latitude
 * @param {number} end_longitude
 * @returns {number}
 */
function _geodetic_speed(start_latitude, start_longitude,
    start_milliseconds, end_latitude, end_longitude, end_milliseconds) {
  const dist_meters = _geodetic_distance(
    start_latitude, start_longitude,
    end_latitude, end_longitude
  );
  const time_s = (end_milliseconds - start_milliseconds) / 1000.0;
  return dist_meters / time_s;
}

/**
 * @private
 * Function to execute the {@link MATH_FORMULA} specified within the named
 * parameters to get the calculated answer.
 * @param {object} params The named parameters.
 * @param {MATH_FORMULA} params.formula The formula to run.
 * @param {number[]} params.args The arguments to use with the formula.
 * @returns {number} The calculated answer or NaN if division by 0 or sqrt of
 * a negative number.
 * @throws {SyntaxError} Reflecting either {@link API_MISUSE},
 * {@link API_NOT_IMPLEMENTED}, {@link API_TYPE_VIOLATION}, or
 * {@link API_UNSUPPORTED_RUNTIME} codemelted.js module API
 * violations. You should not try-catch these as they serve as asserts
 * to the developer.
 * @example
 * // TBD
 */
export function npu_compute({formula, args}) {
  json_check_type({type: "string", data: formula, should_throw: true});
  json_check_type({type: Array, data: args, should_throw: true});
  args.forEach((v) => {
    json_check_type({type: "number", data: v, should_throw: true});
  });
  try {
    switch (formula) {
      case MATH_FORMULA.GeodeticDistance:
        return _geodetic_distance(args[0], args[1], args[2], args[3]);
      case MATH_FORMULA.GeodeticHeading:
        return _geodetic_heading(args[0], args[1], args[2], args[3]);
      case MATH_FORMULA.GeodeticSpeed:
        return _geodetic_speed(args[0], args[1], args[2], args[3], args[4],
          args[5]);
      case MATH_FORMULA.TemperatureCelsiusToFahrenheit:
        return (args[0] * 9.0 / 5.0) + 32.0;
      case MATH_FORMULA.TemperatureCelsiusToKelvin:
        return args[0] + 273.15;
      case MATH_FORMULA.TemperatureFahrenheitToCelsius:
        return (args[0] - 32.0) * (5.0 / 9.0);
      case MATH_FORMULA.TemperatureFahrenheitToKelvin:
        return (args[0] - 32.0) * (5.0 / 9.0) + 273.15;
      case MATH_FORMULA.TemperatureKelvinToCelsius:
        return args[0] - 273.15;
      case MATH_FORMULA.TemperatureKelvinToFahrenheit:
        return (args[0] - 273.15) * (9.0 / 5.0) + 32.0;
      default:
        throw new CModuleError(CModuleError.MISUSE);
    }
  } catch (err) {
    CModuleError.handle_error(err);
    throw new CModuleError("npu_compute() error", err);
  }
}

// ============================================================================
// [RUNTIME USE CASE] =========================================================
// ============================================================================

// [ENUMS] --------------------------------------------------------------------

/**
 * Determines if a particular object, function, or feature is available
 * within the current runtime supporting the {@link runtime_available}
 * function.
 * @readonly
 * @enum {string}
 * @property {string} AskRuntime When performing a search for a specific
 * definition on a particular object or globalThis namespace.
 * @property {string} Audio Determines if audio is available in the
 * runtime.
 * @property {string} Beacon Determines if the network_beacon is available
 * to the runtime.
 * @property {string} BroadcastChannel Determines if a BroadcastChannel
 * protocol is available.
 * @property {string} Browser Determine if the runtime is a Web Browser.
 * @property {string} Bluetooth Determines if bluetooth is available.
 * @property {string} CookieStore Determines if cookie store is
 * available to the runtime.
 * @property {string} EventSource Determines if an EventSource protocol
 * is available.
 * @property {string} IFrame Determines if a web site is running under
 * an iframe or not.
 * @property {string} LocalStorage Determines if local storage is
 * available to the runtime.
 * @property {string} Midi Determines if MIDI devices are available.
 * @property {string} Open Determines if ui_open is available to the
 * runtime.
 * @property {string} Orientation Determines if Orientation is available
 * (i.e. GPS and 3D space device orientation.)
 * @property {string} Print Determines if the print function exists on
 * globalThis or not.
 * @property {string} Pwa Determines if the browser window represents an
 * installed Progressive Web Application.
 * @property {string} SerialPort Determines if SerialPort protocols are
 * available.
 * @property {string} SecureContext indicating whether the current context
 * is secure (true) or not (false).
 * @property {string} Share Determines if sharing is available to the
 * runtime.
 * @property {string} SessionStorage Determines if session storage is
 * available to the runtime.
 * @property {string} TextToSpeech Determines if text-to-speech is
 * available to the runtime.
 * @property {string} TouchEnabled Identifies if the browser is accessible
 * via a touch device.
 * @property {string} Usb Determines if USB is available to the runtime.
 * @property {string} Vibrate Determines if the vibrate function is
 * available to the runtime.
 * @property {string} WebRTC Determines if WebRTC is available to the
 * runtime.
 * @property {string} WebSocket Determines if WebSocket is available to the
 * runtime.
 * @property {string} WebTransport Determines if WebTransport is available to
 * the runtime.
 * @property {string} WorkerAvailable Determines if a Worker can be created
 * with the runtime.
 * @property {string} WorkerRuntime Determines if the runtime is a Worker
 * runtime.
 */
export const AVAILABILITY_REQUEST = Object.freeze({
  AskRuntime: "ask_runtime",
  Audio: "audio",
  Beacon: "beacon",
  BroadcastChannel: "broadcast_channel",
  Browser: "browser",
  Bluetooth: "bluetooth",
  CookieStore: "cookie_store",
  EventSource: "event_source",
  IFrame: "iframe",
  LocalStorage: "local_storage",
  Midi: "midi",
  Open: "open",
  Orientation: "orientation",
  Print: "print",
  Pwa: "pwa",
  SerialPort: "serial_port",
  SecureContext: "secure_context",
  SessionStorage: "session_storage",
  Share: "share",
  TextToSpeech: "text_to_speech",
  TouchEnabled: "touch_enabled",
  Usb: "usb",
  Vibrate: "vibrate",
  WebRTC: "web_rtc",
  WebSocket: "web_socket",
  WebTransport: "web_transport",
  WorkerAvailable: "worker_available",
  WorkerRuntime: "worker_runtime",
});

/**
 * Provides the request actions of the {@link runtime_event} function.
 * @readonly
 * @enum {string}
 * @property {string} Add Will provide ability to add event listeners.
 * @property {string} Remove Will provide the ability to remove event
 * listeners.
 */
export const EVENT_REQUEST = Object.freeze({
  Add: "add",
  Remove: "remove",
});

// [DATA DEFINITION] ----------------------------------------------------------

// /**
//  * @private
//  */
// class CRuntimeBinding {

// }

/**
 * @callback CEventHandler The event handler utilized within a given
 * JavaScript runtime. This represents a global event handler that should
 * suffice any JavaScript event callback.
 * @param {Event} evt The event object that was triggered
 * @returns {void}
 */

// [PUBLIC API] ---------------------------------------------------------------

/**
 * Determines if a particular resources is available to the JavaScript runtime
 * the module was loaded into.
 * @param {object} params The named parameters.
 * @param {AVAILABILITY_REQUEST} params.request The item to query about the runtime.
 * @param {string} [params.name = ""] An additional name to aid in the query.
 * @param {object} [params.obj = globalThis] The object to check for a given
 * named feature. Only valid with the {@link AVAILABILITY_REQUEST.AskRuntime}
 * request.
 * @returns {boolean}
 * @example
 * // Determine if this is the Worker runtime
 * if (runtime_available({request AVAILABILITY_REQUEST.WorkerRuntime})) {
 *   // Do Worker related things.
 * }
 *
 * // Ask runtime about a particular thing globally
 * // Can also specify the obj property to check on a given object.
 * // NOTE: "serial" is predefined ask. Just using as an example.
 * if (runtime_available({
 *     request: AVAILABILITY_REQUEST.AskRuntime,
 *     name: "serial"})) {
 *   // Do serial things
 * }
 */
export function runtime_available({request, name="", obj = globalThis}) {
  /**
   * Internal lookup function.
   * @private
   * @param {object} params The named parameters.
   * @param {string} params.property The property to look up.
   * @param {object} [params.obj=globalThis] The object to check.
   * @returns  true if defined, false otherwise.
   */
  const is_available = ({property, obj = globalThis}) => {
    json_check_type({type: "object", data: obj, should_throw: true});
    json_check_type({type: "string", data: property, should_throw: true});
    let available = false;
    if (json_check_type({type: "object", data: obj})) {
      available = property in obj;
    }
    return available;
  };

  try {
    switch (request) {
      case AVAILABILITY_REQUEST.AskRuntime:
        return is_available({property: name, obj: obj});
      case AVAILABILITY_REQUEST.Audio:
        return is_available({property: "HTMLAudioElement"});
      case AVAILABILITY_REQUEST.Beacon:
        return is_available({
          property: "sendBeacon",
          obj: globalThis["navigator"]
        });
      case AVAILABILITY_REQUEST.Bluetooth:
        return is_available({property: "bluetooth",
                           obj: globalThis["navigator"]});
      case AVAILABILITY_REQUEST.BroadcastChannel:
        return is_available({property: "BroadcastChannel"});
      case AVAILABILITY_REQUEST.Browser:
        return is_available({property: "HTMLElement"}) &&
          !is_available({property: "process"}) &&
          !is_available({property: "WorkerGlobalScope"});
      case AVAILABILITY_REQUEST.CookieStore:
        return is_available({property: "cookieStore"});
      case AVAILABILITY_REQUEST.EventSource:
        return is_available({property: "EventSource"});
      case AVAILABILITY_REQUEST.LocalStorage:
        return is_available({property: "localStorage"});
      case AVAILABILITY_REQUEST.IFrame:
        try {
          if (is_available({property: "process"}) ||
              is_available({property: "WorkerGlobalScope"}))
          {
            return false;
          }
          return globalThis.self === globalThis.top;
        } catch {
          return false;
        }
      case AVAILABILITY_REQUEST.Midi:
        return is_available({
          property: "requestMIDIAccess",
          obj: globalThis["navigator"]
        });
      case AVAILABILITY_REQUEST.Open:
        return is_available({property: "open"});
      case AVAILABILITY_REQUEST.Orientation:
        return is_available({
          property: "geolocation",
          obj: globalThis["navigator"]
        });
      case AVAILABILITY_REQUEST.Print:
        return is_available({
          property: "print"
        });
      case AVAILABILITY_REQUEST.Pwa:
        return is_available({property: "matchMedia"}) &&
          globalThis.matchMedia("(display-mode: standalone)"
        ).matches;
      case AVAILABILITY_REQUEST.SecureContext:
        return is_available({property: "isSecureContext"}) &&
          globalThis.isSecureContext;
      case AVAILABILITY_REQUEST.SerialPort:
        return is_available({
          property: "serial",
          obj: globalThis["navigator"]
        });
      case AVAILABILITY_REQUEST.SessionStorage:
        return is_available({property: "sessionStorage"});
      case AVAILABILITY_REQUEST.Share:
        return is_available({
          property: "share",
          obj: globalThis["navigator"]
        });
      case AVAILABILITY_REQUEST.TextToSpeech:
        return is_available({property: "SpeechSynthesisUtterance"});
      case AVAILABILITY_REQUEST.TouchEnabled:
        return is_available({
          property: "maxTouchPoints",
          obj: globalThis["navigator"]
        }) &&
          globalThis.navigator.maxTouchPoints > 0;
      case AVAILABILITY_REQUEST.Usb:
        return is_available({
          property: "usb",
          obj: globalThis["navigator"]
        });
      case AVAILABILITY_REQUEST.Vibrate:
        return is_available({
          property: "vibrate",
          obj: globalThis["navigator"]
        });
      case AVAILABILITY_REQUEST.WebRTC:
        return is_available({property: "RTCPeerConnection"});
      case AVAILABILITY_REQUEST.WebSocket:
        return is_available({property: "WebSocket"});
      case AVAILABILITY_REQUEST.WebTransport:
        return is_available({property: "WebTransport"});
      case AVAILABILITY_REQUEST.WorkerAvailable:
        return is_available({property: "Worker"});
      case AVAILABILITY_REQUEST.WorkerRuntime:
        return is_available({property: "WorkerGlobalScope"});
      default:
        throw new CModuleError(CModuleError.MISUSE);
    }
  } catch (err) {
    CModuleError.handle_error(err);
    throw new CModuleError("runtime_available() error.", err);
  }
}

/**
 * Adds or removes an event handler to the JavaScript runtime or
 * individual element.
 * @param {object} params The named parameters.
 * @param {EVENT_REQUEST} params.request The request to carry out.
 * @param {string} params.type The event handler identifier.
 * @param {CEventHandler} params.handler The
 * handler called when the identified event is triggered or being removed.
 * @param {EventTarget} [params.target=globalThis] The element to attach an
 * event handler to if it supports it.
 * @returns {void}
 * @example
 * // Listen for browser messages.
 * let message_handler = (evt) => {
 *   // Does something
 * };
 * runtime_event({
 *   request: EVENT_REQUEST.Add,
 *   type: "message",
 *   handler: message_handler,
 * });
 *
 * // Then on app cleanup, remove the listener
 * runtime_event({
 *   request: EVENT_REQUEST.Remove,
 *   type: "message",
 *   handler: message_handler,
 * });
 */
export function runtime_event({
  request,
  type,
  handler,
  target = globalThis,
}) {
  try {
    const supported = runtime_available({
      request: AVAILABILITY_REQUEST.AskRuntime,
      name: "addEventListener",
      obj: target
    });
    if (!supported) {
      throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
    }
    json_check_type({type: "string", data: type, should_throw: true});
    json_check_type({
      type: "function",
      data: handler,
      count: 1,
      should_throw: true
    });
    if (request === "add") {
      target.addEventListener(type, handler);
    } else if (request === "remove") {
      target.removeEventListener(type, handler);
    } else {
      throw new CModuleError(CModuleError.MISUSE);
    }
  } catch (err) {
    CModuleError.handle_error(err);
    throw new CModuleError("runtime_event() error.", err);
  }
}

// TODO: add other queryable elements from
//       along with things from other items.
// export function runtime_query({request, name}) {
//   try {
//     switch (request) {
//       case DOCUMENT_REQUEST.Environment:
//         return (new URLSearchParams(
//           globalThis.location.search)
//         ).get(name);
//     }
//   } catch (err) {
//     CModuleError.handle_error(err);
//     throw new CModuleError("storage_get() error.", err);
//   }
// }

// ============================================================================
// [STORAGE USE CASE] =========================================================
// ============================================================================

// [ENUMS] --------------------------------------------------------------------

/**
 * Provides the {@link storage_clear}, {@link storage_get},
 * {@link storage_key}, {@link storage_length}, {@link storage_remove}, and
 * {@link storage_set} calls.
 * @readonly
 * @enum {string}
 * @property {string} Cookie To utilize cookies as the storage method.
 * @property {string} Local To utilize local storage which lives once a
 * session is closed.
 * @property {string} Session To utilize session storage which clears once
 * a session is closed.
 */
export const STORAGE_TYPE = Object.freeze({
  Cookie: "cookie",
  Local: "local",
  Session: "session",
});

// [PUBLIC API] ---------------------------------------------------------------

/**
 * Clears the local storage of the module.
 * @param {STORAGE_TYPE} [type=STORAGE_TYPE.Local] The storage to act upon.
 * @returns {Promise<void>} A rejected promise represents an API violation.
 * @example
 * // Make sure it is available to the runtime.
 * if (runtime_available({request: AVAILABILITY_REQUEST.Local})) {
 *   // To clear all elements in the specified storage type
 *   // Defaults to STORAGE_TYPE.Local
 *   await storage_clear();
 *   // To specify type
 *   await storage_clear(STORAGE_TYPE.Session);
 * }
 */
export async function storage_clear(type = STORAGE_TYPE.Local) {
  try {
    switch (type) {
      case STORAGE_TYPE.Cookie: {
          if (!runtime_available({request: AVAILABILITY_REQUEST.CookieStore})) {
            throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
          }
          const cookies = await globalThis.cookieStore.getAll();
          for (const cookie of cookies) {
            const name = cookie.name;
            if (name) {
              await globalThis.cookieStore.delete(name);
            }
          }
          break;
        }
      case STORAGE_TYPE.Local:
        if (!runtime_available({request: AVAILABILITY_REQUEST.LocalStorage})) {
          throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
        }
        globalThis.localStorage.clear();
        break;
      case STORAGE_TYPE.Session:
        if (!runtime_available({request: AVAILABILITY_REQUEST.SessionStorage})) {
          throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
        }
        globalThis.sessionStorage.clear();
        break;
      default:
        throw new CModuleError(CModuleError.MISUSE);
    }
  } catch (err) {
    CModuleError.handle_error(err);
    throw new CModuleError("storage_clear() error.", err);
  }
}

/**
 * Gets the value associated with the key from the module's local storage.
 * @param {object} params The named parameters.
 * @param {STORAGE_TYPE} [params.type=STORAGE_TYPE.Local] The storage to act
 * upon.
 * @param {string} params.key The key to search.
 * @returns {Promise<string?>} The value associated with the key if found. A
 * rejected promise represents an API violation.
 * @example
 * // Make sure it is available to the runtime.
 * if (runtime_available({request: AVAILABILITY_REQUEST.Local})) {
 *   // To get an element from storage. Either string or null if not found
 *   // Defaults to STORAGE_TYPE.Local
 *   let value = await storage_get({key: "cool"});
 *   // To specify type
 *   let value = await storage_get({type: STORAGE_TYPE.Session, key: "cool"});
 * }
 */
export async function storage_get({type = STORAGE_TYPE.Local, key}) {
  try {
    json_check_type({type: "string", data: key, should_throw: true});
    switch (type) {
      case STORAGE_TYPE.Cookie: {
        if (!runtime_available({request: AVAILABILITY_REQUEST.CookieStore})) {
          throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
        }
        const entry = await globalThis.cookieStore.get(key)
        return entry
          ? entry.value != undefined
            ? entry.value
            : null
          : null;
      }
      case STORAGE_TYPE.Local:
        if (!runtime_available({request: AVAILABILITY_REQUEST.LocalStorage})) {
          throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
        }
        return globalThis.localStorage.getItem(key);
      case STORAGE_TYPE.Session:
        if (!runtime_available({request: AVAILABILITY_REQUEST.SessionStorage})) {
          throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
        }
        return globalThis.sessionStorage.getItem(key);
      default:
        throw new CModuleError(CModuleError.MISUSE);
    }
  } catch (err) {
    CModuleError.handle_error(err);
    throw new CModuleError("storage_get() error.", err);
  }
}

/**
 * Retrieves the key at the specified index.
 * @param {object} params The named parameters
 * @param {STORAGE_TYPE} [params.type=STORAGE_TYPE.Local] The storage to act
 * upon.
 * @param {number} params.index The key entry to look up.
 * @returns {Promise<string?>} The key at the specified index or null if
 * beyond the storage capacity. A rejected promise represents an API
 * violation.
 * @example
 * // Make sure it is available to the runtime.
 * if (runtime_available({request: AVAILABILITY_REQUEST.Local})) {
 *   // To get a key at an index. Either string or null if not found
 *   // Defaults to STORAGE_TYPE.Local
 *   let key = await storage_key({index: 0});
 *   // To specify type
 *   let key = await storage_key({type: STORAGE_TYPE.Session, index: 0});
 * }
 */
export async function storage_key({type = STORAGE_TYPE.Local, index}) {
  try {
    json_check_type({type: "number", data: index, should_throw: true});
    switch (type) {
      case STORAGE_TYPE.Cookie: {
        if (!runtime_available({request: AVAILABILITY_REQUEST.CookieStore})) {
          throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
        }
        const cookies = await globalThis.cookieStore.getAll();
        const key = cookies.at(index)?.name;
        return key != undefined
          ? key
          : null;
      }
      case STORAGE_TYPE.Local:
        if (!runtime_available({request: AVAILABILITY_REQUEST.LocalStorage})) {
          throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
        }
        return index < globalThis.localStorage.length
          ? globalThis.localStorage.key(index)
          : null;
      case STORAGE_TYPE.Session:
        if (!runtime_available({request: AVAILABILITY_REQUEST.SessionStorage})) {
          throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
        }
        return index < globalThis.sessionStorage.length
          ? globalThis.sessionStorage.key(index)
          : null;
      default:
        throw new CModuleError(CModuleError.MISUSE);
    }
  } catch (err) {
    CModuleError.handle_error(err);
    throw new CModuleError("storage_key() error.", err);
  }
}

/**
 * Retrieves the number of entries within the module's local storage.
 * @param {STORAGE_TYPE} [type=STORAGE_TYPE.Local] The storage to act
 * upon.
 * @returns {Promise<number>} The number in storage. A rejected promise
 * represents an API violation.
 * @example
 * // Make sure it is available to the runtime.
 * if (runtime_available({request: AVAILABILITY_REQUEST.Local})) {
 *   // To get the number of elements in storage
 *   // Assumes no errors with the CResult.
 *   // Defaults to STORAGE_TYPE.Local
 *   let length = await storage_length());
 *   // To specify type
 *   let length = await storage_length(type: STORAGE_TYPE.Session));
 * }
 */
export async function storage_length(type = STORAGE_TYPE.Local) {
  try {
    switch (type) {
      case STORAGE_TYPE.Cookie:
        if (!runtime_available({request: AVAILABILITY_REQUEST.CookieStore})) {
          throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
        }
        return (await globalThis.cookieStore.getAll()).length;
      case STORAGE_TYPE.Local:
        if (!runtime_available({request: AVAILABILITY_REQUEST.LocalStorage})) {
          throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
        }
        return globalThis.localStorage.length;
      case STORAGE_TYPE.Session:
        if (!runtime_available({request: AVAILABILITY_REQUEST.SessionStorage})) {
          throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
        }
        return globalThis.sessionStorage.length;
      default:
        throw new CModuleError(CModuleError.MISUSE);
    }
  } catch (err) {
    CModuleError.handle_error(err);
    throw new CModuleError("storage_length() error.", err);
  }
}

/**
 * Removes a given entry from the module's local storage.
 * @param {object} params The named parameters.
 * @param {STORAGE_TYPE} [params.type=STORAGE_TYPE.Local] The storage to act
 * upon.
 * @param {string} params.key The key to remove.
 * @returns {Promise<void>} Rejected promise represents an API violation.
 * @example
 * // Make sure it is available to the runtime.
 * if (runtime_available({request: AVAILABILITY_REQUEST.Local})) {
 *   // To remove an element from storage.
 *   // Defaults to STORAGE_TYPE.Local
 *   await storage_remove({key: "cool"});
 *   // To specify type
 *   await storage_remove({type: STORAGE_TYPE.Session, key: "cool"});
 * }
 */
export async function storage_remove({type = STORAGE_TYPE.Local, key}) {
  try {
    json_check_type({type: "string", data: key, should_throw: true});
    switch (type) {
      case STORAGE_TYPE.Cookie:
        if (!runtime_available({request: AVAILABILITY_REQUEST.CookieStore})) {
          throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
        }
        // @ts-ignore
        await globalThis.cookieStore.delete(key, value);
        break;
      case STORAGE_TYPE.Local:
        if (!runtime_available({request: AVAILABILITY_REQUEST.LocalStorage})) {
          throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
        }
        globalThis.localStorage.removeItem(key);
        break;
      case STORAGE_TYPE.Session:
        if (!runtime_available({request: AVAILABILITY_REQUEST.SessionStorage})) {
          throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
        }
        globalThis.sessionStorage.removeItem(key);
        break;
      default:
        throw new CModuleError(CModuleError.MISUSE);
    }
  } catch (err) {
    CModuleError.handle_error(err);
    throw new CModuleError("storage_remove() error.", err);
  }
}

/**
 * Sets a key/value pair within the module's local storage.
 * @function codemelted.storage_set
 * @param {object} params The named parameters
 * @param {STORAGE_TYPE} [params.type=STORAGE_TYPE.Local] The storage to act
 * upon.
 * @param {string} params.value The storage entry.
 * @param {string} params.key The key to store.
 * @returns {Promise<void>} Rejected promise represents an API violation.
 * @example
 * // Make sure it is available to the runtime.
 * if (runtime_available({request: AVAILABILITY_REQUEST.Local})) {
 *   // To add an element to storage.
 *   // Defaults to STORAGE_TYPE.Local
 *   await storage_set({key: "cool", value: "guy"});
 *   // To specify type
 *   await storage_set({type: STORAGE_TYPE.Session, key: "cool", value: "guy"});
 * }
 */
export async function storage_set({type = STORAGE_TYPE.Local, key, value}) {
  try {
    json_check_type({type: "string", data: key, should_throw: true});
    json_check_type({type: "string", data: value, should_throw: true});
    switch (type) {
      case STORAGE_TYPE.Cookie:
        if (!runtime_available({request: AVAILABILITY_REQUEST.CookieStore})) {
          throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
        }
        await globalThis.cookieStore.set(key, value);
        break;
      case STORAGE_TYPE.Local:
        if (!runtime_available({request: AVAILABILITY_REQUEST.LocalStorage})) {
          throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
        }
        globalThis.localStorage.setItem(key, value);
        break;
      case STORAGE_TYPE.Session:
        if (!runtime_available({request: AVAILABILITY_REQUEST.SessionStorage})) {
          throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
        }
        globalThis.sessionStorage.setItem(key, value);
        break;
      default:
        throw new CModuleError(CModuleError.MISUSE);
    }
  } catch (err) {
    CModuleError.handle_error(err);
    throw new CModuleError("storage_set() error.", err);
  }
}

// ============================================================================
// [UI USE CASE] ==============================================================
// ============================================================================

// [ENUMS] --------------------------------------------------------------------

/**
 * Provides the request actions for the {@link ui_action} function call.
 * @readonly
 * @enum {string}
 * @property {string} Copy Copies the specified text to the system clipboard.
 * @property {string} Focus Makes a request to bring the window to the
 * front. It may fail due to user settings and the window isn't guaranteed
 * to be front most before this method returns.
 * @property {string} MoveBy moves the current window by a specified
 * amount.
 * @property {string} MoveTo moves the current window to the specified
 * coordinates.
 * @property {string} Paste Retrieves the data from the system clipboard.
 * @property {string} PostMessage Posts a message to another window in
 * the browser context.
 * @property {string} Print Opens the print dialog to print the current
 * document.
 * @property {string} ResizeBy resizes the current window by a specified
 * amount.
 * @property {string} ResizeTo dynamically resizes the window.
 * @property {string} Scroll scrolls the window to a particular place in
 * the document.
 * @property {string} ScrollBy scrolls the document in the window by the
 * given amount.
 * @property {string} ScrollTo scrolls to a particular set of coordinates
 * in the document.
 * @property {string} Share invokes the native sharing mechanism of the
 * device to share data such as text, URLs, or files. The available share
 * targets depend on the device, but might include the clipboard, contacts
 * and email applications, websites, Bluetooth, etc.
 * @property {string} Vibrate Most modern mobile devices include vibration
 * hardware, which lets software code provide physical feedback to the user
 * by causing the device to shake. The Vibration API offers Web apps the
 * ability to access this hardware, if it exists, and does nothing if the
 * device doesn't support it.
 */
export const ACTION_REQUEST = Object.freeze({
  Copy: "copy",
  Focus: "focus",
  MoveBy: "move_by",
  MoveTo: "move_to",
  Paste: "paste",
  PostMessage: "post_message",
  Print: "print",
  ResizeBy: "resize_by",
  ResizeTo: "resize_to",
  Scroll: "scroll",
  ScrollBy: "scroll_by",
  ScrollTo: "scroll_to",
  Share: "share",
  Vibrate: "vibrate",
});

/**
 * Provides a {@link ui_document} to interact with the loaded HTML document.
 * @readonly
 * @enum {string}
 * @property {string} CssVariable Will query the document for a CSS variable.
 * @property {string} ElementById Will query the document for a particular
 * HTMLElement.
 * @property {string} ElementsByClassName Will query for a collection of
 * HTMLElements by class name.
 * @property {string} ElementsByTagName Will query for a collection of
 * HTMLElements by tag name.
 */
export const DOCUMENT_REQUEST = Object.freeze({
  CssVariable: "css_variable",
  ElementById: "element_by_id",
  ElementsByClassName: "elements_by_class_name",
  ElementsByTagName: "elements_by_tag_name",
});

/**
 * @private UNDER DEVELOPMENT
 * Provides the request actions of the {@link ui_notify} function.
 * @readonly
 * @enum {string}
 * @property {string} Alert Alert a user to a condition.
 * @property {string} Choose Provides a selection to the user.
 * @property {string} Close Closes any given prompt to the user.
 * @property {string} Confirm Get confirmation from a user.
 * @property {string} Custom Provides a custom notification mechanism to the
 * user.
 * @property {string} Prompt Prompt the user for input.
 * @property {string} SnackBar Tell the user something happened passively.
 * @property {string} SystemNotification Provides an operating system
 * notification even when the page is not active. Requires permission to be
 * granted to the website.
 * @property {string} Wait Tell the user to wait for an action to complete.
 */
export const NOTIFY_REQUEST = Object.freeze({
  Alert: "alert",
  Choose: "choose",
  Close: "close",
  Confirm: "confirm",
  Custom: "custom",
  Prompt: "prompt",
  SnackBar: "snack_bar",
  SystemNotification: "system_notification",
  Wait: "wait",
});

/**
 * Identifies the schema to {@link ui_open} with the browser desktop
 * services.
 * @readonly
 * @enum {string}
 * @property {string} File Opens an item via the file protocol.
 * @property {string} Http Opens a web resource with the HTTP protocol.
 * @property {string} Https Same as Http but with security.
 * @property {string} Mailto Opens the default mail provider.
 * @property {string} Sms Opens the standard app for texting.
 * @property {string} Tel Opens the default calling application.
 */
export const SCHEMA_TYPE = Object.freeze({
  File: "file:",
  Http: "http://",
  Https: "https://",
  Mailto: "mailto:",
  Sms: "sms:",
  Tel: "tel:",
});

/**
 * Provides a {@link ui_screen} request to learn about the different device
 * screen information.
 * @readonly
 * @enum {string}
 * @property {string} AvailableHeight the height of the screen, in pixels,
 * minus permanent or semipermanent user interface features displayed by
 * the operating system, such as the Taskbar on Windows.
 * @property {string} AvailableWidth the amount of horizontal space in
 * pixels available to the window.
 * @property {string} ColorDepth the color depth of the screen.
 * @property {string} DevicePixelRatio the ratio of the resolution in
 * physical pixels to the resolution in CSS pixels for the current display
 * device.
 * @property {string} Height the height of the screen in pixels.
 * @property {string} InnerHeight the interior height of the window in
 * pixels, including the height of the horizontal scroll bar, if present.
 * @property {string} InnerWidth interior width of the window in pixels
 * (that is, the width of the window's layout viewport). That includes the
 * width of the vertical scroll bar, if one is present.
 * @property {string} OuterHeight the height in pixels of the whole browser
 * window, including any sidebar, window chrome, and window-resizing
 * borders/handles.
 * @property {string} OuterWidth the width of the outside of the browser
 * window. It represents the width of the whole browser window including
 * sidebar (if expanded), window chrome and window resizing borders /
 * handles.
 * @property {string} PixelDepth the bit depth of the screen.
 * @property {string} ScreenLeft the horizontal distance, in CSS pixels,
 * from the left border of the user's browser viewport to the left side of
 * the screen.
 * @property {string} ScreenOrientationAngle the document's current
 * orientation angle.
 * @property {string} ScreenOrientationType the document's current
 * orientation type, one of portrait-primary, portrait-secondary,
 * landscape-primary, or landscape-secondary.
 * @property {string} ScreenTop the vertical distance, in CSS pixels, from
 * the top border of the user's browser viewport to the top side of the
 * screen.
 * @property {string} ScreenX the horizontal distance, in CSS pixels, of the
 * left border of the user's browser viewport to the left side of the
 * screen.
 * @property {string} ScreenY the vertical distance, in CSS pixels, of the
 * top border of the user's browser viewport to the top edge of the screen.
 * @property {string} ScrollX the number of pixels by which the document is
 * currently scrolled horizontally. This value is subpixel precise in modern
 * browsers, meaning that it isn't necessarily a whole number.
 * @property {string} ScrollY the number of pixels by which the document is
 * currently scrolled vertically. This value is subpixel precise in modern
 * browsers, meaning that it isn't necessarily a whole number.
 * @property {string} Width the width of the screen.
 */
export const SCREEN_REQUEST = Object.freeze({
  AvailableHeight: "available_height",
  AvailableWidth: "available_width",
  ColorDepth: "color_depth",
  CssVariable: "css_variable",
  DevicePixelRatio: "device_pixel_ratio",
  Height: "height",
  InnerHeight: "inner_height",
  InnerWidth: "inner_width",
  OuterHeight: "outer_height",
  OuterWidth: "outer_width",
  PixelDepth: "pixel_depth",
  ScreenLeft: "screen_left",
  ScreenOrientationAngle: "screen_orientation_angle",
  ScreenOrientationType: "screen_orientation_type",
  ScreenTop: "screen_top",
  ScreenX: "screen_x",
  ScreenY: "screen_y",
  ScrollX: "scroll_x",
  ScrollY: "scroll_y",
  Width: "width",
});

/**
 * Supports the target parameter of the {@link ui_open} action which handles
 * opening related apps based on the specified {@link SCHEMA_TYPE}.
 * @readonly
 * @enum {string}
 * @property {string} Blank Opens the linked document in a new window or tab
 * @property {string} Parent Opens the linked document in the same frame as
 * it was clicked (this is default)
 * @property {string} Self Opens the linked document in the parent frame
 * @property {string} Top Opens the linked document in the full body of the
 * window
 */
export const TARGET_TYPE = Object.freeze({
  Blank: "_blank",
  Parent: "_parent",
  Self: "_self",
  Top: "_top",
});

// [PROTOCOL IMPLEMENTATION] --------------------------------------------------

// /**
//  * <mark>UNDER DEVELOPMENT</mark>
//  * @private
//  * @template T
//  * @extends {CProtocol<T>}
//  */
// class CAudioProtocol extends CProtocol {

// }

// /**
//  * <mark>UNDER DEVELOPMENT</mark>
//  * @template T
//  * @extends {CProtocol<T>}
//  */
// class CGamepadProtocol extends CProtocol {

// }

// /**
//  * <mark>UNDER DEVELOPMENT</mark>
//  * @private
//  * @template T
//  * @extends {CProtocol<T>}
//  */
// class CTextToSpeechProtocol extends CProtocol {

// }

// [PUBLIC API] ---------------------------------------------------------------

/**
 * Provides the ability to carry out actions with the open browser window.
 * @param {object} params The named parameters.
 * @param {ACTION_REQUEST} params.request The enumerated value to carry
 * out with the open browser window.
 * @param {object | string} [params.data] The optional object data associated
 * with the {@link ACTION_REQUEST.Share} or {@link ACTION_REQUEST.PostMessage}
 * requests or string data for the  {@link ACTION_REQUEST.Copy} option.
 * @param {string} [params.target_origin="*"] Specifies the target origin
 * when posting a message to a window or frame.
 * @param {number[]} [params.pattern] Provides a pattern of vibration and
 * pause intervals. Each value indicates a number of milliseconds to
 * vibrate or pause, in alternation.
 * @param {number} [params.x] An X coordinate or delta coordinate for a
 * given action that moves / sets position of the browser window or item
 * on the browser window.
 * @param {number} [params.y] An X coordinate or delta coordinate for a
 * given action that moves / sets position of the browser window or item
 * on the browser window.
 * @returns {Promise<CResult<string | boolean | null>>} Reflecting success
 * or failure of the given request. A rejected promise is an API violation.
 * @example
 * // TBD
 */
export async function ui_action({
  request,
  data,
  target_origin="*",
  pattern=[],
  x,
  y
}) {
  try {
    let value = null;
    switch (request) {
      case ACTION_REQUEST.Copy:
        json_check_type({type: "string", data: data, should_throw: true});
        // @ts-ignore
        await globalThis.navigator.clipboard.writeText(data);
        break;
      case ACTION_REQUEST.Focus:
        globalThis.focus();
        break;
      case ACTION_REQUEST.MoveBy:
        json_check_type({type: "number", data: x, should_throw: true});
        json_check_type({type: "number", data: y, should_throw: true});
        // @ts-ignore
        globalThis.moveBy(x, y);
        break;
      case ACTION_REQUEST.MoveTo:
        json_check_type({type: "number", data: x, should_throw: true});
        json_check_type({type: "number", data: y, should_throw: true});
        // @ts-ignore
        globalThis.moveTo(x, y);
        break;
      case ACTION_REQUEST.Paste:
        value = await globalThis.navigator.clipboard.readText();
        break;
      case ACTION_REQUEST.PostMessage:
        globalThis.postMessage(data, target_origin);
        break;
      case ACTION_REQUEST.Print:
        globalThis.print();
        break;
      case ACTION_REQUEST.ResizeBy:
        json_check_type({type: "number", data: x, should_throw: true});
        json_check_type({type: "number", data: y, should_throw: true});
        // @ts-ignore
        globalThis.resizeBy(x, y);
        break;
      case ACTION_REQUEST.ResizeTo:
        json_check_type({type: "number", data: x, should_throw: true});
        json_check_type({type: "number", data: y, should_throw: true});
        // @ts-ignore
        globalThis.resizeTo(x, y);
        break;
      case ACTION_REQUEST.Scroll:
        json_check_type({type: "number", data: x, should_throw: true});
        json_check_type({type: "number", data: y, should_throw: true});
        // @ts-ignore
        globalThis.scroll(x, y);
        break;
      case ACTION_REQUEST.ScrollBy:
        json_check_type({type: "number", data: x, should_throw: true});
        json_check_type({type: "number", data: y, should_throw: true});
        // @ts-ignore
        globalThis.scrollBy(x, y);
        break;
      case ACTION_REQUEST.ScrollTo:
        json_check_type({type: "number", data: x, should_throw: true});
        json_check_type({type: "number", data: y, should_throw: true});
        // @ts-ignore
        globalThis.scrollTo(x, y);
        break;
      case ACTION_REQUEST.Share:
        if (!runtime_available({request: AVAILABILITY_REQUEST.Share})) {
          throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
        }
        // @ts-ignore
        await globalThis.navigator.share(data);
        break;
      case ACTION_REQUEST.Vibrate:
        if (!runtime_available({request: AVAILABILITY_REQUEST.Vibrate})) {
          throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
        }
        json_check_type({type: Array, data: pattern, should_throw: true});
        value = globalThis.navigator.vibrate(pattern);
        break;
      default:
        throw new CModuleError(CModuleError.MISUSE);
    }
    return new CResult({value: value});
  } catch (err) {
    if (json_check_type({type: CModuleError, data: err})) {
      CModuleError.handle_error(err);
      throw new CModuleError("runtime_action() error.", err);
    }
    return new CResult({error: err});
  }
}

/**
 * Provides the ability to interact with the loaded browser runtime HTML
 * document.
 * @param {object} params The named parameters
 * @param {DOCUMENT_REQUEST} params.request The request to carry out with
 * the document.
 * @param {string} params.name The name of the element to perform the action.
 * @returns {HTMLElement | HTMLElement[] | string | null}
 * @example
 * // To query for an element within the document. Not being found will fire
 * // a CModuleError so no need to check for null as it is expected you should
 * // know how to name your stuff. This will help in quickly finding quirks in
 * // your built UI.
 * const el = ui_document({
 *  request: DOCUMENT_REQUEST.ElementById,
 *  name: "id_value"
 * });
 */
export function ui_document({request, name}) {
  try {
    if (!runtime_available({request: AVAILABILITY_REQUEST.Browser})) {
      throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
    }
    switch (request) {
      case DOCUMENT_REQUEST.CssVariable: {
        const cs = globalThis.window.getComputedStyle(
          globalThis.document.documentElement
        );
        return cs.getPropertyValue(name) ?? "";
      }
      case DOCUMENT_REQUEST.ElementById: {
        const el = globalThis.document.getElementById(name);
        if (!el) {
          throw new CModuleError(CModuleError.MISUSE + name + " not found");
        }
        return el;
      }
      case DOCUMENT_REQUEST.ElementsByClassName: {
        const col1 = globalThis.document.getElementsByClassName(name);
        if (col1.length === 0) {
          throw new CModuleError(CModuleError.MISUSE + name + " not found");
        }
        // @ts-ignore
        return Array.from(col1);
      }
      case DOCUMENT_REQUEST.ElementsByTagName: {
        const col2 = globalThis.document.getElementsByTagName(name);
        if (col2.length === 0) {
          throw new CModuleError(CModuleError.MISUSE + name + " not found");
        }
        // @ts-ignore
        return Array.from(col2);
      }
      default:
        throw new CModuleError(CModuleError.MISUSE);
    }
  } catch (err) {
    CModuleError.handle_error(err);
    throw new CModuleError("ui_document() error.", err);
  }
}

/**
 * @private UNDER DEVELOPMENT. Needs embedded dialog.
 * Provides a mechanism for interacting with a user by gather data or
 * useful information.
 * @param {object} params The named parameters
 * @param {NOTIFY_REQUEST} params.request The request to carry out.
 * @param {string} params.message The message to associate with the request.
 * @returns {Promise<boolean | string | void>} The data associated with the
 * notification request. Any rejected promise is an API violation.
 * @example
 * // TBD
 */
export async function ui_notify({request, message}) {
  try {
    let value;
    switch (request) {
      case NOTIFY_REQUEST.Alert:
        json_check_type({type: "string", data: message, should_throw: true});
        // @ts-ignore
        globalThis.alert(data);
        break;
      case NOTIFY_REQUEST.Confirm:
        json_check_type({type: "string", data: message, should_throw: true});
        // @ts-ignore
        value = globalThis.confirm(data);
        break;
      case NOTIFY_REQUEST.Prompt:
        json_check_type({type: "string", data: message, should_throw: true});
        // @ts-ignore
        value = globalThis.prompt(data) ?? "";
        break;
      default:
        throw new CModuleError(CModuleError.MISUSE);
    }
    return value;
  } catch (err) {
    CModuleError.handle_error(err);
    throw new CModuleError("runtime_message() error.", err);
  }
}

/**
 * Determines aspects of the Browser runtime window.
 * @param {SCREEN_REQUEST} request The aspect of the screen to query.
 * @returns {string | number} The value associated with the request.
 * @example
 * // Determine the device pixel ratio. This only works in a browser
 * // runtime
 * const pixel_ratio = ui_screen(SCREEN_REQUEST.DevicePixelRatio);
 */
export function ui_screen(request) {
  try {
    if (!runtime_available({request: AVAILABILITY_REQUEST.Browser})) {
      throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
    }
    switch (request) {
      case SCREEN_REQUEST.AvailableHeight:
        return globalThis.screen.availHeight;
      case SCREEN_REQUEST.AvailableWidth:
        return globalThis.screen.availWidth;
      case SCREEN_REQUEST.ColorDepth:
        return globalThis.screen.colorDepth;
      case SCREEN_REQUEST.DevicePixelRatio:
        return globalThis.devicePixelRatio;
      case SCREEN_REQUEST.Height:
        return globalThis.screen.height;
      case SCREEN_REQUEST.InnerHeight:
        return globalThis.innerHeight;
      case SCREEN_REQUEST.InnerWidth:
        return globalThis.innerWidth;
      case SCREEN_REQUEST.OuterHeight:
        return globalThis.outerHeight;
      case SCREEN_REQUEST.OuterWidth:
        return globalThis.outerWidth;
      case SCREEN_REQUEST.PixelDepth:
        return globalThis.screen.pixelDepth;
      case SCREEN_REQUEST.ScreenLeft:
        return globalThis.screenLeft;
      case SCREEN_REQUEST.ScreenOrientationAngle:
        return globalThis.screen.orientation.angle;
      case SCREEN_REQUEST.ScreenOrientationType:
        return globalThis.screen.orientation.type;
      case SCREEN_REQUEST.ScreenTop:
        return globalThis.screenTop;
      case SCREEN_REQUEST.ScreenX:
        return globalThis.screenX;
      case SCREEN_REQUEST.ScreenY:
        return globalThis.screenY;
      case SCREEN_REQUEST.ScrollX:
        return globalThis.scrollX;
      case SCREEN_REQUEST.ScrollY:
        return globalThis.scrollY
      case SCREEN_REQUEST.Width:
        return globalThis.screen.width
      default:
        throw new CModuleError(CModuleError.MISUSE);
    }
  } catch (err) {
    CModuleError.handle_error(err);
    throw new CModuleError("ui_screen() error.", err);
  }
}

/**
 * Opens the specified protocol to a browser window or native app
 * configured to handle the given specified schema.
 * @param {object} params The named parameters
 * @param {SCHEMA_TYPE} params.schema The schema to open.
 * @param {boolean} [params.popup_window=false] Whether to open the protocol in
 * a separate browser window.
 * @param {string} [params.url] The url of the protocol unless utilizing
 * "mailto:" schema with [params.mailtoParams] which will already be
 * formatted.
 * @param {string[]} [params.mailto=[]] The primary addresses to send the
 * email.
 * @param {string[]} [params.cc=[]] The carbon copy email addresses to send
 * the email.
 * @param {string[]} [params.bcc=[]] The people you don't want others to know
 * about on the email.
 * @param {string} [params.subject=""] The subject of the email.
 * @param {string} [params.body=""] The actual email message.
 * @param {TARGET_TYPE} [params.target=TARGET_TYPE.Self] The type of a tab
 * behavior.
 * @param {number} [params.width=900] The width of a popup window. Defaulted
 * to 900.0 when not set.
 * @param {number} [params.height=600] The height of a popup window.
 * Defaulted  to 600.0 when not set.
 * @returns {Window | null} Reference to the newly opened browser window.
 * @example
 * // Determine if open is available. It is only available within Browser's
 * // and may not be available in WebViews if your page is embedded.
 * if (runtime_available({request: AVAILABILITY_REQUEST.Open})) {
 *   // Open a website as a pop-up window. treating your site as a multi-window
 *   // type of application.
 *   const win = ui_open({
 *     schema: SCHEMA_TYPE.Https,
 *     url: "https://google.com",
 *     popup_window: true
 *   });
 * }
 */
export function ui_open({
  schema,
  popup_window = false,
  url,
  mailto = [],
  cc = [],
  bcc = [],
  subject = "",
  body = "",
  target = TARGET_TYPE.Self,
  width=900,
  height=600
}) {
  try {
    // Ensure the runtime function is available
    if (!runtime_available({request: AVAILABILITY_REQUEST.Open})) {
      throw new CModuleError(CModuleError.UNSUPPORTED_RUNTIME);
    }

    // Basic validation of runtime and required parameters.
    json_check_type({type: "boolean", data: popup_window, should_throw: true});
    json_check_type({type: "string", data: target, should_throw: true});
    json_check_type({type: "number", data: width, should_throw: true});
    json_check_type({type: "number", data: height, should_throw: true});
    json_check_type({type: Array, data: mailto, should_throw: true});
    json_check_type({type: Array, data: cc, should_throw: true});
    json_check_type({type: Array, data: bcc, should_throw: true});
    json_check_type({type: "string", data: subject, should_throw: true});
    json_check_type({type: "string", data: body, should_throw: true});

    // Now go build the URL to open.
    let url_to_launch = schema;
    if (schema === SCHEMA_TYPE.File ||
        schema === SCHEMA_TYPE.Http ||
        schema === SCHEMA_TYPE.Https ||
        schema === SCHEMA_TYPE.Sms ||
        schema === SCHEMA_TYPE.Tel) {
      json_check_type({type: "string", data: url, should_throw: true});
      url_to_launch += url?.replace(SCHEMA_TYPE.File, "")
        .replace(SCHEMA_TYPE.Http, "")
        .replace(SCHEMA_TYPE.Https, "")
        .replace(SCHEMA_TYPE.Sms, "")
        .replace(SCHEMA_TYPE.Tel, "");
    } else if (schema === "mailto:") {
      if (url) {
        json_check_type({type: "string", data: url, should_throw: true});
        url_to_launch += url.replace(SCHEMA_TYPE.Mailto, "");
      } else {
        // Form the mailto parameters to better control the URL formatting.
        if (mailto.length > 0) {
          mailto.forEach((addr) => {
            url_to_launch += `${addr};`;
          });
          url_to_launch.substring(0, url_to_launch.length - 1);
        }

        let delimiter = "?";
        if (cc.length > 0) {
          url_to_launch += `${delimiter}cc=`;
          delimiter = "&";
          cc.forEach((addr) => {
            url_to_launch += `${addr};`;
          });
          url_to_launch.substring(0, url_to_launch.length - 1);
        }

        if (bcc.length > 0) {
          url_to_launch += `${delimiter}bcc=`;
          delimiter = "&";
          bcc.forEach((addr) => {
            url_to_launch += `${addr};`;
          });
          url_to_launch.substring(0, url_to_launch.length - 1);
        }

        if (subject.trim().length > 0) {
          url_to_launch += `${delimiter}subject=${subject.trim()}`;
          delimiter = "&";
        }

        if (body.trim().length > 0) {
          url_to_launch += `${delimiter}body=${body.trim()}`;
          delimiter = "&";
        }
      }
    } else {
      throw new CModuleError(CModuleError.MISUSE);
    }

    // Determine how we are opening the item.
    if (popup_window) {
      // @ts-ignore
      const top = (ui_screen(SCREEN_REQUEST.Height) - height) / 2;
      // @ts-ignore
      const left = (ui_screen(SCREEN_REQUEST.Width) - width) / 2;
      const settings = `toolbar=no, location=no, ` +
        `directories=no, status=no, menubar=no, ` +
        `scrollbars=no, resizable=yes, copyhistory=no, ` +
        `width=${width}, height=${height}, top=${top}, left=${left}`;
      return globalThis.open(url_to_launch, "_blank", settings);
    }
    return globalThis.open(url_to_launch, target);
  } catch (err) {
    CModuleError.handle_error(err);
    throw new CModuleError("ui_open() error.", err);
  }
}

// [UI COMPONENTS] ------------------------------------------------------------

/**
 * @callback CAttributeChangeCB Callback to handle any changes in
 * observedAttributes within the base {@link CHtmlComponent} class.
 * @param {string} name The name of the observable attribute fired.
 * @param {string} old_value The old value associated with the attribute.
 * @param {string} new_value The nw value to apply to the attribute.
 * @returns {void}
 */

/**
 * @callback CHtmlComponentCB A generalized callback for the void no parameter
 * {@link CHtmlComponent} class. Allows for the constructor to define these
 * callbacks and the base class to invoke them allowing for a cleaner
 * definition of the implementing HTML custom component.
 * @returns {void}
 */

/**
 * Sets up the base class for defining custom HTMLElements to build a user
 * interface for a Single Page App (SPA) / Progressive Web App (PWA) or
 * Rust desktop / mobile TAURI app.
 * @abstract
 */
export class CHtmlComponent extends HTMLElement {
  /** @type {CHtmlComponentCB | undefined} */
  #adopted_cb;
  /** @type {CAttributeChangeCB | undefined} */
  #attribute_changed_cb;
  /** @type {CHtmlComponentCB | undefined} */
  #connected_cb;
  /** @type {CHtmlComponentCB | undefined} */
  #connected_move_cb;
  /** @type {CHtmlComponentCB | undefined} */
  #disconnected_cb;
  /** @type {ShadowRoot | undefined} */
  #shadow_root;

  /**
   * Provides access to the shadow DOM for constructing the custom component.
   * @protected
   * @returns {ShadowRoot}
   */
  shadow_root() {
    try {
      if (!this.#shadow_root) {
        throw new CModuleError(
          `${CModuleError.MISUSE} mode was open so shadow_root was null`
        );
      }
      return this.#shadow_root;
    } catch (err) {
      CModuleError.handle_error(err);
      throw err;
    }
  }

  /**
   *
   * @param {string} name
   * @returns
   */
  has_attribute(name) {
    return this.hasAttribute(name);
  }

  /**
   * The set_attribute() method of the Element interface sets the value of
   * an attribute on the specified element. If the attribute already exists,
   * the value is updated; otherwise a new attribute is added with the
   * specified name and value.
   * @param {string} name A string containing the qualified name of the
   * attribute whose value is to be set. The attribute name is automatically
   * converted to all lower-case when set_attribute() is called on an HTML
   * element in an HTML document.
   * @param {string} value A trusted type or string containing the value
   * to assign to the attribute.
   */
  set_attribute(name, value) {
    this.setAttribute(name, value);
  }

  /**
   * The get_attribute() method of the Element interface returns the
   * string value of the specified attribute of the specified element. It
   * returns null if the element doesn't have an attribute with the given
   * name.
   * @param {string} name A string specifying the name of the attribute. When
   * called on an HTML element in a DOM flagged as an HTML document, the name
   * is normalized to lowercase.
   * @returns {string | null} A string containing the attribute's value,
   * or null if the element doesn't have an attribute with the given name.
   */
  get_attribute(name) {
    return this.getAttribute(name);
  }

  /**
   * Called each time the element is moved to a new document.
   * @returns {void}
   */
  adoptedCallback() { this.#adopted_cb?.(); }

  /**
   * Called when attributes are changed, added, removed, or replaced.
   * @param {string} name The name of a observedAttributes allowing access
   * into the internals of the custom component.
   * @param {string} old_value The original value held by the attribute.
   * @param {string} new_value The new value to apply.
   * @returns {void}
   */
  attributeChangedCallback(name, old_value, new_value) {
    try {
      this.#attribute_changed_cb?.(name, old_value, new_value);
    } catch (err) {
      CModuleError.handle_error(err);
      throw new CModuleError("attributeChangedCallback() error.", err);
    }
  }

  /**
   * Called each time the element is added to the document. The specification
   * recommends that, as far as possible, developers should implement custom
   * element setup in this callback rather than the constructor.
   * @returns {void}
   */
  connectedCallback() {
    try {
      this.#connected_cb?.();
    } catch (err) {
      CModuleError.handle_error(err);
      throw new CModuleError("connectedCallback() error.", err);
    }
  }

  /**
   * When defined, this is called instead of connectedCallback() and
   * disconnectedCallback() each time the element is moved to a different
   * place in the DOM via Element.moveBefore(). Use this to avoid running
   * initialization/cleanup code in the connectedCallback() and
   * disconnectedCallback() callbacks when the element is not actually
   * being added to or removed from the DOM. See Lifecycle callbacks and
   * state-preserving moves for more details.
   * @returns {void}
   */
  connectedMoveCallback() {
    try {
      this.#connected_move_cb?.();
    } catch (err) {
      CModuleError.handle_error(err);
      throw new CModuleError("connectedMoveCallback() error.", err);
    }
  }

  /**
   * Called each time the element is removed from the document.
   * @returns {void}
   */
  disconnectedCallback() {
    try {
      this.#disconnected_cb?.();
    } catch (err) {
      CModuleError.handle_error(err);
      throw new CModuleError("disconnectedCallback() error.", err);
    }
  }

  /**
   * Forces a refresh of the component.
   * @returns {void}
   */
  refresh() {
    const display = this.style.display;
    this.style.display = "";
    this.style.display = display;
  }

  /**
   * Utility function to register a custom component if it has not already
   * been defined.
   * @param {string} name The name of the component.
   * @param {any} element_def The constructor definition.
   */
  static register_component(name, element_def) {
    const available = runtime_available({
      request: AVAILABILITY_REQUEST.AskRuntime,
      name: "customElements"
    });
    if (available) {
      const is_defined =  !!globalThis.customElements.get(name);
      if (!is_defined) {
        customElements.define(name, element_def);
      }
    }
  }

  /**
   * Creates the HTMLElement and attaches a closed shadow DOM to only allow
   * styling via this component.
   * @param {object} params The named parameters
   * @param {CHtmlComponentCB} [params.adopted_cb] The callback that handles
   * the {@link adoptedCallback} method.
   * @param {CAttributeChangeCB} [params.attribute_changed_cb] The callback
   * that handles the {@link attributeChangedCallback} method.
   * @param {CHtmlComponentCB} [params.connected_cb] The callback that handles
   * the {@link connectedCallback} method.
   * @param {CHtmlComponentCB} [params.connected_move_cb] The callback that
   * handles the {@link connectedMoveCallback} method.
   * @param {CHtmlComponentCB} [params.disconnected_cb] The callback that
   * handles the {@link disconnectedCallback} method.
   * @param {"none" | "open" | "closed"} [params.shadow_mode="none"] Whether
   * attach a shadow root and if we do, what mode it will be in.
   */
  constructor({
    adopted_cb,
    attribute_changed_cb,
    connected_cb,
    connected_move_cb,
    disconnected_cb,
    shadow_mode="none",
  } = {}) {
    super();
    try {
      if (adopted_cb) {
        json_check_type({
          type: "function",
          data: adopted_cb,
          count: 0,
          should_throw: true
        });
      }
      if (attribute_changed_cb) {
        json_check_type({
          type: "function",
          data: attribute_changed_cb,
          count: 3,
          should_throw: true
        });
      }
      if (connected_cb) {
        json_check_type({
          type: "function",
          data: connected_cb,
          count: 0,
          should_throw: true
        });
      }
      if (connected_move_cb) {
        json_check_type({
          type: "function",
          data: connected_move_cb,
          count: 0,
          should_throw: true
        });
      }
      if (disconnected_cb) {
        json_check_type({
          type: "function",
          data: disconnected_cb,
          count: 0,
          should_throw: true
        });
      }
      this.#adopted_cb = adopted_cb;
      this.#attribute_changed_cb = attribute_changed_cb;
      this.#connected_cb = connected_cb;
      this.#connected_move_cb = connected_move_cb;
      this.#disconnected_cb = disconnected_cb;
      if (shadow_mode !== "none") {
        this.#shadow_root = this.attachShadow({mode: shadow_mode});
      }
    } catch (err) {
      CModuleError.handle_error(err);
      throw new CModuleError(CModuleError.MISUSE);
    }
  }
}

/**
 * `<cm-app-toolbar>` Web Component
 *
 * A unified, dual-mode application toolbar supporting:
 *
 * position="top"  -> Fixed header pinned to `top: 0` with
 * `<header role="banner">` and bottom border
 * position="bottom" -> Fixed footer pinned to `bottom: 0` with
 * `<footer role="contentinfo">` and top border
 *
 * Coordinates (top/bottom/left/right) are strictly managed by the component.
 *
 * Exposed CSS Variables:
 * - --toolbar-height      (default: 60px)
 * - --toolbar-bg          (default: rgba(15, 23, 42, 0.9))
 * - --toolbar-color       (default: #f8fafc)
 * - --toolbar-border      (default: 1px solid rgba(51, 65, 85, 0.7))
 * - --toolbar-z-index     (default: 1000)
 * - --toolbar-padding     (default: 0 1.25rem)
 * - --toolbar-gap         (default: 0.75rem)
 *
 * **HTML Example:**
 * ```html
 * <cm-app-toolbar position="top">
 *   <!-- Toolbar Items Go Here -->
 * </cm-app-toolbar>
 * ```
 *
 * @extends {CHtmlComponent}
 */
export class CAppToolbar extends CHtmlComponent {
  static get observedAttributes() {
    return ["position"];
  }

  /**
   * Retrieves the current toolbar position as "top" or "bottom".
   * @type {string}
   */
  get position() {
    const val = this.get_attribute("position");
    return val === "bottom" ? "bottom" : "top";
  }

  /**
   * Sets the toolbar position.
   * @param {"top" | "bottom"} val The position to set.
   */
  set position(val) {
    if (val === "bottom") {
      this.set_attribute("position", "bottom");
    } else {
      this.set_attribute("position", "top");
    }
  }

  /**
   * Renders the toolbar at its designated position.
   */
  render() {
    const is_bottom = this.position === "bottom";
    const tag_name = is_bottom ? "footer" : "header";
    const role = is_bottom ? "contentinfo" : "banner";

    this.shadow_root().innerHTML = `
      <style>
        :host {
          /* Configurable visual tokens */
          --_height: var(--toolbar-height, 60px);
          --_bg: var(--toolbar-bg, rgba(15, 23, 42, 0.9));
          --_color: var(--toolbar-color, #f8fafc);
          --_border: var(--toolbar-border, 1px solid rgba(51, 65, 85, 0.7));
          --_z-index: var(--toolbar-z-index, 1000);
          --_padding: var(--toolbar-padding, 0 1.25rem);
          --_gap: var(--toolbar-gap, 0.75rem);

          /* Automated Fixed Coordinates */
          position: fixed;
          left: 0;
          right: 0;
          ${is_bottom ? "bottom: 0; top: auto;" : "top: 0; bottom: auto;"}
          z-index: var(--_z-index);
          width: 100%;
          box-sizing: border-box;
          display: block;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        *, *::before, *::after {
          box-sizing: border-box;
        }

        /* Semantic container rendered as Flex Row */
        .toolbar-inner {
          display: flex;
          flex-direction: row;
          align-items: center;
          column-gap: var(--_gap);
          height: var(--_height);
          max-height: var(--_height);
          padding: var(--_padding);
          background: var(--_bg);
          color: var(--_color);
          ${
            is_bottom
              ? "border-top: var(--_border);"
              : "border-bottom: var(--_border);"
          }
          width: 100%;
          overflow: hidden;
          box-shadow: ${
            is_bottom
              ? "0 -8px 24px -4px rgba(0,0,0,0.3)"
              : "0 8px 24px -4px rgba(0,0,0,0.3)"
          };
          transition: background 0.2s ease, border-color 0.2s ease;
        }

        /* Height constraint enforcement for all slotted children */
        ::slotted(*) {
          max-height: 100% !important;
          box-sizing: border-box;
          margin: 0;
          flex-shrink: 0;
        }

        /* Helper utility for stretchable slotted elements */
        ::slotted([data-flex]),
        ::slotted([data-spacer]),
        ::slotted(cm-data-spacer) {
          flex: 1 1 auto !important;
          min-width: 0 !important;
        }
      </style>

      <${tag_name} class="toolbar-inner" role="${role}" part="container">
        <slot></slot>
      </${tag_name}>
    `;
  }

  /**
   * Constructs our component.
   */
  constructor() {
    super({
      shadow_mode: "open",
      attribute_changed_cb: (name, old_value, new_value) => {
        if (name === "position" && old_value !== new_value) {
          this.render();
          this.dispatchEvent(
            new CustomEvent("position-changed", {
              detail: { position: this.position },
              bubbles: true,
              composed: true,
            })
          );
        }
      },
      connected_cb: () => {
        if (!this.has_attribute("position")) {
          this.set_attribute("position", "top");
        }
        this.render();
      },
    });
  }
}
CHtmlComponent.register_component("cm-app-toolbar", CAppToolbar);

/**
 * `<cm-button>` Web Component Documentation
 *
 * A highly flexible, accessible custom button element that perfectly aligns
 * text and media (emojis or images) horizontally or vertically.
 *
 * LAYOUT CONFIGURATIONS
 *
 * By default, the button places media on the LEFT and text on the RIGHT.
 * To change this, pass the "layout" attribute:
 *
 * 1. Default (Side-by-Side):
 * ```html
 * <cm-button label="Launch" icon="🚀" tooltip="We are launching today">
 * </cm-button>
 * ```
 *
 * 2. Stacked (Media Top, Text Bottom):
 * ```html
 * <cm-button
 *   label="Launch"
 *   icon="icon.png"
 *   tooltip="We are launching today"
 *   layout="stacked">
 * </cm-button>
 * ```
 *
 * EXPOSED CSS VARIABLES (THEMING)
 *
 * Override these properties using inline styles or an external stylesheet:
 *
 * Layout & Spacing:
 * -  `--padding`         : Internal padding of the button (Default: 10px 20px)
 * -  `--gap`             : Spacing between the media and text (Default: 8px)
 * -  `--border-radius`   : Roundness of the button corners (Default: 4px)
 * -  `--border`          : Button border style (Default: 1px solid #ccc)
 *
 * Typography:
 * -  `--font-size`       : Text size (Default: 16px)
 * -  `--font-weight`     : Font weight/thickness (Default: 500)
 *
 * Color States:
 * -  `--bg-color`        : Normal background color (Default: #f0f0f0)
 * -  `--hover-bg-color`  : Background color on hover (Default: #e0e0e0)
 * -  `--color`           : Normal text color (Default: #333333)
 * -  `--hover-color`     : Text color on hover (Default: #000000)
 *
 * **Example:**
 * ```css
 * cm-button {
 *   --border: none;
 * }
 * ```
 *
 * ACCESSIBILITY & EVENTS
 *
 * - Standard native "click" events automatically bubble up to this component.
 * - Built-in Keyboard Accessibility allows users to focus the button using
 *   the "Tab" key and trigger it using "Enter" or "Space".
 *
 * @extends {CHtmlComponent}
 */
export class CButton extends CHtmlComponent {
  static get observedAttributes() {
    return ["layout", "icon-only", "label", "icon", "tooltip"];
  }

  /**
   * @param {object} [params]
   * @param {string} [params.label]
   * @param {string} [params.icon]
   * @param {string} [params.tooltip]
   * @param {CEventHandler} [params.click_handler]
   */
  constructor({ label, icon, tooltip, click_handler } = {}) {
    super({
      shadow_mode: "open",
      connected_cb: () => {
        const is_icon_only = this.has_attribute("icon-only");
        const raw_label = this.get_attribute("label") ?? label ?? "";
        const effective_label = is_icon_only ? "" : raw_label;
        const effective_icon = this.get_attribute("icon") ?? icon;
        const button_title = this.get_attribute("tooltip") ?? tooltip ?? "";

        if (!effective_label && !effective_icon) {
          throw new CModuleError("<cm-button> expects label or icon to be set");
        }

        this.title = button_title;

        // Auto-detect mode so CSS can adapt layout & sizing
        const has_label = Boolean(effective_label.trim());
        const has_icon = Boolean(effective_icon);

        if (has_icon && !has_label) {
          this.setAttribute("mode", "icon-only");
        } else if (has_icon && has_label) {
          this.setAttribute("mode", "combo");
        } else {
          this.setAttribute("mode", "label-only");
        }

        const is_emoji = (/** @type {string} */ str) => /\p{Extended_Pictographic}/u.test(str);
        let media_html = "";

        if (effective_icon) {
          if (is_emoji(effective_icon)) {
            media_html = `<span class="btn-emoji">${effective_icon}</span>`;
          } else {
            const safe_src = effective_icon.replace(/"/g, "&quot;");
            media_html = `<img class="btn-media" src="${safe_src}" alt="" />`;
          }
        }

        const accessible_label = effective_label || button_title || raw_label;

        this.shadow_root().innerHTML = `
          <style>
            :host {
              display: inline-block;
              cursor: pointer;
              box-sizing: border-box;
              vertical-align: middle;

              /* Base defaults */
              --btn-width: auto;
              --btn-height: auto;
              --btn-padding-y: 10px;
              --btn-padding-x: 20px;
              --btn-gap: 8px;
              --btn-border-radius: 4px;
              --btn-border: 1px solid #ccc;
              --btn-font-weight: 500;
              --btn-font-size: 16px;
              --btn-bg: #f0f0f0;
              --btn-hover-bg: #e0e0e0;
              --btn-color: #333333;
              --btn-hover-color: #000000;
              --btn-icon-size: 1.5em;
            }

            /* Inherit sizing if set externally on host */
            :host {
              width: var(--width, var(--btn-width));
              height: var(--height, var(--btn-height));
            }

            button {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              width: 100%;
              height: 100%;
              cursor: inherit;
              font-family: inherit;
              box-sizing: border-box;
              overflow: hidden;
              position: relative;
              transition: background-color 0.2s ease,
                          color 0.2s ease,
                          outline 0.1s ease;

              flex-direction: row;
              gap: var(--gap, var(--btn-gap));
              padding: var(
                --padding,
                var(--padding-y, var(--btn-padding-y)) var(--padding-x, var(--btn-padding-x))
              );
              border-radius: var(--border-radius, var(--btn-border-radius));
              border: var(--border, var(--btn-border));
              font-weight: var(--font-weight, var(--btn-font-weight));
              font-size: var(--font-size, var(--btn-font-size));
              background-color: var(--bg-color, var(--btn-bg));
              color: var(--color, var(--btn-color));
            }

            button:focus-visible {
              outline: 2px solid var(--hover-bg-color, var(--btn-hover-bg));
              outline-offset: 2px;
            }

            /* Shared Slot Styles */
            slot[name="media"],
            slot:not([name]) {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              min-width: 0;
              min-height: 0;
            }

            /* Hide empty label slot when no label exists */
            :host([mode="icon-only"]) slot:not([name]) {
              display: none;
            }

            /* Hide media slot when no icon exists */
            :host([mode="label-only"]) slot[name="media"] {
              display: none;
            }

            /* -----------------------------------------------------------
               CASE 1: ICON-ONLY (Fills the button interior / scales cleanly)
               ----------------------------------------------------------- */
            :host([mode="icon-only"]) slot[name="media"] {
              width: 100%;
              height: 100%;
              flex: 1 1 100%;
            }

            :host([mode="icon-only"]) .btn-media,
            :host([mode="icon-only"]) ::slotted([slot="media"]) {
              width: 100%;
              height: 100%;
              max-width: 100%;
              max-height: 100%;
              object-fit: contain;
            }

            :host([mode="icon-only"]) .btn-emoji {
              font-size: var(--icon-size, clamp(1.5rem, 50%, 5rem));
              line-height: 1;
            }

            /* -----------------------------------------------------------
               CASE 2: COMBO - DEFAULT / HORIZONTAL (Icon Left, Label Right)
               ----------------------------------------------------------- */
            :host([mode="combo"]:not([layout="stacked"])) .btn-media,
            :host([mode="combo"]:not([layout="stacked"])) ::slotted([slot="media"]) {
              height: var(--icon-size, var(--btn-icon-size));
              width: auto;
              max-height: 100%;
              max-width: 100%;
              object-fit: contain;
              flex-shrink: 0;
            }

            :host([mode="combo"]:not([layout="stacked"])) .btn-emoji {
              font-size: var(--icon-size, var(--btn-icon-size));
              line-height: 1;
              flex-shrink: 0;
            }

            /* -----------------------------------------------------------
               CASE 3: COMBO - STACKED (Icon Top, Label Bottom)
               ----------------------------------------------------------- */
            :host([layout="stacked"]) button {
              flex-direction: column;
              text-align: center;
            }

            :host([layout="stacked"]) slot[name="media"] {
              flex: 1 1 auto;
              width: 100%;
              min-height: 0;
            }

            :host([layout="stacked"]) slot:not([name]) {
              flex: 0 0 auto;
              max-width: 100%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }

            :host([layout="stacked"]) .btn-media,
            :host([layout="stacked"]) ::slotted([slot="media"]) {
              width: 100%;
              height: 100%;
              max-height: 100%;
              max-width: 100%;
              object-fit: contain;
            }

            :host([layout="stacked"]) .btn-emoji {
              font-size: var(--icon-size, clamp(1.5rem, 35%, 3.5rem));
              line-height: 1;
            }

            /* -----------------------------------------------------------
               CASE 4: LABEL-ONLY
               ----------------------------------------------------------- */
            :host([mode="label-only"]) slot:not([name]) {
              width: 100%;
              text-align: center;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }

            :host(:hover) button {
              background-color: var(--hover-bg-color, var(--btn-hover-bg));
              color: var(--hover-color, var(--btn-hover-color));
            }
          </style>

          <button type="button" aria-label="${accessible_label}">
            <slot name="media">${media_html}</slot>
            <slot>${effective_label}</slot>
          </button>
        `;

        if (click_handler) {
          runtime_event({
            request: EVENT_REQUEST.Add,
            type: "click",
            handler: click_handler,
            target: this
          });
        }
      },
      disconnected_cb: () => {
        if (click_handler) {
          runtime_event({
            request: EVENT_REQUEST.Remove,
            type: "click",
            handler: click_handler,
            target: this
          });
        }
      }
    });
  }
}
CHtmlComponent.register_component("cm-button", CButton);

/**
 * `<cm-print-button>` Subcomponent Documentation
 *
 * A specialized instance of `<cm-button>` that completely locks down
 * the text ("Print") and icon (🖨️) so they cannot be overwritten.
 *
 * USAGE
 *
 * Content passed between the tags is ignored to preserve structural intent:
 *
 * ```html
 * <cm-print-button></cm-print-button>
 * <cm-print-button icon-only></cm-print-button>
 * ```
 *
 * THEMING (SAME EXPOSED CSS VARIABLES)
 *
 * This component accepts the exact same styling variables as `<cm-button>`:
 *  --padding, --gap, --border-radius, --border, --font-size, --font-weight,
 *  --bg-color, --hover-bg-color, --color, --hover-color
 *
 * **Example:**
 *
 * ```css
 * cm-print-button {
 *   --border: none;
 * }
 * ```
 *
 * > [!NOTE]
 * > Even though this extends CButton, you need to manage styles on specific
 * > tag name as shown above.
 *
 * SELF-MANAGED AVAILABILITY
 *
 * Upon entering the DOM, this component automatically determines if print is
 * available. If the internal verification fails, the button quietly applies
 * "display: none" to itself internally logging a warning to the console.
 *
 * @extends {CButton}
 */
export class CPrintButton extends CButton {
  /**
   * Construct our component.
   */
  constructor() {
    super({
      icon: "🖨️",
      label: "Print",
      tooltip: "Prints the current page",
      click_handler: async (_ev) => {
        ui_action({request: ACTION_REQUEST.Print});
      }
    });
    if (!runtime_available({request: AVAILABILITY_REQUEST.Print})) {
      this.style.display = "none";
      logger_log({
        level: LOGGER.Warning,
        data: "<cm-print-button> print not detected, button hidden."
      });
    }
  }
}
CHtmlComponent.register_component("cm-print-button", CPrintButton);

/**
 * `<cm-share-button>` Subcomponent Documentation
 *
 * A specialized instance of `<cm-button>` that completely locks down
 * the text ("Print") and icon (🖨️) so they cannot be overwritten.
 *
 * USAGE
 *
 * Content passed between the tags is ignored to preserve structural intent:
 *
 * ```html
 * <cm-print-button></cm-print-button>
 * <cm-print-button icon-only></cm-print-button>
 * ```
 *
 * THEMING (SAME EXPOSED CSS VARIABLES)
 *
 * This component accepts the exact same styling variables as `<cm-button>`:
 *  --padding, --gap, --border-radius, --border, --font-size, --font-weight,
 *  --bg-color, --hover-bg-color, --color, --hover-color
 *
 * **Example:**
 *
 * ```css
 * cm-print-button {
 *   --border: none;
 * }
 * ```
 *
 * > [!NOTE]
 * > Even though this extends CButton, you need to manage styles on specific
 * > tag name as shown above.
 *
 * SELF-MANAGED AVAILABILITY
 *
 * Upon entering the DOM, this component automatically determines if print is
 * available. If the internal verification fails, the button quietly applies
 * "display: none" to itself internally logging a warning to the console.
 *
 * @extends {CButton}
 */
export class CShareButton extends CButton {
  /**
   * Construct our component.
   */
  constructor() {
    super({
      icon: "🔗",
      label: "Share",
      tooltip: "Shares the current page",
      click_handler: async (_ev) => {
        console.log("share");
        // ui_action({request: ACTION_REQUEST.Print});
      }
    });
    if (!runtime_available({request: AVAILABILITY_REQUEST.Print})) {
      this.style.display = "none";
      logger_log({
        level: LOGGER.Warning,
        data: "<cm-print-button> print not detected, button hidden."
      });
    }
  }
}
CHtmlComponent.register_component("cm-share-button", CShareButton);

/**
 * `<cm-share-button>` Subcomponent Documentation
 *
 * A specialized instance of `<cm-button>` that completely locks down
 * the text ("Print") and icon (🖨️) so they cannot be overwritten.
 *
 * USAGE
 *
 * Content passed between the tags is ignored to preserve structural intent:
 *
 * ```html
 * <cm-print-button></cm-print-button>
 * <cm-print-button icon-only></cm-print-button>
 * ```
 *
 * THEMING (SAME EXPOSED CSS VARIABLES)
 *
 * This component accepts the exact same styling variables as `<cm-button>`:
 *  --padding, --gap, --border-radius, --border, --font-size, --font-weight,
 *  --bg-color, --hover-bg-color, --color, --hover-color
 *
 * **Example:**
 *
 * ```css
 * cm-print-button {
 *   --border: none;
 * }
 * ```
 *
 * > [!NOTE]
 * > Even though this extends CButton, you need to manage styles on specific
 * > tag name as shown above.
 *
 * SELF-MANAGED AVAILABILITY
 *
 * Upon entering the DOM, this component automatically determines if print is
 * available. If the internal verification fails, the button quietly applies
 * "display: none" to itself internally logging a warning to the console.
 *
 * @extends {CButton}
 */
export class CTextToSpeechButton extends CButton {
  /**
   * Construct our component.
   */
  constructor() {
    super({
      icon: "▶️",
      label: "Read Aloud",
      tooltip: "Reads the current page aloud",
      click_handler: async (_ev) => {
        console.log("share");
        // ui_action({request: ACTION_REQUEST.Print});
      }
    });
    if (!runtime_available({request: AVAILABILITY_REQUEST.Print})) {
      this.style.display = "none";
      logger_log({
        level: LOGGER.Warning,
        data: "<cm-print-button> print not detected, button hidden."
      });
    }
  }
}
CHtmlComponent.register_component("cm-tts-button", CTextToSpeechButton);

/**
 * A layout utility component designed to act as flexible, invisible whitespace.
 * Expands along its specified axis to absorb remaining track space in CSS Grid
 * or Flexbox containers, pushing adjacent siblings apart.
 *
 * @extends {CHtmlComponent}
 *
 * @attribute {"horizontal" | "vertical"} [orientation="horizontal"]
 * Controls the expansion axis:
 * - `"horizontal"`: Expands horizontally (margin: 0 auto, flex: 1 1 auto).
 * - `"vertical"`: Expands vertically (margin: auto 0, flex: 1 1 auto).
 *
 * @attribute {string} [data-spacer=""]
 * Automatically populated on connect for compatibility with slotted parent CSS selectors.
 *
 * @attribute {string} [aria-hidden="true"]
 * Automatically populated on connect to hide whitespace from assistive technology trees.
 *
 * @example
 * <cm-app-toolbar position="top">
 *   <img src="logo.png" alt="Company Logo" />
 *   <cm-data-spacer></cm-data-spacer>
 *   <button type="button">Log In</button>
 * </cm-app-toolbar>
 */
export class CDataSpacer extends CHtmlComponent {
  static get observedAttributes() {
    return ["orientation"];
  }

  /**
   * Component constructor.
   */
  constructor() {
    super({
      shadow_mode: "open",
      attribute_changed_cb: (name, old_value, new_value) => {
        if (name === "orientation" && old_value !== new_value) {
          const isVertical = new_value === "vertical";
          const style = this.shadow_root().querySelector("style");
          if (style) {
            style.textContent = `
              :host {
                display: block;
                box-sizing: border-box;
                pointer-events: none;
                user-select: none;
                visibility: hidden;
                flex: 1 1 auto;
                ${
                  isVertical
                    ? "height: auto; width: 0; min-height: 0; margin-top: auto; margin-bottom: auto;"
                    : "width: auto; height: 0; min-width: 0; margin-left: auto; margin-right: auto;"
                }
              }
            `;
          }
        }
      },
      connected_cb: () => {
        if (!this.has_attribute("data-spacer")) {
          this.set_attribute("data-spacer", "");
        }

        if (!this.has_attribute("orientation")) {
          this.set_attribute("orientation", "horizontal");
        }

        if (!this.has_attribute("aria-hidden")) {
          this.set_attribute("aria-hidden", "true");
        }

        const isVertical = this.get_attribute("orientation") === "vertical";

        this.shadow_root().innerHTML = `
          <style>
            :host {
              display: block;
              box-sizing: border-box;
              pointer-events: none;
              user-select: none;
              visibility: hidden;

              /* Flexbox fallback */
              flex: 1 1 auto;

              /* Grid alignment: auto margins absorb available track space */
              ${
                isVertical
                  ? "height: auto; width: 0; min-height: 0; margin-top: auto; margin-bottom: auto;"
                  : "width: auto; height: 0; min-width: 0; margin-left: auto; margin-right: auto;"
              }
            }
          </style>
        `;
      },
    });
  }
}
CHtmlComponent.register_component("cm-data-spacer", CDataSpacer);

/**
 * Embedded responsive iframe widget with adaptive launch controls.
 * Fills 100% of its parent container by default while providing theming
 * overrides and standard iframe permission policies.
 *
 * **HTML Usage:**
 * ```html
 * <cm-embedded-frame
 *   frame_src="[https://example.com/embed](https://example.com/embed)"
 *   open_src="[https://example.com/post](https://example.com/post)"
 *   label="Embedded Content Viewer"
 *   allow="camera; microphone; fullscreen; display-capture"
 *   sandbox="allow-scripts allow-same-origin allow-forms"
 * ></cm-embedded-frame>
 * ```
 *
 * **Exposed CSS Custom Properties:**
 * ```css
 * cm-embedded-frame {
 *   // Dimensions (Defaults to 100%)
 *   --width: 100%;
 *   --height: 600px;
 *
 *   // Controls Layout & Typography
 *   --controls-padding: 8px 0;
 *   --controls-gap: 12px;
 *   --label-color: CanvasText;
 *   --label-font-size: 13px;
 *
 *   // Action Button
 *   --btn-bg: #2563eb;
 *   --btn-hover-bg: #1d4ed8;
 *   --btn-active-bg: #1e40af;
 *   --btn-color: #ffffff;
 *   --btn-border: none;
 *   --btn-border-radius: 6px;
 *   --btn-padding: 0 16px;
 *   --btn-height: 32px;
 *   --btn-font-size: 13px;
 *   --btn-font-weight: 600;
 *
 *   // Switch Control
 *   --switch-track-bg: rgba(125, 125, 125, 0.35);
 *   --switch-active-bg: #2563eb;
 *   --switch-knob-bg: #ffffff;
 *   --switch-focus-ring: #2563eb;
 *
 *   // Frame Container
 *   --frame-border: 1px solid rgba(125, 125, 125, 0.2);
 *   --frame-border-radius: 6px;
 * }
 * ```
 *
 * @extends {CHtmlComponent}
 */
export class CEmbeddedFrame extends CHtmlComponent {
  static observedAttributes = [
    "frame_src",
    "open_src",
    "label",
    "allow",
    "sandbox",
    "referrerpolicy",
    "loading"
  ];

  constructor() {
    super({
      shadow_mode: "open",
      connected_cb: () => {
        const src = this.get_attribute("frame_src");
        const open_src = this.get_attribute("open_src");

        if (!src) {
          throw new CModuleError(CModuleError.MISUSE);
        }

        // Iframe permission policy and standard attributes
        const label = this.get_attribute("label") ?? "Embedded Content";
        const allow = this.get_attribute("allow") ?? "fullscreen";
        const sandbox = this.get_attribute("sandbox");
        const referrerpolicy = this.get_attribute("referrerpolicy") ?? "strict-origin-when-cross-origin";
        const loading = this.get_attribute("loading") ?? "lazy";

        const safe_src = src.replace(/"/g, "&quot;");
        const safe_title = label.replace(/"/g, "&quot;");
        const safe_allow = allow.replace(/"/g, "&quot;");
        const safe_referrer = referrerpolicy.replace(/"/g, "&quot;");
        const sandbox_attr = sandbox ? `sandbox="${sandbox.replace(/"/g, "&quot;")}"` : "";

        this.shadow_root().innerHTML = `
          <style>
            :host {
              display: flex;
              flex-direction: column;
              width: var(--width, 100%);
              height: var(--height, 100%);
              min-width: 0;
              min-height: 0;
              box-sizing: border-box;

              /* Default Theme Tokens */
              --label-color-default: CanvasText;
              --btn-bg-default: #2563eb;
              --btn-hover-bg-default: #1d4ed8;
              --btn-active-bg-default: #1e40af;
              --btn-color-default: #ffffff;
              --switch-track-default: rgba(125, 125, 125, 0.35);
              --switch-active-default: #2563eb;
              --switch-knob-default: #ffffff;
            }

            *, *::before, *::after {
              box-sizing: border-box;
            }

            .div-controls-container {
              display: flex;
              align-items: center;
              justify-content: space-between;
              flex-wrap: wrap;
              gap: var(--controls-gap, 12px);
              padding: var(--controls-padding, 8px 0);
              flex-shrink: 0;
            }

            /* --- Custom Theme-Agnostic Switch --- */
            .switch-container {
              display: inline-flex;
              align-items: center;
              gap: 10px;
              cursor: pointer;
              user-select: none;
              font-family: inherit;
              font-size: var(--label-font-size, 13px);
              font-weight: 600;
              color: var(--label-color, var(--label-color-default));
            }

            .switch-input {
              position: absolute;
              opacity: 0;
              width: 0;
              height: 0;
              margin: 0;
            }

            .switch-track {
              position: relative;
              display: inline-block;
              width: 42px;
              height: 24px;
              background-color: var(--switch-track-bg, var(--switch-track-default));
              border-radius: 9999px;
              transition: background-color 0.2s ease;
              flex-shrink: 0;
            }

            .switch-knob {
              position: absolute;
              top: 2px;
              left: 2px;
              width: 20px;
              height: 20px;
              background-color: var(--switch-knob-bg, var(--switch-knob-default));
              border-radius: 50%;
              box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
              transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            }

            .switch-input:checked + .switch-track {
              background-color: var(--switch-active-bg, var(--switch-active-default));
            }

            .switch-input:checked + .switch-track .switch-knob {
              transform: translateX(18px);
            }

            .switch-input:focus-visible + .switch-track {
              outline: 2px solid var(--switch-focus-ring, var(--switch-active-default));
              outline-offset: 2px;
            }

            /* --- Action Button --- */
            .open-button {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              height: var(--btn-height, 32px);
              padding: var(--btn-padding, 0 16px);
              font-family: inherit;
              font-size: var(--btn-font-size, 13px);
              font-weight: var(--btn-font-weight, 600);
              color: var(--btn-color, var(--btn-color-default));
              background-color: var(--btn-bg, var(--btn-bg-default));
              border: var(--btn-border, none);
              border-radius: var(--btn-border-radius, 6px);
              cursor: pointer;
              transition: background-color 0.15s ease, opacity 0.15s ease;
            }

            .open-button:hover {
              background-color: var(--btn-hover-bg, var(--btn-hover-bg-default));
            }

            .open-button:active {
              background-color: var(--btn-active-bg, var(--btn-active-bg-default));
            }

            .open-button:focus-visible {
              outline: 2px solid var(--btn-hover-bg, var(--btn-hover-bg-default));
              outline-offset: 2px;
            }

            /* --- Full-Height Frame Container --- */
            .div-frame-container {
              flex: 1 1 auto;
              position: relative;
              width: 100%;
              height: 100%;
              min-height: 0;
              min-width: 0;
              overflow: hidden;
              border: var(--frame-border, none);
              border-radius: var(--frame-border-radius, 4px);
            }

            .div-frame-container iframe {
              display: block;
              width: 100%;
              height: 100%;
              border: 0;
            }

            @media print {
              #div_controls_container {
                display: none;
              }
            }
          </style>

          <div id="div_controls_container" class="div-controls-container">
            <label class="switch-container">
              <input id="chk_popup_window" class="switch-input" type="checkbox" role="switch">
              <span class="switch-track" aria-hidden="true">
                <span class="switch-knob"></span>
              </span>
              <span>Open in popup window</span>
            </label>

            <button id="btn_open_page" class="open-button" type="button">Open</button>
          </div>

          <div class="div-frame-container">
            <iframe
              id="frm_content"
              title="${safe_title}"
              src="${safe_src}"
              allow="${safe_allow}"
              referrerpolicy="${safe_referrer}"
              loading="${loading}"
              allowfullscreen
              ${sandbox_attr}>
            </iframe>
          </div>
        `;

        // Preference persistence
        const chk_popup_window = this.shadow_root().querySelector("#chk_popup_window");
        // @ts-ignore Won't be null. Exception will throw.
        chk_popup_window.onchange = () => {
          storage_set({
            key: "cm_is_popup_window",
            // @ts-ignore Won't be null. Exception will throw.
            value: chk_popup_window.checked.toString()
          });
        };

        storage_get({ key: "cm_is_popup_window" }).then((val) => {
          // @ts-ignore Won't be null. Exception will throw.
          chk_popup_window.checked = val === "true";
        });

        // Launch button logic
        // @ts-ignore This will not be null.
        const button = this.shadow_root().querySelector("#btn_open_page");
        const div_controls_container = this.shadow_root().querySelector("#div_controls_container");

        if (open_src) {
          // @ts-ignore Won't be null. Exception will throw.
          button.onclick = () => {
            ui_open({
              schema: SCHEMA_TYPE.Https,
              url: open_src,
              // @ts-ignore Won't be null. Exception will throw.
              popup_window: chk_popup_window.checked,
              target: TARGET_TYPE.Blank
            });
          };
        } else {
          // @ts-ignore Won't be null. Exception will throw.
          div_controls_container.style.display = "none";
        }
      }
    });
  }

  /**
   * Posts a structured message to the embedded iframe window.
   *
   * @param {any} data Data payload to post.
   * @param {string} [target_origin="*"] Target origin restriction.
   */
  post_message(data, target_origin = "*") {
    /** @type {HTMLIFrameElement|null} */
    const frm = this.shadow_root().querySelector("#frm_content");
    if (!frm || !frm.contentWindow) {
      console.warn("CEmbeddedFrame: iframe contentWindow not ready for post_message.");
      return;
    }
    frm.contentWindow.postMessage(data, target_origin);
  }
}
CHtmlComponent.register_component("cm-embedded-frame", CEmbeddedFrame);
