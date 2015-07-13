
// FIXME doc
var _              = require('underscore')._,
    ActionAbstract = require('./action-abstract.js');

function PhonebookGroupUpdate(options, oldName){
    ActionAbstract.call(this, options);
    this.oldName(oldName);
}

PhonebookGroupUpdate.prototype = Object.create(ActionAbstract.prototype);

PhonebookGroupUpdate.prototype.oldName = function(oldName){
    return this.param('edit_group', oldName);
};

PhonebookGroupUpdate.prototype.name = function(name){
    return this.param('name', name);
};

PhonebookGroupUpdate.prototype.info = function(info){
    return this.param('info', info);
};

PhonebookGroupUpdate.prototype.execute = function(){
    return this.request()
        .path('phonebook.do')
        .data(this.params())
        .execute();
};

module.exports = PhonebookGroupUpdate;
