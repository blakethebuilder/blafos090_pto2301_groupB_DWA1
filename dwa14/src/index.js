import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";
import styles.css from "./styles.css"


export class TallyApp extends LitElement {
  static styles = css`
    .positive {
      color: green;
    }
    .negative {
      color: red;
    }

    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      text-align: center;
    }
    :body {
      box-sizing: border-box;
      font-family: "Open Sans", sans-serif;
      font-size: 1.5em;
      padding-left: 0.5em;
    }
  `;

  constructor() {
    super();
    this.count = 0; // Initialize the count property to 0
  }
  /* 
    increment and decrement methods are 
    called and then updates the count state
  */
  increment() {
    if (this.count < 10) {
      this.count += 1;
      this.requestUpdate("count");
    } else {
      alert("cannot exceed 10");
    }
  }

  decrement() {
    if (this.count > -5) {
      this.count -= 1;
      this.requestUpdate("count");
    } else {
      alert("cannot exceed -5");
    }
  }

  /*   
  counterState Getter: 
  This getter calculates the "state" of the counter based 
  on the count property. It examines the value of 
  this.count and returns a string that represents the 
  state.
  */

  get counterState() {
    if (this.count === 0) {
      return "zero";
    } else if (this.count > 0) {
      return "positive";
    } else {
      return "negative";
    }
  }

  render() {
    return html`
      <div>
        <h1>Tally App</h1>
        <p class="${this.counterState}">Counter: ${this.count}</p>
        <button @click="${this.increment}">+</button>

        <button @click="${this.decrement}">-</button>
        <sl-button variant="success" size="large" outline>Reset</sl-button>
      </div>
    `;
  }
}

customElements.define("tally-app", TallyApp);
