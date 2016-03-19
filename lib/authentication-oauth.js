var _ = require('lodash');
var md5 = require('md5');
var AuthenticationAbstract = require('./authentication-abstract');

/**
 * use oauth for authentication
 * @param {Object}  options
 * @param {String}  options.accessToken
 * @extends AuthenticationAbstract
 * @constructor
 */
function AuthenticationOAuth(options) {
    AuthenticationAbstract.call(this, options);
    options = options || {};
    this._token = {
        access: options.accessToken || null
    };
}

AuthenticationOAuth.prototype = Object.create(AuthenticationAbstract.prototype);

/**
 *
 * @returns {String|null}
 */
AuthenticationOAuth.prototype.getAccessToken = function () {
    return this._token.access;
};

/**
 *
 * @param {String} accessToken
 * @returns {AuthenticationOAuth}
 */
AuthenticationOAuth.prototype.setAccessToken = function (accessToken) {
    this._token.access = accessToken;
    return this;
};

/**
 *
 * @returns {Boolean}
 */
AuthenticationOAuth.prototype.isAuthorized = function () {
    return !_.isNull(this.getAccessToken());
};

/**
 *
 * @returns {{Authorization: String}|{}}
 */
AuthenticationOAuth.prototype.getHeaders = function () {
    return this.getAccessToken() ? {
        Authorization: 'Bearer ' + this.getAccessToken()
    } : {};
};

module.exports = AuthenticationOAuth;
