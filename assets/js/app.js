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
          #center_header {
            display: none;
          }
          cm-page-footer {
            display: none;
          }
        }
      </style>
      <h1>${title}</h1>
      <center id="center_header">
        <hr>
        <img style="max-height: 300px; width: 100%;" src="https://codemelted.com/assets/images/logo-codemelted-dev.png" />
        <div id="github-controls">
          <a aria-label="Follow @CodeMeltedDEV on GitHub" class="github-button" data-color-scheme="no-preference: dark; light: dark; dark: dark;" data-show-count="true" data-size="small" href="https://github.com/CodeMeltedDEV" title="Follow @CodeMeltedDEV on GitHub">CodeMeltedDEV</a>
          <a aria-label="Watch CodeMeltedDEV on GitHub" class="github-button" data-color-scheme="no-preference: dark; light: dark; dark: dark;" data-icon="octicon-eye" data-show-count="true" data-size="small" href="https://github.com/CodeMeltedDEV/CodeMeltedDEV/subscription" title="Watch CodeMeltedDEV on GitHub">Watch</a>
          <a aria-label="Sponsor @CodeMeltedDEV on GitHub" class="github-button" data-color-scheme="no-preference: dark; light: dark; dark: dark;" data-icon="octicon-heart" data-size="small" href="https://github.com/sponsors/CodeMeltedDEV" title="Sponsor @CodeMeltedDEV and the CodeMeltedDEV Modules on GitHub">Sponsor</a>
          <a aria-label="Discuss CodeMeltedDEV on GitHub" class="github-button" data-color-scheme="no-preference: dark; light: dark; dark: dark;" data-icon="octicon-comment-discussion" data-size="small" href="https://github.com/CodeMeltedDEV/CodeMeltedDEV/discussions" title="Discuss CodeMeltedDEV on GitHub">Discuss</a>
          <a aria-label="Download CodeMeltedDEV on GitHub" class="github-button" data-color-scheme="no-preference: dark; light: dark; dark: dark;" data-size="small" href="https://github.com/CodeMeltedDEV/CodeMeltedDEV/archive/HEAD.zip" tabindex="1" title="Download CodeMeltedDEV on GitHu">Download</a>
          <a aria-label="Issue CodeMeltedDEV on GitHub" class="github-button" data-color-scheme="no-preference: dark; light: dark; dark: dark;" data-icon="octicon-issue-opened" data-size="small" href="https://github.com/CodeMeltedDEV/CodeMeltedDEV/issues" title="Issue CodeMeltedDEV on GitHub">Issue</a>
        </div>
        <div>
          <cm-print-button></cm-print-button>
          <cm-share-button></cm-share-button>
          <cm-tts-button></cm-tts-button>
        </div>
        <hr>
      </center>

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
          <p>
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
          </p>
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

class CSwEngButtons extends CHtmlComponent {
  #btn_clicked = async (evt) => {
    const url = evt.target.id === "btn_acm"
      ? "https://acm.org"
      : "https://ieee.org";
    const is_popup_window = await storage_get({
      key: "cm_is_popup_window"
    });
    ui_open({
      schema: SCHEMA_TYPE.Https,
      url: url,
      popup_window: is_popup_window === "true",
      target: TARGET_TYPE.Blank
    });
  };

  constructor() {
    super({
      shadow_mode: "open",
      connected_cb: () => {
        this.shadow_root().innerHTML = `
          <style>
            :root {
              color-scheme: light dark;
            }

            .button-container {
              display: flex;
              justify-content: space-between;
              width: 100%;
            }

            .button-container button {
              flex: 1;
            }

            cm-button {
              --bg-color: light-dark(#ffffff, #3d444d);
              --border: none;
              --hover-bg-color: light-dark(#3d444d, #ffffff);
              --padding: 2px 5px;
            }
          </style>
          <div class="button-container">
            <cm-button id="btn_acm" class="left-btn" icon="https://codemelted.com/assets/images/logo-acm.png"></cm-button>
            <cm-button id="btn_ieee" class="right-btn" icon="https://codemelted.com/assets/images/logo-ieee.png"></cm-button>
          </div>
        `;

        this.shadow_root().getElementById("btn_acm").addEventListener("click", this.#btn_clicked);
        this.shadow_root().getElementById("btn_ieee").addEventListener("click", this.#btn_clicked);
      },
      disconnected_cb: () => {
        this.shadow_root().getElementById("btn_acm").removeEventListener("click", this.#btn_clicked);
        this.shadow_root().getElementById("btn_ieee").removeEventListener("click", this.#btn_clicked);
      }
    })
  }
}
CHtmlComponent.register_component("cm-sw-eng-buttons", CSwEngButtons);

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
              --color: none;
              --text-align: left;
            }
            cm-app-sheet {
              --bottom-offset: 50px;
            }
            #btn_drawer {
              --padding: 0;
              --hover-bg-color: none;
              --bg-color: none;
              --height: 50px;
            }
            cm-drawer {
              --header-height: 125px;
              --z-index: 2000;
            }
            @media print {
              cm-app-toolbar {
                display: none;
              }
            }
          </style>
          <cm-drawer
            id="drawer_external_services"
            position="left"
            header_image="https://codemelted.com/assets/images/logo-codemelted-dev-twitterx.png"
            footer_text="© 2026 CodeMeltedDEV. All Rights Reserved."
          >
            <cm-switch label="Open in a Popup Window?"></cm-switch>
            <!-- Communication -->
            <cm-collapsible-list label="Communication">
              <cm-button id="btn_ext_calendar" label="Calendar" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACgklEQVQ4jW2TP4icVRTFf+e+N7MTZ3TjssawJIUR0UqCCBEsJCC2IqsiNmIhpLWxEmLhok1AsI6WBlJZiOkCQtYUghJRhJWIQiAG3eyfmd2d+b73jsW3u4GYB7d4cM95l987V2dXJj8q0mlqWwHt1/+ObSRRXP37rT9dTeD6dZbitEsDkmr1A8X3DKBU1JZEqZVIg1ezXQxIoNGRsGxV748iMFBrZ5JCFNtH+1sqtSCFM0A1jObwl+8NNOhDP4kIMWtNCI70RdOaaQuUbbXfL7vONhQpEQLZRqDhnHh4EGzvtdzZnDKcEznMlZ82ub0xYzQQo4GZ723raH/CfG9L0Q0nqk0KuPrLFs9/8BtfXdtgr6m8duEmF6/+y9uf/8GVGxMcwbQk2gptzcQBpBxic6fw3a9jnnvyIUaD4NK1dU4s9Lj8/ik+fnOJz765Q2lNjg6oxD2Dauglcf6NJV58Zsj6pGXt9pRXnn0E25x5akhbzN93G3IW3tcFB7RtUgjb7Ewr3u+IgLZ0v9HPHUy4z8AGqRN3dzGaC47N9/j5rz16WdxanzFtzfFHM6X4MG25E/nwxYPQbO0W3j27yOsXbjJrK9fXxiyfeYzBIDEttjoPZykhdTHt5YQE77y0SFvhxEKfL849weXrG5x7+TjLL8xDGRMJYUxU58LYxVWF8LipcoilRZCC7dkOT58Mzp9cAAqTZtduJ+pPw9GEc+pHXmvesm3FXrD87eOOCNVakXTIpVSQOsrDWfHFS6e82Dju5uaTXNI43FRcQ9vTIUpxuHn3bZNKlT2z+9Mcu1vth8dWb6wEJVaVMlKqKSXnSDywUnKKXIcpxz/Zny6s/rDij4j/AJWBUYGjD8DsAAAAAElFTkSuQmCC"></cm-button>
              <cm-button id="btn_ext_contacts" label="Contacts" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACEklEQVR4nJxSO2sUURT+zrmzT3FlNUXwmYdgCgWJi6AQCCJ2IgE3NrEQsbCws5b9ATZWFrJ2CUmmSGEtKCJiSBbRxMJgEtZXFRZ1d3azO/de79yZBBdmIeSDuZx77vnO6xuBeNAeffFOi1tLoyC+Z22tnmGuUNlDAm3upFFcOgcn+QYidci65fZv+O0xuIVPuzERuItfdMM70RTYkNt/G/YLbNJTXTERnK4E7o6hmmAOWg87DGyw1x0TO4K9a9xeOQmpX0JkT1uv3/ia1omrrZGRKkrm/b8RYpYYzXh8PoOxM5PW9a4yh807LcQgVoUnC/pC+fXG4MefWx5I6IEj+dzloYEkpbA+/YDe9kzweEb36RSeuovfb1S+/Un4LMIVaIXhvjwuDvVD+ijPzizfx3KhY9922y5qwWlMf6nh5uLnKvnS66BT7xgVfNWu+2vVjfb6r5qfPYC7E5Pnr1taSTOXzBHM/GgCV5IpXFvb/LENwcRsy7ORlEkIMko4taYnyUhjHGcD/nigz6uoC6HVqHCg2AmmItIG0NqOqNEbPL6zeyBjDpJSGaIMmMYVJDF3Jc2voWQ+kxUmhJWWKwHHFFfO6mpYgAmtZBqUyaQScEygaSfszVAUMHziMA8ezZNXx/OF+Q8vwh2QclyXZGA3W1xueKj057Ia7JjCUWu+RO5gTl86dSzZYWzNPqT3PWXcD/4BAAD//8g7ln8AAAAGSURBVAMAbPnOtgr8h/MAAAAASUVORK5CYII="></cm-button>
              <cm-button id="btn_ext_fi_wireless" label="Fi Wireless" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACQUlEQVR4nKRSTWsTURQ9772ZTJum0dY0ICYbFdESKlgRF6WmTTb+gBRcuujGnboT0dFNl+rObhW70KUb0UVwVQSLoAFLGxvFL1pTmqSTj5l5H85MEqtFS6UH7uXCe++8c+69FH/ApF4inaDbgpimop07v0CCnM5rmfNjNxhFWkhwRRSlinRPIZUCowSVSkV9/vKBSc7za4++3QamRHAlPdPKGmHjBW843l8dEco/USB+6dWEUCwvv0Hd2oAejsFt1SfLc2P5QA4HVly79ZVoPp9sB/VfdcKrCZXo64uCMgOSNz5y6Zbwm181flEljWGcFgJc2AKMMXi1J0gQ3mQi1AsimKMVlwrUcioLlbnMp60ejI7q/ZPNq3qPOplMHRKhcIhI3wJRfieYUuJHNf78evEsatgGzU99E/KcEdk3w2sOrFWC+JEBCFf4xqG4hHGgF2olJ2E+vgLc0mDedNve2uNBiNlL0nIWFSV1amibtu1ayuEt6Ti293vDrTQ2BBEvYRKvOSbvPt6y4COXGMyeiY0MpRJc1Bq0wOKbrhRqP6O6LRrlt1NPS/gLAoL6MxwM9+IhXByDhXpr0ROl8Eq/i2myijp2QNtCD1KIsQwGWRKUHGcaDusRXFi7jKP+Kpgm6L8IAgVqFrpMY9ob9Yj8TiP8vdRbVcxHr+Fed6V2JChgOJQ8NXCJUtnsfz0/i/9AIC2RNsajSdyJDKn75WzqRLB/ObDdEAR7UF3nC5pmP/DK9XdFqzThy34CsRsCgj3iJwAAAP//UFCzMgAAAAZJREFUAwA8HfStwNbnuAAAAABJRU5ErkJggg=="></cm-button>
              <cm-button id="btn_ext_icloud" label="iCloud" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC3ElEQVR4nExTS2tUSRg9X1X1fXQmMQETB+JMcB6oYxhkBhQJIj7QhSjoxoWCK3EjPvYqght/gL9AdONC/AOCm6CIG0FUMAFxoQgmaOju23VvPTx106KXrltdt+p859T3nc+Az8LCwknn3DXv/TYuMw6JMUL4YP2JP8211vqNMebm4uLiA0ngqqruMkBJUEyYEEKLFaWI4NxCI3+hDaSUEgapsiw7o2dmZu7XdT1LrEt7KQap24OhHkqse4iNjS25MrIeKFKsz0mywzRN8xcXiVmLqCQ97UtoLPLZbVC//YfQePHvnyN8Xo7SKSko6nQqYQ3l5kkyZZFoQMVajHjMHjoNc/gKvjQTCBXZv65g+OiWNK8eRjHddB1JWJOSRcmwg4H8uv1f7Dp7CR99CbtpHo0vgJU+0ARIMYVi/1W4T68kfH4L6DzlKt2Z+8MhOt1u/P/8dWzeexBjO/agpzIEKlFFBpXlkFBBlVMwfx6At2sxBJ9yAT05ueGGKUocu3FbJv7ZjbWvfdTOo2M0qmBgPXMaeGsncIMhxjfvhC43yuDdIqvBrNWDHrYfOIq/9+1HF0wcGcu8g6g0ghKojgY4hAHLXGMs62J85wVkvx+ikh6U9yH+snFTWx3nA+8dYVluyw8hOSpVVEUYA4IVVG2hHWJnaiuCb6ISMi09eQzbt5JNjHOngOtknA2EjIpDsg5V5PC6YE4mGc/J8MNTEijIli1/hEFvTeaPnIjzp87BZhtk1QJrDTCgtaylM4eU14/I6KesP4wrz+5g5cU9yYqxKHNzcxWdmDvLShSlMKFtG3w3P+KoEVK1+Q6ullD36IUCtLLlzbAUYpjXeelYV22pRn7gZfReXyeb03DQhQ8hGrbKUuqFT2yk4841eRydDmgjtFFGY7Rum5QygmY3VkVRXtSrq6uvp6enX7O7tpJhKvWEZujUjZyTxdP/aDQTypnrOs/zl5R/eXl5+cE3AAAA//8CHw2iAAAABklEQVQDAMA+frSTam4fAAAAAElFTkSuQmCC"></cm-button>
              <cm-button id="btn_ext_gmail" label="GMail" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACGUlEQVR4nKRTPWhTURT+zv1J0j+rLYGCQRAz2KChKk0Lih38od3ciuLioFACDt3csuggiGKhYBXcHASdjEN1aKWUmupWEDGFgh2E19RqEprX3B/fTTSEQlxy4HA/3vm+755z3nsCbYZAm1EzWI7F+mSIj+4yuXo+n/f+J7BvEdUH+HC5pFd6x7HNMgCzIT4nGctKU134cur4WCtx8d7AmAqLBc4p2ynEnM2AsVQ8Lpn2T1asBSdKdEXC2cKl1LQrNm4NsHdudNpu9GaFRAKVoHWrk0hBivvXv9HVDzf10MY8lDVBP9QliR5sLQ2nflyWt53B1lL1sQxh0hgGo0xAIczvxdSb9Sv1Hby4MIP1/GuML98FNwq+CSFMbLKi9pKuHuZ8sGIMOmFQtBIz5SReFY+gFM+DdfTBcquxkriGZxPPrdd92IsERCcQjA26dDjCCN9txEvvnLUvd48Ftfp4fw8LqXxsDpzGw9SjKVQrs8EYwVPU0mHSavbO0NGpNdWPCOnGYlnzlqVV9LU7XuhZXEsr2FsE/HLpcM/i53R+QBRCZKlZw/a/qg7jc3dG368+1YSLLh2u1RT4fv6/L1EQsVrD1ujGDdF3uU/NZGsMkQw83Hi6rmUj26haUM7AeMYaj3Puo0Uwxnxo4wVOHozN5SdGqiKTIXPmib3R/xuHHGmzjJ1WBiVOHw8KfcJhvxj9CcoYQpvR9t/4BwAA//9dudKZAAAABklEQVQDAO8z2SB1xz9XAAAAAElFTkSuQmCC"></cm-button>
              <cm-button id="btn_ext_meet" label="Meet" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACvElEQVR4nJxTzUtUURQ/9+N9jE7qpFRDE4QIQRGBmJi0qIWEH9VGB4qKoqBFLdq0EsSFLeofaFPWpo2zK1CiTbVxUa0Uoyw0MmSaFGd0nPfm3XtP576ZhbUJOo/7wb3v/M7v/M65HHYYAjD4h/39j9x5QTe4OA1eRwvwlRWATP2OtpBJkOMHCNg4mPhwakRANmditCkAkQXQ+b5jl1pvLo5ja8VnihtyYQRMEyLBSwRcLWsz3HIGlnYyYNZ56VTvVVfox6g5t1QsH7vaLRdEzVJs4OnmNdNJR0sncuevbATiFaECh57Wywo3JqNQGykjgAZyi+pJkakyGg0cvYoWebel+eCzgUmWxGu+Di7I23dedx8Ivj+SFFAB6sHKwweHt2YLkZLMYcZQwj45j3meTnwruqVbxc7R3Ulsjzar2oKzkxPB2VB6z9HSpSTfvYVumGbviXTtxAr8Eqpvyil5Y75d4b60aUv5UqHhxuBF6epQ+RhaZTkNPdRb4i/ugpyZGxD9R0HDHKSe5Pf8HF1u31+JUGSYktowZCwuGkhNOmItUGybJoGsMIKwfgShkMT+jq1w4YvRCovoU2GsFnHRYxMgOQfGhRXeCoZse7k1hLEc5ZeLc5wBKHXnhpu2Ehx+/VjXVA6KDsKiCIKTa6WiYYIOY8mN5sefDnX1netS2iVUbWjytTJeMpW0gcqMswp3RVqHkaJLlKuFAnWDsdVExhVLH1q+J30JjiZqjMdEdaCMirRJNDU2UjITKogG3VTidLgWOJwL4UjHF7QwGg4YCSZUNHRt2GpxVvtc5lAGn/J8dTAqBZMI4VcZVPV8QpiPwJ0MtUGV8WpI5UuSJLUuNrVetgB6W+UJ7vNKdrZC7+N63Acxx5F5t23XXo/5eUz33MewuUiKwZ/WRpqHXriQzVXrr8/qjqwOgvCf9hsAAP//DwzWiQAAAAZJREFUAwCFIUoGtp8DCgAAAABJRU5ErkJggg=="></cm-button>
              <cm-button id="btn_ext_messages" label="Messages" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAClElEQVR4nGxTTUhUURT+7n0/M5PYTI4JGTZNReBKkJRoGWVE9AOtIqggCFoUIbaMBgrDWhTt20SLyFIIMqi2EWlQFLopDYWgUkdEnfG9+949nfvevEayCzPvnXPvOd/PPc8GSACCbg/TKQj0+lXq4NjilABxxvwTOAXPSePd0krYf/O084aIBC9TDNwZputcUgp9wI4yiGoQ1dXfHZdjAe15uHD1pHhgwEX/Uzrh2BjWCuSpUH+cLsuZuWUEWiNmF7WhWrOgNd9od+/Mq2LO6jp7GF9szvdJ3v616IWP3n61fpaXIxiIpNjsJhxgf/o2q8Zmqm53oeEcsLlX3HqiK36g0/dfTWB+oQKRqYmgmgPJimLTWBB5IbLZXPlI+66D0rVE+v3kHOYZWWYckAZFPzaJNFcZfBMbN0N+CQ2zUGdSqWbt4Jpk8ya/z1cIlmWKELlutMdoQJzjrK7lIjZWSihi/QekUnioyJERjtk1UJFpItaeNDGxqN9JIZ9nHtgom13cW1ypfICdlmQ4mjPxQREbaApl7Ie5mVUfxS0t1JbPUgj8kOePi6XObW13dxcKElqEUAHAtKBC4qeoxwHZ3Li90EZd24uBsCGZ9GOBEslLTXAWCM+XAvT8ni0rBrVRX9qYY0sLuYYGNKZc29rAA+Hhs1fF/r/XdKhETc05vOBp2+tXETKYFV18ioXIWHnInH1FARe99kNxcahPTCeDGxnXU6KWXJZeWlJ0Ko+UtITUpAf45qdYEKctJVJqfPCyO5rU1QeFpaAk9LEBas24GGHGHRRgldXvedYrxrFu0dpxXd9kAzexbHT4AfZhK0anFiB3bIIenGA1fAZrPjb8r8nRG1RszGJkVePM0BUxliD+e/wPAAAA//9jgFHPAAAABklEQVQDAG6hQ/TUpfbKAAAAAElFTkSuQmCC"></cm-button>
              <cm-button id="btn_ext_web_calls" label="Web Calls / Voicemail" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACJUlEQVR4nKSRz2sTQRzF38zuJk2TpkkTI2gNNvXHQVIREQQPrUcRPXrxqEUQ9KJIe5H8Dd7MTSoihOJBRURBFNGLWuxJ8AetP/KTJjXVbHZ3Zr/OjrZisVTpg9ldZt77MPu+HBuUGTxGLlajqfSmS6aFnO+TZASmT8nXb2KcDPVVrZdRqVUERPda48boE3XENGAgGT8difPLTtsDMywE8SBJ4JrDGIPruWjUPoGrCDH/KPbfzuHlsY52EKHs2srIjZ/hIB0szvRiysU5RyjUo80g/g65IYFfNq2xCRozoxiSEg75v/ehmGTDDycRai2W+Yf5OeHYuP/t1qH6CqB/Ip+U7tL5SCqcyea3SeJqn/RNCJZpkPP19avjz4trlgjXOBVJDRZEqwun2Yu+TB984QftgboEozeDfdPD1ZmbU3eRLHIUzwhd0TLAMGjWazt1ZvEe4ow5XY8ZvrTUMKQqkHtL4ovtiTcoMans/nL4jw72jud2bc9nsonhAbezYLMXsa2LKcNWONMU3fbczIl7jb/9ggZ0HuFgxGRX0aWEqMGWH2FZDFPGJAqrvLQaoMdoSX4YW/gIkkbWZGx3OIbcdxPjV84hrBB8rfDKDWgBcTGPsyZhs/cZUf+96s5BKTGJh1hHusTm6IH+eCyabnbcp6nZZ9P4D2mATPsnzQwumC238vYI7uyIQWCPGmJBN74+wIV3XbbsQZL0eOcDOPqkhH8Swwb1AwAA//8k9MuTAAAABklEQVQDAH6R0+dVKI8BAAAAAElFTkSuQmCC"></cm-button>
            </cm-collapsible-list>

            <!-- Developer -->
            <cm-collapsible-list label="Developer">
              <cm-button id="btn_ext_draw_io" label="draw.io" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABr0lEQVR4nKRSPUvDUBTNx0teQkFxEUqlmy5FFASdoiAOgnP9FRakCIVSSqFQ7NShi/+hOAiiKC4OLi5O4hDFSahDBhebL/M8LxhJkxQVHzzexzn33HPve0T45yCTgHK5LBuGQUzTFIbDoT8YDD6yeGLGmbXb7XlCSA/7KX7GfPc876DZbN5HnChAike3Wq1QUJKkBUVRdjANzHVN07ZVVS19OZN+LEHE8H0/YIzxPQuCQIaomMVNOgitIfgZyyumi2lDwLJt+5Fj6EUwUSAygAAe/AQHWxDbxP4Bdy9CumcpAe6Aoe4qgq/r9fpNo9G4xd0FpbQa4UJWDyqVCsVC8/n8Iuo2kHE3ygj7RxA97nQ6G67r3lmW5fT7fWfMQaFQOCwWiyaadYonXIXIfpQR2ffwCmvATnK5nAluD/2SkiWUkGUW1nVZlgnIK99NEcUlYCowDRjnLMOFkhQQEcTJFORUc+GKvy6FQMjF72RjPYDqJeqbwdZzHEfB+TwWf4W7Oaw+OCrWMzynGyrFs9RqtWld18XRaMS63e5bHEPN/FtLSSzzd/1lJL9yXJD9BvsEAAD//+tevEUAAAAGSURBVAMAfKS0uuLnsNgAAAAASUVORK5CYII="></cm-button>
              <cm-button id="btn_ext_blogger" label="Blogger" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACoklEQVR4nExTPWtUQRQ9M2/26+0mJpJAxMQUdopYmEAsTGVjI2LwL2wsBAvxlyioKWzs/EJsBBtBBFNErKxkFUREjO6yLrv79r2ZuZ6Zt0Zf8Wbmztwz95xzx4Cf7LUr6H5YRJF7oAlkTuHgG/2b1rVgyLFmNY6u76u1nULJw+UGCv0MiWzASs7tBMJ/gBCUPyEuHOA5Ku+gpQqvdtHoXjJw2TxcshnwITysEk79NEnKJM0Y8w5Awp71m7CYN8jGHklryLM1SCKwQxVwRLUQAbmhJj+hTMqZhpIwqFDfEBm8QTMl5xDQCm4A1zqpsvVb8IdXyYJhSaA6j1B7dx1G10pOIipuMlVjwgUJhbLDheP127BH1uAmFnmWw+YZ3Ok2+qs3YUf9QEfFg54AOZSO6oZBHGFm4eeOQY0H+PbkGn7cP49fz29wPYFduYieX2BiRnrEmPpkok3SiqqrIE4QyyRYvnKXIcsbq9SsQLp8AnbrDXqPz2J+NuSUCLw6LVVlBaG0v8iescJrFDanUQNE7ZoLmOQ0zkrpcKxgRLR6I4JE+2mjEGz/6TbMsAMT5D10HDOXH8Qzxki8yIV5BEiDvaFBKKsfQHW/QK2cwdLWncBp2k/ca84g+/SR/TZAojXbwU8p2FGwJXQQF4WYt1cx+bwHpyoUukYV6hS3gqyzB/uqjbRWBBNpOgEoj4kaNrxQQBFdR330XuTlOXSHM4QUUiB3tkiifmOumqNSrQZxeaV4NQoU6mnooCYp8CM2Oy6tOKSNASZFKFGY7CMIQiN5q0pqvsnitPnaH/WWZtPXicaGd3xM4hIpWYfehOV54URTWOXCexCnRapOsPu9j1407V4blQun0kU3VlEZVQxVtPf/pxxSK0RmKGlAv+hgf3sHxR8AAAD//+DfOZUAAAAGSURBVAMAZx9OnJCq/X0AAAAASUVORK5CYII="></cm-button>
              <cm-button id="btn_ext_cloud" label="Cloud" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACAElEQVR4nKRTPW/TUBQ97z07bUlKDSitKgYCCwxIlB8AihcYK34AkmeWOCMT7kS3hl/QiYVKKPwCZ4EJUFFZERaVEBJIPJUmbXDs1/OctmqatEuffOz3ce+55953LXHB4UzaNLUlDzP9AHO791D9B1T3vmBetMXqfnLaVkxwXoPMQ5RSYK4HzO8A17vADa4XTUsEaJ60lyPOtx+uQTlhwWuIXAxDlIhLRAWhibE+kcA8eBagvBjCnaUTPXLVgZFNSNPElOigTCOLaQTmE8KxFDaevo3fz1ypaxikJk1e33rk47lIjgO8QQsLaFAF4EKnEn7pLjaHBC/NC74jjI+IJCsFQQwvK+O7meZXAZkQekeY+5LOwRnOIwqFD91zVfO3Usm2VPgmpZcIZ12QIOZ5fagTm3R5RTQ4f8foY8QbW5W6lirukpp3owVWzV8ae4fnN0/mfdZY/nzHpLZWwhSNpIkjghpxLsHCh8eNj3tpIVfKLLEptLhq2EPFTSrrFJmrjFdGkZUfbKiv7IMtCPdnDXKXQTKakADZioM+CziFZRvdbvOpg9IgOWex7MVjQIGDazzrDoll3ypgvURLIhI2BZ+O7SKyhW0vaQqZRRvmlxm0yu9Vbs1q5C4LPfDht/XovxAZj922VMydAYPvE3+IX0RCrm2N/70ETyJ95CJwwXEAAAD//7RsR5EAAAAGSURBVAMAJG6prHveXU4AAAAASUVORK5CYII="></cm-button>
              <cm-button id="btn_ext_firebase" label="Firebase" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACQ0lEQVR4nHySPUwUURSFv/dmZ39wFxJY0RjBBCQRf0IsTLSwwUJoLNHEaKmFlaWxYEtrLK0sbEisTNTCxKCtP6FAEgFjgg2Cf6y7wO7Oe56ZZQnqhtnszJs79557zrnXssc1d5ju+WOcis8eTLsc2y5YUvzpUTK5Lh7tC3m+eJI+Vft2IKl/A3GSstxSmsnOgLGaAg3P46/7GTWrVPZksF3slwYY0uH27whXddTyAWfKvTygycK2BdAXszhO2k8T2DxXCwHZCCIBhuWIut6vLBxnMma3G6StMQuDPCt0cLHiiUQrlunEyIWSXPdcGpjjSYutiTvr5P0Mw+S4wRZmbYqJygcO1kUhSDW1Kc9lLHbTs1yuMHL6Mz//NjHFHYpc4wcUxyE/iFt5gWnINhs05W6IUVdAv+1QHtyfFr5Nur8hVJdzrFKnypaPiLL92N7RuPfO/LxpCnYOLsSHCZ2bZpTJKLVHisPkl5dJG/hcHzZ7SE42VG8SzabhEsk9Le+bAB+lHNYIBOPUqVtPm9jnM0WaVpqEiE+Z2Di+tYZgfQlrboo6vBYPo2RHAeOLitTisu1RJRCJDBt5ZuKQPLC7l2JKtGvqGvNomCMCSRNVPwkgTAZRz1nCXxHLtTIPtz2IrCkli2HMeWbF45YcsKR1zwqgEx8WZJo8yBvSSlz3husnvvC9Rczs3sRkIi8Z0z6UWGaEFcHoWp+luv6WV5sb3B2a511rif7bxB2QeFXvcVZMhiXIcYBZc5n3sQslfdPftWr+AAAA///J0GZNAAAABklEQVQDAEFZ4F29A5+sAAAAAElFTkSuQmCC"></cm-button>
              <cm-button id="btn_ext_github_dev" label="GitHub" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABtklEQVR4nIyTwStEURSH73szZCiFopTFlM00CzYayp9gpxTFQtkQZcfeghQLC81kFvakLEjZDCuJsLCYwoxig5JixpiZ5zszZ+r2snDq6517z/ndd96557kG8zzPMWr4A5CEe/iCnPpbEDM+s4V1PJZhGhpq2768HGzAouM45UoAoctTxDswZP5nuzAKJVdPWlHxMYxBCj4hCxn1TzV2CMOwJFqpoF8FAYizOcNeEL8D3vSNrfBKrEBsHX8WvmFQEqegXhOLJMhBJZKfrJKfpdEaK+rLGmFSNtM43ZCHXoRp7YuH72mDK02UNRbGvYEmuJbETu3yCzxoYrkmrgmt9aNUpH7YVbGnJ4bsmfCbxuSKm1UXcLXTYm0Q0zKDvuGSzaBWIU1v15dmXb0eo1cl0xYhsfjHJ0iDo6Y6SEYrOJED4rpIwgXckrgHPVYFUdjGPYMIyOwUICFlXRLcZDEHfXAntwEf1ufLDU2oL+McgjW0V/YoH0EXLECG4LlVgTQuY6rDJbYPI/Dj+JISMK5bLRzyrjHpuvglzZmXqZRYsNZlrFKm/Lam+l/krU+QsV2FA/JSlsb7BQAA//8fGtSHAAAABklEQVQDAIsg4TDVy+61AAAAAElFTkSuQmCC"></cm-button>
              <cm-button id="btn_ext_hostgator" label="Hostgator" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADaklEQVR4nHSRXWhcRRTHz5k7c+/e/cpm3SQ1YeOyu023BNLSYpu0NGm0QaUGqthCSkGk+uCDSEHrQ23ZUBAC+mLBYvviQ2zBFxEEH0J1k8ag0ZQmmmiaph8JbkjTjUk2e/d+zYx3U1sotAdmmHPg/zv/M4fCE6LtxIjuC9pfEUq3cEneyGX33ISnBHksy2Y3cl/QfCccDh/x6/o2Itz+rt6rPZ2nh5vbTl7Z9XTA4cOKBxCVZ9mhbyeiRO6Jg8OR7iaKeokS8Wss6h/qOv3j3gcCiZVbeQSYmpJekR448+L7VX5xNMII1qtrij9cJW8trgtdcVhbuoqtmnLmyN74SE/TZfr92JigD/W7T/3SWqdf6Tu569v2VGhWjBZexpHlLjBtAwkibIroXNVCWHLdQPaBU/HIwaHsDwlD+Ac7kncyxxq/Ae2PAGyu+x1yC37M3WyEsO6ixTkyMQuO46Refb2jfDU7wXsbTtyrzFE5cusHU691J0f7+1q/9BlTUVBNIKUWLs+O9eDIXAY+2nkJuhPDcsmp9xwJqNFWHNuVn1Qc4P7sT7Fq1fwwb9S2pCPzmGy6QUoTqtRml/GF7dfk9tRd3FlzA6jlYDhQgoBe9lo6Cnfg/sYI6f3HLwSiDUfLpaK8vpQizbF5rH92DtdHiwCTRUyGFoCFUWCkGl1XyQug45beGRE0dnzDQWrfW4uWtV5kxG1dsUIwvpiGzvQkVm2R4OQ5GNdMyecE8My7Eoami+6av286fXHw089fGSDe/snA2fafkTujQFQIUFPmjRqYWEhIwgBYdwx8HWGUlkuc/vMgJqcb6J3Cxea/np89dw5tpbL/A2eGDiqqdlkKCUgkmA5Bl2rQUXsdzAJFltKk2qQCk6ughbjNdig+Wutzey/Mf4ftpwbjGiPDqNBGkBJsYw3QoxBVx8/2fQHNgRlYyftBCwqJUYZ3yw0w/u9mkbu19c+Z1caDVGV4/n+xcCwj55rlTPCZmvoVUxXD/7Tgth3TGIwLyZcELv2tGh/fPnY/b8TiQT+0MDC+JiBkbaVzpa3CmKNX1wyAwiRDLicKSSgbASBCSBalkHiusLpJX/4t6LNRRcuTSdMDwJuCu7flBoW85BUz3DIdRgS5Z0Tksh0CVeOImgt2yFcnFOUQ935DCHfBtMl7/wEAAP//hqpPSwAAAAZJREFUAwAVsIPwuegLRwAAAABJRU5ErkJggg=="></cm-button>
              <cm-button id="btn_ext_jalbum" label="jAlbum" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAwlJREFUOI1tk11sk3UUxn/n/77M0Y1u61rY2DrZdB/aYIXoQgkmJn7FQAghizdGLwhXBoxemXDlEse8MTEEr7jxxjijFkdcYAsMJQ6ERFwY3ZZNyQYZo53rZB9d1/b9Hy9aNFGfq+finDxPTs4PVe1S1YyqeqpqrbWqRaOP/ODoZf32er+WZK21XmmnS1TVAgKoqgqAolhrcY3LqZ/OcGPxLLMP5ti39RC9h7uLgyICqAFEUfWsJyKCVYsguI7LubFBJjJn2Tnr8E54N1dTcfp/HVCrVjzrqaqKUVQFEcc42JzFMQ7Z3AbD4xf5ZuYL3ngmwscnhrgSnyK2q52BxLA4xqHUVkVVNbX8B6eunWFl0yJtvgbuZ2ZIc4+KzZV0BKvJ313F+FwupOe5M5Gm55UTHIjuL7bNZLPaO9xNoWyUhUmPhyFDR1sd2zb7KXMMi5ksOUe5v7RKMr1G0ltj+uYE/W/1EWvdi7kwdpmsM85+00zfBz+y3Reg3l9N0FdOuGYLDRU+thSE7X4fgYCPirEsz9WFmXk4h4hgdja2MZd2WW8Ujnx+ABN0sBsF/OWPUVfrp615K03hWtaXclzpHuHB13coC5aDFVQV98m6Fo5Ej9FzrYcdzSH8OYVNgvG5zE4nuXX9LkMDk/wyOMX6UpZjva8zmvuTmrIqANy8l+elp15kZX2JT6dO0/l0CwupDOc++o6ReIK1lRyPFI020vRamPMXUzx/cBcigmvEYNXSXh+hKmG4cfomV7+8TX61uChGUKuEw9W8+9khPhn9mVhtlGBVCM96GBEBhdbQE7zc9CqhBiXSvo2aSl8x1ip79rZwsu9NzucW+G38HsdfOIqqFm9gxKhVK65r9Oie45IXKO8YIpY1+Dd8PN4QoLIjwFfTv/P9pUt8uO89OltjeNbDMU7xkf7hQBDgh6kR4pNxJtcSLOeWmUim2EhneL/zbU4e7lGriBGjIiL/gUlRjBgA5heT3J5PkFqZI1If4dkduynm8TdM/B/OBa+gBa+g/1YJIFuazahq118yqs2ZPCXIRAAAAABJRU5ErkJggg=="></cm-button>
              <cm-button id="btn_ext_phaser_io" label="PhaserIO" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABP0lEQVR4nKSSP0vDUBTFz5N0cFGoi59CRMFNhDo4qOCimau4qFAnG1cXayc72KWg4hZ1EMRBkAq6u/U7uLSFLh1KSd+9aV9729e0pQfykty887t/8hxMKYeW63g8oPtlpaIwoRwyeycLwMYi4JYCAXl4DsTu5IGyVoDcP19eSkPyCCHanHL3xeYcNLAPoriCRqMb0ZD54hKSX6/8ejsbhs/rbYj/IiqZ0dlkTVSNRWy0iFvYXV6V0WZooBbUo90oAO8/3wMf0t4Rsj7QP4e5go8aQMPlNmgJtKz04scdPn//RGxrfQWJ7VMoFfoZcJE+tG6KEsE3d874HMDLt/uk36iHmCm8IVGOBnTkGKM+SBm3BMRiWHu64gxRouymBXqiSqrHe6aFYaKZZG/u2dxZxAyGmXuMxmwAGF9qZGBStQAAAP//mrUR6gAAAAZJREFUAwAabG1gVeqaYwAAAABJRU5ErkJggg=="></cm-button>
              <cm-button id="btn_ext_remote_desktop" label="Remote Desktop" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACw0lEQVR4nKRTT0gUURj/vpk3u+mOq64iLGLGRpFg0cW2KCgFWYsgCIISDLp18dIpD+JCt+xaePAQdAiiy1IeXEwPBWKnCHbRyN1cdk3X3VXX/Tt/3ut7oy7dfcPAzJv3/f593zA44WLHD+FwWNnb2wvlcjmfoigWLTz+Ztt2o4BzLmix1tbW/OzsbBRl4dTUFIyPj9/t7u6O+P3+RgEdbNz/v6uqCslkElKp1D3JokjgkZGR+6Ojox/HxsaQWCxSIdkcFYgNMUKCM8ZwZmZGiUQiT9jS0pKSz+eHY7HYUL1eh3g8zg3DUGQRsaFkPHp2AFwuFwQCAUHgjjuWTqfvdHV1RUKhENRqNbG5uYlHekFexN+wIFVlMhmpTNpwzrFKpdLu9XpFMBi0TdNUVGKjAwpqmuBSgWEc4tG+2+3GaDQqstksSLUEiIw82RKRirFWraLq8QCoTNi5HZS8SpsPpAP74ICcoJOBruuCiqUN0WgjmQVFbwEz9hOK79+imfoj24Wu3jOgP3qM7v7LAk3rsPeMOXacQCUst6nnmkvhy99g58VzsEslOMUEkn0o/UpA9euyaAu/xPahm8Atizd7PE6YpIC0ErWGKuwLg0+vvMOn5Qo0nT8L6eBDQA9C/6kPYBWSAPtvBFhXwN3UjIsLCyxNYfp8vl1mmAZomkvEt9bgVUcZrl7ohM4bz2Cyeh1hG2BysEcMXZpAu/qX26UYAXhxI7H+em098WlgYOCLYpEMBRUoc5PbtRKfvtbBV9w9vLpl2MWCYa9m/BwMmr5akbvUilCZBn0Xzy3Ozc3NywFk3iZ9d2sni7zKtImWQdoB6HDH4EFvBgwK4bSag+/pYbAoL/hRhkKxRB1jlvwFnEBpcD5TGLeFYXfc0nssSga3zQQEPAaoYEN6Q4dVo49SF8Kq/2YtzVjIZvPzBOCMIsIJ1z8AAAD///X3inIAAAAGSURBVAMAM02IMPk9AF0AAAAASUVORK5CYII="></cm-button>
              <cm-button id="btn_ext_crates_io" label="Rust Package Registry" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC9ElEQVR4nHSTy4sUZxTFz/eq11R19fR0j6l0MgTSiUg2CkJ2YnZJIAhBEFz6Xwguxo2IK3HvA0QXiiiIIG4UVBBREEVF0ZnRcWxRp7umq6u66/l5Wzc6am3v/c6993dOSaz79NV5+SZ6sLHU5f9Cyt1c+aU2/FNFvHKu/e+mZ4zNV5/3s/UCL8/9s4sr+5CwGm0wJlBlYLooGeOLuhxf0kVxXnjy7uxfZ4ffFHhyYvNeZdUOKLcNXiXgXALCAKRLzRqsSiNdZXeh9ckIG07J9QIVLVjmKVTWA7fqYKpGdxXQ6So0V9DS9SCN7fna4gZTjS9/JWBYPpTjQ3pzpDSCziOaOsbklCofah2/ZlwICKSouMO+EHh3Y4/XX7gfVNEIVZmRQAZDCeR5Al3mUIbJGHISpBpJYJRAaj3Pu5ceb9Rl+l++Fu3gRm1L3FsCT/oQwgRzXbzpjSEFx48tG5Ppmtjq6pMZcunstdkK/LhVm/uTSxtFuIokSeixhGECZjmFrAAcUxBQTthtaNVAmbwnAxzI1f5bQxTZdJ5XkFRPRxEK5tIUSeBiNBVNbtowDIVCKwKcIYtfQQnaQ1ZMxsNUiyJGOn5CUxW4cuDYBvJKUDM9gITtNVHkMZkxwoD49KMcwYwF17Mhh72EKxUzKWlFlkFZQJwQMII37bsEkyzMViHISsJP52gCy6nOMRoRg1vdH+qBM3TnAhsqX6bVxwhpQlFxWHR3U9TBdfYxc4wzNH0Ta4nASuh7g7Q+I58vIQwbzdvLEfu5oXz/l1bxqynJxlQjSw1KMxlGa5WlRm+osLAi8PRFmnq+cT+Y9aJJlGVQr7fDNA62dNrbtm8O9rWmBmbTecvaM1CdTgdRGeDR8wRp4YxXuv2b/TA6CmldPnj6Rn8SpKIbhsuTHD182X3nTakBnRA0a1O//b21tXMoG+rxs248iPLr7vT0MQZx5eCZO2vf/Rs/RQwzv//U2rpj26b9f3TaWFh8cWQQJRcPX7gXrm/+AAAA///9Pgk6AAAABklEQVQDAKY/VItV6E3iAAAAAElFTkSuQmCC"></cm-button>
              <cm-button id="btn_ext_rust_playground" label="Rust Playground" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB6ElEQVR4nGyTS0hVURSG77neCqIiSKgGRYMgeoIUUVEQN6JBNIgKatLEaFKD6IHkXBB05kAQFEV0IIgKKjhwIioiKj4QFfH9mAk+EZ/X7/f+R47gge/sc/b+12OvtXci5ieVSsWDINhnPMVvFryEW1qCUWiDPjS7oVZ2gY0zmNhjfM7vD/hsvx1wBh75vwqK0XaENgEfjBpSH1jMh5tQC81wG3ZgGj7Ca2eTi03doa0zUOQSuA6/oQLBFvM35IDvBeu+MFTDMHxnvlOhL/BTDu9hG5bgHJyGfddAgfrhK9yBBqiB7Div+/AMemEZrsB5O5uEGTt46q2NuzZJuCsHrxypB/57j4raBE/gDQxZs+7udLmoSTnIhKvQ7SpnelGdWINZeAhbkAOlMGDdpbjTU8QWFY5xzw60pb9QaY1q8hiNtvbAmniC15yNCiio0j/rdFdcbXUny8X7ieYi4x/YhUV1QftsteFJzz34Br8icwq4qRoogxEX7JPHMZiHDQt1BgphCi7H0l17F2oT7GmFLIqcpg6UWjTIfGsk4jKaiVj6fCQdpAjNavQo66jmRVIsgwnXQ5cqO+IwB5v66FGOXqZ/8BYyjpfisGiNKraO8NFlClcj11mt1e17Addi6RarU+3QE2rC63wAAAD//8e3PxkAAAAGSURBVAMAu0jLSSWWiTwAAAAASUVORK5CYII="></cm-button>
              <cm-button id="btn_ext_sites" label="Sites" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAhUlEQVR4nMSQ3Q1AUAyFT2/uAEYwDWICnsxgAzawhQn8jHNHMIGqBwkJiXsb8b01TU+/1iblVBHWDowIfjgi01hibqTwHd6JWRZbgGOEItYWSi4Bc5+/GsrK8T5AbXBODgpQGzz94DA7+t/94JcASouBoUBtYEBYEI4zxKjlEgdfZDEB7QYAAP//nqvh9QAAAAZJREFUAwAQ9h+b/bV3wQAAAABJRU5ErkJggg=="></cm-button>
              <cm-button id="btn_ext_vscode_dev" label="Visual Studio Code" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB1ElEQVR4nIxTz0sbQRT+Zpq1UGjZ/qLQ0wba0N4iPRaKHnso1P4DbQ+ejReRCO5Gbyom4h8g3oW9eBGFDR4FXRXEo3tQUBEU9WBMdp5vZxOzq0Iy7McO773vez9mRqLbVfTyhr1+nlu+XrDcc6tlFl2Rx9f+IkQFtYaZ+/FdmwioImwMZzqSi2tDaFAlZlH0tVYfZMaTelv2rSfJo6s2VFiBUmgDSZgS5X0boucA07sTKfLIig0KHZ0ygtL/KjExCYHZvQPeNisQAcRtPw6PbUj8SwkKlDD10/m0dElJc0YTlOGxuqWFlPS5NxP1G/bKKOsFBA1g+ldVj0Glu5QY7g1wW2cRCnSZECbefwBevARqdZ50vRczMTkeZBrxKZwE3KMBvGNiz/M48NUbxlsT1EhlfFxBwbVA0gNCCydHwPVVPDANlde+Sf93W4FSkFDC42BLG55hG2enWYRqri3CPiFcTO7YrQqSyHDAItvZSXOY/1No5img5PPwYCcyOxjb6rvvX7QOR4e7JioDF3i4HN/h6LbITQjray4V0vktOJsFkCjrrDUW+PL5wRA7Cnzjq0z/9X3Qt7HZQvSYQP3dvcZoFTfyhjDcj9lsIIhKweDramS+AwAA///CfrpiAAAABklEQVQDACiz5ep3KqA5AAAAAElFTkSuQmCC"></cm-button>
            </cm-collapsible-list>

            <!-- Financial -->
            <cm-collapsible-list label="Financial">
              <cm-button id="btn_ext_amazon" label="Amazon" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB7klEQVR4nJSTT2gTURDGfxtsoFpNQMSEHvSmYoooqAQVAtqeKlIN4iUgQXq2irQHY72IRCkRvVliNYcUL00OXsRDsQcVMSBpoTSHlpSSTdtDuk1poT1sZ3eTkmzTfwPzdvjefN/OezPPoeu6U3xAfE7fv81VOE5FltdAHzWWy+WIx+NMz8ygKAq3OzsJhUI0sLeGgCqBp4pkMhmu+v0otswnPT1Eo1G7QNEhS3Mt8nFw0CQHAgEmxscJh8MmnhwepoE1GxUsSeCqIqqqUigU0DSN5XKZZDJJKpUy9zbW1+0C2iE7UhbSo+5u8+/7MYcdeB6JmGRfWxuz+TyxWOxgAtVyg8EgXq+XbDZbV92eAj6fz/y+7O+nvaODT0NDW3tfEoltAtYlrqouDntNwGjjna4u5otFTno89PX28nNsjFKpRPprgiMLP1CW/1vsywOaJfDtvIvrI+A+w642eg9aToPTDZMv4IGuWUe49B6+n4W/T2FF3Vngygc4cQ1O3ReR4zVHMOYgL5f3566V6L4hs9kOTcdAN7JktOZHxdPgH7HwxV9wIaLVj/LiP5h4BQtpi0iFbwQt5+CiVNp6Syaq0o2mo0VD4I2Ez+pKXZoSsd+SqFkKbulM681GhzIfk1OCd+IPsb2LXWxN/LP4400AAAD//ylDq/sAAAAGSURBVAMA60jud8cJS9IAAAAASUVORK5CYII="></cm-button>
              <cm-button id="btn_ext_finance" label="Finance" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACrUlEQVR4nKRTTUhUURQ+99733rz5n5hyzGmCBskQJgoXRZYYUtvAamFBm1pUi/6sICqcIJAW/Qgt2kbZwlbRwk2RUhRUZmCERYkU6Kjz54zz+969pzs/6iRIi87jvPc493znfOfnKvCfoqxiJ1Ix1N8Z1Bi9QhjakcP4yHjoJoTDotaRrkQiAgkPNKs4AEynok31aCeYrnbJo56mwCf7PxkQAgjwtRiW/5seqwvrskVTGELaaTIGMVg1AJaxksALCGaoutueM4xT+anGd2YD1SRaCMG84IXoigDLJYTLdQMHdt3uhofghCcdlsjJDGd5RmVdUuL5FFbTkYrWBCBhEFUqFijIlhlgEiJKrAhWYgunsplVvbGi1RI+trSoLWvANp0AQ9BRzoBSUCUqTziW2opEIHBCFva6fOd7LzJdCWIhl56O+85RbG7WNnrIcIaxX/JgjP9wbxMlelmYREHdBOWjEArICj+7u34DGEFmcx2R6Y8Djao07nTqMsdWgegCQfxm2tJINbMHHsD2aYY3nFZq5xySFsfovroziQvMYu3i89GEjDjhtFo0RSQVBDvPckF0i4NaHOOR02QeP/u2FPtnHmmX9xzd9aWoLkS/Pf/epq/jt7GYTRrcOECZnmCZGFeQJSRfG3GoGlOSE5dktR/8hflBqrvWbgjEWseevT2m6qlWa53oE4VsXBTTB+fuBV4vNX+utcnJdVfSl5q8SnbODvrt6ZcgTC83C2NMd4eQ56SXKmeAcWGkOiN3A8NwGBk8LU2NII2YHpunmD5LOmbfN1hTI1S1e4WZv6Zg/Q6eT90COQ7gRkrkasGEL46RlHU/2hpCM71Ec9VhNvFmqs9/f5FifffsIUAei9xZ/2oZXLP6pVd7e1gZGgqby2as7M/St7yqcun+vokl+QMAAP//d97rfAAAAAZJREFUAwAbPzFbJKmWkwAAAABJRU5ErkJggg=="></cm-button>
              <cm-button id="btn_ext_google_one" label="One" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB8klEQVR4nIySy2sTURTGv3vn3slrklIFK4hihdbXwmCJrkUQunGjqWs3+g+4EtEpBcWNOzfizopiXEpXBRHcacFuoosgCBoFkaQkMZk7M+c4mRCJdtLmbA73cX73O9+5CgnBgBBxApqLpy7A6IM/vzRX52o17/+7cluxCxkXM0RrZb8LX6/llH48c2jPvSF8LCAudkG/VlHgTTyzM3Sn07aDgHoMyaejG3KobBhqdNEv5nUcYWE9B8KS5+tGntpO05qiu0dvd1GH4ir8UYga7dl7jWNQck0QZoMWvHy4lfmYLrZvLjzI17LzBVSFEYkevBhkRbgMB7OmJ43SSL13ztavlp7oz868cvyOQULEhctLA0mhxCtuo65zkaAGlq801x/2pqcd3W1xD5YYC3AB6mf7HD4IQ2e2TLYkFuHq300CeexFEwlC5iTAPybGXpzHN6Dx3XWFfNrVypAQTBQhaLyCv1OIGNE7YuHadcvtTyT7qWMMkU9aBBzwroAYIsAbjUdxS4WTN2Tm8P0wCI1n/JycCBBHuRwn8vaq3IF3eur4LUZ6s9v/SJMBqhUeqAmJTIFSha/pfcWVVLRDkwFOlAeGKaGFIkmhHT1uZzBxC0sDBYFv3pChH1bW8pm4Ep+524zfOYovL81ZtpzZuFh5m3T+BwAA//8vlYowAAAABklEQVQDANt30t1d5SLXAAAAAElFTkSuQmCC"></cm-button>
              <cm-button id="btn_ext_play_store" label="Play Store" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACrklEQVR4nIRTTUiUURQ+9733OT81aYOlUBQYFC1qMUYUREgtWrTJqJRqE7QraNcuGUpbBCVJu0QInPAHauGmLEpFIcyklRWIhYQZ/s44Y6Pfe+/2ZvwNsi68xYN77j33nHsFliPWXF0Za688u/JHHAIMwn/CJTDFWk/XiAIvDj/IDL+TGHcGqp715TPaIHEBZqMCwj0VGb1bKc1WWMwY6YVOgag31nK26UDidNkquO28/DsDR/WE4XdUOH4oufO6sSJNZAqF3ERks3raMt3fMznU0H5tKJ0DsMunuOu1yiDObMNJLfxSiow8AumoZDkLm4FmIBoMibqhkoP9e9uqq9w/D84VWVeAXEdJVvkQuoS2fHvAwkRh5LRSWtq5jNXaiv2JbT0t6KRu/6U6/icDNwOcaq4CrEqB/G20eaSeArqY0zJJvvFUItJpD+kxICyPSY+7F1+JplQHildEzEuxViSNAh2FHHlIpPaidccLLleTIkse6yxrY6G9InElHJKNOeDqLM5zZyjgOXLpgIXhABLNEzg4m6HFiGCl8ynr90KtMXDuM5EDa6RV2DFJo7G/mvd/H8BYQwz4EWAq8q3nkVQKyqTs0+yCuYqlnhAVdXN9QRk8kgSMQFI0dl9EWWqYJjaVsDdvTECRKrzxCVya6aIFc5sq8HZNRGYOGMNznivNSX7cfYkcGBOhUh3SPhVFoByxLzP1+y6LI+ZEDuwI08o4IufieEGhCNhJbuo6h7K5YePAKBZaOddn0lmumdo9dTja8z7hIJxfJMpT57wQHeUs98x/Dt77eJN2ZUYxv3mHDPu/kPLpCdjUbu8aHM7LdB6S2mHW78DKMYmfFeW3orQYn1ERVnaxUxNqt7/+0Lt0S5AXsPExrdry9eTRM0W8QFvfDD5fdlUsq8z4R/wGAAD//yJR0XUAAAAGSURBVAMAoIY2/7qva6EAAAAASUVORK5CYII="></cm-button>
              <cm-button id="btn_ext_shopping" label="Shopping" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADIUlEQVR4nGxTXWhURxQ+Z2bu3r2mm5+11toQMC2pPtiqaAOhSkmbFhqpD0L7IqVqKZUW+lBaSp669KEPLSYIEUXQiC8+GBDxB8X4gyA+qOiDvygmMbsm0WWzMbl7b+78HGc2sqI4MDDDOec7Z77vGwFvWt8S/6Ld/GdU0o2AxDg/NXTlyJ9w+Dv9eip79Urujl2fRH0MVJtWMxtBxd8A6ve/bN/Y62KQy71SI14Uoo2R3QbW0IJEyuUXz3ib4MI7sy8m+mH9SjloYwHksFKtIEDEauH8+vgPqlu66BLb0bwFT4xuCDav2Fkpe9lqvHG8RIOl7UHXkqG4MfOAbuaBOn+FKng14av/o55Y+780i3swsHI1+hgbDYLboch2ATKInGmdEGcpMATM+KChH7vgH+zITWcDz7uPnp8FFcLAqnZoCe6B1B4IZsABaDPfizMJFZWCcVEHKaVKLVMzbWJ8pL7S+uHcE0FJ41SSof2jf8Hfy7ZyZqlKJGj3TsZBCJBw6NkHeiBeRkX2FvNJTnbkr0Rs5ADGyMWYQZ9lvBlzuriF7x7+9zY3yUOetpP7tliqkd3hipu5uB0ndACeIDbHRaHv93xUVYHAPAbbxvaiBSKC/aM9C8tT2c97Ora/CwZYb2X5oz3qo+NNbI4RkXK5QutCzQc6kXlkjiuro9Y6m1GLj4c/t+KncA7Xw9A+vaolK5I2LcEYmwgcSUrzEsDyPWpdgJbgqipkSbOK11yng8Q4dHC6uzxynOJwDYCAF2xja0N7Qs7LRoxtvrVrLOxc2x12rtnw28niRDmFd5kNkkUy0nYQ+LjmREWY97SWMfeF8lKw9U5/vO1h/7Ek3dTq4H+8MTtiAq+yZ13WpJUlShnFmMzXAJKwPOnX1U23VApvbxo+qL8uHG2b9RpAKq0dQBzwpT9dLsNEmunBtfWsPjLTxTCcrAFsO91d+mxxc2lJ8nQRj6cw9DLkiBDoRgZLDVFkRfr++jSeX92Asc+LwxfOlqoA7gfhtWtSrXvWm/iNuXKqIe3s6gw7/8vcAVF7aJoiwvdmdHR1oeiDvdZZtvY5AAAA///cZt/rAAAABklEQVQDAO3mfRMhNxj8AAAAAElFTkSuQmCC"></cm-button>
              <cm-button id="btn_ext_stripe" label="Stripe" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABg0lEQVR4jY3TPWtUQRTG8d/d3Cx3UwQFjZpsEN+QGHwBK/EDJIWksdPCInZKsLPyA9iJ2Isg6QQFiwTBQgjYKEuEiBKNjYpoilVXNnc3GYubRbL3Cvdp5szMef7MOTMTzV4KBwP3osgUBpVQIMVCO5iLQ+RuxIUyxp4iqphJqMSYLkyKiONs3Ap0O4U5U/E2bYf2jjBzkYkTJAm/f/F2hYf32dzckTpY6TcnNa7d4Nx5du3O5ntGOHOWSi6buH/h8FFG61m83KDxin0HOHSkuB85QK/uXh8+rbH0Iou73RKA1fd8+cxYnZOnmZhk7QOPH/FuJQ/IVfWnxZ3bPH/GzyYDAxw7nvWlPl4CUK3SajH/gFs3M1AIDA0xeapECfVxrlzlzTLfvlKr/dsregs5gIj9o4z1HbfZpPG6BGD9Oy+XsrqHh9nY4OMqT5+w/iMPiGYvh7ToE8Vx9nBCyK4vhLw5kFYCi/mtzJSmdDrF5m0txO3gehLZwnTRv/iPOoHFdjD3F2c9b3vqr/VGAAAAAElFTkSuQmCC"></cm-button>
              <cm-button id="btn_ext_google_store" label="Store" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC4ElEQVR4nFxTW4iNURT+1t7/b86cc8zhZERGjFuuD1KEjBHJLQ8eyGVyS2Q0QkQuM8glIQ9KeFAkeVDy4lKEKKUoNXhzKzOa69E0c85/zt7L2v9/Zgy79v7/vfZa3/rWt/b28N9oAJRMW3f47ByjaSeDFDOuXjl54EXxjBHNcBCiHVE/47Zj52tivn/Fsn0lAExE1YEt1F2v33c98mAqhvf+FM01NYlrpaVln0eMb1SBuXT+1MEzzrz/yJk9Be3Vj+74MXl3Ot2KhgYrgdk+Bs0zZ1Ym49kbuWx+XF5pr8fzy1O57m9Wa0/ok2cKQSaWHFViC20Dc13Bm9FLv26YcXlH80Fq9ByAjrfUJiYtmO/XbIKOuLgMlVBaFFBgU0DSWGalh/o2i5c/qirSn8z2ZqBOAFgNrqUEhq40NHuepoiWKmoTTmcTYDLFfdlTWd51h8mdI1EZLI/p0IphqBCw0EbP3ZvctqKKWxbO4vZdW9k0NVnOG5DNMVupiygU3QtBxU6BhjXQyhuA7L2b3Hn6BKUOHUWiYjgKH97BS/rEvnKEJZbgWtML4MoULixn8jV5aP8c0hdrUbJwI942AZmKxYj9Yp4o0gwpk2B21C16AWBtGB9eBlGMvUEZ0JSRQhe487gTX1o1vncwLqwvRfVkknp7q49WdqtQgpEA0iV011/Fa149xO98Fy5uSmFdlUUy5mPiiMjdJbL9GAgniWcL1zGn4Kxp9XTr2SFedH8zhsQH4usvhYZlp3lYqtyFslNAsf4rosphAJN2saHD2GSaHqy4zE++vUZrNoPZVZMwITVYFeQqeMoRcBAmAnB3/XgwkuKZ8bTXil1r6xj58PXyyuroqourdMiGVds8XDelJbEQwD2i8mDuozHfG7e879hPkkCj+EIkocOCyyjNU+4NWQT42R1Honzt839e4/TbS5a2m9xU2QVsxFnZPqWdZC6/VGlhVEky0f3p4+o3D9zJHwAAAP//dIWMFgAAAAZJREFUAwBfW0GAQT9IrwAAAABJRU5ErkJggg=="></cm-button>
              <cm-button id="btn_ext_wallet" label="Wallet" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACeklEQVR4nJRTO28TQRCemdt7+Iyd2A5ScBAQJQRFNATTpQQJKiRqREmokFLwKigoaCzSQUMoU6ZBFIg/QEFhRJDACiJJAYkEjvOy49fd7jB3OAEHIcFIs6vdne+b5xJEwoDwv9LF9ACnnhZsgBLkx4DXPhV63vJjJbmL7Aswe6MU7N3HRpNzl0/VPXcmDGFEmDl+oAMOzT4ClYKlQ632rdfXXiwqeAC0YblPjqbgQn99B9ASTkb4I6mIFoVdM2wdSo9/DVxPsBcVJIrJS97zifv+2zDtd0AzEv6lIiwkFrLZAQce7p6dKAtWXR16hnf6ViG7jqq2nmOFOrIUDuy6/U0QuGPAyg608HZmAb4PVRCXGPqyj4aWnFeZHLQD07EcCsgBg0qUJGoT4fbzYLSMTy1S51er5XvhiPUyV3XfV65ML6bPJL75g8CSgK/r4JsGJHVNQpbqEcb5o2gq3IZ1J49Fb6Y1/W72MY7erKYHj6RWAsfOQsicDGqYa1dgdKcc68ntj3Bsdxkc0waJHhYy53hufBqX/eFNXH1zAieLlZQXeCuElGPWRiNRKOF3yI0D93UDMu0qpDub0FBJWEseN0QWuUG9+sVODauwSWiUZEkkLTJRA9g2HXTFYyQaLah6h6GSGIxqwY5uosUKNBD0NzdQbTUM+2nJHCjkeHpYFmLTbQJK72wO5RDEbTBSRClkRE0RlhZXBhpyKtu+o4iUIuUS2aJ7u+0Rxpr4uZOllNiKkw8RVsE86vB07Tq1wqLWnREZg/ib4IFRjCec4wHFoImfNTfvwnxS91gVpjj+TKl8gWtrpZ63X3cFKM1i72eKJi9u8j8Ld8mRfwAAAP//cJ22IAAAAAZJREFUAwD/zBBmHsHUhwAAAABJRU5ErkJggg=="></cm-button>
            </cm-collapsible-list>

            <!-- Learning -->
            <cm-collapsible-list label="Learning">
              <cm-button id="btn_ext_britannica" label="Britannica" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADMUlEQVR4nDRTa2hTZxh+3u98uTRpk8bYJvWStEPXukE3VjYZWNgcYwz2d2MbQ/ZPRPtDFH8ooiKKiCAoiKgoYkEUFPGCigoK3orXH2pVBE3Bmia2jbaxuZxzXt/vq57kcL5z3vvzPK8OLlrxp9bObrDXQjAXEzOjWnMpEHDsl3rdQzgUYPsCMRPkrIqu5/ZR5Ke+vASm4Ps+SKw+Q2uF9lkzaW4qAc9jFEsTeJbLsyc2ReLN8lNKSaERDfZTUtAnmrZAHj/3dJEPHxPlqiTwkW1LIpOaQRcHHk93IVmYpaAU1lJUKrMNNimqtRqV3pe5M9NKbclmuJ6HkNZ48ko6cH2ScaW++ML+fS1BSpLYrsys3R2zuasjTa2JGOJNEWhHYbRUxoJ2pspUjR+8GKJgQJtp4QsaqlZ3uVKrs1YOu3Ke156mOamkTVgcn8BwsQSSEq0zYsjMTpIvQDgy/lS1znXXY92ZSZPrexh8OWx6ghjQHG3Ao8I4HGXhxodKDV9m03CoYECld5NT+Gb+HHgCg5L5cXLbMvT9tRhKYCmXp9AQDqAtGUfvt/PR2z0PKRknqB2Mv5+EoI6V//yKY1uXWoZ0YWwC8cYG7Fr1L/77/UcsWbcPp649lApz0X9hwNLW2Z7G/Vs5DL0Zxa0j69HTmUUuP4qCjKjGhOP+8wOWnR++6sCVfWvwWtrfsuMoflv4Nf5Y1I0du0/gbWkSl/estsHmOnzuJoQtqGAwwGt2HefNB89ajg1wB9f/j8wXs5AW4FriUWTlvHftEuTH3tngTQdO84a9pzgcDrAT6li4UbilK3cGqVqv47uuLL8aHiWIjFsSTajUXDQ2RpBOSrJEjLf3X6Bth89TJBwiUoq0UaE8qSEUxNb9Z3Ds0l1a/P0Cvv7gOf3S04VoJISr9wYhTPHF248pNzTC0VjUik5iWcutYHQryogL2rn8GB86c4PcShXJ5ihiQumTl2/wdGiEDP/Gx6iTfYknVlpGeiuLMdMskxjIUGgyezKW4AOjuiZhyRfZSac2+PMyiWORgr3L/9aOs1PWsBWf1tkurXSUaIpaIY0L2rCbNr3O016qIMlWfgQAAP//eZyvsAAAAAZJREFUAwAcgH1Irw5W0AAAAABJRU5ErkJggg=="></cm-button>
              <cm-button id="btn_ext_coursera" label="Coursera" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACm0lEQVR4nKRTW0tUURT+1j77ODeb0SyFQkuish4SE4rACYoUggQFo56iAo1Aurz01g+wh6QnRYiIfAmiwnwxIUgfeilrfGko8DJeohgbb3M5c87Zqz3OlEkSRAv2Zm3WXh+s7/uWRD5IH17L2iJhCHFJv8Ig3lUoT+trFEo9wJPa0d97CD+j/oUfe6rv6KxDmF4TrgXlOHlYIWEUefTbstnlPkxO3sK75lQBRYM0jfsREs/gCTWSs6w4ZStdMnxBCSkI6ayCs+q4KDIEFZcKTieGscSteHkoJfVHRvBDFzwljWQnspxW8vB+v7xxppwbajSu38Dsgo3B98uyeyCu4vF4FqXbGsELXbq3k9A6fgymGCFBxEmbWsIh0X+tigMesT5eISa+Wjh7d0aNfU4zFQnmrDouIFUHmV7JGZurK730sLNyrTmx6qDr+Tdc7ZlB/0hCT8oo9hq8o8wkuIpJevV86JAgERZKc5NlcfFECQV9BlKWi3P3Yhh+vQhIQu/QAh6/WcLYZJrm5ywgIIVysjl6w1KzXOW6NsEjULvbxzpoNJrE8NsVGFvNPM3666AGyIGJgGTlKgLpA6oS2CQ0Hb/yXLpmkByK4oJZ1utC5zHDMBmW4shUmnSgoSaA00eCcBM2nEUHnHZxoakMdXv94KRDMLRywsxhxQwcvFIH6asD2+5U3KHLJ0tzZFFzfRDl203s2+nBzZZy3G6rQPupMp7WgJGPq4p8Wl/XGvhTxoaQeHS9ios3kTE6b+F8d0xFJjJMZl5GA9GeWRzoqEBR6VEyLDs6kaGh8RUR0JIFfSI3Nj59yeL+q+/U3junpmYyDkJlJrLJHjyt7fu7lbdoqY2clV04K64Lr7ZyYKOVNy5TtV4m8c/L9H/r/AMAAP//KbZuEQAAAAZJREFUAwA5M1QVrmb7NwAAAABJRU5ErkJggg=="></cm-button>
              <cm-button id="btn_ext_duckduckgo" label="DuckDuckGo" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADU0lEQVR4nKRTXUwcVRg9987PzuxPB+j+AAESKk13N4poTU3QNBsTW2NYmlrXiiWxD2pMH3zySVFJ0PDUmD4Y+1CrTfQB0Epi24iSJn1B/EFJLbQlQNHKki67Czuzy+zMzp3roKlpn/0ebvLl5pycnO8civ854r3LUmavxiX5kEWE47JpPiFZNbmqKGXXL1/1ETasbtiXm76ZMQnA72LI9uNt5NbhfZ2kTh4Ktu5JK88eg7L7IRDGwBwLbHMT9uQYSnM/TDib+ju7Ej/PkEG4/xEsH933sLAzMhE+dDwmxPeill3E1uULMEZHQSMhhF54DaFnMsDaMtY/P1Usry2lE19em9rG0luplCJq/qFo/xsxJqjI9qfgZJdQ/9YpNJ/9CmI4Cn3kNP7q64ZtlBHJvNoQCDcNLve2x/4hYC1OKph4PE1b48i9/QqUnj6oz70OyftUH+1GePgM5HgS0ELIDZ0AC7dBa088jUAkPZqBQC3wAd/BPhgTIxCa2iC8eALXF/IobFTgeubMyR0oqK0QuQjuKTS+HYH01BGQUKg3OZcUKDHtLrGuAfrYJxC0OlAtDF3fQq5og3oOZXMFVJujCDzohxJXYP34PaT2BCgV92uaLoiqVQ0I/iCcXB60sRVyuYiuZCMk5zbclTH0Egaz40/YdS74uoTSL0vYliZSaGthl4g1Sa5x7kq+PbvhVHSYc9OIHXgeMG6ALb6J4lQUjPtBGyRUZrmnMALX3oIHWrXzlFM74Juq3rwK5cmDcDfycK79+m9C/N2eYcOALwhVlcCyBO6mjtCRl4FKBdzh85F1xaUSdz+1Ln2BHZ6RxDDAFm7C3iYQ6iHvOAzyewQXtzhW1hhowUTIU+dcOQ/Bqn7Usbhoi+Kd2nhZXLig/jHfE/vgLEonB/HbT6P4WLoERy+hkM5jJepi+LqBrndPA8VVrM9OTxb021favBDTByZnSi4rD+S/PnNHUEU0fnYRgZ0tcLwIE0XFS2I3jvEU4ifPg/iB3LkPi/Zq9r2u8ZXS/V3of6STqvXva8nHesiBozDDGoINMfiqDMb8DJh3/8ryje9cQx/Y1Tl7fxfuzlSmRW1SmvfbXB7gXj5Uywzaks+u+X3TEtxztl0aT47Nb9zbxr8BAAD//wGeJwsAAAAGSURBVAMAdoBpt/g5eW8AAAAASUVORK5CYII="></cm-button>
              <cm-button id="btn_ext_gemini" label="Gemini" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACh0lEQVR4nIxSS08TURQ+9zGPtrQUFEFajAswoTERU5PSjYHEhZCYuID+AGOa+GLhjkiwwTVsjCb8A6QxcaMkbmAl1HdADaa4QEoqkAJtp512Zu5cZ1ofKAU9m3vul/N995xzPwqHhBIKNdtnXSKxcVANrgXyHzh2yXewp27YzqcBSK1adIAAgrBfLroDyR1XM3B6tKMtPlGyYP7PDngQBEuV5z2d18Hd5Ns81uWb84Wv2eRodFI4tAMeA4piYGQu9XRjT+vzVUe7c6nxHCy7TxdW6JELj4brX/XEOJ2LIeMPgZ9EO89eDXUbDl885Qj43wtn2Qe5E76KJ8kOEteymhlJjIgLFaYlBJbQrw74IIhqd/vNgt40lpICrjcozJZZkHwxTkDGdDIdy0TnoJjcHH1bxg8sslbpQHkKLZQ23AZNvmwyZ8cya+Hv9KC5VDpPVtUunik0Q1GTEAPKACGMRUCmDknOzCcG4HGKiBMxCXl1jygoThdsKAKk8ias51TI6gXQiA4cSdWv4RxZFzsXMMJeUwNEXReLaYBiNJkMSaqxc4N75TFZLLmwvsm4ukWAegETiQEXiGlyBcrmaP4bfrhyH5XtEWhl/mkgqGPGBiaefep70eguxFv1LX+utM40rd56up5gTV9Ti0JkcQRXlzjICcQRq/gARYDZ5+xsD+0PzCyQsjbgduzmJE8KjLo0cGc6j2lmYHEELVS2b4dF3mek3t45IzoZFK6ceZxIq8o95tkmqnuD5OjHu/NDx1/C5GsB9nhgn5F+OwpQODUoFz83JHdVL1sl/lPQd8ta2X9YuRIRwPNtcXXN0KdyQmYK+ofKEEE1a2lNgXh1J9ugj1uvsr3Y3/EdAAD//429n5gAAAAGSURBVAMApnISZcw7dI0AAAAASUVORK5CYII="></cm-button>
              <cm-button id="btn_ext_grok" label="Grok" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACS0lEQVR4nIxTu6paURAd9dxrLhcxvkDBRrEQ1CiWPhBtJIFAFLFJZ+IHKJg/SBO0sTAIpg2KCIIJBMQvEJSUNqKCEURU8P3OzCaenGuaDAzn7Nl7zaxZs7cY0PR6/YNEIgnd399/Rx/d3d1t0S83vsG9X+jf0N8g7IGwIvrBzU/4jaNL4f9sy3FcQaVSfZBgttcY+Ij+7PaUVCoF3IfT6fQkZrVaudFoZF+v1z85jL2/BcvlckgkEuD1elmCTqcDuVwOWq0WRCIRaDabLBdhKYFTCDaZTFAsFkEmk0G73Yblcgk6nQ4sFgs4nU6WoFwuX487ucvl8lyYIJvNAtJjBweDAZzPZ0CBIRqNQiaTgWq1Cvv9np1FrIIT0g8EAmC32yEYDEKv12MxFAtCoRDEYjGYzWagVqtBJBIRmLUhFlb3eDzQ7/d5MJnL5QKFQsFT12q18Pj4yO9zwgQ4TjgcDnA8HlkVg8HABC0UCqyVzWbD4mLx37pPGJDKJBg5UZ/P51Cr1RiYxud2u2E4HDJhhQl210W9Xmdgv9/PmEynU16HcDjM9Mnn8yzhH9txSGmGgmhpRZQrlQo0Gg1IJpOs6mKxAJ/Px7RIp9Ns72qEJQ1a6K9IGJvNBvF4HIxGIzgcDrpxrDoxSaVSUCqVhNVZ1yK8aWFk8NVsNku73S4/Y5q9UqnktSABb2yLDN5KsOfearVSTyaTF3jn+anQnPGuM8FoKjdGun3RaDSf6TWy5zwej1/i7zt0J90w+Pdl7qhnbKGNYywg0x8YW/8GAAD//1PMkaEAAAAGSURBVAMAy+fxYPuWdegAAAAASUVORK5CYII="></cm-button>
              <cm-button id="btn_ext_grokipedia" label="Grokipedia" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAB2ElEQVR4nFSSPc8pURSF3xnj+hZKBRFqnYTGD9CIRCIi/oLWv9DSaEWNQohCJEToJCioEB0RXxGf9xkn1513Fycz56y191p7b8Vms/184v1+c0qSpNPpfjTxer3en+CJX0X7BvTxeByPR+3ln0+AFhzlm16W5cPh4HQ6U6mUx+OBfLvd1uv1YDDgpI6oIH/Rp9MpGo32er1IJAKoVquNx+NEIjEajdxuN2SRWgFNMtDhcLherxcKhWw2qz4oynA4bDQa7XabgpPJxGg0qmCDwSDKlctlh8MRj8dBW61WslgslvP5vN1uSbdarXCidsVut1+vV5/PN5vNWq1WLBbjQfiTP/F8PoVjkVc1fb/fvV4vV5hDKzW5BKdtF1mQBEcR3sWp1+ulT9Bc5KXTaZPJRDqz2dztdukBHJnE+FsulxD8fv9XD5zpdIrCYrGImc1mA0ztJ1XgzefzTqcTCoXgMA1uIPT7/WazSYVKpfKfIDRAy+Vy9KRUKiGGzuz3e2EPnWKOQrnELonBgQ4Gg/l8nstqtbrb7fhIJpMulyuTyTAH/KhqxfJ9x8eJsEAgwA3tXiwWeEUeGYU3SbutoNF2uVzo6Xcd1c78Q//aVv7FjOgJCJFChHZ5/wIAAP//6nbb2QAAAAZJREFUAwD/vjIOrW/H8wAAAABJRU5ErkJggg=="></cm-button>
              <cm-button id="btn_ext_groups" label="Groups" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACNElEQVR4nKRSy2oUQRS9t6r6MT0TJ4IhQoggDMbXD4gQSRRBRMzGnSvBjeIPxEdaowYEl7oQv8CVAQkomhifXyAYNWIIJAqzGSbT1dVdD6u7J2FmAop4obqLW/fce86pItAb555QAIPF/w+5diD8Z7DexLFbjUtuqXxCRK1Xb6aqD7Lc6M3GZS8oH0946+XijerD7QxCQyBEPXa7dZb5wVMw9sCSFTwez469kj9vVFEt42hi4Vp5dhNDcokHN6WYEWI5pfEGJw4AAb03X047x4qaTkyXB0enoj2uo2ep64yoJP0iEU+1dc5Rh9mcXBKcTHy4U1rpltARR8JGLfC8k5EQLz6G1W9Frr4/8CrjSvC51+HOH9s9sFdUuwLu8G4+A4jnQSsHkWpttDXMVCihF7QxiiDGUsnHi9fvh5lxObBYaMamm4/cvsrFNOJ5X0Qwq7/WJKXUDO0adG2DPO8EPiSt1szC1cpkhs0ZjE43D1BCPiGiHaoMsW5FItpYXlv1CRJdGxpOXNfrM0orpAyNSoWM4n1v7w6s574SoIcIc0Gn3CBhjLo+iIj3I/NzgXGqgqBcAkVU/hIp8xyNeNhuiwbKKMbsdMJ8pqX4KZNomejUXnqCGUdKLC8RUUvP2AloABOV6pX2DWUfqqlHaNrkX8HoM/OTO5bAlgIOZsJhve1Th/Gm6ykbtOKE/JxIefpd2P+9KNsCQAcYOsFbDUBVnvF6/fn7ewNN6J721+h5SP8GzuI3AAAA///MtdneAAAABklEQVQDAKNLAZvrtcQpAAAAAElFTkSuQmCC"></cm-button>
              <cm-button id="btn_ext_search" label="Search" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC60lEQVR4nFRTz0tUURT+zn3vzaTOKCqmmaEJtZQW/qhRKvqxCiSbpKRVi5ZSG4mCNi2L2lj/QRQ1TVDRIhE0XIQEIYMQST+UyjJHZ8aZcZx5793TeW/U6j4eXO4993zf+c53FGQxM2FzseOcZceOu8xrWi6839vLedy7247bfEPeRhbnmBurmEdBNOhHuC5QLLK/DwQIprn1NpYHhkNES/7bzWwNYD0OUh3IZlw8fgC8nVacSkuAAa5rYI70aYqeBtVUywEnBOiEAC/7DMBuDGREsThXwt3LFt5/E/Sg/MJCBcE7aqBtDRzshnH7pi1sApIk7rE1heoADHlc/OXg9aAFnSTsqmdu7iR0RMBkQr+bAX78Zlw4R1oZlqA6gh4V8gPEuvicEeinr1cdzNwysFgHNF0hDFwDGyb8Gu0CsLIq57u3lBb1TE+fl5KAM4ATxsdO8GqCoA8AvdMSYIFLJSykFLQISJ6GRQ0pBKEgcVONVM7IehDV7OTB9hKUJYo0HSeGBcU28mzh4kMgU2AYiqFE0lwJfGwf073zgkFUvd0baA1X+LJgKI+l3x2gYDPWHUmpCAGJLmlCyQtEucOmYK6RURl2zXrkNpYpnR5DW4vtl2CaNu6IdZR87CrceMVIrTOFK4SkUNeaswJmT0p+SlWfcj+I5aays/zsy3W42kaFaaGv3UKk3cBMPonPnOSStcHdbdr10B2mSa8jZwAjXrSXnViix5jKztMnauWaUD911R4VfwXx5mcOE/M7WGeaqSe0h8eGdrpVQTLFrFHfSOL2GImRvudnSyOzl6yJbAErbjMc15JSKwSqUcTYixYx6pMjXfahxnBAyMYNMdK2lWVsxkmsnLLT7v2FGF4k59RSMU9aK9SaDXw4FNEj+3vRWlVpaEZCNP1rZW+YZJoauYpHCeVhstnFhpYWiNpBZVGAyg2Tgxjl88MUCv03TH6SsjAyzsxDJoyT0uhwucWccwhjEvPIJHr675s/AAAA//+MVvV7AAAABklEQVQDAB5cl68baz6yAAAAAElFTkSuQmCC"></cm-button>
              <cm-button id="btn_ext_wiby" label="Wiby" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABJElEQVR4nMxTLU/DUBQ9JdOraoJp1TCDrr5qmSB5zNSBQE8CswSJh83BLwA3A7WY4UfXmlW1BoLa/sB272v6sWZmq9iO6Lu9ufe8c07yaqiIGiriQAiWBOwAhZApGCpv+E1/bBP98Sk09xv3FxGszytcCuB/4OLpbk4DKs5nQo4epTs3MxPHsjJwzctUBaNIdiajWJ7arUD/WSVCgXYD6wRo6GjZXETwXD5jeERmcfk6xVfIxQJ+YKAjchs5AepoPxjJjY8+gsEUcGyYPe7M8fOxAEJS4iTqshz4k4cY410ZY5JaWdpohj6GJx7lQ2qIzHyhXiHEggKGjg55lOjpyWDB2l/zLFveYCGB1jVkmJajl6ypaHXr5fGyhe3AFhRUxP7fwgoAAP//40a7IgAAAAZJREFUAwCZE0/sthcl8AAAAABJRU5ErkJggg=="></cm-button>
              <cm-button id="btn_ext_wikipedia" label="Wikipedia" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABbElEQVR4nKRTu4rCUBA9CdaWoghWPrATsRIEsVL0AwR/QAULOxsLP8HKRsFSsBbs04Y0KVKkSZkuIR+QXc6wuZu4NmYPJJm5986cmTO5BfwgjuMvfABd1zX55glOx2h5gtMo4J/QLcvCYDBgTzidTrI4nU6V7/u+7POhfbvdUKlU5IzrutC73S7u9zs0TUOtVpMEl8sFrVZL7HK5jGKxKGdoz+dz1Ot1PB4PNBqNXw2YMYoiGIYhgWTabrc4n8+wbRu73U6tB0GA1WolvkrAVnq9HkzTBKsi2u22fB3HUT2TiOxKg8Rg0GQywX6/V5uj0QhhGCqfJJ1OJyti2lmv13g+nyIO4XmeKjvRZrPZZBJkxsjyms0mrtcr+v0+ZrOZqH84HDAcDpWoafz5kci2WCwwHo+lV46uWq1KwuPxqPR52wLBMZVKJWFPGJfLpYzyNfhtBQQ14IzTYCWv5UsCvvLeB95IPTHwIZKYbwAAAP//NsAMKgAAAAZJREFUAwCAS5rANz4fVAAAAABJRU5ErkJggg=="></cm-button>
            </cm-collapsible-list>

            <!-- Media -->
            <cm-collapsible-list label="Media">
              <cm-button id="btn_ext_books" label="Books" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACYklEQVR4nIRSTUhUURQ+59z7xvGnEsR+VCQqiKhN9IPtohZGC82FUYj7oHYRtBFeEdWuIKJaRAvToOmfCJoIiiIsISKI3LSZGoWsKB2bN/Pevadz580MaqIHLu/+nPO973zfIaiGT23dQ/t3nXy5tXLTy6xgiSBZ6DbtPRvOhxYft29a9fxchi+deJdbnUI0FfDFANhtLGInW4uEVFfTAMfqlydH/TFzJGbhW0nDeP0PAOWHQgkMOQqmIBJibclldGXdaC7d2jO8R84cr161AIB7AEThAfFGmchEYR6MsWY7EqdbugdvtXRd3wiQmtNWlQE6FC5xYbalS/cnksgJryIl6g6RTo60HhgaaN59uSFuqwpQEkJQENACkwZUmgJScjRWCybaYj6SpEbykqdrmppH1nQPdc4BcAystZCo9TA/Hf25e+HJdObzeK5uRb0RYdy7YhCZw7+hpG8m4juN+26s1bMZKM+D799+TX18NVab/fJjZXrwdbBt75YZpagpNJHjx/NMAKxoIL29JZ3YERWDolwktKdZhBRWbLQmsgxGWtSig/Awn0Ti4xMP+56WWzjl0EVEBlKkJCTHOgVZe4Qxu6Rogb9tGAwUfk52uOJZGvhS6jzAqp7OE7HDAiYIUZEJg2Fr8h3ZB31nJl8czVVsLGvgY3kWHAn3iYC0RuUJ3fANR5E//qj/WZzrBsnNQmxjBUDKbtaU+hC1yatHNoWvbMKz2fuHr1VZxbIZmDeJGP+Z06UjwoxYdbEQBDul+Gpc7OhWRnlBFxwJn1o+rO9igszEvf73MdvbClIHDSwS/wAAAP//lwXU2QAAAAZJREFUAwB8Uhn/TrHIAQAAAABJRU5ErkJggg=="></cm-button>
              <cm-button id="btn_ext_home" label="Home" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAChUlEQVR4nJyS30sUURTHz713Zu7OOvvDNKuXIIUwE/KlIqLYSqMggnrvL+hRC1Ghu5qKP3or6Lm3eggyiKAHBd+ilyAJJYtaIyNxXZ3dnZmde0933FhZYV+6DMNl7v18z/nO91BosBCA7O2RNLpnNPhONIF/zt9MQEsnkDmy00iANqiM5d4bY4mW1hxLHVlbvvtmvFEndB9Mo8qVK73TMcse8amT9KnlkFjr0OvBL7MECAoQdQzZB6tKJjNj8KYBz2j2Q6edF5KdkHM6/J/p4/wTmI/EA2dA39YiRNU6wKpnJS9dmDZMNhAq8GI8yfVBdoc3ZyHewvNKeoVYU3/fGM5W4aod+g/GytVzk9Qm9yQJAoNjLJDuROLFqDjx+LpYRzZZ4qnYRqh834b+noc4pTGMRHY9B3e6zhqHvEGVckPW6pmKb43zV8+GtWEqhKC3Jo4NfcdgfJsRqxRgSC24f2oKz0QiuzGaXTvtQF1tjDIskpds9NtIBBMBulX92wRSMUxGTs9sd1biidvarKKh7NDo++ocnPwtgTFAk5CwjDkhMka2a4FqNoyOBWQNraJ+pFdzlnWEcJ+BFaDcG6SDgd5RIJxB4AIKsRDWpy2C6L31vAcNywPbTQBnHGoCMm5RtCxcB1t9bXL6Rj+0PXlXarOW/DQGUdJoESVTQeivXgxISSq7jRSpTWsCnmVvFh2HLpWSciWW7l7jB7q3MAm6nI6JVNNWEgyyATKoSBmXVIG9URPI5wuLOfPw2/V487UVNwXLrg35MgEVhtW4owcrwMwyAFdMFoO5MJ5erJtEMZ8x+FHIfCw46c+eLX95pm6W7Y0sJYgIDEh80738dF6TWCfwv+svAAAA//9C/1EVAAAABklEQVQDAETSE2VwLpEfAAAAAElFTkSuQmCC"></cm-button>
              <cm-button id="btn_ext_music" label="Music" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB/ElEQVR4nKSTT0hUURTGf+d11YmZpCRM6J8wroYgEJcZuapVKyN3CYG6qUW0DloGrgoig0jIwKAWtWulVIsWEhQ1qyKhoDLQshkaZ6Z7++4doSACYQ68+x7nfN853zvnXIcsgFl6xePwCLhxfR3Fsv0kp/8gyBNozhovF/7mGJsWKBUgNw3ZWbLM4evyNjajHXJ3gvdNHbegdtEoV2LEYiYo5UV+JKCq1z1UPYXebezb0+J//AKVlV+Qz6BTT0MqaiehXHVRRkiVI7lWl+wOJs44insDX7+nKLu74f0nx837gSAMOWGZFndKCgaHJWJRWoKUGpfPZbx5F7j70Ag/hXPCS+DoicChAePSNa8/U6LUgmOSwwTmMkIlMD5qvBZ57rYxUIRCn8KCbAg7d8d49VaYU5awkSNuPI4QNoL+OaO/z7j32Mi2w/kxWJiB4SEVWhdsJ8wr1t9rCRs54ipBHFXD1DBjdT3Q/KFGS3ZNExgqweIsPLgOxQPyr8JaNSRs5Ijr+J8ZWzIliEvScVCjCvR0Z7gdcq1Bl2a/VIYLV+Dpc0FzKtgDu/ImrE+7IW7swTOsyzRnz/LnwOnjAa/uX52HkUmRl6RGY+QbjCm2vBISNnLEbXuM1lrjwRuSNPlnkTTOfxfJWovk1d2c9roxY7yYanuV279MtHmdfwMAAP//eH38NgAAAAZJREFUAwBZ4f0LnofXqQAAAABJRU5ErkJggg=="></cm-button>
              <cm-button id="btn_ext_netflix" label="Netflix" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB20lEQVR4nIRTTU8UQRCtqu7plQV2ESOJxItH49G7V0m86s8x/h/RmxqIiRfPflxIvBgSD4sJqMiKOst0PV8PGNgNDJXMR9V0vXqvqsaE9lQklOenOHj8Iy1jlK7ia1re2ha5UuJv4tKLV9UQr3ltxsGTszkmZ+yLu9Yq4oJJFNzux+G9EgfceJPzrAVYP3HG4vrdXSIsV6Ia1R62HwgK1YsBHp04PTPsslJW2B+WPDJ98E1k4ECtXQz+W+WiBxSwD5iL5B5kNYeF+2PBIQXjUoBo1vLdQS4dgqkghbhGwMy+tCS8C6Dh5x6l7jj0L7v8mxkT1bUGeveQuQScTpgFcLoVn0zErre14JSxpHpnTBaBKjoZHJtKYqltPy5YWN8y87ptgXb3oDiZBxdVw75jiwgjurrC3sxxjkd0bIbDjAReUFkQtWB4l1w3+pz/HHFX1VCjAFg3g7IvZW+GZDHxyYaraGbohpVlLGvawUBZv6xsJgxZzIf8a7MWGTEtsJG+yJfapvdhCiALVSvHrfComq6JHFSOl5SACGlWigz+L+Xs+nkAoXSA6RXUFJJKrIE/Yx+Naf3rZjrfDuZ0/WcYUCFkj/P+kKAfS+xz8/MtM573Rd5Xgr2bZlMS/gEAAP//RubCKQAAAAZJREFUAwBx4NobPbGYTgAAAABJRU5ErkJggg=="></cm-button>
              <cm-button id="btn_ext_news" label="News" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC90lEQVR4nDxTSYgUWRB9Efkzs3Lssu1unaHFgTk4jIcZh54ZRtCLongQQcQFBG8eBHE5CF48uqDiQfDmzRVU3JAGsRVXEFTExqURRHGnkW4tqzUrl//D+FmFBVHkz/jx4sWLlwanEMhquIGTq5dlhs42M3JGmAgl97oWZpsUd6LJ+GpY4lJcNxNzVq68e+bcBVoFGDy9ppfn899uZe9f7GhGPI5ZwTj9H0zg5/AzpkU5Lt3+F1fTHvk0nfG4J6bXUVKj0+Kw4XpAAjAu4ShiLAFhCvyPNTQBqzFZ41g3MPQLbG8hY4bBXD6a2vh4Fve/7aa1B0dXrO/fcbie2EmZ0rcgViAwtUE4FrReMNL7IQJTIrRwid5JEeDIH5vX0MI9uUxkoaLqPIEGVxw8Bog6z0axNOekHYUDSmVXlwLGlbnUwxRhIARNZJqoGUJoREEIVgvyXOCcP7URfiIPzlIKq4h6CDhAs+UQJywD05leNpR25hDqHPWY0NPTBnK+PZGMNi19SckPC2NI6HNLMPd3g+1LI/IvQ419gzmujlismRNg06Ko6uzr2RDtvVLgxM2c+usKMn9HUwLtcnFLgosPMuzX5D+/Md5/0okyoK+ulHU3RdlWxuicz8cJrQaQeAYN7b58llGKgo3nSmydF2HFfwaikhy6VSAOgW1LI7QKqTZjVacpCWHn+QyDwxYmVsFejll0xTEWzAxw+VmBWs1hy+JExRSMfHA4eC1FWqAS0UuZ6EZejAoSBTf1GHjwzuH4vQwn19Uw9MhiZn+AkTcFhp5YLPrTYPnsCIX1GvgiwoEbBR6+LfBrt26hVEp9qsH+wQLDr0oMzAjweDjH9eH2FhpfLZ69ySrq0rYFrBqhS2usqkoLdk04P7BhlrHUkVVE0sJpXawAgjQHmpm/0namd/ekiKUWgtS1okth/R4cSgXpU3GYTTWr71hYNZTOOTU06NRXQDoKVSvVWu/EhpZ1O32dS+XgH3/U4Syd70I6OT2rB5m0beM7AAAA//+BeZcCAAAABklEQVQDANnBWIGVjgXgAAAAAElFTkSuQmCC"></cm-button>
              <cm-button id="btn_ext_photos" label="Photos" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABvklEQVR4nJySvU8bQRDF35zv7JBTAklklCoxilJj/oCEOyq6JGU6U9DTQoOR6GnoER0d9BQ2FSAKyyAkGjBIICMkwHyY4z72hjkfkhFnZMGT5m60u++3s7ujoYvYtod51Mq9NK+hixSCsnJVLRj5tfAmQLsUFPyR38VXA+j9AJDOSpKKIH9eBPA6psMtoxJum8x7n0pc+2q1AOZPiR+gnu8gzcg/B+jRR61jgYkKSAlPoygsEFlcz9k8JQDvHEyG7KLWEgCuvMux74tZStQlUsKM8hg2Rx++AXc9Yvahqeti8gi6nkMmI+dMA4YB0vU2BMij35Txz1VK99q0Ml9O3BE6aGLz8m8GvdMEyg/VgOsAOLkH6i5w5gEXPtBUrXsd0p+bR0ur1oGzu2xqfejT+2UkW234GDz3Y3MEccN4bUahkQAc3m8X05qJj6kvaIZXuOPsxK1C6UaqaARts2hxY5IOE31w4O4MH7m7OPb2UPf3Mfafyophi3HNUa0lVWLMVKbk1fD4jE/lsVP1lDPohDfSN7Fmx6ksPwsd1KETaeURhMvgFN2UBPxbKgpkMUqbYQOvB8SQgkAGFCsbXfQAAAD//wP0IR4AAAAGSURBVAMAJRimWkBYZS8AAAAASUVORK5CYII="></cm-button>
              <cm-button id="btn_ext_tv" label="TV" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABLklEQVR4nKxTMU7DQBCcXVsgpFRQWAhBZVo+kR/wiigVeUD+wEv4QJQXpKGGVFAgUiMkInJm1nvGdxEFyKw02rvb2dm9W7tEYg2gdBK3gtyazjMQkJIYEekJv7IuR5KDEd0lURGn8G5Ss6ovxCvxyMS3tINrutuYfOC9mf6PTW2jyA0Zd0LKITcPxEWsIkjuuCekXq/1T9axLc6JkyzJCFWlTFYmK1QV+ZWMe0yc2eFRrOqEovCrTaeCxUJQ14IQBPlUOsGR7lUWVnXibgeMx8BqBcznvXAuFEoMtBL53Zr4YNJWXC6ByQRYr/u4o+tCbQo1F/fwt8B3sOJENxufgL1hCKmI2TtxNXyMDH9wMSOeic8oUDCxaH3TuHdI5Bh3xs323z7l4T9TPPzz7/wFAAD//8ondWMAAAAGSURBVAMAwklfX9Oa9lIAAAAASUVORK5CYII="></cm-button>
              <cm-button id="btn_ext_youtube_media" label="YouTube" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABnElEQVR4nKxTu0pDQRA9u9mrBiGgsZKoiZ0iiK9CBP/AD7DzD6z8Cq0FGwtbP0IkiKBYCGIbNKkENYgSNckdz2Q35l4rX8vdO7uzM7NnZs46cAhgKCy8TIyFsL+QtF5dEPNQjDobr/jxCL66mBkD+pYYdBjIDFJmqXY8zwTTNn8tgmwA7RfKB+D93OCqSgTza1Ts02DEG1svUriSAOPu4p7rDQ1wzFtXGblJLxusOZsehCWI+NPJ+ClUZCL6lOkgk1xQIbQUDUDZdihNOERRhPgpgrWajuvZqFQfU+TG5v3Nvh6wKp8NNtcNjvaA5UUiqFP3ZvSwl5/6SF5vHOjlx4MQBy3WbWUWKB8Ah7tAsYBOWsYkW511+OPQAK8ayW9F+PkbHNM8uQS2toHTswC0X+uXbEmDXZirEteoL34nN0rCL5EatTuDZp2p5wQdv243JJAXNa1uhYUvpNuYEVRuPECbS7TRhDYitLFV0RSIUaZo+YVILjAeSD8RVShDhUQyO4HK0+PMj1S2Q9x+g8rmkW0lla9v/+sx/f45fwAAAP//ZPH6ZQAAAAZJREFUAwDyMIxgZOLmzQAAAABJRU5ErkJggg=="></cm-button>
            </cm-collapsible-list>

            <!-- Office -->
            <cm-collapsible-list label="Office">
              <cm-button id="btn_ext_account" label="Account" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC+UlEQVR4nHRTS2hUWRA9de+7r19359PODNpmdJShB5kZmmSRmcXMJsKMwwzjJgtxoeJWVyKEQFRwI/4XiggiohBdiEslC0UUIiqo+A+IGoz4ibETE9vuvH6fW9brtvEDXnh176tbdarqVF0Hshggqm8i/vu9G5G3GpaWym8BUDHIGQOZ8yFj0D03dB2fLGo6c09XDt9jAL63Ab5rEGqb4DEUCC7BpJWF9q2iA04ttZvODk4kAKoe9SDm4I/pI/jG9qGlRtAh4JCCIk3ywRhxJiiT8hScZZ9m4NSj571+ZCu9uJuqYB5lEdFtlNy94PAmwhTHqeAXpdwtcRxWdLm6nC6eLn0sYRidXEldo5cZ4E3WYCp1EpfitXTxid8wYZ3I672b5o57C/z/X6wr/1t8pMe+LfDIfcTEN9K7BKYPU1LzlDOKH2c6qRvVL8n92nKg7V8QgTxLecH+pnM9vR7WXX9jnxxdgWErjAkZQpxla5RSYTDksA0WMaWtSilCe+0qGtSThOZCEZpcrFdGdOKoJR1K7gXJuED4Vrc5AgZS9XyFZu2JumGVhB0X2zyqNuQ0mOIPXYsSCAqlO6xnHSaMMQedUaAwE0a/icFws+6RXxEVFfphIyMKKw6slVol6XUnMWJCid5dwy4y1DcZkZ2IMNrh2M6OBg9Uh6HPSSxui0eE9CXaaBVVsVJNWJy4U5OGRzZ+rKlwrOYd6TkK70NRH523sjvvwIPDk7nxn8veDGYx+yIOcLVe7dAV7HiVof7RsqmUdEv2jr/w1sO4Y09V5W4FYWtsbesiXS5uVLWOZcbPVdt5ScbMhAOjfd9td5I4ty9h5/Pp9E9TrW29z8vt0TM7vwvptuMqMnAja+MsKRuOI+Yo5BabmS7dO0P6h0NozEmjM10XFufaiQZeY+6GSVpgakHaspAmD0genOxxXtvZ+UAte9gP85ux5p+JJgCaIMlh4dk/u8vIr2aVWSqtKzCrZCCfWjtn2PcXD0bB8GWsOCUt5WQq+D0AAAD//0Avfl0AAAAGSURBVAMAbzhQ2M3sP6EAAAAASUVORK5CYII="></cm-button>
              <cm-button id="btn_ext_docs" label="Docs" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAd0lEQVR4nOyQsQ2AMAwE3+COhhGYhQzCDLRU0KRmIWYhI6QA0SAZ0iCaIJIUNJxkyS7+/XpWemtE9hGgEmEYorynWi8zBBXisJwgdpR8v6aueKVSer12RiLsc44ySE7wd/DcgS/d9x1k51jEY5xBC4JBMOIeDwcAAAD//7RP03wAAAAGSURBVAMABnog/gXuIo0AAAAASUVORK5CYII="></cm-button>
              <cm-button id="btn_ext_drawings" label="Drawings" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAwUlEQVR4nKyTIQsCMRiG38kZRC/PdbNg8jCYPAwmu+CvMAoatRgtBvVvmAyCv0EtJj0Em0lh8h0oNzzO3XZPG+x7+N53zDn43pJJ2YcBkrEVO7bqEhbkYImj2EouxHiKQrUWnl/BFbf5DI/dFlob8MHwOxzaeRliNEGeCz1BsdGMveS2O9ASmKB0QJlp7Q8n30snoMIoc5TKZv8zFBUrAmr73OsmZk7cgHgGF9zXC+hiXWK2rxDHv5ewj0BfEobQ7BsAAP//PIXOJgAAAAZJREFUAwBqdC5fQdL5zAAAAABJRU5ErkJggg=="></cm-button>
              <cm-button id="btn_ext_drive" label="Drive" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACwElEQVR4nKRTTUhUURQ+59z3MzO+mZzRWaQMA7mwJGxatNGEoh8KIqIyBHURrdoKZUTQ2KIfahO0sk0/i8R+wNoFkpuECiQpgqQkrETMxTg6znvvvntvd8axJrJVBw5c7jvf+c73vXMJ/g6Ef4Ra55uxDli13Dmwp+DxLunyMiAcInWrZnoIe2ZG12qqAX+cW4YPpRwz8i6Xz8f4UhEWwYIj0RwMJiby83nRurEbZirF5Sb0C55d7RxG+xIyitWQ5Qau8B3X988bH11miFhdGAbKwOxvYqqASafMPD7azgzWExR8YVuGzZ2YdTo2azXZ+ZC7BMJg0KNGoB11rcquYqnKITQlXdEnplMqxpQTj8ydSnyb0zdSU0pEYIGEq0pVT1Bh3/7oeC/ZrEN4QVCSaIQZ5Vn0THKpOAARIA1G7kJgWLBTjEDv2hSlTrhpeG8sQbWTiJiSvhBkMROUevvm/dYdajaLwUF4TQSZwANumOUJvxKHbXAC8iUJKk51fcy20hos9VBMmwiSQT9kswEOahDCOdB32nbGfZBkQ1ovQF/JUGwdPtxsMzWuBNaClILChhn4cmiic6QbsgNGp2Z4mL0o1ZMN9yG03OUXdUNSTDfIkVRtmLr8qoO480JyrhWU+TEdSk1ZFFsUeg5D8xbQkk3+dPTmh2PNkguldJ3NSBlWcTfLj97+bmdqMogbt7jLtohjkuJhp15raSTABgmsIax44yezvr52rgiZL2OSeAPjC+pp7Nnkde0BCrIXLgAUvJAlKOkowYMiF95KIHgxkH4h8Hw3iHsr/O7mk+JHIkUGLXpeVGkMai2gaPll7bzd1m+mk3W7HMsiYBZjpk1kWuVEM0Q2IVuIRMgMpbHj870b0bGpB9pUqixESRWq/df4Pq5kXMsW+rdVvRPthmR6fXzmkZMbP4vPSy8TV4H/Fz8BAAD//1ZN9ecAAAAGSURBVAMAF8MkTRHA8NoAAAAASUVORK5CYII="></cm-button>
              <cm-button id="btn_ext_icloud_office" label="iCloud" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC3ElEQVR4nExTS2tUSRg9X1X1fXQmMQETB+JMcB6oYxhkBhQJIj7QhSjoxoWCK3EjPvYqght/gL9AdONC/AOCm6CIG0FUMAFxoQgmaOju23VvPTx106KXrltdt+p859T3nc+Az8LCwknn3DXv/TYuMw6JMUL4YP2JP8211vqNMebm4uLiA0ngqqruMkBJUEyYEEKLFaWI4NxCI3+hDaSUEgapsiw7o2dmZu7XdT1LrEt7KQap24OhHkqse4iNjS25MrIeKFKsz0mywzRN8xcXiVmLqCQ97UtoLPLZbVC//YfQePHvnyN8Xo7SKSko6nQqYQ3l5kkyZZFoQMVajHjMHjoNc/gKvjQTCBXZv65g+OiWNK8eRjHddB1JWJOSRcmwg4H8uv1f7Dp7CR99CbtpHo0vgJU+0ARIMYVi/1W4T68kfH4L6DzlKt2Z+8MhOt1u/P/8dWzeexBjO/agpzIEKlFFBpXlkFBBlVMwfx6At2sxBJ9yAT05ueGGKUocu3FbJv7ZjbWvfdTOo2M0qmBgPXMaeGsncIMhxjfvhC43yuDdIqvBrNWDHrYfOIq/9+1HF0wcGcu8g6g0ghKojgY4hAHLXGMs62J85wVkvx+ikh6U9yH+snFTWx3nA+8dYVluyw8hOSpVVEUYA4IVVG2hHWJnaiuCb6ISMi09eQzbt5JNjHOngOtknA2EjIpDsg5V5PC6YE4mGc/J8MNTEijIli1/hEFvTeaPnIjzp87BZhtk1QJrDTCgtaylM4eU14/I6KesP4wrz+5g5cU9yYqxKHNzcxWdmDvLShSlMKFtG3w3P+KoEVK1+Q6ullD36IUCtLLlzbAUYpjXeelYV22pRn7gZfReXyeb03DQhQ8hGrbKUuqFT2yk4841eRydDmgjtFFGY7Rum5QygmY3VkVRXtSrq6uvp6enX7O7tpJhKvWEZujUjZyTxdP/aDQTypnrOs/zl5R/eXl5+cE3AAAA//8CHw2iAAAABklEQVQDAMA+frSTam4fAAAAAElFTkSuQmCC"></cm-button>
              <cm-button id="btn_ext_keep" label="Keep" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA4ElEQVR4nKSTIQ7CQBBF/7RbgSDBoMEgMJCQgEVwAI6A4AQkHAAOQMIBOAIGXy5AMBgEhvqaJggS2jLsyna6IW2f/Lv/789sRiW+t2DiPRgtlICIAu3Z0OfsPYm5i2pEqobZ0HIK5UYH7siHmoZQsxju4Ki1buFVin3FebOaXAGVG0kSIbmMgXeQkUUDp7eTZoPW3P5ByiKgPYcNag6FJmegq1opaCYC+HWDDQ5P/wPS+7K4hdbSx1rI8hdKoqwH+v8zBc5euYDaDWwv5jFDjFARs5EOE63YrGZpN6Jviu0PAAD//0wA418AAAAGSURBVAMAHFhAcRl58u4AAAAASUVORK5CYII="></cm-button>
              <cm-button id="btn_ext_password_manager" label="Password Manager" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC+UlEQVR4nHRTS2hUWRA9de+7r19359PODNpmdJShB5kZmmSRmcXMJsKMwwzjJgtxoeJWVyKEQFRwI/4XiggiohBdiEslC0UUIiqo+A+IGoz4ibETE9vuvH6fW9brtvEDXnh176tbdarqVF0Hshggqm8i/vu9G5G3GpaWym8BUDHIGQOZ8yFj0D03dB2fLGo6c09XDt9jAL63Ab5rEGqb4DEUCC7BpJWF9q2iA04ttZvODk4kAKoe9SDm4I/pI/jG9qGlRtAh4JCCIk3ywRhxJiiT8hScZZ9m4NSj571+ZCu9uJuqYB5lEdFtlNy94PAmwhTHqeAXpdwtcRxWdLm6nC6eLn0sYRidXEldo5cZ4E3WYCp1EpfitXTxid8wYZ3I672b5o57C/z/X6wr/1t8pMe+LfDIfcTEN9K7BKYPU1LzlDOKH2c6qRvVL8n92nKg7V8QgTxLecH+pnM9vR7WXX9jnxxdgWErjAkZQpxla5RSYTDksA0WMaWtSilCe+0qGtSThOZCEZpcrFdGdOKoJR1K7gXJuED4Vrc5AgZS9XyFZu2JumGVhB0X2zyqNuQ0mOIPXYsSCAqlO6xnHSaMMQedUaAwE0a/icFws+6RXxEVFfphIyMKKw6slVol6XUnMWJCid5dwy4y1DcZkZ2IMNrh2M6OBg9Uh6HPSSxui0eE9CXaaBVVsVJNWJy4U5OGRzZ+rKlwrOYd6TkK70NRH523sjvvwIPDk7nxn8veDGYx+yIOcLVe7dAV7HiVof7RsqmUdEv2jr/w1sO4Y09V5W4FYWtsbesiXS5uVLWOZcbPVdt5ScbMhAOjfd9td5I4ty9h5/Pp9E9TrW29z8vt0TM7vwvptuMqMnAja+MsKRuOI+Yo5BabmS7dO0P6h0NozEmjM10XFufaiQZeY+6GSVpgakHaspAmD0genOxxXtvZ+UAte9gP85ux5p+JJgCaIMlh4dk/u8vIr2aVWSqtKzCrZCCfWjtn2PcXD0bB8GWsOCUt5WQq+D0AAAD//0Avfl0AAAAGSURBVAMAbzhQ2M3sP6EAAAAASUVORK5CYII="></cm-button>
              <cm-button id="btn_ext_slides" label="Slides" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAb0lEQVR4nOzRsQ2AIBBA0X9KZ+MI7uMQzuAGuoHDaBxHRqDQ2GgQCk0sgcbCl5BAwYfk1D7THCeDQEkYned0so4s7lARx6iEy16pSPQEitoSYpvkHUj+wR/4QuCea3QgVuaWIZ7OEFq/IZD1Dwv9BQAA//9nkBR+AAAABklEQVQDACBhFEwOgb+pAAAAAElFTkSuQmCC"></cm-button>
              <cm-button id="btn_ext_sheets" label="Sheets" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAg0lEQVR4nOSTwQmAMAxFf6UDOIJL6CIKHp3BDeoGXaPgJi7hCJ3AaIRCKYIGexB8l4aGfJIfohvXDhvBAighQAGrUjCaCEZazBBQHbVWc5Aml34+39p1dzqlxkvyCYS2Y67+AmG8fB3EhglMxIdM/LmAR3JMT9bH8EUWimjkAHI8iKYdAAD//4QIUiIAAAAGSURBVAMAVAIjDTGRLCkAAAAASUVORK5CYII="></cm-button>
              <cm-button id="btn_ext_studio" label="Studio" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABnElEQVR4nKxTu0pDQRA9u9mrBiGgsZKoiZ0iiK9CBP/AD7DzD6z8Cq0FGwtbP0IkiKBYCGIbNKkENYgSNckdz2Q35l4rX8vdO7uzM7NnZs46cAhgKCy8TIyFsL+QtF5dEPNQjDobr/jxCL66mBkD+pYYdBjIDFJmqXY8zwTTNn8tgmwA7RfKB+D93OCqSgTza1Ts02DEG1svUriSAOPu4p7rDQ1wzFtXGblJLxusOZsehCWI+NPJ+ClUZCL6lOkgk1xQIbQUDUDZdihNOERRhPgpgrWajuvZqFQfU+TG5v3Nvh6wKp8NNtcNjvaA5UUiqFP3ZvSwl5/6SF5vHOjlx4MQBy3WbWUWKB8Ah7tAsYBOWsYkW511+OPQAK8ayW9F+PkbHNM8uQS2toHTswC0X+uXbEmDXZirEteoL34nN0rCL5EatTuDZp2p5wQdv243JJAXNa1uhYUvpNuYEVRuPECbS7TRhDYitLFV0RSIUaZo+YVILjAeSD8RVShDhUQyO4HK0+PMj1S2Q9x+g8rmkW0lla9v/+sx/f45fwAAAP//ZPH6ZQAAAAZJREFUAwDyMIxgZOLmzQAAAABJRU5ErkJggg=="></cm-button>
             <!-- <cm-button id="btn_ext_tasks" label="Tasks" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACF0lEQVR4nKRSO2tUURCeOffsNaj7MomCKCy62aioYJXKXyCs2kgIamMrtmJMcXFRfFQ28QeswUcTSWcppDGlSqK7txCRFMpuTMAka+4948w9Z5PNZpuQAwNnZs73ffM4GvZ4dK9g8RGdUWQuA1GJXSTEOqGaDsdxPskHdCwEWIQADXYCTzingzrK7iF3wdFWAXLyHBK0PmAyo1yf7bWsm7gZ1gLzKzCHTWhZpsc2z72C6w5VZb6z8afxqp40eOHmT+NBBc2mzBKQvYIGIQp9XT8A62JHf+GR1Y+btW/flr8SqD4Pdy8/Ngtv9Lbdh7r9s9g4mlbBDwt/tepbP2tVZc9rVf7s/kVxvLS/tNbNJE/OYaxgmBMuaK67kpyqWH0SgrSZ+3WLCPE1W+e4cyOSmgPpDJnQTkIQMsJATcd5Gs2Bx3Psi7eSkAtjcMVu7O73BmIJs/zNchnmkxEe+aNCTr4Qk7N9UGs/Rr7vk6C21Y125JWQdDBxgpAPiyHgFsLdCCC/OQYtSIq6a+RUBq2pJC3k+ZuzKcRA3puZjcJebr6J6sUzYFSr2zRO4MV6IpQhhLkogP/m2oJ98DXJdcIaA+C8YJJ1qtTeib2wj4e2aUNrNcyDkXWmL7KL26snM2jJ9MpC6GAa5sI2iToI4nOTgGO7+yYZsykXe7DYYej5IzVKHTSpkyEZ1yA1sgpWZq4/i1+21Pgt2c/wAAAP//4Xm22QAAAAZJREFUAwDXbMniGBA3WQAAAABJRU5ErkJggg=="></cm-button> -->
              <cm-button id="btn_ext_vids" label="Vids" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA3ElEQVR4nMyTLw+CQBjGH5ChOJJFOh+AD2AjSDFRDX4Lq/IFjAYbbETtfgCTiWQyWTDL3ATZeTfFAQ7Gn+Jvu9122/3ufZ93J9j6bQlwCzSCWJytBwQtENASPn9gun2oRnXvj0BWOIzmXUw2EhStU1+QMFB5jFc9GHQxaW1B4L+zHdIqWFusKlHmqgt20zuO6xDhZ0gsF9OVoM3EjKjRFMLU5AsFrOx076dtBM+JMpdLBcnlyyGmrTy+meQpFFy9GJ4dwad7GRkBC4e95DkhzvsnqvAXf4FYaAyxXgAAAP//TfSuvQAAAAZJREFUAwCC9kTKr9+7EwAAAABJRU5ErkJggg=="></cm-button>
            </cm-collapsible-list>

            <!-- Publications -->
            <cm-collapsible-list label="Publications">
              <cm-button id="btn_ext_acm" label="Association for Computing Machinery" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACjklEQVR4nIyS30sUURTHv3NndvbHuLrjmqtLaSohUall9RCED0WC1sM+WESZD4GW0fqgL+sfsEERgsVqEFRPgRRrZmH2IoFolmBCkaKRlbply5buz9n50d0RfXI3LwzcOT++95zPOQQZTserD+6O4eneTDFMOkfb8FQLo8FHr4QGdXfVVrVtFUe2Ml4dnGyWZbWXZRjC0XRZ1dxXBifvbKuCywPvWsrELJ/dwhMzx1GLhoSiYjWexHwo0u2rP9SWVqDJP9F8ojT/3o/VGB5MLSCclKFqGgQDh7o9BagpzsPgTODuI9eR6xs57Mbl/NO3LcU2oSepqMzNsdn1/hgGHP2SqoqJxRAEnkN5nvWoWHcx92Pf/aFNBg19480JRel1CEYy+j2ICkcO8gUj9udno0QUUG634mBhDr6EIiixWUC5uBuejOlMmNOPR90sgy5CGOIqd1Inwd48Kz4H1yCaeASjCVQ7RYQlGcGYhN9RCW++rWCRtkkr7CGKohZFkwqJSQqyjQZU0tdT5KsLRdB2IJp5RGjyr0hC/88xcpBkldoUJGR5tw6x5uGIl5L2XDhQpA89LitYXoujLDcLf+ISDVR1DjxLcJgKd43PURHFr2iGps0pVPiGvVVOm6e21IGRhRVYKHlV1XRBjfol+nplgQ0Lf6MYmFnq/9Ra69qEmDrTrac63y+FboTovE+WOHSIAs/CZGBhtxhxbJcdZo5gYHbJD41vTLtIhbefe48X7/Cc27cTJo6FRveAFoKhuQBezgf6v7rrXBk3MXXEW8+8Zpb1OK1mHWggHEcoJvl5q3Rp5drZ8H8F1it54ZU1xZMCQEfc/7P9jGurOJJOYLm9vtNAmG4DR16rplhjurh/AAAA///JJnfXAAAABklEQVQDAHb//zNqWjynAAAAAElFTkSuQmCC"></cm-button>
              <cm-button id="btn_ext_nasa" label="NASA" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADH0lEQVR4nHxTTWhUVxQ+59775s2bmWRm4sw0xpimVgrCmNY2FpMRMRbaFNq6kJRCoaXtoi0U2mh1KcGFfxAQXIguXAi60JUoRBdGF8nMqPEXjCBqjEbMj5lMHOfNvJ97j+8lKEbFczcHzjkf93zn+xgsiB4G74236/hGTn5TeH3dBnBotUKoVUQFpnCwkvs3u7BvAYCP3KOCmd4ORYG9gNSqaQbougBQCmzLBEl4AR1zSzm/7bo3pPwpJ9O0Fl8iGm37ukCIo6l4WAvrIM2KraaKVWAMPQzijAcYkpx5Zie/h/yPWat92Q6OTtbfifQvez8BwQ+Hg0JLRLlTLFksZGiiMRURDEgQIpYkOc+YEe/Urh6htvoBxlRRDI71zZGCAfZfxWIRVzp2qWyLiennMHz3KRRtwMiiOIBlwbdwTxwxj9mH4cyy49pnY9rAaG8PAPOW7DaCQnRmWurp/liBR2I1uJQH6aOEjo8vX4WfVtXhmuZZ0nMDmFjexP93OtWx0UiCumo5njghmZ6ua3AJkru7O3D7X+twFU3QrlaJ/bs3wM7Gh/Dbz+0QXpPBAzUdRFv3YObXjQyt4srW+C+6/3tmFdBOhRhdP30eflgZhUys6rGi4FaRw9D6P+Dg0Rw0JUOQ3vQd9N2cpm9aUtTcnFBXDh2aP+Nwy4r0luSms0+MxYt5xFDjrs5dEPT7x1UMjD+AfCUGxegSIquKM7Om27gkyUYeTV58cOrPjH8AscKceNhXSZ0MuIG/7emSCsMMWytHcMSM0eTSNPYPjxPI+1CfqCEjyOnS8BRzquXT82Lq4nNCqm3btdzWo0MfaLJ2nXXHvc2SYkgmIK6Rt40CXeOwKGY4syYFyqY5Wqzan0Nuc8Gf5XM8jJ2bTjd8Ot5EpY0X+Yf8EY9SUFrSlaSkpyLvoScNUTarBddyutz85jsvVezrQJ36oiF0bXLn5Rt26OspqV0SrsMkD2mghTUQIeFIhrZt9TvS/KqS7x583Q9zKF7mCbbH94TycjTa93dwJlcT8BqPgBlQIlvJ/pOb9w15M0jvcuMrU8F77byw/gIAAP//o2GWrwAAAAZJREFUAwCSDWPwWp4bagAAAABJRU5ErkJggg=="></cm-button>
              <cm-button id="btn_ext_nih" label="National Institutes of Health" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACaklEQVR4nKRTTUhVURA+c37uu8+nlRAFBS3CpEAoaBFSmzZRqxYtitSgMsV+FhG1iDA3bdSsRT+oiVaWi5bVLqR9UChFC4UWkQlp/tS77/6cn2bue9fIXTiXc+bMnDPf+WbOXMnWKPLsuQsnPM87bKxhYB1YzhjHjzlrlZeTpag0MtR/b3xPx1gf9wuFKFi+/6m/ZWIFAIANMGA1gBMIzgQ6HX4M7bLm+xyDnbvN0xkl/W7plg/WNY3unX7W/IuOcudsEoWhTpI4ieMIVaRxobVOdFAshkqIHe2tHR2TAy098dL3D8KvqasquIvpPayLI1cgETTQKdCUpJ1j5FMIZK0QnZeajqwzTnY6GxHzy/WnHm9FAJcCOOdoEBRztPgr3FprlJSbgqrt1z8ONr8yUTiuChs2+nl+lVhAa9v5nxhSmwUSHdJoWlqTnxRwEcnSUv0bcXRzdT5+56wJQm32c9pe/TQVMMgwCUxwXqXz6/umh4+9x6oNCy9fnRNwR7L/EldMZ4A8vRJKkRPJ1bdnaWQuQP7G2iW+PH+tvu35Aan8kyYOFpLIXElTqFAu5wordiZWKcWxr3oHxsbmfJZ0g8ozY93DzyOnpyTdWQliWHEq4j/BQgiOXfF129Tr3ob20ePCyzXq0uK3cEHfpfrwtO+cS9BIMJi0Rq1Jk58A8C1vdL39EiGNm2m7WNcz/eLMD+wDkMA45PycKt+e1aHczkp5qhQEk0OPHjxpaGu8lavdsitenJ2Ymw0HWVrFLiu1001Ci0OJ1kD/ELPUPriHiByEYNaM0mEBzsa/52/HDPpnXrYHWY7A1ih/AAAA//+iOF07AAAABklEQVQDAGB5S2nxh4CAAAAAAElFTkSuQmCC"></cm-button>
              <cm-button id="btn_ext_nature" label="Nature" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABz0lEQVR4nKSTv0tCURTHvz5/K6g9EEIcRKTQRQeh5f0BtvQXZJuEQ5NB4NASNLU1lVs1hGNLU9Hgauium5AoqMFD0EQ753qvvEIh6Asfr++8e85958fV8FNuYp94JDrEl6Qjbftyz0o2y/9tokzkiRDWa0TcE5dElw12i/MNcUR4sFn8bo/YId4IkwO4iAvpDLvdjkgkglgsBtM0kc1mYRgG/H4/er0e5vM5b9uVqbzYZF4PhO5yuVAul5HP59FqtdBsNlEoFBAKhTAYDFAsFlGtVtXXDIhDTZ6ss2U6nYKDxONxJBIJ9Pt9lEolNBoN6LqOXC5nTYd9jhz0Y1it7XZbrMPhEJVKBaPRCKlUCplMRqShaZpKg2U4ZAFXUi8Xi4WANZvNxGqzWZu2LL4D/xTXoGs1qFOsp605WanLAWpWi8ezHANuJ+fLcjqdYnW73SubVI2f7rBsiVA4HBZ14M0+n0/YAoGAWIPBILxer9rKPnf8bTxIV8QJW5PJJKLRKCaTCer1OsbjMdLptAjMg8U2bjfpmjhVyalRPsDf9EQccw3UXTCxnG0eTx7TTfeBL1OFOMOvy6SCvBLvBLd3i+Ai8GB8EM/EOXFLfCqnbwAAAP//uvAC2gAAAAZJREFUAwDNe3+7nvXVOQAAAABJRU5ErkJggg=="></cm-button>
              <cm-button id="btn_ext_nejm" label="New England Journal of Medicine" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACXUlEQVR4nFyT30tUURDHv2f3bq1ixUa4FVZmUkRk0c1K7R+IIoJ66D8IeojegvoTeum1oKd6C4IIivBJojbb7YcpmERgZmW/RCEVVu+9febsdV29y3dnzsx858yZMyfQmi/p1mEl6pNTkeVSzchKmkK+dG803Bjv6sQeNamqy1hmwC8FeqFYu3HlwKQiHVFGBWwFLLddSQvGy3hyqGYt6oayGoC8i6B2ditCij0SHQAh2nr876jrut9wOQHGS2ivCGhF/8LuI8gA2xzeWeQEqKB/JdFF5FNfrVHZ/SDOo+hVSHbaH/yPQ5+jqtP4fpL4LWVbNR34FpB57F1wygF/feAT2InzM9hCkr0ETZHkEeWuIzgh/RlfjUiQxSsf25tJu/0X5L2M9RjswLkNYh7dgbPooxziITET0M9js18xSMvuYlElqInsbej3sB7iCMfxtWMvQ5pm1Yk9D6zZVlcU+CbGlGxXF6uFBK2qtXcE0hVvT/QN+37WOY41y7GidEYSy2K4ieM+hj9uUE+oZYCQHtJdJekDcIEOPXMVehLpN3GL2Cq1W+jmOmwHqRf007IP5D6FXkoDrYmbkdttEqmkE70NfQx76NLRDQme8fdsX8Tk5RiaiPM7yAk9sGZmGSh55CBPIocyrqz3uAosxgj4iB4iLWkz+ncCh8EG6ujAPk7cPPZ+km9yrzXk6qMsXcPxHFQhnwBL6P8gWxNbwB4S3CVuI+RzrG/xsOZXHlPod7SRnqbcUaSRTiJLftgjP9b7fIJEd4y86jXWEx3j/mMqkLb6GWl8zk6D/sgN338AAAD//wxMZggAAAAGSURBVAMAj/Xew62BB6MAAAAASUVORK5CYII="></cm-button>
              <cm-button id="btn_ext_phys_org" label="Phys.org" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADV0lEQVR4nHxTb2hbVRQ/9/3LS17SblnSpF3XdDF2VWprV7agIlYmap0TZfODw+GkKOJXx4YDsSD6ZVBQmB9Escb5B1sQ6YeCyBCKtlsY69o1W9tseUnaLE1eXvPSJq8v9773lpdtsI1tvw/33nPvPb977jm/w8CD0Pch2+5yCKJ3ZR1GR3V4BOi71sgawgeHulucPKMSFvmqLo+9KayVlqeJRQok6ICWAAI5rt9PYDmbz7w9bHfY4cB/f3x+tpiYLBe2dJXdHsdWpyfMGbjiQBzr1XXGBms7NIBbJOgO0yuDw25T159zOfkX27b7vo0nUsXx745J9cP2ozyII5r1iGUyne8/S0j2AsQnNMbaeP6dL7uxRvZ2dTTvYW3c06RKDJ/XHXr9g2FRKavThQL+OybCZp0sNGBjKdhNKsyMZVIwMGCralg+e+b49+4tQjaRWt319WfHv1rN48OPB31xr9v1kZ3XI6F9xz71PvmxEyjfTkSBHzLjFesHdNuuQw2kpBoFcaoSUzyajaF7bG2BM6eHjhzt6dh5gqLplrmryUJpoyITihw0DeNVdZP8DvJs0gqASpX5dYpnnX21LOf+Pz0V2NF8oSfUuT+Zkk4spaXWbF7xIJrZl8rk/iqreBxM/aX2Vrc/l8s5awQGBf8OEYLKN1Rf4zYrpEJBmV8rKm/8Mj5lTkavmIvXM7q0VjJ4juunaPOQms0P7O/fffiTU3/WchBsrJdRjp/XbcEwV7rGY3egaRXr5oHESn42uZLrFZfzqCAr5ygadRBD/42IYxOwrbc8v5h6SpHZMfqO8gxdF6rpsfXMwmTJ1Rbeo2MSX4onT25icoWi6E7DNCLq3E8j4HtZyER/uKxorVFoati4RYC3C1XENoI0U7RM6Vo6yvkfe5dB3HXEoLcIgV/V+R9HAPoZsAscPPGCHZCiwsKoXNcBSG4MflRX1j/Tc77YkvTmyVORrQaYP2NsvIZjkYs1Zx5Cdg7ohmYoVzXYgJwlrNtSniHA7CXQEOiLidLgqlz6Ir0sfYMJnqYRFST5S+cARAKOXgE4loWFiAjri/geKdfRfUSA2QQHoNVKFE1bW3zXe4OmQQlgahPaGi5CFhSA0eo9HfgQ1Bvsdi/4wVGbYyPZ+y/dBAAA//9vdrxpAAAABklEQVQDAHHJf/4JPbt6AAAAAElFTkSuQmCC"></cm-button>
              <cm-button id="btn_ext_science_news" label="Science News" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAACAklEQVR4nIRSTahpURR2jiPKgJuo+4iJnxmSEeYMzGRihoEUZUrd3thAGZC6r0wQ9c7IhMxImSuRmCmD4/qP8vu+Y9fp9e7grcFu77XWt9b3rb2Yx+PxfD5FIhFOiqJE/zPm+TKxWCy4UIKmaVJCqCLUYkj2ZrPhOE7CSN5/vMtkst1ud7/flUolgeFcr9fX6xUe1KJ7vV6z2cSDW3GxWKxarS4WC5vNFggEEH28rN/v5/P50+kkTqfT8XgceXq9XqvVSqXS0WgUDAYRK5VKRqPRbrcDptPpVCqVyWSi0MhisbjdboTlcjmYzOdzxPb7fTabrdVqs9lMrVaD8HQ69Xg8PKVUKlWpVKxWa7lcvt1uZrMZMKgCQCKRIEq/DHdIpxFLJpOtVkuj0USjUafTOR6PoftwOCgUikKh0Gg0Op3Om/INSqCePh6PaOfz+QaDQbvdxj2RSJDJICMUCvn9/kgk8rX+Ap4HbLdb9jeLG8R4vd56vb5cLs/nMwiABpDFYnG1WmUyGSjkARq15vPXJ8uy5LMwb0wTl8lkguzL5YLp5XI5yOt2u/CLP35+mE1m1AA3/BcahsPh4XAIJZgpPgcwh8MBSS6Xy2AwUBgL2QvQQD1ClGwHQgzDED3CavAA4kKMpFIvIxiySziJHx4eIKzX94Ulzr+fDKknNP2+4f94/gAAAP//svlhyQAAAAZJREFUAwAeuDRoNar+9wAAAABJRU5ErkJggg=="></cm-button>
            </cm-collapsible-list>

            <!-- SDKs -->
            <cm-collapsible-list label="SDKs">
              <cm-button id="btn_ext_deno" label="Deno" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACR0lEQVR4nIRTPYsaYRCeXT2ViCAW2qmxuZMUmkTUIogHBzYpbAQLlSAkFun8avwDEYxoCuGSiyJWfhUmksbEVLYSUQkJEhVLW1E0uJuZ5QxmL9wNDLv7zPs88/HOSkFkPM8/4jjuxXw+P5/NZgaWZcFgMEyNRuNnDF8xDDM4Pi89It5DYq5SqTzLZDInw+GQMCGGpDOr1XqaTCYjiL1DKIrYVogdyKvV6lMgEHC1Wi0GbjGfz8eVSqWuUql8SiIsgZg5i+QnB7JCoYB4PA7NZpNrt9u8x+P5K1Cv19lwOHyBnNf0LcHsD8vl8mU6nZYQoFarodPpgN/v51wuF282m7lCocCaTCbo9XqwXq9hPB4D4o8bjUaTKniezWaZ614BxcDpdIJEImHcbjdns9kEPBQKwWQygVgsJlSSy+UoYZiZTqffUf0UK2GwP6jVareNQBis3W6Hfr8Pi8XimxSv6z6RKRiNRuEuo2pUKhXNDZCrp2vkKKDX68HhcNwpMBgMhFlci/FSXJBf+PKAyiL1Y9vtdpDP54V3jUYDo9EIisWigOOMeGx9LsUt+2qxWMw6nY4VZ5PJZMKNkIsNE3JarfYLkS4TicR+u93eOEQDo6z/M9wTav1KimWP9vv9W9zEl+JD1BLuAlSr1X/wYDDIe73eNxj/eVhlBT4+ol+IRZbLJRGg2+0Kc4hEIpBKpT5gez4U2DFH5crx8QqdKjkRC202G5DL5b/x76SppogsVAk3+z7DRwT9HF1PEPocnX7n90j8cXz+DwAAAP//CkgGmAAAAAZJREFUAwC7ZvhnP/iKKQAAAABJRU5ErkJggg=="></cm-button>
              <cm-button id="btn_ext_docker" label="Docker" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACY0lEQVR4nKRTz09TQRCemd1XfhQwsWBE4aL+A4YL0UiIB4Px4EkS4wHsyYOJXkw8qGm8EG9Gox5MkIOJRI4GiZ7wohDR8AeQGCOtaClilbb0vZ1x+l5ti2nigbnM29nZb7/v23kWdhlU/xSCc89NlMXsvZjr70tuTvSNZ4er+/gfAGSYGXVRRtcCpodiHdeBaPhvQ+2ihrDVgvSOZU8YQwnn2y/WusOOt1c5kHsQ4GLUM4O1i3YyqBRQyHo3APGp8dwljMWnydizIHwZjAxGPaOu83y+u3csMxSeVJkVYDw4nht0CHmDcApZjqjS94R0kkFmCfCMY5gTcivCdh3IDXle/BFv/zqentq3HEqgWOs7DIqLILCmfI5BSIcugARp0WsRcUuBJoH4pRN8Tba1XfzfE33JjTcCuGY5KN9VKp8F0UeRFQSzjMwkgh9V0mMR91YxN5DdJ1KmrrQp1JoYQYMjQeHHNPYnc68UaY8Iaz/qK4in6zKBtChoEXWhYIEgdymTQ7ofZ8GHIjKf2Uq8sKr1qIl19AgHCqCeihJHDDNiw9M7H9C2AZfzc+kniauNrzArLhAJSmX2C45dkTkocC0HRSd+wUcQX79LSvQ2QIpgYMkLTWTgB8ilUSTbrix8rRk1FKujIxBpM2DbiEv5m5mp7oVwKj+gHzL4OtmzxA6vCZKgF1dUIqyGcqawhoa5/POWHr4TjbQ6Ux/PqLA/+f20hdgVFTugy06oWAGYU7MWlP391aneeWgSWP9RItTuZPaAYZNQ65nK3rfMs671f3uaAGikdN5TO+e8djClfU33AP4AAAD//4znXB8AAAAGSURBVAMAvIIzalp7uNQAAAAASUVORK5CYII="></cm-button>
              <cm-button id="btn_ext_mdn" label="Mozilla Developer Network" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAACCUlEQVR4nJRSy27TUBCNfRvHL2yJlIVDeO3KCoFEFyhVVIW0TYKEQMAngcKXAOukKlKrijSIRxECmlKpLHC9oAtSKX41cexrc4wbV5G66SyuZubO45yZmbk0W8icR9hUi6IotlmWEMIwzJkmZCZNgBevbdvjsS8KAi/wYRiaA5OGoSSJ2WwWOYghknghLY9naalSq60gyDCMXC736PHDUume7Tj9v33knHZAqu/7mqY1m8+hq6ra6WzMz99tvnxhmZbruL2dHs/zqHuSAKyO49yvVv4cHuq/dUJibo0H9W9fv7vHbiZGO2GVIMGDwiu15ffdD7btgCq+FhfL6+sbNKDgnRCYTImJQLRQ0O7cvtVqtQVBGI1GV4o3rl+7urb2VpalkFLM6XSshCWue1xaKHmet/35iyzLlmXV68v6gbG//wvU/4NhpsYa0KDRqH36uO35DktYjuOq1crm5jtv7ALP1OKQHQRB/mIeM2m3V+ECnmLx8tzNuXZrleMk/IbTm2Vd1y2XFxRF6XS6hOUDP3j67MlgYO786PG5nChJ3GRrMX5JUrBRVVW2trp7P/cAxjRNXddfv3pzYBgwj/pHu71d07QSbMxsXkOT4XCI1qAL1zCWEY5DFEUUxn6QBuqoiyYMrhVe5ECnlMYoCQxwwzBj8MkSkuiTKSXHmKKMwohmaHqOCE11yD8AAAD//9cpoD8AAAAGSURBVAMAUW8Vw7OA+qoAAAAASUVORK5CYII="></cm-button>
              <cm-button id="btn_ext_nodejs" label="Node.js" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACqUlEQVR4nGyTO2iUQRDHZ3b3XjEaQkiEqKCdYGmhGIsUmmsEHxBRRJPCLiJWIgh6ESy0CYJgmToJIogptBJFEBGSJgQrJWrMw4uX3ON77GOc3ctFI+7xzfHNtzvzn9/sCGgtAiwRiNbrhcmTwxcni6tnx0/MDzzpP9XyD06ChL8WtpxT58GGg1MDx/IFcQcQizqykCYEUd0RZ3iq06T08tq7uXCyxMlK4LAV6cx4//7OnvxtKfCqyEmIKtoZ49BqoKhuUeYlgqWGQ3q08KX8cLY0W9lSMDRdHGlrU3dVXnbHG5qMJqe1E8YQuJQgTR3oiKzKCpXblQFy7rNJ0uvPhl6/EHuuHOzSDTeWLYjupJpqIoaBwOmaP/Jw2MFGsSJKqzrJZOWBJMH7nFuIzr0dauVbWk3qzqFABYTNcxCsf0Fy/o98bGAjGxva1So6hkFA0buvg6KaE+WlVEghmlsc4DbSSF4NOl8So27UrAAf9BCQWF9bRykRyz80xLFFIRA327qtWT47a8Q4cqiZS6irxApgRx0gbyA1Bn5yEPZA0LNg9/ffAwDDZzAcf8ZQpTRTDk0yRxAZdlQg3vOikJGoH+UoCeEhKFQtlNcQqG3iqC4aiOds4RrizpADBw5I/1R0qTYLM8F6yGSTQ3UVbtwQggFZqNiqLbOLBQG6Bg0ELXuDAexIqMEf8kHBR/OfS+DFjecsisqrzJ+669lbVlT8xZwuZuVeGmoCpmc0/aTRXuL3S4MxsKrrx97Tu+cEFq2SxCHHauRnCNbwHCVfVtlVslU2xpDfLC4sjQ8Mzozt3WVuRbJcsIwHX989AjGajSXzRS7d2cCwySxFMdmoq6Te29G3s//d5hCsFJ4PCDoG+u71NWZG8u1idUkSW4+v/x2Ouzy47w5uX79BgAA///M4EjZAAAABklEQVQDAN21dqOXcxrzAAAAAElFTkSuQmCC"></cm-button>
              <cm-button id="btn_ext_raspberry_pi" label="Raspberry Pi" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADIElEQVR4nGRTTWxMURQ+976Zea/zg2E6Ro20hJARgioRP0H8BREbCxIbsSOEjW5IiUgQIULib2MnkWqJFYlItSEo/aFpF512tNppO9PpTOd15s177x7nttNo0pOc9+7P+b5z7nfP5fDfDpO/0YIlQ54yT5rGn8h3ke8nb/KEvWmtVIvTuI78wDSIFf8OrvLWyJm1EXeZBxUXB0bWcqM5Awrj66orvcIWiJYN2T6ddTxs+4EmVhFO8CKJJQzR6yv3mf6I3xrrGEVas5ccKp9TcaTCi5aw010p9K8OWJ6wxyRwTIIldooAJ0nqe+uiTqfLwZafWAnjPRkl9rZHROuiYmJAV1YcXwkKZyxW3+OUsUUMU+iDcHVy0pbtHV/Q3zW8mdmI/Y0DkO1Mg5U1weICzLwFzU9blfSXkXsUe5sw0tAxQwuT/PfBn3NgU5tD1OVRqSk/TFwCrn36Cseandhg+vA1pNonkwLI6pEXCeR51CDXLp0IrcJa9ofpqmDdRhqjRgYzmg31vA9OhlaxecxVLUUvYiYz8+LkohPYHTd3Whfmr1GWuubCuXgjKBRyP7QNOowUPBhtFzm0FBPwLMU/lHgH1YLEsnizGrxS6S7FuKmzU/4IqKTvAc8SppJMe71h3O4OQbuRhAqXD5v0eM0PI/GSCIYpe42sYvlqzT93gxrAYTvPC8KGX/lRfK/34zu9DzuNMcyhYAna26gFMaL6A4RZRsn5dCMFljm8LfMdWtn3fEJs1Eq5FG+nezGzSa+GiQGhMMab8wm7ivYoSSxmjq8n3Jg8PyemZNTKPnFRuS/D+0RrPgFbShbi5WAl1pRW4TotwH4bKawN75fqA4Ef0UC2O+fFKwEV4AVdv9jjCSvPynban3PD8FEfgA96P7TkRuD5ot32DvciqgwKGsUWK0fZSLInqFRI/rV0X6eR2uqjh1Gb6RbdhQxrzA1CZ2HMXluywHE/2c4acoO3LIBXV6duEBnMtqPklyu1wIa7C7eC1OB8vAnajOQ3Wr8uX+zM4FkEUtkQQMkQQHVIcZ9GsiGRe1wBcLMHoMCmjozT8f8AAAD//26GE9wAAAAGSURBVAMAB4trUCu3RC4AAAAASUVORK5CYII="></cm-button>
              <cm-button id="btn_ext_rust_by_example" label="Rust - By Example" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABqElEQVR4nIyTvytFYRjHz7muKD8KgxJXBokMQiYDC4tisBhYWPwBJiU/isVgNpukkAxSMjBIGfwIt2TCtVEuca97fJ57v2+dboq3Pr3POef58X2e9z1RL28FQdDF1gnf9ggR7c4ugAff97fM388LrmC7hBrv7zUGaxEFukRTCk6JY1V+hjOp+pJvMSqCbAIz9LJXAVGIwyR8wizsqQX79gb7FI5FrbolYDXxshUy6vMEOmADkjCkln0pe4GjSKineSiVw6v2GFwrUUzJTeEmtEO1rxlYxTuol5P1eqs5NEtBpQpZggaYhjKnoB/qIK3K+7AM27ACVUpq3y411B5YdwnG9dE5HcCMOJQSLyS/EUqsUAT5RRhtcjA7AVdQCAswIdtTclM1DKcMP2kKRtVTWgqMbp3CiJxNgfk+aqgDsJvNiIILL3d8/1mrMAfnFoOChF2KWrjxcjfM3fu0bHdDzf6ARRiEuAXbHYrq46yGY8eZ+aVydsAEpQiyge+4xNaC/RRLXu6sfS/vBwstm005vNuMSPbkMttFamHrC7WQnyQI2VsE37uHHwAAAP//GuIgxQAAAAZJREFUAwAAPIwq155pCwAAAABJRU5ErkJggg=="></cm-button>
              <cm-button id="btn_ext_rust_book" label="Rust - Programming Language" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABqElEQVR4nIyTvytFYRjHz7muKD8KgxJXBokMQiYDC4tisBhYWPwBJiU/isVgNpukkAxSMjBIGfwIt2TCtVEuca97fJ57v2+dboq3Pr3POef58X2e9z1RL28FQdDF1gnf9ggR7c4ugAff97fM388LrmC7hBrv7zUGaxEFukRTCk6JY1V+hjOp+pJvMSqCbAIz9LJXAVGIwyR8wizsqQX79gb7FI5FrbolYDXxshUy6vMEOmADkjCkln0pe4GjSKineSiVw6v2GFwrUUzJTeEmtEO1rxlYxTuol5P1eqs5NEtBpQpZggaYhjKnoB/qIK3K+7AM27ACVUpq3y411B5YdwnG9dE5HcCMOJQSLyS/EUqsUAT5RRhtcjA7AVdQCAswIdtTclM1DKcMP2kKRtVTWgqMbp3CiJxNgfk+aqgDsJvNiIILL3d8/1mrMAfnFoOChF2KWrjxcjfM3fu0bHdDzf6ARRiEuAXbHYrq46yGY8eZ+aVydsAEpQiyge+4xNaC/RRLXu6sfS/vBwstm005vNuMSPbkMttFamHrC7WQnyQI2VsE37uHHwAAAP//GuIgxQAAAAZJREFUAwAAPIwq155pCwAAAABJRU5ErkJggg=="></cm-button>
              <cm-button id="btn_ext_rust_std" label="Rust - std" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB6ElEQVR4nGyTS0hVURSG77neCqIiSKgGRYMgeoIUUVEQN6JBNIgKatLEaFKD6IHkXBB05kAQFEV0IIgKKjhwIioiKj4QFfH9mAk+EZ/X7/f+R47gge/sc/b+12OvtXci5ieVSsWDINhnPMVvFryEW1qCUWiDPjS7oVZ2gY0zmNhjfM7vD/hsvx1wBh75vwqK0XaENgEfjBpSH1jMh5tQC81wG3ZgGj7Ca2eTi03doa0zUOQSuA6/oQLBFvM35IDvBeu+MFTDMHxnvlOhL/BTDu9hG5bgHJyGfddAgfrhK9yBBqiB7Div+/AMemEZrsB5O5uEGTt46q2NuzZJuCsHrxypB/57j4raBE/gDQxZs+7udLmoSTnIhKvQ7SpnelGdWINZeAhbkAOlMGDdpbjTU8QWFY5xzw60pb9QaY1q8hiNtvbAmniC15yNCiio0j/rdFdcbXUny8X7ieYi4x/YhUV1QftsteFJzz34Br8icwq4qRoogxEX7JPHMZiHDQt1BgphCi7H0l17F2oT7GmFLIqcpg6UWjTIfGsk4jKaiVj6fCQdpAjNavQo66jmRVIsgwnXQ5cqO+IwB5v66FGOXqZ/8BYyjpfisGiNKraO8NFlClcj11mt1e17Addi6RarU+3QE2rC63wAAAD//8e3PxkAAAAGSURBVAMAu0jLSSWWiTwAAAAASUVORK5CYII="></cm-button>
              <cm-button id="btn_ext_sqlite" label="SQLite" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAsklEQVR4nJRSqxHDMAy1fRqgYwQWdoyAgoAOUFjYEQoLO0BBQUHGKCzMGBkgIMrp7p0i6fJ5QCdb0nuyLPpM+FXnKq2h+3ZNc8p1fWvbJ27v7xfbx+Xqj+xzTdYBAcLeYVuQBFajZlD4FgFf40FGVyOszzo1lDJcOWzU6OicEmZoxzCSL1jWjBWOdBB6WMhScv/K+A+9vBUWj6HVHtJ8aJQ2YDYl3qdlbulKRKbl27veIwAAAP//AGv7uQAAAAZJREFUAwDdfHBcclX/NwAAAABJRU5ErkJggg=="></cm-button>
              <cm-button id="btn_ext_web_dev" label="web.dev" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACLklEQVR4nIyTv2sUQRzFPzM3d7mTYETBgIoBMWjEH3+HBEUhEiwCaiSFWMTeIpWNYKOVMSpWwWChMUE0wc7OwkJUMBBTicFfkLvzbm/369u9SwKacJlhd2Zn5r3v+77vbCBtl+wEntMYb5hw82AOnLGF5rhsx/V+SYFuYmpEXBHJfZHktB23I/AknCUvcJ2q5gX1cYZtqAlOSdoR5HhLM05BT5zN80xI2eBWSDzj7rlANwRfPZio5wg8kJIz7UjcmmEjdkuga/Kg0drLqZf1Ncg9N7uZsa45rJHclvyr8iPJlDhRen5L4YCUzm1E4ten2vzJqBTc0aoJ7PRO1XRpdpfz1r2RghZBtuGZUr51HglQE9hr9IrekJa9FNm1rvYfgjHMK2RSGLajrsSk6Eo6lWhMBAzqT+jhM+dk5ljmm18lan24RLfxEB1Ma61XacQtbTkpespDeYBr8F8zl7Fcv2C980WelR2HdSxKdDvyEW5lJ4t9/Yzs2c5KpU6uawe2sAAzUwpc4YNS/uHeDdnuqMTrEDgSR0SxJxSrsNgDc6eo1oqKE1HweZLyCsxOY9+XVavAJzk1EKIiFzsFLtcVWdenVIEvAs/0Q5RnW6il9cSCET6+F3gJ5zqJLNCnVEe9JSw3VAPJ9oU/2OJ+mBa4nseFCJNVZmmNDCuVmombZSVOHfzlv35jshLxOCjM0j7ci5MCd+h3iHXQN21OnYpk4cFeOHAMy656nVey+uZfAAAA///ilj6PAAAABklEQVQDALUp4gdZfqxkAAAAAElFTkSuQmCC"></cm-button>
              <cm-button id="btn_ext_webassembly" label="WebAssembly" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACC0lEQVR4nKRSTWsTURQ9b95MMjPaxEattH4UpIIWFF0JClZaalGU4AeCgmYhxYUiotSVi27cSLe6EkTc+QsUFEWoGytSwa4UW9O0HZPYSdOmyWTee96ZGoilAWnu5h0u9553zz1XH0y6CmvEwyfx3tat7G2A3ZzqG7pWeL1WnY4G8fxxacR11SCqYM8elUYa1bFGE/xv6GgymieIWh68CsN6IhJVzU+g1YBOVMtLCs6MIMyQnRMoFiQUrTjIBW+Qm0kLSEmNfBXBQkGhq9vAyfM2so7AsRMm9u43SJ7C6Ys2ODUcP2XhQsqGEApVbxXBUlGirV3D9aGWsPj2cBz9SQvbOjiu3tiIwOtb92NI3WzBrt068r/EvwSxTRrGP3rITPkYOGuFOd8HjvZFMTZaQcdOjonPHr6Meeg/Y6FEchmrI4hEGOYygggEzl3ZgE8fKuEOegYswh72HYgg81Pg3csyug8ZiMU1CL+OgBEqlxTSk344zeibMgyDIZ7Q8JV+3t7JcaTXRPKSjdbNHJ1dOhZJtlZvSdDgZFa0TYxXoRsrec4ZDveYePF0EQ/uuuHPycs2CvMS/OCee8M1AtNiKC4oTH33MfnNx3xOkn6PHJJI//Dx/lUFs9MCs2RlPiuRc2gPd1KOql0i/3sLv6mxfQcnMonyskJiC0eerE20cZg2TTnt0x0wWqyGPwAAAP//AUyjLgAAAAZJREFUAwCxO9bCmZqJ5QAAAABJRU5ErkJggg=="></cm-button>
            </cm-collapsible-list>

            <!-- Social -->
            <cm-collapsible-list label="Social">
              <cm-button id="btn_ext_buymeacoffee" label="Buy Me a Coffee" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACMUlEQVR4nIRTPW/UQBB9azt39tl3ECAhFxEIKAEJJAqggQIQHfAXKKBJSUdDgygRTegQEg0SfwCJMoiP4iI4EYkLFCAUioACCsqdz/b6e5l17g6fEyUjrbx+O/Nm9u2MBjKxgktIcY+258GgQ6Edw7ClvQX4tBrkc58dxRvWC35C4HF5yn2Gz99KWF3T4HEFjAnUqilmj0SYmY6g/Cf+SiRzTHzHAv1cySAVeLlg4u7DfZg+FOPgWII4AmxXgVEWuDPXxumTAZAMSF5JAo82hvyLYobFJR3NVjkLSsiRUcbJ8QS//qgYraW4fbOdr4Ir/WCZ/d0HHc9fWLAdhcpn2RVcWiurGoKQYelLGW/fG5lvzwwtr9OGraI0IjBLdx2hr6aJTMuYKglDBW1bwfqGOqStllf56kWXHBl+/FRhGkmWFaSUXi6huaxiqh7i2mW3/xoFAgFUqqR4LcFEbOHWjSphEwRep0Jn8Hj+AeqjLVQscoy3I+iRWEaM5c4J4AC9rDJJKpqEr1P5j3DqcJL55E0pEkilHYdDpOZmsLxd5BLWxV4625mAbA9dw+cOadEdYGFgI/A9aiixewWWKZDEHrjXGcA+7xDGYVVEMV9GwPMEhi6ofB9d+/cAdrprdBagom+pgEsRG+i3Mpl0qo9xPHs6jzNnX0NQQOtTE8emeEZesMaWYZKdIxtm8WMJf9skYMowvl/gwrkQVXNIxM1hyirPjzNonCWqFnIl6AcPjfM/AAAA///CZf4DAAAABklEQVQDAB5R6M/2pqmAAAAAAElFTkSuQmCC"></cm-button>
              <cm-button id="btn_ext_discord" label="Discord" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAChUlEQVR4nJxTz0tUURQ+57775j3HGRUiFOkHVIhIu4pQlAiiRSC5sGUbqYRatPOPcNdCFxW2sEULocJFIO2MIKJFEILRoiwio4XOzBvffT/u6X53hnDdg/M4nO/77j2/rib/CROxwJu91Zhy3hyzTLnY8S7+XYQ3HWtl7XHf5mENU/ebnv5Z7RnsX2RFd4IgDm2ZkkjpMeaAVBBTWaa5WHp4sLu/sL4+3PYYTrp6c7c6EPe+iKLalcy0LCuxLotAuodz577SRVUlqiljWq/30mRmY3WwrZBGXxgvenHazESEkpboZkJkTMfgIwYMHHCh8SXcmGuMq0Bt4hZcEShSExdC6asTb30ufAZjI5oaTZK373MuLdnApYjsstJOaWGZ17onKMqkyAyp+7djuTwZojRXc+QPCIJOJ86OBvLgUcpxbK0OenVpW/NKKZ60NhNjRI2eYb40ob24I2Rv3a4TMHDAhQZa5Vp9gijnPCe+eK6CIH37UdKz5yklbesNPmLAwAEXGmgVzreWKKowDQ/hPKGt7ZKWnhj6/cd6g48YMHDAhQZa1wPeYQ5PhWEuR4+QYmYaPx/S02VNJ4/54p1fp/46EzDH4TAk6/6uqHzH1SJvtK5wXpB996HEJYKmfd0p6eOn3Bt8xICBAy400P4bI25KjeWxEaVGTmt5+cpwp/uYBtPMtUi2v+RutGLjSPkuWzdG3+LZub2larX/rjHNzGSki1xUraZEuqvoMqdWYllrtlGFiiiqV9rt/eW1lYF7CkvayNOF1K1nxQFxxFSrc+HSo844heDXalwAAwdcaKD1q7yxOpQc/GpeN2l7SUiVSvVqpfwCeIOPGDBwwIXm0Gv8/+f8FwAA//8/gkfUAAAABklEQVQDADz6fHqHlnSpAAAAAElFTkSuQmCC"></cm-button>
              <cm-button id="btn_ext_facebook" label="Facebook" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABfklEQVR4nJRTu05CQRA9c3MjDy0IsQe/AFqtIBY2JvABGi1M0MREegsgUTsNdL4Kba1EPgDjF1ytsBKjlibY8DK4zrL3ch/cmOtJNtk9O3N2ZnZGhwfhbZEhgbwQyPExKTkCDEEweFPpn1LbaU/WJlYUsV4XJSaK+AMCqEaGqHSuqDMRkM6DLpp8mUYAyIhCQ2SliCYJ+bKf8+4y0Dri+zO1bnYmUaR7MyiNxTjnJH7w4nVeWwQuNt3cwzOwcuIgNGR1di7DB+tL9v7OABq8vnpuGxohr3M4KfIRSMTtfeEa6HSnbfhncjoFKJyfs4mk5mXON1TBEvM2ZxVxf3VaQQq0ERBPb+4zp2/o3HF1IuxZZOMReP1UXxiLKu6gYQq8uwXYz6DwlshwHE3va61DO41IAf7QsKD1L+meo6jhn+B5qcm5GBdx8I2yzCews2zlWdU/6he4pwfc20EikS+HojwHVccwOWG2dvnjGKn4nOoRrkGbC1YXI9zKlJ32vwAAAP//N/Hf5AAAAAZJREFUAwBghYNDlcGepAAAAABJRU5ErkJggg=="></cm-button>
              <cm-button id="btn_ext_github_social" label="GitHub" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABtklEQVR4nIyTwStEURSH73szZCiFopTFlM00CzYayp9gpxTFQtkQZcfeghQLC81kFvakLEjZDCuJsLCYwoxig5JixpiZ5zszZ+r2snDq6517z/ndd96557kG8zzPMWr4A5CEe/iCnPpbEDM+s4V1PJZhGhpq2768HGzAouM45UoAoctTxDswZP5nuzAKJVdPWlHxMYxBCj4hCxn1TzV2CMOwJFqpoF8FAYizOcNeEL8D3vSNrfBKrEBsHX8WvmFQEqegXhOLJMhBJZKfrJKfpdEaK+rLGmFSNtM43ZCHXoRp7YuH72mDK02UNRbGvYEmuJbETu3yCzxoYrkmrgmt9aNUpH7YVbGnJ4bsmfCbxuSKm1UXcLXTYm0Q0zKDvuGSzaBWIU1v15dmXb0eo1cl0xYhsfjHJ0iDo6Y6SEYrOJED4rpIwgXckrgHPVYFUdjGPYMIyOwUICFlXRLcZDEHfXAntwEf1ufLDU2oL+McgjW0V/YoH0EXLECG4LlVgTQuY6rDJbYPI/Dj+JISMK5bLRzyrjHpuvglzZmXqZRYsNZlrFKm/Lam+l/krU+QsV2FA/JSlsb7BQAA//8fGtSHAAAABklEQVQDAIsg4TDVy+61AAAAAElFTkSuQmCC"></cm-button>
              <cm-button id="btn_ext_linkedin" label="LinkedIn" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABE0lEQVR4nKyTuWsCQRTGv9lMiBaaowpCWOyF1CFHkwTSJKTOXxAIqZIulim1EiutrUULC7VQEbSxsrARWQQR8QRFWdGVGRkP8NrVXzFvru9783gMxZ5QNsj/0ZjS6j/qEcrn5rjifH7iBkJ8b7/gh6lSc6uB0FCxwcTJr1s+f/CmdzJZMjDKzIBlZJnFfBETlWA5oaj3VGjrDBiiBPIbhuZ6RbndRzBfxeeNjOMjCZXOAB+BHBLFxkwjYQNXZ2Z839kxGI4xGmuwnZrgeXcs3dlowPiLFGB1RvDiy/C149KyvoRV+LMKjxmlxSMhRJ9Bravy2FVHK88P10ajTAv6CWkwgvuN8C6wjwGdXNus0fkL9mACAAD//6aFk0IAAAAGSURBVAMAhuVQry2rc+8AAAAASUVORK5CYII="></cm-button>
              <cm-button id="btn_ext_x" label="X" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAB00lEQVR4nIRSP+tBURh27zVI/sRmlZLVB2Aw2MQHsLAIgywMFsUgBkKSEiWKAbGKmBSSTTaFhBQpgz+/R6eui+F3h3Purs993ufZ73OcRnef847k7P4+3s+eOef9nnPfe+551+Tq382/1Z/m737O7b3/q30w/n6/j+d53s/ncz6fT6fTabfbfr8/HA7P59Pr9f5p/P3u9/vVarVarUZzOBxOp9PxeDwYDKIo+tP464fdbjefz+fz+VwuB4PBYDAYDodjvdfr9Xq9P71ut9vv94PB4HA4HI/Hw+GQy+VyuRwOh8FgoCg6HA4XiwVV/ev1er1eL5fLdrt9PB5Xq9VisQAg5vP5druN4ziO4/l8frvdttvt6vV6rVaz2WwURR+Px263g8Egm82u12u32/14PGq1Wr1e9/t9oDkej5vNZjKZWJZ1OBxm/7/6s1wuAehSqQQ/fD6flcvlarXabDbr9frvH7D79Xq9XC6ZTCZFUb7vJ5PJWq0GP5RKpd/vB4PBbDYrlUqZTAaAmEwm/X4/CIJOp9Pv95vNJgBRLpf/u/y/GZfLBUB8PJ56vZ7NZkEQfDweu91uu92u1+vpdPr1ep1Op8Vi8fF4zOfz9XoNw/AfY3A4HKIoYllWq9Xqdrvlclmr1R6Ph6ZpAEStVotl2VqtBkAEQfD7/eI4juP47/n/fgEAAP//16rKtgAAAAZJREFUDAAG40kK3Zf7mQAAAABJRU5ErkJggg=="></cm-button>
              <cm-button id="btn_ext_youtube_social" label="YouTube" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABnElEQVR4nKxTu0pDQRA9u9mrBiGgsZKoiZ0iiK9CBP/AD7DzD6z8Cq0FGwtbP0IkiKBYCGIbNKkENYgSNckdz2Q35l4rX8vdO7uzM7NnZs46cAhgKCy8TIyFsL+QtF5dEPNQjDobr/jxCL66mBkD+pYYdBjIDFJmqXY8zwTTNn8tgmwA7RfKB+D93OCqSgTza1Ts02DEG1svUriSAOPu4p7rDQ1wzFtXGblJLxusOZsehCWI+NPJ+ClUZCL6lOkgk1xQIbQUDUDZdihNOERRhPgpgrWajuvZqFQfU+TG5v3Nvh6wKp8NNtcNjvaA5UUiqFP3ZvSwl5/6SF5vHOjlx4MQBy3WbWUWKB8Ah7tAsYBOWsYkW511+OPQAK8ayW9F+PkbHNM8uQS2toHTswC0X+uXbEmDXZirEteoL34nN0rCL5EatTuDZp2p5wQdv243JJAXNa1uhYUvpNuYEVRuPECbS7TRhDYitLFV0RSIUaZo+YVILjAeSD8RVShDhUQyO4HK0+PMj1S2Q9x+g8rmkW0lla9v/+sx/f45fwAAAP//ZPH6ZQAAAAZJREFUAwDyMIxgZOLmzQAAAABJRU5ErkJggg=="></cm-button>
            </cm-collapsible-list>

            <!-- Travel -->
            <cm-collapsible-list label="Travel">
              <cm-button id="btn_ext_arts_and_culture" label="Arts & Culture" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACdklEQVR4nHxTW0gUYRQ+Z3Z2vWxaGnYhfEt86CVSF1SkXC2jIq+tZRYEPZQPRkhEtBCR1pNF9VBhFwu6uF6gMAhTrB4sVteHbrSwRHYFd8Ftc3F3dmdOZ2Yvbbp6YObnfPN/3znn++cXYV6YBmpXkiScA4J6QMhm6AMiXLI39t+FJIGJSbFtT3ZYoTECyl+wUxA6Jiy91gVwYhIiskbI6AEFmhRZKOQS17WPCp0q6qvfMF9A/K8dghqKqLbZm/ofRmFHYU/DJiAygYy71ZEW7QBB3n5gwlfXc+9byXRF0dh0halMwxX6oq4svnzJDga7fjTwtrNxXMAM9mV9SFGqIim+hcU8cFeajjO5QyMjvFEAjh2tX10TJmUStMroSvcbB5IKuKsK1hJpZObixZzh8ZI1I+NXprL064ggAxCdXH7Xi0PdgeQjyLq9XD2N2Z8Olj0bDpr1Z8wMB72PfoYyh+pmBXj60dIrQZIQo+ZsjFSHQTk96xVI/pOcbk717JPS3I2DdmumNDoKYqms3x8j6lNCT7AMZrQR+Ph0mhChNHQC/aLBuJPTlyxsIBRsle2+6i3hLCMCdcceKWjITTCRnNG1XH0nE+n63nYeIm3OoYD3ZRK8/wQUsvEHNh6K3WbT4WQifb9aWl7P7FBN7hfNoeb0rYGv0bEjwT/OZV5aVSEGb3E3D9IsU9653NTydtfNzne+UhRRgvxlk0eutlbeiPHiAlRQoPes0N3huxA3ytjwGQx5vyEgG+G000bv/5TyxQQJSbEMWzMfJ3jASg5HKGfE3iwA1nLLz1napx4wErpSdP7O6lXX8jgf4QISe3LbfGF2m8r7CwAA//+h/jYsAAAABklEQVQDALKi+F/8VEOhAAAAAElFTkSuQmCC"></cm-button>
              <cm-button id="btn_ext_earth" label="Earth" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACsUlEQVR4nFRTPVNTQRQ9u29fPvkwRgIRLBihsLG0oRStsLUQlU5t/APS2DgW1hZgIzI2do6FNo4zSueMJTNOGAUMkkASEpK8z3273n35GLwzO293395zzz1nV+BMlEo62UhjUWu9YjEsWExPpoVCLhVVRyy5xRjbyGQyn+nrD3LYYPJpWxc9idVAYZmW5zIJYDQNWBywucZEWmIiFTY5w1v6/yybzR4OAda+6iKzsB5ILEUK0BrglDhGADN5IGX3DhbSIYrZ0Mw/0PKhAeFP3+mEr/HEC7GkKJGx3jAgzS6wewz4Ia0p48i1UfeEqXmLxiq1muAXJrHo+3r5sB5h/0ii2VFxckyPgDoecNAAlOqBVB0bjuSGxR3HcW6IWkvd/1kOckfNKE5M2gyXCgLz0zaSoieRYVKndgpjQKAYyp2EaSXHoe+x2y/dP7VmNDMQU/eFmZkQuDqbgN0HSRDzy5NANtXXiJmhy/zkNJo668fAlvKxROkgRL8b+BLYr/VaMmH0cgI2JYzqkYwgwwiCyljGt378rkjkRi1czFsxtS65/6vac8e41HGhhQxltVFpTQcktU0A4/lRpLLJGCCUGtt7AdmYxPkxHlMnq3F82hPYD3WFd5ruVuAF0MQpcEM0qi14jh/3Yg61HYUfOz4OahKG7cDmtqtQ+htuCbftbBK9m1QwZ5JMO00qkbdysFMi1iQGKfnEQmI8wyEJqN6KGq2uemMV5h7sSVtcpIPXBr0rKjVoSdjW8GJ1XY0G3RMSHp6nXxX0yHos+pW720Vp2Wv9GzYMS1jIjqeRHklB0Nw4IkmE0I/ea+hH318UKsPHZEBCy16ljfgxnQXi5EzsDsOJknrTU+z57uvZyn+v0cTc41KSt/l1UnSFqi3Q1lT/bpF5+ptifINV9Zedj/PD5/wPAAD//6HXBokAAAAGSURBVAMAVHlGCAHVwPUAAAAASUVORK5CYII="></cm-button>
              <cm-button id="btn_ext_maps" label="Maps" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACwUlEQVR4nGxTW0gUURj+z5kzs87O7roWWGtoFvWQbZT1YCBdDMG3SjBIsqIiF6LriwnRsgtFPZQRBhmEEISktulTkRYUBPXgmhEJ6YtgGNFFw3XdnTmXzszuyqbOw5y5fN/3f+f7/0Mg7xIAyF6Lz01sI6r7GAKxxRJcWe3WhgMupWsg7I9LlMQgkeOgPD6yf+KW9NmASFwDxeWlVhoMFUF5UaGksDlqJsNvw0VtWZ4jgu1bJLOKHzVVTaf+Dt6dxoZXgqmnQIfyFSsA0RTljBouw397X1icyJAF/s/BeNUGX5HbN2pgFgiXnBFdxQdoqUfvMzSFciEaEUYSbOCUNzY5XdOweTQICceByLrw677dmJA1Ca5AeKoDbs5fb/4QLWx8fcVzFEj6JBaGkna/4unAozLt8/49kLGOCRySwr3SCkalBRjxBFexqPn2velqe3dya7Nq40KhlT27bsVvpFZ1liDVxRWKyjK+90qB3swjU3jCnMO4oHqKe2qn/MkXakUo9GDETrz24brgjPG1kKMkV5gLCW6lHNKXN04Q3BGY8A5B8Jdp1E1ysLCuaaJbDKDjPwe9p5HvXYyThKEAEcJk3OJ8yBHoAe6EKAQgJJuefkn6NJ84aM0iS9VABcIgOlsFT2fXgs5MinSVsBQbiB+O1eVaifMHSQZ+mSchgTRQwKTQ/jvIHk+XM53LF0VBsvQ8JdCaDRAtzIFd3XFRC2MSeoGoFPeZ6+n9uQrkx6YzdkhTFKnT8qkh9tGpHslsfcGBLRKRbdHrWOfzP6Vtd6xK4kJMzq3gMhFCU9aT4SP99+zW5aZw8SjnDgSC8+Pa9urW94SgSm5/YWKMamznSH3/zGI4XiIQlX1r32gJZF3kkmqXYBa75JAjS/FLHeRcSO87uuqH5N6MeOOzTZB3gPIvsqxANAvGqENGpWVFly33DwAA///GkXnAAAAABklEQVQDALfLJacLfIJAAAAAAElFTkSuQmCC"></cm-button>
              <cm-button id="btn_ext_translate" label="Translate" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACQElEQVR4nIRTTWgTQRT+dmZ2TTbZWNLYGGwjaiUKxosB8RcP4kUQ9aAgKELaiydPngQDojc9FiweFfTkRSzopTQIItKDf1hbhAjS2GCbpDZtsrszzkyTmFSIj3282Z/3833vW3bxfvmhT2hWCIBDmtAX1H3QXzr+5EYyjx5GPINmZQAMAmODr/qBEfzHiO7W9M7uOjLjUi730epVgInWSfz70iA2i+4LvZ+ZmZ21LMYZY4JLnL7PQYgQtZr3lLUStzhA9piLWAiYrwD3Xprw5Lu5cih1ovErFQrZoJTI6QRMk+roOPQsa408IpNffKCY/k7gBACPrz8vVGwsVouwrBqcsC25Mbo54E28AxGhk0/u5bh52sXdc67+wBcGvpRsNOoN3Bp/rDsr16hlbENYqBo4sJ3j1WeCyipwZJi3ic3PcZSL09gzNIhHE5NYXF7BUDyGM0czf0l8MGViVMK4cthHSRYbm6TtrSwjgc1OP9LDcXz7MY/0riT2794BLhllzWlQlMTdfm52bUQ0x3QljDVjEBOv3yAYsHAonYLrupJUKnUg1slCh4uO5BaMr5U+1Bue3K0h1+jr7p7ndQtJOW+SxDuSVSxUIzh1MKPHfzb1VmtBQ/DW6mPEsq5t1JOaSm1MSVqdfcn3z0YUmWQEfXKdQqg/h8JAD8vl3tn5Twsr6hwOU1y/GkciHtSFCSFaE6R3gUxt5zZWCG4iGL3Qj1jUbGugpYOeBZQltvI7l89HkBigemzlCrsisrT0e/wPAAAA//+9jpUOAAAABklEQVQDAGEsF+ChJiJiAAAAAElFTkSuQmCC"></cm-button>
              <cm-button id="btn_ext_travel" label="Travel" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC1klEQVR4nFxSW0hUURTd+3jvXJ1x8jFNjZGaISo5hiTZT+A1hSA/oj7KoPqpKISIHkhg4JUkxIo+gkA/zOj9XRDSWLeCMsWSlLICTc1Q1Hk5Mte5M+d0HzPO1IED55y91tr77L04+HehtllG42C+PSuzFpFw+iMDVJf9ATn8pHomgUkQSCpbFF+nMRG4DTayVyCkl2eRFn0LyO7pb3pMx6RyuNSLLIsx1NXd5QrQhc/QVVZlBJqmhyFjs4IyRLU05P+S9XpQJ06U1pbanSuNL7PLdkxYXNVNPs9tPX4np/7slsjC4P7g0KdM39RTHF0eT3BMAQkISkCD0sZu+3jhqdXZGHDpqgaxaUEKMboKfEwByNkKN7Lru5vvXjgtgUS0Tc1yWs1KhN3zXjjyXQ1YiTLvVelSJKQuEVR9oRBdTLMrlypuqY+Lz/h0rCS1kmQP2kwBQrgAKwry9oNjjIXOo/XAcQ4EKyie59A2XEI+Okv43OBKwGi4LIO8JrAtPhbk0iAUhfRdNRhyX4WOPop//AAW4QTzOBjmqRQURGMKslNkyTE6zQoojQLq3Vl/iBsYBeh6FYQGN4PGnQQu1zEIazMiQM2Rl8erNm5v4qbQfGPIhieheCPBfEcaPPuqQJmLgyIHD5GojiHxkacYKX7WtClDHsA306sy4Rt7dDILDldawassQc+HFWYhqCHMHKIoJ40k1pgClkiEi9kEdm6xAMf7r7GGgkpwZNjh5vsh9iuahy6hja0uWxKmSwpoXzA+9o45Cnt8Ffg2lgcODMLDH/3INB9k8OnMkvMTQus6kUT3FJsKJodbs6Nuh0DVyBxxUheLkiizkWxBjaDRXI5nqo0owiCNOSZHDLCkRaQkF0xXIiu68qCFsu3tVP3dl1XR2aHn8H+52Ep4l4hkrHmq/dj1BDY1ecpimblHZ/d553IHwGOdNp7qgiXZm7xu//3CFxolnIr+CwAA//8XqYsRAAAABklEQVQDADWpJw0DSsvKAAAAAElFTkSuQmCC"></cm-button>
            </cm-collapsible-list>

          </cm-drawer>

          <cm-app-toolbar position="bottom">
            <cm-button id="btn_drawer" tooltip="Access External Services" icon="https://codemelted.com/assets/images/logo-codemelted-dev-twitterx.png"></cm-button>
            <cm-data-spacer></cm-data-spacer>
            <cm-button id="btn_photography" tooltip="Photography" style="margin-right: auto;" icon="📸"></cm-button>
          </cm-app-toolbar>
          <cm-app-sheet
            id="app_sheet_photography"
            icon="📸"
            title="Photography"
          >
            <cm-embedded-frame
              frame_src="https://codemelted.dev/photography"
            ></cm-embedded-frame>
          </cm-app-sheet>
        `;
        this.shadow_root().addEventListener("click", this.#btn_clicked);
      },
      disconnected_cb: () => {
        this.shadow_root().removeEventListener("click", this.#btn_clicked);
      }
    });
  }

  #open_external_service = async (key) => {
    // NOTE: You must match the key values to any cm-button you add
    //       in the collapsble list.
    console.log("key = ", key);
    const EXTERNAL_SERVICES_URLS = Object.freeze({
      // Communication
      btn_ext_calendar: "calendar.google.com",
      btn_ext_contacts: "contacts.google.com",
      btn_ext_fi_wireless: "fi.google.com",
      btn_ext_icloud: "www.icloud.com",
      btn_ext_gmail: "mail.google.com",
      btn_ext_meet: "meet.google.com",
      btn_ext_messages: "messages.google.com/web",
      btn_ext_web_calls: "messages.google.com/fiwebcalls/calls",

      // Developer
      btn_ext_draw_io: "app.diagrams.net",
      btn_ext_blogger: "www.blogger.com",
      btn_ext_cloud: "cloud.google.com",
      btn_ext_firebase: "firebase.google.com",
      btn_ext_github: "github.com",
      btn_ext_hostgator: "www.hostgator.com",
      btn_ext_jalbum: "jalbum.net",
      btn_ext_phaser_io: "phaser.io",
      btn_ext_remote_desktop: "remotedesktop.google.com",
      btn_ext_crates_io: "crates.io",
      btn_ext_rust_playground: "play.rust-lang.org",
      btn_ext_sites: "sites.google.com",
      btn_ext_vscode: "vscode.dev",

      // Financial
      btn_ext_amazon: "www.amazon.com",
      btn_ext_finance: "www.google.com/finance",
      btn_ext_google_one: "one.google.com",
      btn_ext_play_store: "play.google.com",
      btn_ext_shopping: "www.google.com/shopping",
      btn_ext_stripe: "dashboard.stripe.com",
      btn_ext_google_store: "store.google.com",
      btn_ext_google_wallet: "wallet.google.com",

      // Learning
      btn_ext_britannica: "www.britannica.com",
      btn_ext_coursera: "www.coursera.org",
      btn_ext_duckduckgo: "duckduckgo.com",
      btn_ext_gemini: "gemini.google.com",
      btn_ext_grok: "grok.com",
      btn_ext_grokipedia: "grokipedia.com",
      btn_ext_groups: "groups.google.com",
      btn_ext_google_search: "www.google.com",
      btn_ext_wiby: "wiby.me",
      btn_ext_wikipedia: "www.wikipedia.org",

      // Media
      btn_ext_books: "play.google.com/books",
      btn_ext_google_home: "home.google.com/home",
      btn_ext_youtube_music: "music.youtube.com",
      btn_ext_netflix: "www.netflix.com",
      btn_ext_news: "news.google.com",
      btn_ext_photos: "photos.google.com",
      btn_ext_youtube_tv: "tv.youtube.com",
      btn_ext_youtube: "www.youtube.com",

      // Office
      btn_ext_google_account: "myaccount.google.com",
      btn_ext_google_docs: "docs.google.com/document",
      btn_ext_google_drawings: "docs.google.com/drawings",
      btn_ext_google_drive: "drive.google.com",
      btn_ext_icloud: "www.icloud.com",
      btn_ext_google_keep: "keep.google.com",
      btn_ext_passwords: "passwords.google.com",
      btn_ext_google_slides: "docs.google.com/presentation",
      btn_ext_google_sheets: "docs.google.com/spreadsheets",
      btn_ext_youtube_studio: "studio.youtube.com",
      btn_ext_google_tasks: "tasks.google.com",
      btn_ext_google_vids: "docs.google.com/videos",

      // Publications
      btn_ext_acm: "www.acm.org",
      btn_ext_nasa: "www.nasa.gov",
      btn_ext_nih: "www.nih.gov",
      btn_ext_nature: "www.nature.gov",
      btn_ext_nejm: "www.nejm.org",
      btn_ext_phys_org: "phys.org",
      btn_ext_science_news: "www.sciencenews.org",

      // SDKs
      btn_ext_deno: "docs.deno.com",
      btn_ext_docker: "www.docker.com",
      btn_ext_mdn: "developer.mozilla.org",
      btn_ext_nodejs: "nodejs.org/docs/latest/api",
      btn_ext_raspberry_pi: "www.raspberrypi.com",
      btn_ext_rust_by_example: "doc.rust-lang.org/stable/rust-by-example/index.html",
      btn_ext_rust_book: "doc.rust-lang.org/stable/book/index.html",
      btn_ext_rust_std: "doc.rust-lang.org/stable/std/index.html",
      btn_ext_sqlite: "sqlite.org",
      btn_ext_web_dev: "web.dev",
      btn_ext_webassembly: "webassembly.org",

      // Social
      btn_ext_buymeacoffee: "buymeacoffee.com",
      btn_ext_discord: "discord.com",
      btn_ext_facebook: "facebook.com",
      btn_ext_github: "github.com",
      btn_ext_linkedin: "www.linkedin.com",
      btn_ext_x: "x.com",
      btn_ext_youtube: "www.youtube.com",

      // Travel
      btn_ext_arts_culture: "artsandculture.google.com",
      btn_ext_earth: "earth.google.com/web",
      btn_ext_maps: "www.google.com/maps",
      btn_ext_translate: "translate.google.com",
      btn_ext_travel: "www.google.com/travel",
    });

    const is_popup_window = await storage_get({
      key: "cm_is_popup_window"
    });
    ui_open({
      schema: SCHEMA_TYPE.Https,
      url: EXTERNAL_SERVICES_URLS[key],
      popup_window: is_popup_window === "true",
      target: TARGET_TYPE.Blank
    });
  }

  #btn_clicked = (evt) => {
    console.log("evt = ", evt.target.id);
    const target = evt.target.id;
    if (target === "btn_photography") {
      const sheet = this.shadow_root().getElementById("app_sheet_photography");
      sheet.show();
    } else if (target === "btn_drawer") {
      const drawer = this.shadow_root().getElementById("drawer_external_services");
      drawer.open();
    } else {
      if (target.includes("btn_ext")) {
        this.#open_external_service(target);
      }
    }
  }
}
CHtmlComponent.register_component("cm-project-toolbar", CProjectToolbar);
