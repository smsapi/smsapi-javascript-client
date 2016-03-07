
var _              = require('lodash'),
    ActionAbstract = require('./action-abstract.js');

function UserDelete(options, name){
    ActionAbstract.call(this, options);
    this.name(name);
}

UserDelete.prototype = Object.create(ActionAbstract.prototype);

/**
 * @param  {String} [name]
 * @return {UserDelete} or name
 */
UserDelete.prototype.name = function(name){
    return this.param('delete_user', name);
};

/**
 * @return {Promise}
 */
UserDelete.prototype.execute = function(){
    return this.request()
        .path('user.do')
        .data(this.params())
        .json()
        .execute();
};

module.exports = UserDelete;
