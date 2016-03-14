var ActionAbstract = require('./action-abstract');
var _ = require('lodash');

/**
 *
 * @param options
 * @param templateId
 * @extends ActionAbstract
 * @constructor
 */
function TemplateUpdate(options, templateId) {
    ActionAbstract.call(this, options);
    this.id(templateId || '');
}

TemplateUpdate.prototype = Object.create(ActionAbstract.prototype);

/**
 * @param  {String} [templateId]
 * @return {TemplateUpdate|String}
 */
TemplateUpdate.prototype.id = function (templateId) {
    return this.param('id', templateId);
};

/**
 * @param  {String} [name]
 * @return {TemplateUpdate|String}
 */
TemplateUpdate.prototype.name = function (name) {
    return this.param('name', name);
};

/**
 * @param  {String} [template]
 * @return {TemplateUpdate|String}
 */
TemplateUpdate.prototype.template = function (template) {
    return this.param('template', template);
};

/**
 * @return {Promise}
 */
TemplateUpdate.prototype.execute = function () {
    return this.request()
        .put('sms/templates/' + this.param('id'))
        .data(_.omit(this.params(), 'id'))
        .json()
        .execute();
};

module.exports = TemplateUpdate;
