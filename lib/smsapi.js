var _ = require('lodash');
var AuthenticationSimple = require('./authentication-simple');
var AuthenticationOAuth = require('./authentication-oauth');
var Points = require('./points');
var Profile = require('./profile');
var ProxyHttp = require('./proxy-http');
var Sender = require('./sender');
var Template = require('./template');
var Phonebook = require('./phonebook');
var Message = require('./message');
var Hlr = require('./hlr');
var User = require('./user');
var Contacts = require('./contacts');
var Push = require('./push');

/**
 * SMSAPI main class
 * @param {Object}        [options]
 * @param {String}        [options.server] url to the server
 * @param {Object}        [options.oauth] if provided will use oauth, simple auth otherwise
 * @param {String}         options.oauth.clientId
 * @param {String}         options.oauth.clientSecret
 * @param {String}        [options.oauth.grantType]
 * @param {String}        [options.oauth.scope]
 * @param {ProxyAbstract} [options.proxy] custom proxy that implements ProxyAbstract
 * @constructor
 */
function SMSAPI(options) {
    options = options || {};

    if (options.proxy)
        this.proxy(options.proxy);
    else
        this.proxy(new ProxyHttp({
            server: options.server
        }));

    var moduleOptions = {
        proxy: this.proxy()
    };

    // init authentication
    if (options.oauth) {
        // overwrite authentication object
        this.authentication = new AuthenticationOAuth(
            _.extend({}, moduleOptions, options.oauth)
        );

        this.proxy().setAuth(this.authentication);
    }
    else {
        this.authentication = new AuthenticationSimple(moduleOptions);
    }

    // init modules
    this.points = new Points(moduleOptions);
    this.profile = new Profile(moduleOptions);
    this.sender = new Sender(moduleOptions);
    this.message = new Message(moduleOptions);
    this.hlr = new Hlr(moduleOptions);
    this.user = new User(moduleOptions);
    this.template = new Template(moduleOptions);
    this.push = new Push(moduleOptions);

    this.contacts = new Contacts(moduleOptions);

    /**
     * @deprecated
     * @type {Phonebook}
     */
    this.phonebook = new Phonebook(moduleOptions);

    this.proxy().setAuth(this.authentication);
}

/**
 * get/set proxy (fluent interface)
 * @param  {ProxyAbstract} [proxy]
 * @return {SMSAPI|ProxyAbstract}
 */
SMSAPI.prototype.proxy = function (proxy) {
    if (_.isUndefined(proxy))
        return this._proxy;

    this._proxy = proxy;

    return this;
};

/**
 * make extending possible by revealing abstract classes
 *
 * example:
 * var ProxyAbstract = require('smsapi').ActionAbstract;
 * new SMSAPI({ proxy: new CustomProxyThatExtendsAbstract() });
 */
SMSAPI.ActionAbstract = require('./action-abstract.js');
SMSAPI.ActionFactoryAbstract = require('./action-factory-abstract.js');
SMSAPI.AuthenticationAbstract = require('./authentication-abstract.js');
SMSAPI.ProxyAbstract = require('./proxy-abstract.js');

module.exports = SMSAPI;
