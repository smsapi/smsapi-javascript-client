
// FIXME doc
var _              = require('underscore')._,
    ActionAbstract = require('./action-abstract.js');

function PhonebookGroupDelete(options, name){
    ActionAbstract.call(this, options);
    this.name(name);
}

PhonebookGroupDelete.prototype = Object.create(ActionAbstract.prototype);

PhonebookGroupDelete.prototype.name = function(name){
    return this.param('delete_group', name);
};

PhonebookGroupDelete.prototype.execute = function(){
    return this.request()
        .path('phonebook.do')
        .data(this.params())
        .execute();
};

module.exports = PhonebookGroupDelete;
