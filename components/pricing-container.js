// HTML - Template Markup

const tmpl = document.createElement('template');
tmpl.innerHTML = `
<style>
  .pricing-container {
    padding: 50px;
    width: 100%;
    display: grid;
    grid-gap: 20px;
    grid-auto-rows: 300px;
    /*grid-template-rows: repeat(auto-fill, minmax(150px, 1fr)); */
    grid-template-columns: repeat(auto-fill, minmax(250px,1fr));
    max-width: 1200px;
  }
</style>
<div class="pricing-container"></div>`;

// Custom Elements
class PricingContainerComponent extends HTMLElement {
  constructor() {
    super();
    // Shadow DOM
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._config = null;
  }

  static get observedAttributes() {
    return ['config'];
  }

  // Life Cycle Events
  connectedCallback() {
    this._shadowRoot.appendChild(tmpl.content.cloneNode(true));

    //   element references
    this.$container = this._shadowRoot.querySelector('.pricing-container');

    if (this._config) {
      this.createPricingItem();
    }
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (name === 'config' && !!newVal) {
      const config_input = JSON.parse(newVal);
      if (config_input && config_input.hasOwnProperty('config')) {
        this._config = config_input.config;
      }
    }
  }

  // Event Handlers
  createPricingItem() {
    try {
      if (!this._config) throw `Config Input is required!`;
      if (!this._config.length) throw `Category Count property is required!`;
      if (!this.$container) throw `Pricing Container element does not exists!`;

      let data = this._config;
      // Create Pricing Item
      for (const d of data) {
        const item = document.createElement('vj-pricing-item');
        item.setAttribute('data', JSON.stringify(d));
        this.$container.appendChild(item);
      }
    } catch (error) {
      throw error;
    }
  }
}

customElements.define('vj-pricing-container', PricingContainerComponent);

export default PricingContainerComponent;
