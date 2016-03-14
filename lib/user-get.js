var ActionAbstract = require('./action-abstract');

/**
 *
 * @param options
 * @param name
 * @extends ActionAbstract
 * @constructor
 */
function UserGet(options, name) {
    ActionAbstract.call(this, options);
    this.name(name);
}

UserGet.prototype = Object.create(ActionAbstract.prototype);

/**
 * @param  {String} [name]
 * @return {UserGet|String}
 */
UserGet.prototype.name = function (name) {
    return this.param('get_user', name);
};

/**
 * @return {Promise}
 */
UserGet.prototype.execute = function () {
    return this.request()
        .path('user.do')
        .data(this.params())
        .json()
        .execute();
};

module.exports = UserGet;
