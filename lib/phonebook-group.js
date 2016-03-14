var ActionFactoryAbstract = require('./action-factory-abstract');
var PhonebookGroupList = require('./phonebook-group-list');
var PhonebookGroupAdd = require('./phonebook-group-add');
var PhonebookGroupGet = require('./phonebook-group-get');
var PhonebookGroupUpdate = require('./phonebook-group-update');
var PhonebookGroupDelete = require('./phonebook-group-delete');

/**
 *
 * @param options
 * @extends ActionFactoryAbstract
 * @constructor
 */
function PhonebookGroup(options) {
    ActionFactoryAbstract.call(this, options);
}

PhonebookGroup.prototype = Object.create(ActionFactoryAbstract.prototype);

/**
 * get group
 * @param  {String} name
 * @return {PhonebookGroupGet}
 */
PhonebookGroup.prototype.get = function (name) {
    return this.createAction(PhonebookGroupGet, name);
};

/**
 * add group
 * @return {PhonebookGroupAdd}
 */
PhonebookGroup.prototype.add = function () {
    return this.createAction(PhonebookGroupAdd);
};

/**
 * update group
 * @param  {String} name
 * @return {PhonebookGroupUpdate}
 */
PhonebookGroup.prototype.update = function (name) {
    return this.createAction(PhonebookGroupUpdate, name);
};

/**
 * delete group
 * @param  {String} name
 * @return {PhonebookGroupDelete}
 */
PhonebookGroup.prototype.delete = function (name) {
    return this.createAction(PhonebookGroupDelete, name);
};

/**
 * list of the groups
 * @return {PhonebookGroupList}
 */
PhonebookGroup.prototype.list = function () {
    return this.createAction(PhonebookGroupList);
};

module.exports = PhonebookGroup;
