var _ = require('lodash');

/**
 * @param {Object} options
 */
function ActionFactoryAbstract(options) {
    this._options = options || {};
}

/**
 * create and return action with options saved in the constructor
 * @param {Function} Action
 * @param {...Object} arg
 */
ActionFactoryAbstract.prototype.createAction = function (Action, arg) {
    var args = [this._options];

    // ignore the first argument, prepare array with others 
    for (var i = 1; i < arguments.length; i++){
        args.push(arguments[i]);
    }
    
    var action = Object.create(Action.prototype);
    Action.apply(action, args);
    return action;
};

module.exports = ActionFactoryAbstract;
