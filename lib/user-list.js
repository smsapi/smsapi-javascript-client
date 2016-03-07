
var _              = require('lodash'),
    ActionAbstract = require('./action-abstract.js');

function UserList(options){
    ActionAbstract.call(this, options);
}

UserList.prototype = Object.create(ActionAbstract.prototype);

/**
 * @return {Promise}
 */
UserList.prototype.execute = function(){
    this.param('list', '1'); // force param

    return this.request()
        .path('user.do')
        .data(this.params())
        .json()
        .execute();
};

module.exports = UserList;
