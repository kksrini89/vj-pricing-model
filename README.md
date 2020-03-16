# vj-pricing-model

> To show different pricing model structure

## Final

![PricingModel Web Component](/screenshots/DesktopView.png)

## Install

```
 npm install vj-pricing-container -S
```

## Usage
To use as a selector in the view,
```html
    <vj-pricing-container></vj-pricing-container>
```
To assign config attribute value with different pricing plans as an array,
```javascript
<script>
      const data = [{ 
        "package_name": "silver",
        "price" : {
          "symbol" : "$",
          "value" : 19
        },
        "features" : ["unlimited sites", "Upto 125 Devices", "FREE SSL" , "VPS Hosting"],
        "call_to_action" : {
          "text" : "go silver",
          "color" : "#FFF",
          "bgColor": "#1ab394"
        }
      }];
      const element = document.getElementsByTagName('vj-pricing-container');
      if (element && element.length > 0) {
        const ele = element[0];
        const config = JSON.stringify(data);
        ele.setAttribute('config', config);
      }
</script>
```
To get the selected pricing plan name
```javascript
const element = document.getElementsByTagName('vj-pricing-container');
if (element && element.length > 0) {
  const ele = element[0];
  ele.addEventListener('selected', (e) => {
    console.log(e.detail);
  });
}
```

## Attributes
### config

## Events
### selected 
Type: `Custom Event`

To get the selected pricing plan name.

## License
MIT &copy; [Srinivasan K K](https://srinivasankk.com)