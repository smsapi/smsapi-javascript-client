
var _              = require('underscore')._,
    ActionAbstract = require('./action-abstract.js');

/**
 * list of the groups
 * @param {Object} options
 */
function PhonebookGroupList(options){
    ActionAbstract.call(this, options);
}

PhonebookGroupList.prototype = Object.create(ActionAbstract.prototype);

/**
 * execute action
 * @return {Promise}
 */
PhonebookGroupList.prototype.execute = function(){
    this.param('list_groups', '1'); // force param

    return this.request()
        .path('phonebook.do')
        .data(this.params())
        .json()
        .execute();
};

module.exports = PhonebookGroupList;
