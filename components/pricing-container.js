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
      this._config = JSON.parse(newVal);
    }
  }

  // Event Handlers
  createPricingItem() {
    try {
      if (!this._config) throw `Config Input is required!`;
      let { categoryCount } = this._config;
      if (!categoryCount) throw `Category Count property is required!`;

      if (!this.$container) {
        throw `Pricing Container element does not exists!`;
      }
      // Create Pricing Item
      while (categoryCount > 0) {
        const item = document.createElement('vj-pricing-item');
        this.$container.appendChild(item);
        categoryCount--;
      }
    } catch (error) {
      throw error;
    }
  }
}

customElements.define('vj-pricing-container', PricingContainerComponent);

export default PricingContainerComponent;