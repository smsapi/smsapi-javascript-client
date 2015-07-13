
var Promise     = require('rsvp').Promise,
    client      = require('superagent'),
    _           = require('underscore')._,
    querystring = require('querystring');

/**
 * single request to the server
 * @param {Object}                 [options]
 * @param {String}                 [options.server]
 * @param {String}                 [options.path]
 * @param {Boolean}                [options.json]
 * @param {Object}                 [options.data]
 * @param {AuthenticationAbstract} [options.auth]
 * @param {String}                 [options.file]
 */
function Request(options){
    options      = options        || {};
    this._server = options.server || '';
    this._path   = options.path   || '';
    this._json   = options.json   || true;
    this._data   = options.data   || {};
    this._auth   = options.auth   || null;
    this._file   = options.file   || null;
}

/**
 * @param  {String} path
 * @return {Request}
 */
Request.prototype.path = function(path){
    this._path = path;
    return this;
};

/**
 * set auth object
 * @param  {AuthenticationAbstract} auth
 * @return {Request}
 */
Request.prototype.auth = function(auth){
    this._auth = auth;
    return this;
};

/**
 * @param  {Boolean} json
 * @return {Request}
 */
Request.prototype.json = function(json){
    this._json = json === undefined ? true : json;
    return this;
};

/**
 * @param  {Object} data
 * @return {Request}
 */
Request.prototype.data = function(data){
    this._data = data;
    return this;
};

/**
 * @param  {String} file path to local file
 * @return {Request}
 */
Request.prototype.file = function(file){
    this._file = file;
    return this;
};

/**
 * @return {String}
 */
Request.prototype._prepareUrl = function(){
    var url = this._server;

    if (this._path)
        url += this._path;

    if (this._auth){
        var query = querystring.stringify(this._auth.getGETParams());
        url = query ? url + '?' + query : url;
    }

    return url;
};

/**
 * @return {String}
 */
Request.prototype._prepareData = function(){
    if (this._json)
        this._data.format = 'json';

    if (this._auth)
        this._data = _.extend(this._data, this._auth.getPOSTParams());

    return this._data;
};

/**
 * @return {Promise}
 */
Request.prototype.execute = function(){
    var that = this,
        auth = this._auth,
        file = this._file,
        url  = this._prepareUrl(),
        data = this._prepareData();

    return new Promise(function(resolve, reject){
        var request = client
            .post(url)
            .type('urlencoded');

        if (that._file){
            // attach file, it will change type to multipart
            request.attach('file', that._file);

            // attach fields, .send() doesn't work for multipart
            _.forEach(data, function(value, key){
                request.field(key, value);
            });
        }
        else
            request.send(data);

        if (that._json)
            request.set('Accept', 'application/json');

        request.end(function(err, result){
            var body = result ? result.body : null;

            if (err || !body)
                reject(err);
            else if (body.error) // also reject if server has returned error
                reject(body);
            else
                resolve(body);
        });
    });
};

module.exports = Request;
