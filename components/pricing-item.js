const template = document.createElement('template');
template.innerHTML = `
<main class="container">
  <div class="package">
    <div class="pkg-info item">
      <span class="package-name"></span>
<!--  <slot name="package-name"></slot> -->
    </div>
    <div class="price item">
      <div>
        <span class="money-symbol"></span>
        <span class="money-value"></span>
      </div>
      <div class="term">Per Month</div>
    </div>
    <!-- <div class="name item"></div> -->
    <div class="feature item">
      <ul class="feature-list"></ul>
    </div>
    <div class="action item">
      <button class="btn">Select</button>
    </div>
  </div>
</main>

<style>
  .container {
    --border-color: #ddd;
    font-family: 'Open Sans', sans-serif;
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
  
  .pkg-info {
    font-family: 'Open Sans', sans-serif;
    font-size: 24px;
    font-weight: bold;
    padding: 15px 0;
    text-align: center;
    text-transform: uppercase;
  }

  .price {
    background-color: #ddd;
    padding: 15% 0;
    text-align: center;
    font-size: 3.5em;
  }

  .price .term {
    font-size: 18px;
    font-weight: bold;
  }

  .feature > .feature-list {
    list-style-type : none;
    padding: 10px;
  }

  .feature > .feature-list > li {
    margin: 10px;
    text-align: center;
  }

  .action {
    width: 100%;
  }
  
  .action .btn {
    font-family: 'Open Sans', sans-serif;
    font-size: 18px;
    text-transform: capitalize;
    margin: 5px 0;
    padding:10px;
    width: 100%;
    box-shadow: 0 0 0 3px rgba(54,54,54,0.03);
    border: none;
  }

  .btn {
    position: relative;
    cursor: pointer;
    margin: 0 auto;
    transition: all 0.4s ease-in;
  }
  //start click effect
  .btn:before {
    content: '';
    background-color: aliceblue;
    border-radius: 50%;
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: scale(0.001, 0.001);
  }
  &:focus {
    outline: 0;
    color: #fff;
    &:before {
      animation: click_effect 0.8s ease-out;
    }
  }
  @keyframes click_effect {
    50% {
      transform: scale(1.5, 1.5);
      opacity: 0;
    }
    99% {
      transform: scale(0.001, 0.001);
      opacity: 0;
    }
    100% {
      transform: scale(0.001, 0.001);
      opacity: 1;
    }
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
    this.$priceElement = this._shadowRoot.querySelector('.price');
    this.$moneySymbol = this._shadowRoot.querySelector('.price .money-symbol');
    this.$moneyValue = this._shadowRoot.querySelector('.price .money-value');
    
    this.$features = this._shadowRoot.querySelector('.feature-list');

    this.$cta = this._shadowRoot.querySelector('.action .btn');
    this.$cta.addEventListener('click', this.selectPricing.bind(this));

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

  selectPricing() {
    try {
      this.dispatchEvent(new CustomEvent('item-selected', { detail: { pkgName: this._data.package_name } }));
    } catch (error) {
      throw error;
    }
  }

  addFeatureItem(content) {
    try {
      if (content) {
        const li = document.createElement('li');
        li.textContent = content;
        return li;
      }
    } catch (error) {
      throw error;
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
        this.$priceElement.style.color = bgColor;
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

        if (features && features.length) {
          for (const content of features) {
            this.$features.appendChild(this.addFeatureItem(content));
          }
        }
      }
    } catch (error) {
      throw error;
    }
  }
}

customElements.define('vj-pricing-item', PricingItemComponent);

export default PricingItemComponent;
