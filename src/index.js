const $app = document.querySelector("#app");
const $fl = $app.querySelector("#first-line");
const $sl = $app.querySelector("#second-line");
const $tl = $app.querySelector("#third-line");

/** Custom Elements */

class HelloWorld extends HTMLElement {
  constructor() {
    super();
    this._name = "U";
  }

  static get observedAttributes() {
    return ["name"];
  }

  attributeChangedCallback(name, o, n) {
    this._name = n;
    this.render();
  }
  connectedCallback() {
    this.render();
  }

  get name() {
    return this._name;
  }
  set name(v) {
    this.setAttribute("name", v);
  }

  render() {
    this.innerHTML = `<h1>Hello ${this._name}</h1>`;
  }
}

!customElements.get("hello-world") &&
  customElements.define("hello-world", HelloWorld);

const $HelloWorld = document.createElement("hello-world");

$HelloWorld.name = " World !";
$sl.appendChild(document.createElement("hello-world"));
$sl.appendChild($HelloWorld);
const addWeight = setInterval(() => {
  $HelloWorld.name += "!";
  if ($HelloWorld.name.length > 9) {
    clearInterval(addWeight);
  }
}, 1500);

/** Shadow Root */

const shadowRoot = $fl.attachShadow({ mode: "open" });
shadowRoot.innerHTML = `
<style>
  h1 {
    padding-left: 10px;
    font-size: 26px;
    font-weight: 400;
    border-left: solid 9px #999;
  }
</style>

<hello-world id="shadow-hello-world"></hello-world>
`;

const $ShadowHelloWorld = shadowRoot.querySelector("#shadow-hello-world");
$ShadowHelloWorld.name = "2 U";

/** HTML Template */

const $TitleSegment = () => {
  return document.importNode(
    document.querySelector("#hello-world-template").content,
    true
  );
};
$fl.appendChild($TitleSegment());
$sl.appendChild($TitleSegment());
$tl.appendChild($TitleSegment());
