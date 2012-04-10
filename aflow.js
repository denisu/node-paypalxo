
var https = require('https'),
	events = require('events'),
	querystring = require('querystring');



var AFlow = function () {};


AFlow.prototype = {
	
	URLS: {
		WEB_URL: 'www.paypal.com',
		WEB_API: 'api-3t.paypal.com',
		SANDBOX_URL: 'sandbox.paypal.com',
		SANDBOX_API: 'api-3t.sandbox.paypal.com',
		API_PATH: '/nvp'
	},
	
	RESPONSES: {
		SUCCESS: 'Success',
		FAILURE: 'Failure'
	},
	
	useSandbox: false,
	
	user: null,

	pwd: null,

	signature: null,

	version: null,


	_request: function (name, data) {
		var that = this,
			event = new events.EventEmitter();
	
		data.method = name;
		data.user = this.user;
		data.pwd = this.pwd;
		data.signature = this.signature;
		data.version = this.version;

		var request = https.get(this._buildURL(data), function(res) {
			res.on('data', function(chunk) {
				var nvp = querystring.parse(chunk.toString());
			
				if (nvp.ACK === that.RESPONSES.SUCCESS) {
					event.emit('success', nvp);
				} else {
					event.emit('error', nvp);
				}
			});
		}).on('error', function (e) {
			event.emit('error', e);
		});
	
		return event;
	},
	
	
	_buildURL: function (data) {
		var urls = this.URLS,
			url, host;
		
		if (this.useSandbox) {
			host = urls.SANDBOX_API;
		} else {
			host = urls.WEB_API;
		}

		url = {
			host: host,
			path: urls.API_PATH + '?' + querystring.stringify(data)
		};
		
		return url;
	} 

};



module.exports = AFlow;