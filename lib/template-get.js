var ActionAbstract = require('./action-abstract');

/**
 *
 * @param options
 * @param templateId
 * @extends ActionAbstract
 * @constructor
 */
function TemplateGet(options, templateId) {
    ActionAbstract.call(this, options);
    this.id(templateId || '');
}

TemplateGet.prototype = Object.create(ActionAbstract.prototype);

/**
 * @param  {String} [templateId]
 * @return {TemplateGet|String}
 */
TemplateGet.prototype.id = function (templateId) {
    return this.param('id', templateId);
};

/**
 * @return {Promise}
 */
TemplateGet.prototype.execute = function () {
    return this.request()
        .get('sms/templates/' + this.param('id'))
        .data(this.params())
        .json()
        .execute();
};

module.exports = TemplateGet;
