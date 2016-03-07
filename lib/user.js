
var _                     = require('lodash'),
    ActionFactoryAbstract = require('./action-factory-abstract.js'),
    UserAdd               = require('./user-add.js'),
    UserDelete            = require('./user-delete.js'),
    UserUpdate            = require('./user-update.js'),
    UserGet               = require('./user-get.js'),
    UserList              = require('./user-list.js');

function User(options){
    ActionFactoryAbstract.call(this, options);
}

User.prototype = Object.create(ActionFactoryAbstract.prototype);

/**
 * add new subuser
 * @return {UserAdd}
 */
User.prototype.add = function(){
    return this.createAction(UserAdd);
};

/**
 * delete existing subuser
 * @param  {String} name
 * @return {UserDelete}
 */
User.prototype.delete = function(name){
    return this.createAction(UserDelete, name);
};

/**
 * update existing subuser
 * @param  {String} name
 * @return {UserUpdate}
 */
User.prototype.update = function(name){
    return this.createAction(UserUpdate, name);
};

/**
 * get details about existing subuser
 * @param  {String} name
 * @return {UserGet}
 */
User.prototype.get = function(name){
    return this.createAction(UserGet, name);
};

/**
 * get list of the subusers
 * @return {UserList}
 */
User.prototype.list = function(){
    return this.createAction(UserList);
};

module.exports = User;
