var ActionAbstract = require('./action-abstract');

/**
 * @param {Object} options
 * @param {String} appId
 * @extends ActionAbstract
 * @constructor
 */
function PushAppChannelAdd(options, appId) {
    ActionAbstract.call(this, options);
    this._appId = appId || null;
}

PushAppChannelAdd.prototype = Object.create(ActionAbstract.prototype);

/**
 * @param  {String} name
 * @return {PushAppChannelAdd|String}
 */
PushAppChannelAdd.prototype.name = function(name) {
    return this.param('name', name);
};

/**
 * execute action
 * @return {Promise.<PushAppObject>}
 */
PushAppChannelAdd.prototype.execute = function() {
    return this.request()
        .post('push/apps/' + this._appId + '/channels')
        .data(this.params())
        .execute();
};

module.exports = PushAppChannelAdd;
