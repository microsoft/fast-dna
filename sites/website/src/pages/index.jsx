import React from 'react';
import Layout from '@theme/Layout';
import CodeBlock from '@theme-init/CodeBlock';

export default function () {
  return (
    <Layout title="web components" description="FAST web components">
      <div class="frontpage">

          <section class="section">
            <span class="section-badge">FLEXIBLE, PERFORMANT, & INTUITIVE</span>
            <svg role="heading" aria-level="2" width="346" height="120" viewBox="0 0 346 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <title>FAST</title>
              <g clip-path="url(#clip0)">
                <path d="M161 98H164.5C166.9 98 168.4 96.9 168.8 94.4L173.5 68.1H185.4C187.8 68.1 189.3 67 189.7 64.5L190.1 62.2C190.6 59.4 189.2 57.9 186.5 57.9H175.3L178.7 38.2H193.7C196.1 38.2 197.6 37.1 198 34.6L198.4 32.3C198.9 29.5 197.5 28 194.8 28H172.6C170.2 28 168.7 29.1 168.3 31.6L157.4 93.7C156.9 96.5 158.3 98 161 98ZM235.603 32C235.603 29.5 234.003 28 231.503 28H224.303C222.003 28 220.503 29.1 219.703 31.2L197.303 93.4C196.303 96.1 197.603 98 200.503 98H203.703C206.003 98 207.503 96.9 208.203 94.7L212.303 82.4H225.203L225.003 94C225.003 96.7 226.303 98 228.903 98H232.403C235.003 98 236.403 96.7 236.403 94L235.603 32ZM215.503 72.8L225.903 41.7L225.403 72.8H215.503ZM292.812 49.4L294.212 41.6C296.112 31.2 288.212 27.2 279.612 27.2H279.412C268.812 27.2 261.512 31.2 259.612 41.6L258.012 50.8C256.912 57 260.812 61.4 266.212 64.8L273.512 69.4C276.612 71.3 277.512 73.3 276.812 77.1L275.812 82.6C275.112 86.9 272.212 88.8 268.712 88.8C265.212 88.8 263.112 86.9 263.812 82.6L264.912 76.3C265.412 73.5 264.012 72 261.312 72H258.012C255.612 72 254.012 73.2 253.612 75.6L252.112 84.2C250.212 95.1 257.312 98.8 266.912 98.8H267.112C278.712 98.8 285.012 95 286.912 84.2L288.712 74.1C290.012 67 286.612 64 280.412 60.1L273.012 55.5C270.012 53.6 269.312 51.6 269.912 48L270.812 43.2C271.512 38.8 274.312 37.2 277.712 37.2C281.112 37.2 283.312 38.8 282.612 43.2L281.612 48.7C281.112 51.5 282.512 53 285.212 53H288.512C290.912 53 292.412 51.9 292.812 49.4ZM341.418 28H314.518C312.118 28 310.618 29.1 310.218 31.6L309.818 33.9C309.318 36.7 310.718 38.2 313.418 38.2H320.718L311.018 93.7C310.518 96.5 311.918 98 314.618 98H318.118C320.518 98 322.018 96.9 322.418 94.4L332.318 38.2H340.318C342.718 38.2 344.218 37.1 344.618 34.6L345.018 32.3C345.518 29.5 344.118 28 341.418 28Z" fill="#F9F9F9" />
                <path d="M57.3155 69.2971L66.3983 66.7923C68.2775 66.1661 69.2171 64.6006 68.9039 62.722C68.5907 60.8434 66.7115 59.9041 64.8323 60.2172L55.7495 62.722C53.8703 63.3482 52.9307 64.9137 53.2439 66.7923C53.5571 68.6709 55.4363 69.9233 57.3155 69.2971Z" fill="#E1477E" />
                <path d="M47.606 68.6709C47.2928 66.7923 45.4136 65.853 43.5345 66.1661L2.50537 77.4377C0.626179 78.0639 -0.313418 79.6294 -0.000218954 81.508C0.31298 83.3866 2.19217 84.3259 4.07137 84.0128L45.1004 72.7412C46.9796 72.115 47.9192 70.2364 47.606 68.6709Z" fill="#E1477E" />
                <path d="M78.2999 63.9744L90.8279 60.5303C92.7071 59.9042 93.6466 58.3387 93.3334 56.4601C93.0202 54.5815 91.1411 53.6422 89.2619 53.9553L76.7339 57.3994C74.8547 58.0256 73.9151 59.5911 74.2283 61.4696C74.5415 63.3482 76.4207 64.2875 78.2999 63.9744Z" fill="#E1477E" />
                <path d="M139.346 43.3144C136.211 32.0794 124.926 25.2136 113.641 28.3344C113.014 28.3344 112.701 28.6465 112.074 28.9586C100.475 15.227 81.98 8.67324 63.7984 13.6666C45.9303 18.6599 33.0779 33.0157 29.3161 50.4923C29.0027 52.6769 27.4353 54.2373 25.241 54.8614L9.56721 59.2306C7.68635 59.8548 6.74593 61.4152 7.0594 63.2877C7.37288 65.1602 9.25373 66.0964 11.1346 65.7843L47.4977 55.7977C49.3786 55.1735 50.319 53.6131 50.0055 51.7406C49.692 49.8681 47.8112 48.9319 45.9303 49.244L43.736 49.8681C39.9743 50.8044 36.5261 47.6836 38.0935 43.9386C43.1091 32.7036 52.8268 23.6532 65.3658 20.2203C80.4126 16.1632 96.0864 21.1566 106.118 32.0794C99.5346 37.0728 96.3999 45.8111 98.5942 54.5494C100.789 63.2877 107.998 69.2172 116.149 70.1535C113.014 85.1334 101.729 97.9288 86.3687 101.986C75.0835 105.107 62.858 102.61 53.1403 96.3684C49.692 94.1838 51.2594 89.5026 55.0211 88.2543L75.397 82.6368C77.2779 82.0126 78.2183 80.4522 77.9048 78.5797C77.5913 76.7072 75.7105 75.771 73.8296 76.0831L34.3318 87.0059C32.4509 87.6301 31.5105 89.1905 31.824 91.063C32.1374 92.9355 34.0183 93.8718 35.8991 93.5597H36.2126C38.0935 92.9355 40.2878 93.5597 41.8552 95.1201C53.4537 107.291 71.3218 113.221 88.8765 108.228C107.371 103.234 120.537 87.6301 123.672 69.8414C123.986 69.8414 124.613 69.8414 124.926 69.5293C135.584 66.4085 142.167 54.8615 139.346 43.3144ZM118.97 63.9118C110.82 63.9118 103.923 57.3581 103.923 48.9319C103.923 40.5057 110.82 33.9519 118.97 33.9519C127.12 33.9519 134.017 40.5057 134.017 48.9319C134.017 57.3581 127.434 63.9118 118.97 63.9118Z" fill="#E1477E" />
              </g>
              <defs>
                <clipPath id="clip0">
                  <rect width="346" height="120" fill="white" />
                </clipPath>
              </defs>
            </svg>

            <p class="section-paragraph">FAST is dedicated to providing support for native Web Components and modern Web Standards, designed to help you efficiently tackle some of the most common challenges in website and application design and development.</p>
            <p class="section-paragraph">For an in-depth explanation of FAST <a href="https://www.fast.design/docs/introduction/">see our docs introduction</a></p>
          </section>

          <div role="divider" class="section-decoration"></div>

          <section class="section">
            <span class="section-badge">HOW TO</span>
            <h2 class="section-heading">Getting Started</h2>
            <h3>Install the package</h3>
            <CodeBlock>
              npm install @microsoft/fast-element
            </CodeBlock>

            <h3>Create a web component</h3>
            <CodeBlock language="typescript">
              {`/*
 * import utilities from @microsoft/fast-element
 */
import { attr, css, FASTElement, html } from "@microsoft/fast-element";

/*
 * Define your component logic
 */
class HelloWorld extends FASTElement {
  @attr
  name: string;
}

/*
 * Define your component for the browser and
 * include your CSS styles and HTML template
 */
HelloWorld.define({
  name: "hello-world",
  template: html\`<span>Hello \${x => x.name}!</span>\`,
  styles: css\`
    span {
      color: red;
    }
  \`;,
});`}
            </CodeBlock>

            <h3>Add it to your project</h3>
            <CodeBlock language="html">
              {`<hello-world name="Earth"></hello-world>`}
            </CodeBlock>
          </section>

          <div role="divider" class="section-decoration"></div>

          <section class="section">
            <span class="section-badge">FULLY INTEGRATED</span>
            <h2 class="section-heading">Works with existing frameworks</h2>
            <p class="section-paragraph">Standards-based Web Components are the foundation of each FAST component, making them compatible with almost any modern web framework.</p>
          </section>

          <div role="divider" class="section-decoration"></div>

          <section class="section">
            <span class="section-badge">DIFFERENT STROKES FOR DIFFERENT FOLKS</span>
            <h2 class="section-heading">Other ways to use FAST</h2>
            <p class="section-paragraph">We hope you're excited by the possibilities that FAST presents. But, you may be wondering where to start. Here are a few statements that describe various members of our community. We recommend that you pick the statement you most identify with and follow the links where they lead. You can always come back and explore another topic at any time.</p>
            <ul>
              <li>"I just want ready-made components!" - <a href="https://docs.microsoft.com/en-us/fluent-ui/web-components/">Check out the FluentUI Web Components.</a></li>
              <li>"I want to build my own components." - <a href="https://fast.design/docs/fast-element/getting-started">Jump to the fast-element docs.</a></li>
              <li>"I need to integrate FAST with another framework or build system." - <a href="https://fast.design/docs/integrations/introduction">Jump to the integration docs.</a></li>
              <li>"I want to look at a quick reference." - <a href="https://fast.design/docs/resources/cheat-sheet">Jump to the Cheat Sheet</a></li>
            </ul>
          </section>

          <div role="divider" class="section-decoration"></div>

          <section class="section">
            <span class="section-badge">BUILT ON FAST</span>
            <h2 class="section-heading">Showcase</h2>
            <div class="section-showcase">
              <a class="section-showcase-item-link" rel="noopener noreferrer" href="https://docs.microsoft.com/en-us/fluent-ui/web-components/">
                <span class="section-showcase-item">
                  <svg width="47" height="82" viewBox="0 0 47 82" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.1562 1.06277L1.84846 12.7679C0.704757 13.4271 0 14.6468 0 15.9669V67.0331C0 68.3532 0.704757 69.5729 1.84846 70.2321L21.2319 81.4045C22.4627 82.1139 24 81.2256 24 79.805V55.3333L45.225 43.0995C46.4573 42.3892 46.4573 40.6108 45.225 39.9005L24 27.6667L45.225 15.4328C46.4573 14.7225 46.4573 12.9441 45.225 12.2339L25.8438 1.06277C24.7026 0.40498 23.2974 0.404979 22.1562 1.06277Z" fill="white"></path>
                  </svg>
                </span>
                <p>Fluent UI</p>
              </a>
              <a class="section-showcase-item-link" rel="noopener noreferrer" href="https://backlight.dev/blog/introducing-furious-a-section-showcase-item/">
                <span class="section-showcase-item">
                  <svg viewBox="0 0 503.75934 190.7" width="503.75934" height="190.7">
                    <g transform="translate(-4.240654,-169.6)" fill="currentColor">
                      <path d="m 256.1,169.6 c 1.4,0.3 2.8,0.6 4.2,0.7 3,0.2 6,0.1 9,0.3 7.7,0.6 15.3,1.9 22.5,4.6 -0.9,2.5 -0.9,2.7 1,3.9 2.6,1.7 5.4,3.1 8.2,4.7 -0.3,0.2 -0.4,0.4 -0.5,0.3 -1.1,-0.4 -2.2,-0.8 -3.2,-1.3 -15,-7.8 -31.1,-9.5 -47.7,-8.4 -14.2,0.9 -27.8,4.4 -41.4,8.3 -5,1.5 -9.9,3.5 -13.9,6.9 -3.6,3 -4.1,7.1 -1.2,10.7 1.7,2.3 4,3.8 6.8,4.4 2.4,0.5 4.9,0.8 7.4,0.9 13.5,0.5 26.9,1 40.4,1.4 17.8,0.6 35.6,1.2 53.3,1.5 18.8,0.3 37.7,1 56.5,-0.5 4.2,-0.3 8.3,-0.6 12.2,-2.5 0.8,-0.4 2,-0.3 3,-0.2 7.2,0.6 14.3,1.2 21.5,1.8 16.7,1.3 33.3,3.3 49.6,7.2 9.5,2.3 18.9,5 28.4,8.8 -2,2.4 -0.6,4.2 0.7,6 1.2,1.7 2.5,3.4 3.7,5.1 0.9,1.2 1.7,2.4 2.8,3.9 -1.1,0.1 -1.6,0.2 -2.1,0.2 -1.6,0 -3.1,0 -4.7,0.1 -2.2,0.2 -4,-0.6 -5.7,-1.9 -13.2,-10.4 -28.1,-16.4 -45,-17 -11.9,-0.4 -23.8,-1.2 -35.7,-1.4 -23.3,-0.5 -46.6,-0.5 -69.8,-1 -22.7,-0.5 -45.5,-1.5 -68.2,-2.3 -18.3,-0.6 -36.6,-1.2 -54.9,-1.8 -7.6,-0.3 -15.2,-0.7 -22.7,-0.8 -11.2,-0.2 -22.5,-0.5 -33.7,-0.2 -11.8,0.3 -23.5,1 -35.3,-0.4 -3.5,-0.4 -7,-0.5 -9.5,-4 -0.9,2.5 -1.6,4.5 -2.4,6.5 l 0.1,0.1 c -0.2,-2.1 1.6,-4.5 -0.9,-6.3 1.1,-2.7 2.2,-5.3 3.4,-8.1 0.8,4.1 1.6,4.8 5.5,5.1 0.5,0 1,0.1 1.6,0.1 8.5,-0.6 16.9,-1.1 25.4,-1.7 1.2,-0.1 2.3,-0.4 3.4,-0.9 1.6,-0.8 1.6,-2 0.1,-3.2 -0.4,-0.3 -0.8,-0.5 -1.7,-1.1 1.5,0 2.4,-0.1 3.2,0 9.1,1 17.6,-1.2 26.1,-4.1 12.6,-4.3 25.2,-8.6 37.8,-12.8 3.3,-1.1 6.8,-2 9.6,-4.3 0.8,-0.6 1.9,-0.8 2.9,-1 14.5,-3.1 29,-5.3 43.8,-5.6 1.5,0 3.1,-0.5 4.6,-0.7 0.4,0 1,0 1.5,0 z M 127,207.7 c 14.5,0 29,-0.3 43.5,0 10.8,0.2 21.7,1 32.5,1.5 1.4,0.1 2.8,0 4.2,0 0.1,-0.3 0.2,-0.5 0.2,-0.8 -0.7,-0.4 -1.3,-1 -2,-1.1 -10.5,-1.8 -21.1,-3.9 -31.8,-4.1 -6.8,-0.2 -13.6,-0.9 -20.3,-0.5 -9.4,0.6 -18.7,1.9 -28,3 -0.9,0.1 -1.8,0.7 -2.7,1 0,0.3 0,0.6 0.1,0.9 1.4,0 2.8,0.1 4.3,0.1 z m 335.6,13.8 c -12.7,-4.2 -25.7,-6.9 -39,-8.1 -19.2,-1.7 -38.5,-2.9 -57.8,-4.4 -0.8,-0.1 -1.6,0 -2.3,0.1 -0.3,0 -0.6,0.4 -1.3,0.8 1.5,1.3 3.2,1.3 4.8,1.4 14.7,1.1 29.4,2.1 44.1,3.4 16.9,1.4 33.7,3.5 50.2,8.1 1,0.3 2,0.5 3,0.7 0.2,0 0.4,-0.2 1.1,-0.5 -1.1,-0.7 -1.9,-1.2 -2.8,-1.5 z"></path>
                      <path d="m 85.8,177.4 c 2.5,3.9 5.4,7.6 7.3,11.8 1.8,4.1 2.5,8.7 3.8,13.6 9.4,0 18.9,-0.4 28.4,-1.6 0.2,-0.4 0.4,-0.7 0.6,-1.1 -0.8,-0.5 -1.7,-0.8 -2.3,-1.4 -6.1,-5.9 -12.1,-11.8 -18.1,-17.9 -1.8,-1.9 -3.6,-3.2 -6.3,-3.4 -4.3,-0.2 -8.5,-0.7 -12.7,-1.1 -0.3,0.4 -0.5,0.7 -0.7,1.1 z"></path>
                      <path d="m 355.1,205.3 c -15.3,-9.8 -54.8,-27.7 -60,-26.8 0.9,0.6 1.4,1 2,1.3 13,7.5 26.2,14.7 39,22.6 6,3.8 11.9,4.8 19,2.9 z"></path>
                      <path d="m 310,205.1 c 5.3,1.3 10.1,-0.2 14.8,-1.2 -0.7,-4.3 -1.5,-5.2 -5.4,-5.9 -1.8,-0.3 -3.6,-0.6 -5.4,-0.6 -4.2,0 -5.6,1.9 -4.6,6.1 0.1,0.5 0.4,1 0.6,1.6 z"></path>
                      <path d="m 169,186.8 c -11.6,3 -23.2,5.9 -35.1,9 3.6,0.7 7.1,0.7 10.4,-0.3 8.3,-2.6 16.7,-5.3 25,-7.9 -0.1,-0.3 -0.2,-0.5 -0.3,-0.8 z"></path>
                      <path d="m 499.5,270.3 c 0.2,-4.5 0.4,-9.1 0.6,-13.6 0.1,-3.1 0.3,-6.3 0.6,-9.4 0.3,-3.5 -0.3,-6.5 -3.1,-8.2 -4.4,0.6 -8.4,1.1 -11.6,1.5 2.3,0 5.3,0 8.3,0 3.2,0 4.3,0.9 4.6,4.1 0.2,2.8 -0.2,5.7 -0.2,8.6 0,5.7 0,11.3 0,17 0.2,0 0.5,0 0.8,0 z"></path>
                      <path d="m 473.3,226.4 c 2.7,1.5 5.4,2.8 7.8,4.5 2.5,1.8 4.9,3.9 7,6.2 1.2,1.3 2.1,1.7 3.9,0.7 -0.5,-0.8 -0.8,-1.6 -1.3,-2.2 -3.9,-4.2 -8.6,-7.5 -13.8,-10.1 -1.5,-0.8 -2.9,-1.3 -3.6,0.9 z"></path>
                      <path d="m 192.2,336.8 c 0,3.2 2.2,4.9 4.6,4.9 2.9,0 5.5,-1.4 6.3,-5.4 l 7.5,-42.8 h 21.2 L 224,338 c -2.9,16.1 -13.8,22.1 -29.6,22.1 -14,0 -23.7,-7.5 -23.7,-19.9 0,-1.4 0.1,-2.9 0.7,-6.3 l 7.1,-40.4 h 21.2 l -7.1,40.4 c -0.4,1.9 -0.4,2.5 -0.4,2.9 z"></path>
                      <path d="m 272.9,332.6 11.1,26.8 h -24.4 l -7.1,-20.7 -3.7,20.7 h -21.6 l 11.6,-65.9 h 26.1 c 15.3,0 21.7,9.6 21.7,19 0,12.4 -5.1,16.4 -13.7,20.1 z M 259.4,319 c 3.8,0 5.7,-2.5 5.7,-5.4 0,-2.6 -1.9,-4.3 -4.5,-4.3 h -3 l -1.7,9.6 z"></path>
                      <path d="m 289,359.4 11.6,-65.9 h 21.1 l -11.6,65.9 z"></path>
                      <path d="m 358,292.7 c 22.1,0 32.4,14.9 32.4,30.6 0,18.4 -13.3,37 -37.8,37 -21.7,0 -32,-15 -32,-30.8 0.1,-17.9 13.1,-36.8 37.4,-36.8 z m -1.6,19.7 c -8.2,0 -12.8,8.2 -12.8,15.6 0,6.1 3.1,11.7 10.1,11.7 8.2,0 12.8,-8.2 12.8,-15.6 0,-6.2 -3.2,-11.7 -10.1,-11.7 z"></path>
                      <path d="m 414,336.8 c 0,3.2 2.2,4.9 4.6,4.9 2.9,0 5.5,-1.4 6.3,-5.4 l 7.5,-42.8 h 21.2 l -7.9,44.5 c -2.9,16.1 -13.8,22.1 -29.6,22.1 -14,0 -23.7,-7.5 -23.7,-19.9 0,-1.4 0.1,-2.9 0.6,-6.3 l 7.1,-40.4 h 21.2 l -7.1,40.4 c -0.2,1.9 -0.2,2.5 -0.2,2.9 z"></path>
                      <path d="m 476.6,359.9 c -12.8,0 -22.2,-4.9 -28.2,-8.7 l 6.9,-13.7 c 6.7,4.1 10.9,6.6 18,6.6 4.1,0 6.5,-2 6.5,-4.1 0,-1.9 -1.9,-3.9 -5.2,-4.4 -13.5,-2.2 -19.1,-8.7 -19.1,-18.7 0,-11.4 10.3,-23.7 26.8,-23.7 12.9,0 19.3,2.8 25.7,6 l -6.9,14.2 c -6.2,-3.3 -11.2,-4.6 -18.3,-4.6 -2.7,0 -5.2,2 -5.2,4.1 0,1.9 1.8,3.8 6.7,4.5 13.6,2 21.4,10.4 21.4,21.9 0.1,11.5 -8.7,20.6 -29.1,20.6 z"></path>
                      <path d="m 176.5,276.9 4.8,-27.4 h -51.7 v 0 c -8.9,0 -17.8,0 -26.8,0 -4.1,0 -8.3,0 -12.4,0.2 -2.6,0.1 -4.3,1.9 -4.5,4.4 -0.2,2.4 1.1,4.1 3.7,4.7 1.2,0.3 2.4,0.4 3.6,0.4 2.7,0.1 5.3,0 8,0 2.2,0 3.7,1.1 4.5,3.1 1.5,3.7 -1,7.2 -5.2,7.2 -13.8,0 -27.5,0 -41.3,0 -0.8,0 -1.6,0 -2.3,0 -2.5,0.3 -4,2.1 -4,4.8 0,2.7 1.6,4.5 4.1,4.6 0.7,0.1 1.4,0 2.1,0 17.7,0 35.4,0 53.1,0.1 3.8,0 5.9,1.9 5.9,5.2 0,3.3 -2.1,5.3 -5.8,5.3 -5.5,0 -11.1,0 -16.7,0 -1.6,0 -3.3,0 -4.8,0.2 -3.2,0.4 -4.5,2.2 -4.2,5.4 0.2,2.4 1.9,3.9 5.1,4.1 2.4,0.1 4.8,0 7.2,0.1 2.2,0 3.9,0.9 4.8,3 1.6,3.6 -0.7,7.3 -4.7,7.3 -16.7,0.1 -33.4,0.1 -50,0.2 -13.2,0 -26.4,0 -39.6,0.2 -1.2,0 -2.7,0.5 -3.7,1.3 -1.5,1.2 -1.8,3.1 -1.1,4.9 0.7,2 2.3,2.9 4.3,2.9 4.7,0.1 9.3,0.2 14,0.2 17.2,0 34.4,0 51.6,0 10.5,0 20.9,0 31.4,0 3.3,0 5.3,2.1 5.3,5.1 0,3.2 -2.1,5.2 -5.7,5.2 -16.9,0 -33.7,0 -50.6,0 -3.2,0 -5,1.8 -5,4.8 0,2.9 1.8,4.7 4.9,4.7 4.3,0 8.5,0 12.8,0 7.4,0 14.7,0 22.1,0 3.1,0 5.1,1.5 5.6,4 0.7,3.6 -1.5,6.4 -5.3,6.4 -5,0.1 -10.1,0 -15.1,0 -1.9,0 -3.4,0.7 -4.3,2.4 -1.8,3.4 0.5,7.1 4.4,7.1 11.8,0 23.6,0 35.4,0.1 v 0 h 16 l 6.6,-37.7 h 33.7 l 4.8,-27.4 h -33.6 l 3.1,-17.4 h 35.5 z"></path>
                      <path d="m 56.7,299.2 c -6.9,0 -13.8,0 -20.8,0 -3.8,0 -6,-3.4 -4.4,-6.9 0.8,-2 2.5,-2.6 4.5,-2.6 11.2,0 22.4,0 33.5,0 2.7,0 5.4,0 8.2,0 3,0 4.7,1.8 4.8,4.7 0,2.9 -1.8,4.8 -4.8,4.9 -7,0 -14,0 -20.9,0 -0.1,-0.1 -0.1,-0.1 -0.1,-0.1 z"></path>
                      <path d="m 48.5,349.8 c 3.3,0 6.6,0 9.9,0 3.1,0 4.9,1.8 4.9,4.7 0.1,2.8 -1.9,4.7 -5,4.8 -6.6,0 -13.2,0 -19.8,0 -3.1,0 -4.9,-1.8 -4.9,-4.8 0,-3 1.7,-4.7 4.9,-4.7 3.3,0 6.6,0 9.9,0 0.1,0 0.1,0 0.1,0 z"></path>
                      <path d="m 67.1,259.4 c -1.5,-0.1 -3.6,-0.2 -5.7,-0.5 -2.5,-0.4 -3.8,-2.1 -3.8,-4.6 0,-2.3 1.3,-4.2 3.8,-4.4 4,-0.3 8,-0.3 11.9,-0.2 2.2,0.1 3.7,2.2 3.7,4.5 0,2.4 -1.4,4.4 -3.7,4.7 -1.8,0.4 -3.7,0.4 -6.2,0.5 z"></path>
                      <path d="m 333.5,222.2 c -18.6,-0.3 -37.1,-1 -55.6,-1.6 -12,-0.4 -24,-1.1 -36,-1.6 -12.5,-0.5 -9.3,-0.5 -21.5,-0.9 -2.1,-0.1 -3.3,0.1 -4.5,1.2 -2.3,2.2 -2.6,1.8 -2.7,4.2 -0.1,8.5 9.9,26.5 12.3,28.4 2.8,2.2 21.9,2.6 31.2,3 19.1,0.8 38.1,1.6 57.2,2.5 15.9,0.7 31.9,1.4 47.8,2.3 7.7,0.5 15.3,1.4 23,2.1 0.7,0.1 1.3,0.1 1.9,0.3 4.7,1.9 0.7,-18.3 13.1,-32.5 3.1,-3.5 4.8,-5.4 15.4,-6.5 -27.5,-0.3 -54.5,-0.4 -81.6,-0.9 z m -106,20.5 c -0.1,-0.5 0.2,-1 0.7,-1.2 l 11.9,-3.3 c 0.5,-0.1 1.1,0.2 1.2,0.7 0.1,0.5 -0.2,1 -0.7,1.2 l -11.9,3.3 c -0.6,0.1 -1.1,-0.2 -1.2,-0.7 z m 36.4,-3.5 c -0.1,0.1 -0.3,0.1 -0.4,0.1 -0.9,5.2 -4.8,9.7 -10.1,11.2 -5.1,1.4 -10.3,-0.3 -13.7,-3.8 -0.5,-0.5 -1.1,-0.6 -1.6,-0.5 H 238 c -0.5,0.1 -1.1,-0.2 -1.2,-0.7 -0.1,-0.5 0.2,-1 0.7,-1.2 l 11.5,-3.2 c 0.5,-0.1 1.1,0.2 1.2,0.7 0.1,0.5 -0.2,1 -0.7,1.2 l -5.9,1.6 c -1.1,0.4 -1.6,1.7 -0.5,2.4 2.8,1.8 6.4,2.5 9.7,1.6 4.5,-1.2 7.8,-4.9 8.7,-9.3 -2.4,-0.3 -4.5,-2 -5.1,-4.5 -0.6,-2.5 0.3,-5.1 2.2,-6.5 -2.9,-3.2 -7.5,-4.6 -11.9,-3.5 -3.6,1 -6.5,3.6 -8,6.9 -0.5,1.1 0.5,2 1.6,1.7 l 0.6,-0.2 c 0.5,-0.1 1.1,0.2 1.2,0.7 0.1,0.5 -0.2,1 -0.7,1.2 l -10.6,2.9 c -0.5,0.1 -1.1,-0.2 -1.2,-0.7 -0.1,-0.5 0.2,-1 0.7,-1.2 l 4.6,-1.3 c 0.6,-0.2 1.1,-0.6 1.2,-1.3 1.1,-5.1 4.8,-9.3 10.1,-10.7 5.3,-1.4 10.7,0.5 14.1,4.5 0.2,-0.1 0.3,-0.2 0.5,-0.2 3.3,-0.9 6.6,1.1 7.5,4.4 0.6,3.4 -1.3,6.8 -4.4,7.7 z m -20.2,-2 2.6,-0.7 c 0.5,-0.1 1.1,0.2 1.2,0.7 0.1,0.5 -0.2,1 -0.7,1.2 l -2.6,0.7 c -0.5,0.2 -1.1,-0.2 -1.2,-0.7 -0.1,-0.6 0.2,-1 0.7,-1.2 z m 6.1,-1.5 3.6,-1 c 0.5,-0.1 1.1,0.2 1.2,0.7 0.1,0.5 -0.2,1 -0.7,1.2 l -3.6,1 c -0.5,0.1 -1.1,-0.2 -1.2,-0.7 -0.1,-0.6 0.2,-1.1 0.7,-1.2 z"></path>
                      <circle cx="262.1" cy="233.2" r="4.4"></circle>
                    </g>
                  </svg>
                </span>
                <p>Furious</p>
              </a>
              <a class="section-showcase-item-link" rel="noopener noreferrer" href="https://github.com/microsoft/vscode-webview-ui-toolkit">
                <span class="section-showcase-item">
                  <svg viewBox="0 0 100 100" fill="white" xmlns="http://www.w3.org/2000/svg">
                    <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M70.9119 99.3171C72.4869 99.9307 74.2828 99.8914 75.8725 99.1264L96.4608 89.2197C98.6242 88.1787 100 85.9892 100 83.5872V16.4133C100 14.0113 98.6243 11.8218 96.4609 10.7808L75.8725 0.873756C73.7862 -0.130129 71.3446 0.11576 69.5135 1.44695C69.252 1.63711 69.0028 1.84943 68.769 2.08341L29.3551 38.0415L12.1872 25.0096C10.589 23.7965 8.35363 23.8959 6.86933 25.2461L1.36303 30.2549C-0.452552 31.9064 -0.454633 34.7627 1.35853 36.417L16.2471 50.0001L1.35853 63.5832C-0.454633 65.2374 -0.452552 68.0938 1.36303 69.7453L6.86933 74.7541C8.35363 76.1043 10.589 76.2037 12.1872 74.9905L29.3551 61.9587L68.769 97.9167C69.3925 98.5406 70.1246 99.0104 70.9119 99.3171ZM75.0152 27.2989L45.1091 50.0001L75.0152 72.7012V27.2989Z" fill="white"></path>
                    </mask>
                    <g mask="url(#mask0)">
                      <path d="M96.4614 10.7962L75.8569 0.875542C73.4719 -0.272773 70.6217 0.211611 68.75 2.08333L1.29858 63.5832C-0.515693 65.2373 -0.513607 68.0937 1.30308 69.7452L6.81272 74.754C8.29793 76.1042 10.5347 76.2036 12.1338 74.9905L93.3609 13.3699C96.086 11.3026 100 13.2462 100 16.6667V16.4275C100 14.0265 98.6246 11.8378 96.4614 10.7962Z" fill="#DDDDDD"></path>
                        <g filter="url(#filter0_d)">
                          <path d="M96.4614 89.2038L75.8569 99.1245C73.4719 100.273 70.6217 99.7884 68.75 97.9167L1.29858 36.4169C-0.515693 34.7627 -0.513607 31.9063 1.30308 30.2548L6.81272 25.246C8.29793 23.8958 10.5347 23.7964 12.1338 25.0095L93.3609 86.6301C96.086 88.6974 100 86.7538 100 83.3334V83.5726C100 85.9735 98.6246 88.1622 96.4614 89.2038Z" fill="#EEEEEE"></path>
                        </g>
                      <g filter="url(#filter1_d)">
                        <path d="M75.8578 99.1263C73.4721 100.274 70.6219 99.7885 68.75 97.9166C71.0564 100.223 75 98.5895 75 95.3278V4.67213C75 1.41039 71.0564 -0.223106 68.75 2.08329C70.6219 0.211402 73.4721 -0.273666 75.8578 0.873633L96.4587 10.7807C98.6234 11.8217 100 14.0112 100 16.4132V83.5871C100 85.9891 98.6234 88.1786 96.4586 89.2196L75.8578 99.1263Z" fill="#FFFFFF"></path>
                      </g>
                      <g style={{ mixBlendMode: "overlay" }} opacity="0.25">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M70.8511 99.3171C72.4261 99.9306 74.2221 99.8913 75.8117 99.1264L96.4 89.2197C98.5634 88.1787 99.9392 85.9892 99.9392 83.5871V16.4133C99.9392 14.0112 98.5635 11.8217 96.4001 10.7807L75.8117 0.873695C73.7255 -0.13019 71.2838 0.115699 69.4527 1.44688C69.1912 1.63705 68.942 1.84937 68.7082 2.08335L29.2943 38.0414L12.1264 25.0096C10.5283 23.7964 8.29285 23.8959 6.80855 25.246L1.30225 30.2548C-0.513334 31.9064 -0.515415 34.7627 1.29775 36.4169L16.1863 50L1.29775 63.5832C-0.515415 65.2374 -0.513334 68.0937 1.30225 69.7452L6.80855 74.754C8.29285 76.1042 10.5283 76.2036 12.1264 74.9905L29.2943 61.9586L68.7082 97.9167C69.3317 98.5405 70.0638 99.0104 70.8511 99.3171ZM74.9544 27.2989L45.0483 50L74.9544 72.7012V27.2989Z" fill="url(#paint0_linear)"></path>
                      </g>
                    </g>
                    <defs>
                      <filter id="filter0_d" x="-8.39411" y="15.8291" width="116.727" height="92.2456" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix>
                        <feOffset></feOffset>
                        <feGaussianBlur stdDeviation="4.16667"></feGaussianBlur>
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix>
                        <feBlend mode="overlay" in2="BackgroundImageFix" result="effect1_dropShadow"></feBlend>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"></feBlend>
                      </filter>
                      <filter id="filter1_d" x="60.4167" y="-8.07558" width="47.9167" height="116.151" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix>
                        <feOffset></feOffset>
                        <feGaussianBlur stdDeviation="4.16667"></feGaussianBlur>
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix>
                        <feBlend mode="overlay" in2="BackgroundImageFix" result="effect1_dropShadow"></feBlend>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"></feBlend>
                      </filter>
                      <linearGradient id="paint0_linear" x1="49.9392" y1="0.257812" x2="49.9392" y2="99.7423" gradientUnits="userSpaceOnUse">
                        <stop stop-color="white"></stop>
                        <stop offset="1" stop-color="white" stop-opacity="0"></stop>
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
                <p>VS Code</p>
              </a>
            </div>
          </section>

          <div role="divider" class="section-decoration"></div>

          <section class="section">
            <span class="section-badge">LEARN, MODIFY, AND FOLLOW</span>
            <h2 class="section-heading">Joining the Community</h2>
            <p class="section-paragraph">Looking to get answers to questions or engage with us in realtime? Our community is most active <a href="https://discord.gg/FcSNfg4">on Discord</a>. Submit requests and issues on <a href="https://github.com/Microsoft/fast/issues/new/choose">GitHub</a>, or join us by contributing on <a href="https://github.com/Microsoft/fast/labels/community:good-first-issue">some good first issues via GitHub</a>.</p>
            <p class="section-paragraph">Get started here with the <a href="https://www.fast.design/docs/community/contributor-guide">Contributor Guide</a>.</p>
            <p class="section-paragraph">We look forward to building an amazing open source community with you!</p>
            <h2>Contact</h2>
            <ul>
              <li>Join the community and chat with us in real-time on <a href="https://discord.gg/FcSNfg4">Discord</a>.</li>
              <li>Submit requests and issues on <a href="https://github.com/Microsoft/fast/issues/new/choose">GitHub</a>.</li>
              <li>Contribute by helping out on some of our recommended first issues on <a href="https://github.com/Microsoft/fast/labels/community:good-first-issue">GitHub</a>.</li>
            </ul>
          </section>

      </div>
    </Layout>
  );
}
