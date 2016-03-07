
var _              = require('lodash'),
    ActionAbstract = require('./action-abstract.js');

/**
 * get contact
 * @see  http://dev.smsapi.pl/#!/contacts/get
 * @param {Object} options
 * @param {String} id
 */
function ContactsGet(options, id){
    ActionAbstract.call(this, options);
    this._id = id || null;
}

ContactsGet.prototype = Object.create(ActionAbstract.prototype);

/**
 * get/set id
 * @param  {String} id
 * @return {ContactsGet} or {String}
 */
ContactsGet.prototype.id = function(id){
    if (_.isUndefined(id))
        return this._id;

    this._id = id;
    return this;
};

/**
 * execute action
 * @return {ContactsGet}
 */
ContactsGet.prototype.execute = function(){
    return this.request()
        .get('contacts/' + String(this._id))
        .data(this.params())
        .execute();
};

module.exports = ContactsGet;
