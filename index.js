// HTML - Template Markup

const tmpl = document.createElement('template');
tmpl.innerHTML = `
<style>

</style>
<div class="container">

</div>`;

// Custom Elements
class PricingModelComponent extends HTMLElement {
  constructor() {
    super();
    // Shadow DOM
    this._shadowRoot = this.attachShadow({ mode: 'open' });    
  }

  static get observedAttributes() {
    return [''];
  }

  // Life Cycle Events
  connectedCallback() {
    this._shadowRoot.appendChild(tmpl.content.cloneNode(true));

    //   element references
    
  }

  attributeChangedCallback(prop, oldVal, newVal) {
    
  }

  // Event Handlers
  
}

customElements.define('vj-pricing-model', PricingModelComponent);
