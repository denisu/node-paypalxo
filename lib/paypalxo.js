
'use strict';


var https = require('https'),
	querystring = require('querystring'),
	paypalxo = {
		user: null,
		pwd: null,
		signature: null,
		version: null,
		useSandbox: false
	};


var _RESPONSE = {
	SUCCESS: 'Success',
	FAILURE: 'Failure'
};


var _URLS = {
	WEB_URL: 'www.paypal.com',
	WEB_API: 'api-3t.paypal.com',
	SANDBOX_URL: 'sandbox.paypal.com',
	SANDBOX_API: 'api-3t.sandbox.paypal.com',
	API_PATH: '/nvp'
};


function _request(name, data, callback) {
	data.method = name;
	data.user = paypalxo.user;
	data.pwd = paypalxo.pwd;
	data.signature = paypalxo.signature;
	data.version = paypalxo.version;

	var request = https.get(_buildURL(data), function(response) {
		var body = [];
		
		response.on('data', function(chunk) {
			body.push(chunk);
		});
		
		response.on('end', function () {
			var nvp = querystring.parse(body.join(''));
		
			if (nvp.ACK === _RESPONSE.SUCCESS) {
				process.nextTick(function () {
					callback(null, nvp);
				});
			} else {
				process.nextTick(function () {
					callback(nvp);
				});
			}
		});
		
	}).on('error', function (e) {
		process.nextTick(function () {
			callback(nvp);
		});
	});

	return request;
};
	
	
function _buildURL(data) {
	var url, host;
	
	if (paypalxo.useSandbox) {
		host = _URLS.SANDBOX_API;
	} else {
		host = _URLS.WEB_API;
	}

	url = {
		host: host,
		path: _URLS.API_PATH + '?' + querystring.stringify(data)
	};
	
	return url;
};



/* Express Checkout */


paypalxo.ec = {};


paypalxo.ec.setExpressCheckout = function (data, callback) {
	return _request('SetExpressCheckout', data, callback);
};


paypalxo.ec.getExpressCheckoutDetails = function (data, callback) {
	return _request('GetExpressCheckoutDetails', data, callback);
};


paypalxo.ec.doExpressCheckoutPayment = function (data, callback) {
	return _request('DoExpressCheckoutPayment', data, callback);
};


paypalxo.ec.getLoginURL = function (token, isCommit) {
	var url  = 'https://';
		url += paypalxo.useSandbox ? _URLS.SANDBOX_URL : _URLS.WEB_URL;
		url += '/cgi-bin/webscr?cmd=_express-checkout&token=';
		url += token;
		url += '&useraction=';
		url += isCommit ? 'commit' : '';
	
	return url;
};



/* Export methods */

module.exports = paypalxo;