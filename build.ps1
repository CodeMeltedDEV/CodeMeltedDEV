#!/usr/bin/pwsh
# =============================================================================
$ABOUT_SCRIPT = @{
author = "mark.shaffer@codemelted.com / dev.codemelted.com"
copyright = "© 2025 - 2026 Mark Shaffer. All Rights Reserved."
license = @"
MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to
deal in the Software without restriction, including without limitation the
rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
sell copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
IN THE SOFTWARE.
"@
history = @"
- [2026-SEP-30]: Added make_cli and make_rust options to the script.
- [2026-SEP-19]: Initial release of the build script to support the
  new codemelted.js project.
"@
todos = @"
1. Add a setup function to download and install all necessary items for the
   project.
2. Add a help function to display information about how to utilize this script
   for builds of this project.
"@
}
# =============================================================================
function main {
  # ---------------------------------------------------------------------------
  # [Helper Functions] --------------------------------------------------------
  # ---------------------------------------------------------------------------
  function help {
    Write-Host $ABOUT_SCRIPT.author
  }

  function message([string]$msg) {
    Write-Host
    Write-Host "MESSAGE: $msg"
    Write-Host
  }

  # ---------------------------------------------------------------------------
  # [MAKE FUNCTIONS] ----------------------------------------------------------
  # ---------------------------------------------------------------------------

  function make_js {
    message "Now building codemelted.js module."

    # Build the documentation
    Remove-Item -Path $PSScriptRoot/dev -Force -Recurse `
      -ErrorAction SilentlyContinue
    npx typedoc --skipErrorChecking
    if ($LASTEXITCODE -ne 0) {
      throw "make_js - 'typedoc --skipErrorChecking' failed."
    }

    # Finish up the the prepping of the documentation
    Copy-Item $PSScriptRoot/assets $PSScriptRoot/dev -Force -Recurse `
      -ErrorAction Stop
    Copy-Item $PSScriptRoot/codemelted.js $PSScriptRoot/assets/js -Force `
      -ErrorAction Stop
    Copy-Item $PSScriptRoot/codemelted.js $PSScriptRoot/tests -Force `
      -ErrorAction Stop
    Copy-Item $PSScriptRoot/tests $PSScriptRoot/dev -Force -Recurse `
      -ErrorAction Stop
    message "codemelted.js module build completed."
  }

  function make_rust {
    message "Now building the codemelted_lib static library."
    Set-Location $PSScriptRoot/codemelted.rs
    # TODO: Will need to add additional targets when the time comes
    cargo clean
    cargo test
    if ($LASTEXITCODE -ne 0) {
      throw "make_rust - 'cargo test' failed."
    }
    cargo doc --no-deps
    if ($LASTEXITCODE -ne 0) {
      throw "make_rust - 'cargo doc --no-deps' failed."
    }
    cargo build --release
    if ($LASTEXITCODE -ne 0) {
      throw "make_rust - 'cargo build --release' failed"
    }
    # TODO: Will need to copy all those additional target compiles
    #       to the lib folder.
    Copy-Item target/doc $PSScriptRoot/dev/codemelted -Force -Recurse `
      -ErrorAction Stop
    Set-Location $PSScriptRoot
    message "codemelted_lib static library build completed."
  }

  # ---------------------------------------------------------------------------
  # [MAIN ENTRY] --------------------------------------------------------------
  # ---------------------------------------------------------------------------
  try {
    [string]$action = $args[0] ?? ""
    switch ($action) {
      "--make-js" { make_js }
      "--make-rust" { make_rust }
      "" {
        make_js
        make_rust
      }
      default { throw "build.ps1 - invalid parameter specified" }
    }
  } catch {
    Write-Host "ERROR: $($_.Exception.Message)" -ForegroundColor Red
    Set-Location $PSScriptRoot
    exit 1
  }
}
main @args
