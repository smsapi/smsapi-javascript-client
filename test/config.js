var _      = require('lodash'),
    config = {
        username:   '',
        password:   '', // md5 hash
        server:     null,
        testNumber: '48500500500',
        credentialsForDeprecatedPhonebook: {
            username: '',
            password: ''
        },
        oauth: {
            clientId: 'xxx',
            clientSecret: 'xxx'
        }
    };

try{
    config = _.extend(config, require('./config.dist'));
}
catch(err){}

module.exports = config;
