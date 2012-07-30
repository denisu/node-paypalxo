node-paypalxo
=============

Integrate with [PayPal's Express Checkout](https://paypal.com/checkout) payment flow. 



Installation
------------
`npm install paypalxo`



Usage
-----
See PayPal's [Express Checkout integration guide](https://cms.paypal.com/us/cgi-bin/webscr?cmd=_render-content&content_ID=developer/e_howto_api_ECGettingStarted) for each APIs required parameters.

```js
var paypalxo = require('node-paypalxo');

// Your PayPal API credentials
paypalxo.user = USER;
paypalxo.pwd = PWD;
paypalxo.signature = SIGNATURE;
paypalxo.version = VERSION;


var params = {
	amt: '1.00',
	returnurl: 'http://example.com/success',
	cancelurl: 'http://example.com/cancel'
};

// STEP 1: Get an Express Checkout token from PayPal
paypalxo.ec.setExpressCheckout(params, function (err, data) {
	if (!err) {
		var token = data.TOKEN;
	
		// STEP 2: Send the user to the following URL to checkout on PayPal
		console.log(paypalxo.ec.getLoginURL(token));
	}
});


// STEP 3: Complete the transaction
paypalxo.ec.doExpressCheckoutPayment(params, function (err, data) {
	if (!err) {
		// This will output the transaction's details
		console.log(data);
	}
});
```

API
---

- `paypalxo.useSandbox`
- `paypalxo.ec.setExpressCheckout(params, callback)`
- `paypalxo.ec.getExpressCheckoutDetails(params, callback)`
- `paypalxo.ec.doExpressCheckoutPayment(params, callback)`
- `paypalxo.ec.getLoginURL(token)`
