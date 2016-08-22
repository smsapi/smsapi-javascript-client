var ActionAbstract = require('./action-abstract');

/**
 * add contact
 * @see  http://dev.smsapi.pl/#!/contacts/create
 * @param {Object} options
 * @extends ActionAbstract
 * @constructor
 */
function PushAppAdd(options) {
    ActionAbstract.call(this, options);
}

PushAppAdd.prototype = Object.create(ActionAbstract.prototype);

/**
 * get/set name
 * @param  {String} name
 * @return {PushAppUpdate} or {String}
 */
PushAppAdd.prototype.name = function (name) {
    return this.param('name', name);
};

/**
 * get/set description
 * @param  {String} environment
 * @return {PushAppUpdate|String}
 */
PushAppAdd.prototype.environment = function (environment) {
    return this.param('environment', environment);
};

/**
 * execute action
 * @return {Promise.<PushAppObject>}
 */
PushAppAdd.prototype.execute = function () {
    return this.request()
        .post('push/apps')
        .data(this.params())
        .execute();
};

module.exports = PushAppAdd;
