var ActionFactoryAbstract = require('./action-factory-abstract');
var MessageSms = require('./message-sms');
var MessageMms = require('./message-mms');
var MessageVms = require('./message-vms');
var MessageDelete = require('./message-delete');

/**
 *
 * @param options
 * @extends ActionFactoryAbstract
 * @constructor
 */
function Message(options) {
    ActionFactoryAbstract.call(this, options);
}

Message.prototype = Object.create(ActionFactoryAbstract.prototype);

/**
 * @return {MessageSms}
 */
Message.prototype.sms = function () {
    return this.createAction(MessageSms);
};

/**
 * @return {MessageDelete}
 */
Message.prototype.delete = function (id) {
    return this.createAction(MessageDelete, id);
};

/**
 * @return {MessageMms}
 */
Message.prototype.mms = function () {
    return this.createAction(MessageMms);
};

/**
 * @return {MessageVms}
 */
Message.prototype.vms = function () {
    return this.createAction(MessageVms);
};

module.exports = Message;
