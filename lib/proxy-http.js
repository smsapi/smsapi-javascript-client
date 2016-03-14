var Request = require('./request');
var ProxyAbstract = require('./proxy-abstract');

/**
 * proxy for http server
 * @param {Object}                 [options]
 * @param {String}                 [options.server] url to the server
 * @param {AuthenticationAbstract} [options.auth] authentication object
 */
function ProxyHttp(options) {
    ProxyAbstract.call(this, options);
    this._server = options.server || 'https://api.smsapi.pl/';
    this._auth = options.auth || null;
}

ProxyHttp.prototype = Object.create(ProxyAbstract.prototype);

/**
 * create a new request
 * @return {Request}
 */
ProxyHttp.prototype.request = function () {
    return new Request({
        server: this._server,
        auth: this._auth
    });
};

/**
 * set server url
 * @param {String} server
 * @returns {ProxyHttp}
 */
ProxyHttp.prototype.setServer = function (server) {
    this._server = server;
    return this;
};

/**
 * set auth object
 * @param {AuthenticationAbstract} auth
 * @returns {ProxyHttp}
 */
ProxyHttp.prototype.setAuth = function (auth) {
    this._auth = auth;
    return this;
};

module.exports = ProxyHttp;
