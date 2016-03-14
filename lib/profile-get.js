var ActionAbstract = require('./action-abstract');

/**
 *
 * @param options
 * @extends ActionAbstract
 * @constructor
 */
function ProfileGet(options) {
    ActionAbstract.call(this, options);
}

ProfileGet.prototype = Object.create(ActionAbstract.prototype);

/**
 * @return {Promise}
 */
ProfileGet.prototype.execute = function () {
    return this.request()
        .get('profile')
        .data(this.params())
        .execute();
};

module.exports = ProfileGet;
