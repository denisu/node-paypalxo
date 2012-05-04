
var Flow = require('./flow'),
	ec = new Flow();


ec.setExpressCheckout = function (data) {
	return this._request('SetExpressCheckout', data, 'token', 'tokenError');
};


ec.getExpressCheckout = function (data) {
	return this._request('GetExpressCheckoutDetails', data, 'details', 'detailsError');
};


ec.doExpressCheckout = function (data) {
	return this._request('DoExpressCheckoutPayment', data, 'completed', 'completedError');
};


ec.getLoginURL = function (token, isCommit) {
	var url  = 'https://';
		url += this.useSandbox ? this.URLS.SANDBOX_URL : this.URLS.WEB_URL;
		url += '/cgi-bin/webscr?cmd=_express-checkout&token=';
		url += token;
		url += '&useraction=';
		url += isCommit ? 'commit' : '';
	
	return url;
};



module.exports = ec;