import { LitElement, html, css } from 'lit';

/**
 * Now it's your turn. Here's what we need to try and do:
 * 1. Get you HTML from your card working in here 
 * 2. Get your CSS rescoped as needed to work here
 */

export class MyCard extends LitElement {

  static get tag() {
    return 'my-card';
  }

  constructor() {
    super();
    this.title = "My card";
    this.image = "https://via.placeholder.com/150"
    this.button = "Click me"
    this.fancy = false;
    this.buttonLink = "#";
  }

  static get styles() {
    return css`
      :host {
        display: block;
        border-radius: 8px;
        background-color: lightgrey;
        height: auto;
        width: 300px;
        margin: 16px;
        border: 8px solid lightgrey;
        box-shadow: 2px 2px 12px 4px black;
  }

        :host([fancy]) { 
        background-color: pink;
        color: white; 
        }

        .card.toggled {
        background-color: red;
        color: blue;
        }
        
        h2 {
        text-align: center;
        }
        
        img {
        width: 100%;
        height: auto;
        display: block;
        border-radius: 8px;
        }

        button {
        color: white;
        background-color: grey;
        padding: 4px 8px;
        border-radius: 8px;
        border-color: black
        }
        button:active {
        color: black;
        }
        button:focus,
        button:hover {
        background-color: darkgrey;
        }
        details summary {
        text-align: left;
        font-size: 20px;
        padding: 8px 0;
        }

  details[open] summary {
    font-weight: bold;
  }
  
  details div {
    border: 2px solid black;
    text-align: left;
    padding: 8px;
    height: 70px;
    overflow: auto;
  }
    `;
  }

  handleButtonClick() {
    window.open(this.buttonLink, "_blank");
  }

  toggleFancy() {
    this.fancy = !this.fancy;
  }

  // put this anywhere on the MyCard class; just above render() is probably good
  openChanged(e) {
    console.log(e.newState);
    if (e.newState === "open") {
      this.fancy = true;
    }
    else {
      this.fancy = false;
    }
  }

  render() {
    return html`
    <div class="card">
    <h2>${this.title}</h2>
    <img src="${this.image}" alt="${this.title}" />
    <!-- put this in your render method where you had details -->
  <details ?open="${this.fancy}" @toggle="${this.openChanged}">
  <summary>Description</summary>
  <div>
    <slot>${this.description}</slot>
  </div>
  <button @click="${this.handleButtonClick}">${this.button}</button>
</details>
    <slot></slot>
    </div>`;
  }

  static get properties() {
    return {
      fancy: { type: Boolean, reflect: true },
      title: { type: String },
      image: { type: String },
      button: { type : String },
      buttonLink: { type : String },
    };
  }
}

globalThis.customElements.define(MyCard.tag, MyCard);

document.getElementById('toggleButton').addEventListener('click', () => {
  document.querySelectorAll('my-card').forEach(card => {
    card.toggleFancy();
  });
});
