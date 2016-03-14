var ActionAbstract = require('./action-abstract');

/**
 *
 * @param options
 * @param name
 * @extends ActionAbstract
 * @constructor
 */
function UserDelete(options, name) {
    ActionAbstract.call(this, options);
    this.name(name);
}

UserDelete.prototype = Object.create(ActionAbstract.prototype);

/**
 * @param  {String} [name]
 * @return {UserDelete|String}
 */
UserDelete.prototype.name = function (name) {
    return this.param('delete_user', name);
};

/**
 * @return {Promise}
 */
UserDelete.prototype.execute = function () {
    return this.request()
        .path('user.do')
        .data(this.params())
        .json()
        .execute();
};

module.exports = UserDelete;
