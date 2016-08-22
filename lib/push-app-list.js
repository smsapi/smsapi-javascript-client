var ActionAbstract = require('./action-abstract');

/**
 * @typedef {Object} PushAppListResponse
 * @property {Number} size
 * @property {Array} collection
 */

/**
 *
 * @param options
 * @extends ActionAbstract
 * @constructor
 */
function PushAppList(options) {
    ActionAbstract.call(this, options);
}

PushAppList.prototype = Object.create(ActionAbstract.prototype);

/**
 * @return {Promise.<PushAppListResponse>}
 */
PushAppList.prototype.execute = function() {
    return this.request()
        .get('push/apps')
        .execute();
};

module.exports = PushAppList;
