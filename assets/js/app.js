import {
  CHtmlComponent,
  SCHEMA_TYPE,
  TARGET_TYPE,
  storage_get,
  ui_open
} from "./codemelted.js";

class CPageHeader extends CHtmlComponent {
  constructor() {
    super({shadow_mode: "none"});
    const title = this.getAttribute("title") ?? "";
    this.innerHTML = `
      <style>
        cm-print-button, cm-share-button, cm-tts-button {
          --bg-color: #1A2026;
          --border: 1px solid #3d444d;
          --hover-bg-color: #1A2026;
          --hover-color: #F0F6FC;
          --color: #F0F6FC;
          --font-size: 11px;
          --font-weight: bold;
          --padding: 2px 5px;
          --height: 20px;
        }
        @media print {
          cm-page-header {
            display: none;
          }
          cm-page-footer {
            display: none;
          }
        }
      </style>
      <h1>${title}</h1>
      <hr>
      <center>
        <img style="width: 100%;" src="https://codemelted.com/assets/images/logo-codemelted-dev.png" />
        <div id="github-controls">
          <a aria-label="Follow @CodeMeltedDEV on GitHub" class="github-button" data-color-scheme="no-preference: dark; light: dark; dark: dark;" data-show-count="true" data-size="small" href="https://github.com/CodeMeltedDEV" title="Follow @CodeMeltedDEV on GitHub">CodeMeltedDEV</a>
          <a aria-label="Watch codemelteddev/codemelted.js on GitHub" class="github-button" data-color-scheme="no-preference: dark; light: dark; dark: dark;" data-icon="octicon-eye" data-show-count="true" data-size="small" href="https://github.com/codemelteddev/codemelted.js/subscription" title="Watch codemelteddev/codemelted.js on GitHub">Watch</a>
          <a aria-label="Sponsor @CodeMeltedDEV on GitHub" class="github-button" data-color-scheme="no-preference: dark; light: dark; dark: dark;" data-icon="octicon-heart" data-size="small" href="https://github.com/sponsors/CodeMeltedDEV" title="Sponsor @CodeMeltedDEV and the codemelted.js Project on GitHub">Sponsor</a>
          <a aria-label="Discuss codemelteddev/codemelted.js on GitHub" class="github-button" data-color-scheme="no-preference: dark; light: dark; dark: dark;" data-icon="octicon-comment-discussion" data-size="small" href="https://github.com/codemelteddev/codemelted.js/discussions" title="Discuss codemelteddev/codemelted.js on GitHub">Discuss</a>
          <a aria-label="Download codemelteddev/codemelted.js on GitHub" class="github-button" data-color-scheme="no-preference: dark; light: dark; dark: dark;" data-size="small" href="https://github.com/codemelteddev/codemelted.js/archive/HEAD.zip" tabindex="1" title="Download codemelteddev/codemelted.js on GitHu">Download</a>
          <a aria-label="Issue codemelteddev/codemelted.js on GitHub" class="github-button" data-color-scheme="no-preference: dark; light: dark; dark: dark;" data-icon="octicon-issue-opened" data-size="small" href="https://github.com/codemelteddev/codemelted.js/issues" title="Issue codemelteddev/codemelted.js on GitHub">Issue</a>
        </div>
        <div>
          <cm-print-button></cm-print-button>
          <cm-share-button></cm-share-button>
          <cm-tts-button></cm-tts-button>
        </div>
      </center>
      <hr>
    `;
    const script = document.createElement('script');
    script.src = "https://buttons.github.io/buttons.js";
    this.appendChild(script);
  }
}
CHtmlComponent.register_component("cm-page-header", CPageHeader);


class CPageFooter extends CHtmlComponent {
  #btn_clicked = async (evt) => {
    const is_popup_window = await storage_get({
      key: "cm_is_popup_window"
    });
    ui_open({
      schema: SCHEMA_TYPE.Https,
      url: "https://buymeacoffee.com/codemelteddev",
      popup_window: is_popup_window === "true",
      target: TARGET_TYPE.Blank
    });
  }

  constructor() {
    super({
      shadow_mode: "open",
      connected_cb: () => {
        this.shadow_root().innerHTML = `
          <style>
            .cm-button-container {
              display: grid;
              grid-template-columns: auto auto auto auto auto;
              text-align: center;
            }
            cm-button {
              --bg-color: none;
              --border: none;
              --hover-bg-color: none;
              --hover-color: none;
              --color: none;
              --height: 25px;
              --padding: 0px;
            }
            #btn_bmc {
              --height: 35px;
            }
          </style>
          <center>
            <br><br>
            <cm-button
              id="btn_bmc"
              icon="https://codemelted.com/assets/images/icon-bmc-button.png">
            </cm-button>
            <p>
              If you are enjoying the content any support is appreciated. Click the button above
              for one-time donations or to see the other services offered. 🙏 🙌 🫶 🥹
            </p>
          </center>
          <hr>
          <div class="cm-button-container">
            <cm-button tooltip="Newsletter / Services / Support" onclick="window.open('/About/Me/Buy_Me_A_Coffee/index.html', target='_self');" icon="https://codemelted.com/assets/images/icon-buy-me-a-coffee.png"></cm-button>
            <cm-button tooltip="My Professional Experience as a Software Engineering" onclick="window.open('/About/Me/LinkedIn/index.html', target='_self');" icon="https://codemelted.com/assets/images/icon-linkedin.png"></cm-button>
            <cm-button tooltip="The CodeMeltedDEV Podcast" onclick="window.open('/About/Me/Spotify/index.html', target='_self');" icon="https://codemelted.com/assets/images/icon-spotify.png"></cm-button>
            <cm-button tooltip="Where all the Tech Peeps Hang Out" onclick="window.open('/About/Me/TwitterX/index.html', target='_self');" icon="https://codemelted.com/assets/images/icon-twitterx.png"></cm-button>
            <cm-button tooltip="Where to Find My Videos" onclick="window.open('/About/Me/YouTube/index.html', target='_self');" icon="https://codemelted.com/assets/images/icon-youtube.png"></cm-button>
          </div>
        `;

        // Attach the event listeners
        this.shadow_root().getElementById("btn_bmc").addEventListener(
          "click",
          this.#btn_clicked
        );
      },
      disconnected_cb: () => {
        // Detach the event listeners
        this.shadow_root().getElementById("btn_bmc").removeEventListener(
          "click",
          this.#btn_clicked
        );
      }
    });
  }
}
CHtmlComponent.register_component("cm-page-footer", CPageFooter);


class CProjectToolbar extends CHtmlComponent {
  constructor() {
    super({
      shadow_mode: "open",
      connected_cb: () => {
        this.shadow_root().innerHTML = `
          <style>
            body {
              margin-bottom: 55px;
            }
            cm-app-toolbar {
              --toolbar-height: 50px;
              --toolbar-padding: 0;
            }
            cm-button {
              --border: none;
              --bg-color: none;
              --hover-bg-color: none;
              --color: none;
              --hover-color: none;
            }
            @media print {
              cm-app-toolbar {
                display: none;
              }
            }
          </style>
          <cm-app-toolbar position="bottom">
            <img style="height: 50px;" src="https://codemelted.com/assets/images/logo-codemelted-dev-twitterx.png" />
            <cm-data-spacer></cm-data-spacer>
            <cm-button tooltip="External Services" style="margin-right: auto;" icon="⚙️"></cm-button>
          </cm-app-toolbar>
        `;
      }
    });
  }
}
CHtmlComponent.register_component("cm-project-toolbar", CProjectToolbar);
