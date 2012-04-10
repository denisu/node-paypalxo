
var AFlow = require('./aflow'),
	expresscheckout = new AFlow();


expresscheckout.start = function (data) {
	return this._request('SetExpressCheckout', data);
};


expresscheckout.details = function (data) {
	return this._request('GetExpressCheckoutDetails', data);
};


expresscheckout.complete = function (data) {
	return this._request('DoExpressCheckoutPayment', data);
};


expresscheckout.getLoginURL = function (token, isCommit) {
	var url  = 'https://';
		url += this.useSandbox ? this.URLS.SANDBOX_URL : this.URLS.WEB_URL;
		url += '/cgi-bin/webscr?cmd=_express-checkout&token=';
		url += token;
		url += '&useraction=';
		url += isCommit ? 'commit' : '';
	
	return url;
};



module.exports = expresscheckout;