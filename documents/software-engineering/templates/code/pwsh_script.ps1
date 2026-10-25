#!/usr/bin/pwsh
# =============================================================================
$ABOUT_SCRIPT = @{
file = @"
What does the script do...
"@
author = "EMAIL / WEBSITE"
copyright = "© 2025 - 2026 AUTHOR. All Rights Reserved."
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
- 2026-MMM-DD: What was modified.
"@
todos = @"
1. Things to do.
"@
}
# =============================================================================
function main {
  # You can also break up the script with more functions making it very
  # versatile for writing complex powershell scripts for you devops needs.
  function sub_task {
    # do sub_task work.
  }

  # Start defining the main of the script
  [string]$action = $args[0]
}
main @args
