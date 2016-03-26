var _      = require('lodash'),
    config = {
        username:   '',
        password:   '', // md5 hash
        server:     null,
        testNumber: '48500500500',
        testNumber2: '48500500501',
        credentialsForDeprecatedPhonebook: {
            username: '',
            password: '',
            oauth: {
                accessToken: 'xxx'
            }
        },
        oauth: {
            accessToken: 'xxx'
        }
    };

try{
    config = _.extend(config, require('./config.dist'));
}
catch(err){}

module.exports = config;
