var ActionFactoryAbstract = require('./action-factory-abstract');
var PushApp = require('./push-app');

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

module.exports = Push;
