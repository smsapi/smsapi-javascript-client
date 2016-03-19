var chai = require('chai'),
    assert = chai.assert,
    SMSAPI = require('../lib/smsapi'),
    config = require('./config'),
    randomString = require('randomstring').generate,
    _ = require('lodash');

var optionsByAuth = {
    AuthenticationSimple: {
        server: config.server
    },
    AuthenticationOAuth: {
        server: config.server,
        oauth: config.oauth
    }
};

_.forEach(optionsByAuth, function (options, authName) {

    describe('template (' + authName + ')', function () {
        var smsapi = new SMSAPI(options);
        var template = {
            name: ('test-' + randomString()).substring(0, 10),
            template: ('template-' + randomString()).substring(0, 20),
        };

        if (authName === 'AuthenticationSimple') {
            before(function (done) {
                smsapi.authentication.loginHashed(config.username, config.password)
                    .then(done.bind(null, null))
                    .catch(done);
            });
        }

        it('should get template list', function (done) {
            var createdTemplate;

            createTemplate(smsapi, template)
                .then(function (result) {
                    createdTemplate = result;

                    return smsapi.template
                        .list()
                        .execute();
                })
                .then(function (result) {
                    assert.isAbove(result['size'], 0);
                    assert.isArray(result['collection']);
                })
                .then(function () {
                    return deleteTemplate(smsapi, createdTemplate.id);
                })
                .then(done.bind(null, null))
                .catch(done);
        });

        it('should get single template', function (done) {
            var createdTemplate;

            createTemplate(smsapi, template)
                .then(function (result) {
                    createdTemplate = result;

                    return smsapi.template
                        .get(createdTemplate.id)
                        .execute();
                })
                .then(function (result) {
                    assert.deepEqual(result, createdTemplate);
                })
                .then(function () {
                    return deleteTemplate(smsapi, createdTemplate.id);
                })
                .then(done.bind(null, null))
                .catch(done);
        });

        it('should add new template', function (done) {
            var createdTemplate;

            smsapi.template
                .add()
                .name(template.name)
                .template(template.template)
                .execute()
                .then(function (result) {
                    createdTemplate = result;

                    // check response
                    assert.equal(result.name, template.name);
                    assert.equal(result.template, template.template);
                })
                .then(function () {
                    // check if template has been added
                    return getTemplate(smsapi, createdTemplate.id);
                })
                .then(function (result) {
                    assert.deepEqual(result, createdTemplate);
                })
                .then(function () {
                    return deleteTemplate(smsapi, createdTemplate.id);
                })
                .then(done.bind(null, null))
                .catch(done);
        });

        it('should update template', function (done) {
            var createdTemplate;

            createTemplate(smsapi, template)
                .then(function (result) {
                    createdTemplate = result;
                    createdTemplate['name'] = 'updated-' + result['name'];
                    createdTemplate['template'] = 'updated-' + result['template'];

                    // update template
                    return smsapi.template
                        .update(createdTemplate.id)
                        .name(createdTemplate['name'])
                        .template(createdTemplate['template'])
                        .execute();
                })
                .then(function (result) {
                    // check response
                    assert.deepEqual(result, createdTemplate);

                    // get template from the server
                    return getTemplate(smsapi, createdTemplate.id);
                })
                .then(function (result) {
                    // check if server's template match our updated template
                    assert.deepEqual(result, createdTemplate);
                })
                .then(function () {
                    return deleteTemplate(smsapi, createdTemplate.id);
                })
                .then(done.bind(null, null))
                .catch(done);
        });

        it('should delete template', function (done) {
            var createdTemplate;

            createTemplate(smsapi, template)
                .then(function (result) {
                    createdTemplate = result;

                    return smsapi.template
                        .delete(result.id)
                        .execute();
                })
                .then(function () {
                    getTemplate(smsapi, createdTemplate.id)
                        .then(done) // will fail if template has been found
                        .catch(done.bind(null, null));
                })
                .catch(done);
        });
    });

});

/**
 *
 * @param {SMSAPI} smsapi
 * @param {Object} template
 * @param {String} template.name
 * @param {String} template.template
 * @returns {Promise<Object>}
 */
function createTemplate(smsapi, template) {
    return smsapi.template
        .add()
        .name(template.name)
        .template(template.template)
        .execute();
}

/**
 *
 * @param {SMSAPI} smsapi
 * @param {String} templateId
 * @returns {Promise<Object>}
 */
function getTemplate(smsapi, templateId) {
    return smsapi.template
        .get(templateId)
        .execute();
}

/**
 *
 * @param smsapi
 * @param templateId
 * @returns {Promise}
 */
function deleteTemplate(smsapi, templateId) {
    return smsapi.template
        .delete(templateId)
        .execute();
}
