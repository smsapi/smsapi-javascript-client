
var _      = require('underscore')._,
    config = {
        username:   '',
        password:   '', // md5 hash
        server:     null,
        testNumber: '48500500500',
        credentialsForDeprecatedPhonebook: {
            username: '',
            password: ''
        }
    };

try{
    config = _.extend(config, require('./config.dist.js'));
}
catch(err){}

module.exports = config;
