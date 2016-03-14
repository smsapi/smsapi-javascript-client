var ActionFactoryAbstract = require('./action-factory-abstract');
var ProfileGet = require('./profile-get');

/**
 *
 * @param options
 * @extends ActionAbstract
 * @constructor
 */
function Profile(options) {
    ActionFactoryAbstract.call(this, options);
}

Profile.prototype = Object.create(ActionFactoryAbstract.prototype);

/**
 * @return {ProfileGet}
 */
Profile.prototype.get = function () {
    return this.createAction(ProfileGet);
};

module.exports = Profile;
