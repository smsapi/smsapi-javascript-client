
// FIXME doc
var _              = require('underscore')._,
    ActionAbstract = require('./action-abstract.js');

function PhonebookGroupList(options){
    ActionAbstract.call(this, options);
}

PhonebookGroupList.prototype = Object.create(ActionAbstract.prototype);

PhonebookGroupList.prototype.execute = function(){
    this.param('list_groups', '1'); // force param

    return this.request()
        .path('phonebook.do')
        .data(this.params())
        .execute();
};

module.exports = PhonebookGroupList;
