
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

PhonebookGroup.prototype.get = function(name){
    return this.createAction(PhonebookGroupGet, name);
};

PhonebookGroup.prototype.add = function(){
    return this.createAction(PhonebookGroupAdd);
};

PhonebookGroup.prototype.update = function(name){
    return this.createAction(PhonebookGroupUpdate, name);
};

PhonebookGroup.prototype.delete = function(name){
    return this.createAction(PhonebookGroupDelete, name);
};

PhonebookGroup.prototype.list = function(){
    return this.createAction(PhonebookGroupList);
};

module.exports = PhonebookGroup;
