var ActionAbstract = require('./action-abstract');

/**
 *
 * @param options
 * @param templateId
 * @extends ActionAbstract
 * @constructor
 */
function TemplateDelete(options, templateId) {
    ActionAbstract.call(this, options);
    this.id(templateId);
}

TemplateDelete.prototype = Object.create(ActionAbstract.prototype);

/**
 * @param  {String} [templateId]
 * @return {TemplateDelete|String}
 */
TemplateDelete.prototype.id = function (templateId) {
    return this.param('id', templateId);
};

/**
 * @return {Promise}
 */
TemplateDelete.prototype.execute = function () {
    return this.request()
        .delete('sms/templates/' + this.param('id'))
        .json()
        .execute();
};

module.exports = TemplateDelete;
