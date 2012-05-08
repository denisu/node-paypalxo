node-paypalxo
=============

Integrate with [PayPal's Express Checkout](https://paypal.com/checkout) payment flow.



Installation
------------
`git clone git://github.com/jeffharrell/node-paypalxo.git`



Usage
-----
	var paypalxo = require('node-paypalxo');
	
	// Your PayPal API credentials
	paypalxo.user = USER;
	paypalxo.pwd = PWD;
	paypalxo.signature = SIGNATURE;
	paypalxo.version = VERSION;
	
	
	// Sample data for a transaction
	var params = {
		amt: '1.00',
		returnurl: 'http://example.com/success',
		cancelurl: 'http://example.com/cancel'
	};

	// STEP 1: Get an Express Checkout token
	paypalxo.ec.setExpressCheckout(params, function (err, data) {
		if (err) {
			// Handle the error
		} else {
			var token = data.TOKEN;
		
			// STEP 2: Send the user to this URL to login and checkout on PayPal
			console.log(paypalxo.ec.getLoginURL(token));
		}
	});

	// STEP 3: Get the details for the transaction once the user returns
	paypalxo.ec.getExpressCheckoutDetails(params, function (err, data) {
		if (err) {
			// Handle the error
		} else {
			console.log(data);
		}
	});
	
	// STEP 4: Complete the transaction
	paypalxo.ec.doExpressCheckoutPayment(params, function (err, data) {
		if (err) {
			// Handle the error
		} else {
			console.log(data);
		}
	});



API
---

- `paypalxo.useSandbox`
- `paypalxo.ec.setExpressCheckout(data, callback)`
- `paypalxo.ec.getExpressCheckoutDetails(data, callback)`
- `paypalxo.ec.doExpressCheckoutPayment(data, callback)`
- `paypalxo.ec.getLoginURL(token)`
