var ActionFactoryAbstract = require('./action-factory-abstract');
var PushApp = require('./push-app');
var PushSend = require('./push-send');

/**
 *
 * @param options
 * @extends ActionFactoryAbstract
 * @constructor
 */
function Push(options) {
    ActionFactoryAbstract.call(this, options);

    this.app = new PushApp(options);
}

Push.prototype = Object.create(ActionFactoryAbstract.prototype);

/**
 * @return {PushSend}
 */
Push.prototype.send = function () {
    return this.createAction(PushSend);
};

module.exports = Push;
