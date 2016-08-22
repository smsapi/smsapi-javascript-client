var _ = require('lodash');
var ActionAbstract = require('./action-abstract.js');

/**
 * @param {Object} options
 * @param {String} id
 * @extends ActionAbstract
 * @constructor
 */
function PushAppUpdate(options, id) {
    ActionAbstract.call(this, options);
    this._id = id || null;
}

PushAppUpdate.prototype = Object.create(ActionAbstract.prototype);

/**
 * get/set id
 * @param  {String} id
 * @return {PushAppUpdate|String}
 */
PushAppUpdate.prototype.id = function (id) {
    if (_.isUndefined(id))
        return this._id;

    this._id = id;
    return this;
};

/**
 * @param  {String} name
 * @return {PushAppUpdate} or {String}
 */
PushAppUpdate.prototype.name = function (name) {
    return this.param('name', name);
};

/**
 * @param  {String} environment
 * @return {PushAppUpdate|String}
 */
PushAppUpdate.prototype.environment = function (environment) {
    return this.param('gender', environment);
};

/**
 * @return {Promise}
 */
PushAppUpdate.prototype.execute = function () {
    return this.request()
        .put('push/apps/' + String(this._id))
        .data(this.params())
        .execute();
};

module.exports = PushAppUpdate;
