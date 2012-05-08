
var paypalxo = require('../');


paypalxo.user = process.env.PP_USER;
paypalxo.pwd = process.env.PP_PWD;
paypalxo.signature = process.env.PP_SIGNATURE;
paypalxo.version = process.env.PP_VERSION;
paypalxo.useSandbox = true;


var params = {
	amt: '1.00',
	returnurl: 'http://example.com/success',
	cancelurl: 'http://example.com/cancel'
};


paypalxo.ec.setExpressCheckout(params, function (err, data) {
	if (err) {
		console.error(err);
	} else {
		var token = data.TOKEN;
	
		console.log(paypalxo.ec.getLoginURL(token));
	}
});


paypalxo.ec.doExpressCheckoutPayment(params, function (err, data) {
	if (err) {
		console.error(err);
	} else {
		console.log(data);
	}
});