var _ = require('lodash');
var ActionAbstract = require('./action-abstract');

/**
 * get contact
 * @see  http://dev.smsapi.pl/#!/contacts/get
 * @param {Object} options
 * @param {String} id
 * @extends ActionAbstract
 * @constructor
 */
function PushAppGet(options, id) {
    ActionAbstract.call(this, options);
    this._id = id || null;
}

PushAppGet.prototype = Object.create(ActionAbstract.prototype);

/**
 * get/set id
 * @param  {String} id
 * @return {PushAppGet|String}
 */
PushAppGet.prototype.id = function(id) {
    if (_.isUndefined(id))
        return this._id;

    this._id = id;
    return this;
};

/**
 * execute action
 * @return {Promise.<PushAppObject,Error>}
 */
PushAppGet.prototype.execute = function() {
    return this.request()
        .get('push/apps/' + String(this._id))
        .data(this.params())
        .execute();
};

module.exports = PushAppGet;
