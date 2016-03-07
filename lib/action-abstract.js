var _ = require('lodash');

/**
 * @param {Object} options
 * @param {ProxyAbstract} options.proxy
 * @param {Object} [params]
 */
function ActionAbstract(options, params){
    this._options        = options || {};
    this._params         = _.extend({}, this.defaultParams, params);
    this._proxy          = options.proxy;
}

/**
 * action's default params
 * @type {Object}
 */
ActionAbstract.prototype.defaultParams = {};

/**
 * @return {ProxyAbstract}
 */
ActionAbstract.prototype.request = function(){
    if (_.isUndefined(this._proxy))
        throw new Error('Proxy has been not defined');

    return this._proxy.request();
};

/**
 * set custom param for the request
 * @param {String} name
 * @param {String} value
 * @returns {ActionAbstract} this
 */
ActionAbstract.prototype.param = function(name, value){
    if (_.isUndefined(value))
        return this._params[name];
    else
        this._params[name] = value;

    return this;
};

/**
 * set multiple params at once
 * will extend (not overwrite!) current params
 * @param {Object} params
 * @returns {ActionAbstract} this
 */
ActionAbstract.prototype.params = function(params){
    if (_.isUndefined(params))
        return this._params;
    else
        this._params = _.extend(this._params, params);

    return this;
};

/**
 * clear all request params
 * @returns {ActionAbstract}
 */
ActionAbstract.prototype.clear = function(){
    this._params = _.clone(this.defaultParams);

    return this;
};

/**
 * should execute action and return Promise
 * @returns {Promise}
 */
ActionAbstract.prototype.execute = function(){
    throw new Error('Function .execute() not implemented');
};

module.exports = ActionAbstract;
