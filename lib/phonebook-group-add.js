
// FIXME doc
var _              = require('underscore')._,
    ActionAbstract = require('./action-abstract.js');

function PhonebookGroupAdd(options){
    ActionAbstract.call(this, options);
}

PhonebookGroupAdd.prototype = Object.create(ActionAbstract.prototype);

PhonebookGroupAdd.prototype.name = function(name){
    return this.param('add_group', name);
};

PhonebookGroupAdd.prototype.info = function(info){
    return this.param('info', info);
};

PhonebookGroupAdd.prototype.execute = function(){
    return this.request()
        .path('phonebook.do')
        .data(this.params())
        .execute();
};

module.exports = PhonebookGroupAdd;
