#!/bin/bash
# =============================================================================
# MIT License
#
# © 2023-Present Mark Shaffer. All Rights Reserved.
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to
# deal in the Software without restriction, including without limitation the
# rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
# sell copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in
# all copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
# FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
# IN THE SOFTWARE.
# =============================================================================
function main {
  # Will deploy the specified target for the cdn.codemelted.com site.
  function deploy_content {
    # Setup the target
    target=$1

    # See if it exists
    if test -f $target.zip; then
      # It does, see if a previous deployment needs removing
      if test -d ./public_html/$target; then
          echo "MESSAGE: $target directory exists, removing it"
          rm -rf ./public_html/$target
      else
          echo "WARNING: $target directory does not exist, moving on."
      fi

      # Now go deploy the target.
      echo "MESSAGE: $target.zip file exists, unzipping it and deleting it."
      unzip $target.zip -d public_html
      rm -f $target.zip
    fi

    # If this is our main deploy, we need to move it into the root directory
    if test -d ./public_html/dev; then
      rm -rf ./public_html/About
      rm -rf ./public_html/Articles
      rm -rf ./public_html/assets
      rm -rf ./public_html/codemelted-cli
      rm -rf ./public_html/codemelted.js_SDK
      rm -rf ./public_html/codemelted.rs
      rm -rf ./public_html/codemelted.rs_SDK
      rm -rf ./public_html/Domain_Use_Cases
      rm -rf ./public_html/media
      rm -rf ./public_html/Software_Engineering
      rm -rf ./public_html/tests
      mv -f ./public_html/dev/* ./public_html/
      rm -rf ./public_html/dev/
    fi
  }

  # -------------------------------------------------------------------------
  # [Main] ------------------------------------------------------------------
  # -------------------------------------------------------------------------
  echo "MESSAGE: Now deploying the codemelted.dev site."

  deploy_content "app"
  deploy_content "dev"
  deploy_content "photography"

  echo "MESSAGE: codemelted.dev site has been deployed."
}
main