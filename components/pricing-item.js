const template = document.createElement('template');
template.innerHTML = `
<main class="container">
  <div class="package">
    <div class="pkg-info item">
      <span class="package-name"></span>
<!--  <slot name="package-name"></slot> -->
    </div>
    <div class="price item">
      <span class="money-symbol"></span>
      <span class="money-value"></span>
    </div>
    <!-- <div class="name item"></div> -->
    <div class="feature item">
      <ul class="feature-list">
        <li>Reduces managing time</li>
        <li>Exposing yourself</li>
        <li>Quit thinking</li>
      </ul>
    </div>
    <div class="action item">
      <button class="btn">Select</button>
    </div>
  </div>
</main>

<style>
  .container {
    padding: 50px;
    width: 100%;
    display: grid;
    grid-gap: 20px;
    grid-auto-rows: 300px;
    grid-template-columns: repeat(auto-fill, minmax(250px,1fr));
    max-width: 1200px;
  }

  .package {
    border: 1px solid var(--border-color);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  .item {
    width: 100%;
  }

  .feature > .feature-list {
    background-color: #ddd;
    list-style-type : none;
    padding: 10px;
  }

  .feature > .feature-list > li {
    margin: 10px;
  }

  .action {
    width: 100%;
  }

  .action .btn {
    margin: 5px 0;
    padding:10px;
    width: 100%;
  }

  /* Media Queries */
  @media only screen and (max-width: 767px) {

  }
</style>
`;

class PricingItemComponent extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    //   Shadow DOM
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    // element references
    this.$pkgName = this._shadowRoot.querySelector('.pkg-info .package-name');
    this.$moneySymbol = this._shadowRoot.querySelector('.price > .money-symbol');
    this.$moneyValue = this._shadowRoot.querySelector('.price > .money-value');
    this.$cta = this._shadowRoot.querySelector('.action .btn');

    // this.updatePriceItem = this.updatePriceItem.bind(this);
    if (this._data && Object.keys(this._data).length) this.updatePriceItem();
  }

  static get observedAttributes() {
    return ['data'];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (name === 'data' && newVal) {
      this._data = JSON.parse(newVal);
    }
  }

  updatePriceItem() {
    try {
      if (this._data) {
        const {
          package_name,
          price: { symbol, value },
          features,
          call_to_action: { text, color, bgColor }
        } = this._data;
        if (package_name) {
          this.$pkgName.textContent = package_name;
        }
        if (symbol) {
          this.$moneySymbol.textContent = symbol;
        }
        if (value) {
          this.$moneyValue.textContent = value;
        }
        if (text) {
          this.$cta.textContent = text;
        }
        if (color) {
          this.$cta.style.color = color;
        }
        if (bgColor) {
          this.$cta.style.backgroundColor = bgColor;
        }
      }
    } catch (error) {
      throw error;
    }
  }
}

customElements.define('vj-pricing-item', PricingItemComponent);

export default PricingItemComponent;
