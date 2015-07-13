
var _              = require('underscore')._,
    ActionAbstract = require('./action-abstract.js');

function UserGet(options, name){
    ActionAbstract.call(this, options);
    this.name(name);
}

UserGet.prototype = Object.create(ActionAbstract.prototype);

/**
 * @param  {String} [name]
 * @return {UserGet} or name
 */
UserGet.prototype.name = function(name){
    return this.param('get_user', name);
};

/**
 * @return {Promise}
 */
UserGet.prototype.execute = function(){
    return this.request()
        .path('user.do')
        .data(this.params())
        .execute();
};

module.exports = UserGet;
