node-paypalxo
=============

A node module to help integrate with PayPal's Express Checkout web flow.



An example using node-paypalxo with Express
-------------------------------------------

	var flow = require('node-paypalxo');


	flow.user = PAYPAL_API_USER;
	flow.pwd = PAYPAL_API_PWD;
	flow.signature = PAYPAL_API_SIGNATURE;
	flow.version = PAYPAL_API_VERSION;
	flow.useSandbox = true;


	app.get('/checkout', function (request, response) {
		flow.setExpressCheckout(request.query)
			.on('token', function (data) {
				// Save the transaction details in the user's session
				request.session.transaction = request.query;
				
				// Redirect to the EC login page
				response.redirect(flow.getLoginURL(data.TOKEN));
			})
			.on('tokenError', function (e) {
				response.send(e.L_LONGMESSAGE0, 500);
			});
	});


	app.get('/checkout/details', function(request, response) {
		// Get the details of a transaction
	    flow.getExpressCheckoutDetails(request.query)
			.on('details', function (data) {
				response.send(data);
			})
			.on('detailsError', function (e) {
				response.send(e.L_LONGMESSAGE0, 500);
			});
	});


	app.get('/checkout/complete', function(request, response) {	
		// Add additional order info needed to process the transaction
		var data = request.session.transaction;
		data.token = request.query.token;
		data.payerid = request.query.PayerID;
		data.paymentaction = 'Sale';
	
		// Complete payment
	    flow.doExpressCheckout(data)
			.on('completed', function (data) {
				response.send(data);
			})
			.on('completedError', function (e) {
				response.send(e.L_LONGMESSAGE0, 500);
			});
	});