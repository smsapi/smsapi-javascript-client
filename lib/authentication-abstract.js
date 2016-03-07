var _ = require('lodash');

/**
 * @param {Object} [options]
 */
function AuthenticationAbstract(options){
    options = options || {};
    this._proxy = options.proxy;
}

/**
 * [proxy description]
 * @param  {[type]} proxy [description]
 * @return {[type]}       [description]
 */
AuthenticationAbstract.prototype.proxy = function(proxy){
    if (_.isUndefined(proxy))
        return this._proxy;

    this._proxy = proxy;
    return this;
};

/**
 * should return object with required
 * headers that will be added to every request
 * @return {Object}
 */
AuthenticationAbstract.prototype.getHeaders = function(){
    return {};
};

/**
 * should return object with required
 * GET params for the request
 * @return {Object}
 */
AuthenticationAbstract.prototype.getGETParams = function(){
    return {};
};

/**
 * should login the user
 * @param  {String} login
 * @param  {String} password
 * @return {Promise}
 */
AuthenticationAbstract.prototype.login = function(login, password){
    throw new Error('Not implemented');
};

/**
 * should logout the user
 * @return {AuthenticationAbstract} this
 */
AuthenticationAbstract.prototype.logout = function(){
    throw new Error('Not implemented');
};

module.exports = AuthenticationAbstract;
