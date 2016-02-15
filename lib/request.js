
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
    this._json   = options.json   || false;
    this._data   = options.data   || {};
    this._auth   = options.auth   || null;
    this._file   = options.file   || null;
    this._method = options.method || 'post';
}

/**
 * set get method
 * @param  {String} [path]
 * @return {Request}
 */
Request.prototype.get = function(path){
    this.path(path);
    this._method = 'get';
    return this;
};

/**
 * set post method
 * @param  {String} [path]
 * @return {Request}
 */
Request.prototype.post = function(path){
    this.path(path);
    this._method = 'post';
    return this;
};

/**
 * set delete method
 * @param  {String} [path]
 * @return {Request}
 */
Request.prototype.delete = function(path){
    this.path(path);
    this._method = 'delete';
    return this;
};

/**
 * set put method
 * @param  {String} [path]
 * @return {Request}
 */
Request.prototype.put = function(path){
    this.path(path);
    this._method = 'put';
    return this;
};

/**
 * @param  {String} [path]
 * @return {Request} or path
 */
Request.prototype.path = function(path){
    if (_.isUndefined(path))
        return this._path;

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

Request.prototype._createRequest = function(){
    var url = this._server,
        request;

    if (this._path)
        url += this._path;

    if (this._method === 'get')
        request = client.get(url);
    else if (this._method === 'post')
        request = client.post(url);
    else if (this._method === 'delete')
        request = client.del(url);
    else if (this._method === 'put')
        request = client.put(url);
    else
        request = client.post(url);

    request.type('urlencoded');

    return request;
};

Request.prototype._applyHeaders = function(request){
    if (this._auth)
        _.forEach(this._auth.getHeaders(), function(value, key){
            request.set(key, value);
        });

    if (this._json)
        request.set('Accept', 'application/json');

    if (this._method === 'get')
        request.type('html');
    else
        request.type('urlencoded');

    return this;
};

Request.prototype._applyQueryParams = function(request){
    if (this._method === 'get')
        request.query(this._data);

    if (this._json)
        request.query({ format: 'json' });

    if (this._auth)
        request.query(this._auth.getGETParams());

    return this;
};

Request.prototype._applyFields = function(request){
    if (this._method === 'post' || this._method === 'put')
        request.send(this._data);

    if (this._file){
        // attach file, it will change type to multipart
        request.attach('file', this._file);

        // attach fields, .send() doesn't work for multipart
        _.forEach(this._data, function(value, key){
            request.field(key, value);
        });
    }

    return this;
};

/**
 * build and execute request
 * @param  {Function} resolve callback
 * @param  {Function} reject  callback
 * @return {Request}
 */
Request.prototype._buildRequest = function(resolve, reject){
    var request = this._createRequest();
    this._applyHeaders(request);
    this._applyQueryParams(request);
    this._applyFields(request);

    request.end(function(err, result){
        var body = result ? result.body : null;

        if (err && !body) // error and no body
            reject(err);
        else if (err && body) // error and whatever body
            reject(body);
        else if (!err && body && body.error) // no error but body with an error
            reject(body);
        else
            resolve(body);
    });

    return this;
};

/**
 * @return {Promise}
 */
Request.prototype.execute = function(){
    return new Promise(this._buildRequest.bind(this));
};

module.exports = Request;
