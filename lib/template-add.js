var ActionAbstract = require('./action-abstract');

/**
 *
 * @param options
 * @extends ActionAbstract
 * @constructor
 */
function TemplateAdd(options) {
    ActionAbstract.call(this, options);
}

TemplateAdd.prototype = Object.create(ActionAbstract.prototype);

/**
 * @param  {String} [name]
 * @return {TemplateAdd|String}
 */
TemplateAdd.prototype.name = function (name) {
    return this.param('name', name);
};

/**
 * @param  {String} [template]
 * @return {TemplateAdd|String}
 */
TemplateAdd.prototype.template = function (template) {
    return this.param('template', template);
};

/**
 * @return {Promise}
 */
TemplateAdd.prototype.execute = function () {
    return this.request()
        .post('sms/templates')
        .data(this.params())
        .json()
        .execute();
};

module.exports = TemplateAdd;
