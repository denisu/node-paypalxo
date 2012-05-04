var https = require('https'),
	events = require('events'),
	querystring = require('querystring'),
	util = require('util');



const RESPONSE = {
	SUCCESS: 'Success',
	FAILURE: 'Failure'
};


var Flow = function () {
	events.EventEmitter.call(this);
	
	this.user = null;
	this.pwd = null;
	this.signature = null;
	this.version = null;
	
	this.useSandbox = false;
};


util.inherits(Flow, events.EventEmitter);


Flow.prototype.URLS = {
	WEB_URL: 'www.paypal.com',
	WEB_API: 'api-3t.paypal.com',
	SANDBOX_URL: 'sandbox.paypal.com',
	SANDBOX_API: 'api-3t.sandbox.paypal.com',
	API_PATH: '/nvp'
};


Flow.prototype._request = function (name, data, successName, errorName) {
	var that = this;
	
	data.method = name;
	data.user = this.user;
	data.pwd = this.pwd;
	data.signature = this.signature;
	data.version = this.version;

	var request = https.get(this._buildURL(data), function(response) {
		var body = [];
		
		response.on('data', function(chunk) {
			body.push(chunk);
		});
		
		response.on('end', function () {
			var nvp = querystring.parse(body.join(''));
		
			if (nvp.ACK === RESPONSE.SUCCESS) {
				that.emit(successName, nvp);
			} else {
				that.emit(errorName, nvp);
			}
		});
		
	}).on('error', function (e) {
		that.emit(errorName, e);
	});

	return this;
};
	
	
Flow.prototype._buildURL = function (data) {
	var url, host;
	
	if (this.useSandbox) {
		host = this.URLS.SANDBOX_API;
	} else {
		host = this.URLS.WEB_API;
	}

	url = {
		host: host,
		path: this.URLS.API_PATH + '?' + querystring.stringify(data)
	};
	
	return url;
};



module.exports = Flow;