// ============================================================================
//! | Key       | Value                                                       |
//! | --------- | ----------------------------------------------------------- |
//! | AUTHOR    | mark.shaffer@codemelted.com / dev.codemelted.com            |
//! | COPYRIGHT | © 2025-Present Mark Shaffer. All Rights Reserved.           |
//!
//! # FEATURES
//!
//! <mark>TBD</mark>
//!
//! # GETTING STARTED
//!
//! <mark>TBD</mark>
//!
//! # USAGE
//!
//! <mark>TBD</mark>
//!
//! # TODOS
//!
//! <mark>TBD</mark>
//!
//! # LICENSE
//!
//! MIT License
//!
//! © 2025-2026 Mark Shaffer. All Rights Reserved.
//!
//! Permission is hereby granted, free of charge, to any person obtaining a
//! copy of this software and associated documentation files (the "Software"),
//! to deal in the Software without restriction, including without limitation
//! the rights to use, copy, modify, merge, publish, distribute, sublicense,
//! and/or sell copies of the Software, and to permit persons to whom the
//! Software is furnished to do so, subject to the following conditions:
//!
//! The above copyright notice and this permission notice shall be included in
//! all copies or substantial portions of the Software.
//!
//! THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//! IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//! FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//! THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//! LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//! FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//! DEALINGS IN THE SOFTWARE.
// ============================================================================
// [MODULE CORE IMPLEMENTATION] ===============================================
// ============================================================================
#![doc(html_logo_url =
  "https://codemelted.com/assets/favicon/apple-touch-icon.png")]

mod module_core {
  use std::sync::Mutex;
  pub type CObject = serde_json::Value;


  static LAST_RESULT: Mutex<Option<CResult>> = Mutex::new(None);

  pub fn set_last_result(result: CResult) {
    let mut result_mutex = LAST_RESULT.lock().unwrap();
    *result_mutex = Some(result)
  }

  #[derive(Clone, Debug)]
  pub struct CResult {
    error: Option<String>,
    value: Option<CObject>,
  }
  impl CResult {
    pub fn new(
        error: Option<String>,
        value: Option<CObject>
    ) -> CResult {
      if error.is_some() && value.is_some() {
        panic!(
          "API Violation (CResult) - cannot have both error and value set."
        );
      }
      CResult {
        error,
        value
      }
    }

    pub fn is_error(&self) -> bool {
      self.error.is_some()
    }

    pub fn is_ok(&self) -> bool {
      self.value.is_some()
    }

    pub fn stringify(&self) -> String {
      let obj = serde_json::json!({
        "is_error": self.error.is_some(),
        "error": self.error,
        "is_ok": self.value.is_some(),
        "value": self.value
      });
      obj.to_string()
    }
  }
}

// ============================================================================
// [CRATE PUBLIC API] =========================================================
// ============================================================================

pub mod api {
  pub use crate::module_core::CResult;

  /// Provides the ability to export the static library API utilizing functions
  /// with and without a return type.
  macro_rules! ffi {
    ($(
      pub extern "C" fn $name:ident ( $($arg:tt)* ) $(-> $ret:ty)? $body:block
    )*) => {
      $(
        #[unsafe(no_mangle)]
        pub extern "C" fn $name ( $($arg)* ) $(-> $ret)? $body
      )*
    };
  }
  pub(crate) use ffi;

  pub fn request() -> bool {
    false
  }
  pub fn response() -> Option<CResult> {
    // LAST_RESULT.clone()
    None
  }


  pub fn response_size() -> usize {
    // if LAST_RESULT.is_none() {
    //   return 0;
    // }
    // LAST_RESULT.is_some().to_string().len()
    0
  }

}

// ============================================================================
// [STATIC LIB API] ===========================================================
// ============================================================================

use std::os::raw::c_char;
use crate::module_core::CResult;

api::ffi! {

  pub extern "C" fn codemelted_lib_request() -> bool {
    false
  }

  pub extern "C" fn codemelted_lib_response(
      result: *mut c_char,
      size: usize
  ) -> bool {
    // Make sure the raw pointer provided is not null, signal error and
    // capture that error.
    if result.is_null() {
      let result = CResult::new(
        Some(String::from(
          "codemelted_lib_response() received a null [result] parameter."
        )),
        None
      );
      module_core::set_last_result(result);
      return false;
    } else if size >= codemelted_lib_response_size() {
      // TODO: add an error dealing with not big enough buffer.
      return false;
    }

    let stringified = match crate::api::response() {
      Some(v) => {
        v.stringify()
      },
      None => "".to_string(),
    };

    unsafe {
      std::ptr::copy_nonoverlapping(
        stringified.as_ptr() as *const std::os::raw::c_char,
        result,
        stringified.len()
      );
    }
    true
  }

  pub extern "C" fn codemelted_lib_response_size() -> usize {
    crate::api::response_size()
  }
}