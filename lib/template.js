var ActionFactoryAbstract = require('./action-factory-abstract'),
    TemplateAdd = require('./template-add'),
    TemplateGet = require('./template-get'),
    TemplateUpdate = require('./template-update'),
    TemplateDelete = require('./template-delete'),
    TemplateList = require('./template-list');

/**
 *
 * @param options
 * @extends ActionFactoryAbstract
 * @constructor
 */
function Template(options) {
    ActionFactoryAbstract.call(this, options);
}

Template.prototype = Object.create(ActionFactoryAbstract.prototype);

/**
 * add new template
 * @return {TemplateAdd}
 */
Template.prototype.add = function () {
    return this.createAction(TemplateAdd);
};

/**
 * add new template
 * @param {String} templateId
 * @return {TemplateUpdate}
 */
Template.prototype.update = function (templateId) {
    return this.createAction(TemplateUpdate, templateId);
};

/**
 * delete existing sender
 * @param  {String} templateId
 * @return {TemplateUpdate}
 */
Template.prototype.get = function (templateId) {
    return this.createAction(TemplateGet, templateId);
};

/**
 * delete existing sender
 * @param  {String} name
 * @return {TemplateDelete}
 */
Template.prototype.delete = function (name) {
    return this.createAction(TemplateDelete, name);
};

/**
 * get list of senders
 * @return {TemplateList}
 */
Template.prototype.list = function () {
    return this.createAction(TemplateList);
};

module.exports = Template;
