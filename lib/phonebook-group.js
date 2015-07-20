
var _                     = require('underscore')._,
    ActionFactoryAbstract = require('./action-factory-abstract.js'),
    PhonebookGroupList    = require('./phonebook-group-list.js'),
    PhonebookGroupAdd     = require('./phonebook-group-add.js'),
    PhonebookGroupGet     = require('./phonebook-group-get.js'),
    PhonebookGroupUpdate  = require('./phonebook-group-update.js'),
    PhonebookGroupDelete  = require('./phonebook-group-delete.js');

function PhonebookGroup(options){
    ActionFactoryAbstract.call(this, options);
}

PhonebookGroup.prototype = Object.create(ActionFactoryAbstract.prototype);

/**
 * get group
 * @param  {String} name
 * @return {PhonebookGroupGet}
 */
PhonebookGroup.prototype.get = function(name){
    return this.createAction(PhonebookGroupGet, name);
};

/**
 * add group
 * @return {PhonebookGroupAdd}
 */
PhonebookGroup.prototype.add = function(){
    return this.createAction(PhonebookGroupAdd);
};

/**
 * update group
 * @param  {String} name
 * @return {PhonebookGroupUpdate}
 */
PhonebookGroup.prototype.update = function(name){
    return this.createAction(PhonebookGroupUpdate, name);
};

/**
 * delete group
 * @param  {String} name
 * @return {PhonebookGroupDelete}
 */
PhonebookGroup.prototype.delete = function(name){
    return this.createAction(PhonebookGroupDelete, name);
};

/**
 * list of the groups
 * @return {PhonebookGroupList}
 */
PhonebookGroup.prototype.list = function(){
    return this.createAction(PhonebookGroupList);
};

module.exports = PhonebookGroup;
