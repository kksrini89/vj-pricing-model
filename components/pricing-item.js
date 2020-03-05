const template = document.createElement('template');
template.innerHTML = `
<main class="container">
  <div class="item">
    <div class="category ind">
      <span class="category-name"></span>
<!--  <slot name="category-name"></slot> -->
    </div>
    <div class="price ind">
      <span class="money"></span>
      <span class="money-value"></span>
    </div>
    <div class="name ind"></div>
    <div class="feature ind">
      <ul class="feature-list">
        <li>Reduces managing time</li>
        <li>Exposing yourself</li>
        <li>Quit thinking</li>
      </ul>
    </div>
    <div class="action ind">
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

  .item {
    border: 1px solid var(--border-color);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  .ind {
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

  .item .action {
    width: 100%;
  }

  .item .action .btn{
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
  }

  attributeChangedCallback(name, oldVal, newVal) {}
}

customElements.define('vj-pricing-item', PricingItemComponent);

export default PricingItemComponent;
