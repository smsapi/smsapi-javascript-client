var _ = require('lodash');

/**
 * @param {Object} options
 */
function ActionFactoryAbstract(options){
    this._options        = options || {};
}

/**
 * create and return action with options saved in the constructor
 * @param  {Object} Action
 * @param  {Object} params
 * @return {ActionAbstract}
 */
ActionFactoryAbstract.prototype.createAction = function(Action, params, secondaryParams){
    return new Action(this._options, params, secondaryParams);
};

module.exports = ActionFactoryAbstract;
