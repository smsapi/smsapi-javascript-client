var ActionAbstract = require('./action-abstract');

/**
 *
 * @param options
 * @extends ActionAbstract
 * @constructor
 */
function TemplateList(options) {
    ActionAbstract.call(this, options);
}

TemplateList.prototype = Object.create(ActionAbstract.prototype);

/**
 * @return {Promise}
 */
TemplateList.prototype.execute = function () {
    return this.request()
        .get('sms/templates')
        .data(this.params())
        .json()
        .execute();
};

module.exports = TemplateList;
