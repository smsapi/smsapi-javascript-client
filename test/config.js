
var _      = require('underscore')._,
    config = {
        username:   '',
        password:   '',
        server:     null,
        testNumber: '48500500500'
    };

try{
    config = _.extend(config, require('./config.dist.js'));
}
catch(err){}

module.exports = config;
