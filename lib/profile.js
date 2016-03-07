
var _                     = require('lodash'),
    ActionFactoryAbstract = require('./action-factory-abstract.js'),
    ProfileGet             = require('./profile-get.js');

function Profile(options){
    ActionFactoryAbstract.call(this, options);
}

Profile.prototype = Object.create(ActionFactoryAbstract.prototype);

/**
 * @return {ProfileGet}
 */
Profile.prototype.get = function(){
    return this.createAction(ProfileGet);
};

module.exports = Profile;
