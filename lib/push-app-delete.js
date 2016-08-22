var _ = require('lodash');
var ActionAbstract = require('./action-abstract');

/**
 * @param {Object} options
 * @param {String} id
 * @extends ActionAbstract
 * @constructor
 */
function PushAppDelete(options, id) {
    ActionAbstract.call(this, options);
    this._id = id || null;
}

PushAppDelete.prototype = Object.create(ActionAbstract.prototype);

/**
 * get/set id
 * @param  {String} id
 * @return {PushAppDelete|String}
 */
PushAppDelete.prototype.id = function(id) {
    if (_.isUndefined(id))
        return this._id;

    this._id = id;
    return this;
};

/**
 * execute action
 * @return {Promise}
 */
PushAppDelete.prototype.execute = function() {
    return this.request()
        .delete('push/apps/' + String(this._id))
        .execute();
};

module.exports = PushAppDelete;
