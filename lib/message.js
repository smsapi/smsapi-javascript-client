
var _                     = require('underscore'),
    ActionFactoryAbstract = require('./action-factory-abstract.js'),
    MessageSms            = require('./message-sms.js'),
    MessageMms            = require('./message-mms.js'),
    MessageVms            = require('./message-vms.js'),
    MessageDelete         = require('./message-delete.js');

function Message(options){
    ActionFactoryAbstract.call(this, options);
}

Message.prototype = Object.create(ActionFactoryAbstract.prototype);

/**
 * @return {MessageSms}
 */
Message.prototype.sms = function(){
    return this.createAction(MessageSms);
};

/**
 * @return {MessageDelete}
 */
Message.prototype.delete = function(id){
    return this.createAction(MessageDelete, id);
};

/**
 * @return {MessageMms}
 */
Message.prototype.mms = function(){
    return this.createAction(MessageMms);
};

/**
 * @return {MessageVms}
 */
Message.prototype.vms = function(){
    return this.createAction(MessageVms);
};

module.exports = Message;
