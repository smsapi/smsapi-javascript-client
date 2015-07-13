
// FIXME doc
var _              = require('underscore')._,
    ActionAbstract = require('./action-abstract.js');

function PhonebookGroupGet(options, name){
    ActionAbstract.call(this, options);
    this.name(name);
}

PhonebookGroupGet.prototype = Object.create(ActionAbstract.prototype);

PhonebookGroupGet.prototype.name = function(name){
    return this.param('get_group', name);
};

PhonebookGroupGet.prototype.execute = function(){
    return this.request()
        .path('phonebook.do')
        .data(this.params())
        .execute();
};

module.exports = PhonebookGroupGet;
