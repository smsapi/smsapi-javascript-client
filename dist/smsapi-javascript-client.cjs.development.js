'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var axios = _interopDefault(require('axios'));
var adapter = _interopDefault(require('axios/lib/adapters/http'));
var isArray = _interopDefault(require('lodash/isArray'));
var mapKeys = _interopDefault(require('lodash/mapKeys'));
var snakeCase = _interopDefault(require('lodash/snakeCase'));
var camelCase = _interopDefault(require('lodash/camelCase'));
var forEach = _interopDefault(require('lodash/forEach'));
var isObject = _interopDefault(require('lodash/isObject'));

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

var BaseModule = function BaseModule(httpClient) {
  this.httpClient = httpClient;
};

var Hlr = /*#__PURE__*/function (_BaseModule) {
  _inheritsLoose(Hlr, _BaseModule);

  function Hlr() {
    return _BaseModule.apply(this, arguments) || this;
  }

  var _proto = Hlr.prototype;

  _proto.check = function check(numbers, idx) {
    try {
      var _this2 = this;

      return Promise.resolve(_this2.httpClient.get('/hlr.do', {
        params: {
          format: 'json',
          idx: idx,
          number: numbers.join(',')
        }
      }));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return Hlr;
}(BaseModule);

var Profile = /*#__PURE__*/function (_BaseModule) {
  _inheritsLoose(Profile, _BaseModule);

  function Profile() {
    return _BaseModule.apply(this, arguments) || this;
  }

  var _proto = Profile.prototype;

  _proto.get = function get() {
    try {
      var _this2 = this;

      return Promise.resolve(_this2.httpClient.get('/profile'));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return Profile;
}(BaseModule);

var Sendernames = /*#__PURE__*/function (_BaseModule) {
  _inheritsLoose(Sendernames, _BaseModule);

  function Sendernames() {
    return _BaseModule.apply(this, arguments) || this;
  }

  var _proto = Sendernames.prototype;

  _proto.get = function get() {
    try {
      var _this2 = this;

      return Promise.resolve(_this2.httpClient.get('/sms/sendernames')).then(function (data) {
        return _extends({}, data, {
          collection: data.collection.map(_this2.formatSendernameDates)
        });
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.getBySender = function getBySender(sender) {
    try {
      var _this4 = this;

      return Promise.resolve(_this4.httpClient.get("/sms/sendernames/" + sender)).then(function (data) {
        return _this4.formatSendernameDates(data);
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.create = function create(sender) {
    try {
      var _this6 = this;

      return Promise.resolve(_this6.httpClient.post('/sms/sendernames', {
        sender: sender
      })).then(function (data) {
        return _this6.formatSendernameDates(data);
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.makeDefault = function makeDefault(sender) {
    try {
      var _this8 = this;

      return Promise.resolve(_this8.httpClient.post("/sms/sendernames/" + sender + "/commands/make_default")).then(function () {});
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.remove = function remove(sender) {
    try {
      var _this10 = this;

      return Promise.resolve(_this10.httpClient["delete"]("/sms/sendernames/" + sender)).then(function () {});
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.formatSendernameDates = function formatSendernameDates(sendername) {
    return _extends({}, sendername, {
      createdAt: new Date(sendername.createdAt)
    });
  };

  return Sendernames;
}(BaseModule);

var Sms = /*#__PURE__*/function (_BaseModule) {
  _inheritsLoose(Sms, _BaseModule);

  function Sms() {
    return _BaseModule.apply(this, arguments) || this;
  }

  var _proto = Sms.prototype;

  _proto.sendSms = function sendSms(numbers, message, details) {
    try {
      var _this2 = this;

      var to = isArray(numbers) ? numbers.join(',') : numbers;
      return Promise.resolve(_this2.send(message, to, undefined, details));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.sendFlashSms = function sendFlashSms(numbers, message, details) {
    try {
      var _this4 = this;

      return Promise.resolve(_this4.sendSms(numbers, message, _extends({}, details, {
        flash: true
      })));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.sendSmsToGroup = function sendSmsToGroup(groups, message, details) {
    try {
      var _this6 = this;

      var group = isArray(groups) ? groups.join(',') : groups;
      return Promise.resolve(_this6.send(message, undefined, group, details));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.sendFlashSmsToGroup = function sendFlashSmsToGroup(groups, message, details) {
    try {
      var _this8 = this;

      return Promise.resolve(_this8.sendSmsToGroup(groups, message, _extends({}, details, {
        flash: true
      })));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.send = function send(message, to, group, details) {
    try {
      var _this10 = this;

      var body = _extends({
        message: message.trim(),
        details: true,
        encoding: 'utf-8',
        format: 'json'
      }, _this10.formatSmsDetails(details || {}));

      if (to) {
        body.to = to;
      } else {
        body.group = group;
      }

      return Promise.resolve(_this10.httpClient.post('/sms.do', body)).then(function (data) {
        return _this10.formatSmsResponse(data);
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.formatSmsDetails = function formatSmsDetails(details) {
    var formattedDetails = details;

    if (details.date) {
      formattedDetails.dateValidate = true;
      formattedDetails.date = details.date.toISOString();
    }

    if (details.expirationDate) {
      formattedDetails.expirationDate = details.expirationDate.toISOString();
    }

    return mapKeys(formattedDetails, function (_, key) {
      if (/param[1-4]/.test(key)) {
        return key;
      }

      if (key === 'noUnicode') {
        return key.toLowerCase();
      }

      return snakeCase(key);
    });
  };

  _proto.formatSmsResponse = function formatSmsResponse(response) {
    return _extends({}, response, {
      list: response.list.map(function (sms) {
        return _extends({}, sms, {
          dateSent: new Date(sms.dateSent)
        });
      })
    });
  };

  return Sms;
}(BaseModule);

var Subusers = /*#__PURE__*/function (_BaseModule) {
  _inheritsLoose(Subusers, _BaseModule);

  function Subusers() {
    return _BaseModule.apply(this, arguments) || this;
  }

  var _proto = Subusers.prototype;

  _proto.get = function get() {
    try {
      var _this2 = this;

      return Promise.resolve(_this2.httpClient.get('/subusers'));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.getById = function getById(subuserId) {
    try {
      var _this4 = this;

      return Promise.resolve(_this4.httpClient.get("/subusers/" + subuserId));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.create = function create(newSubuser) {
    try {
      var _this6 = this;

      var credentials = newSubuser.credentials,
          points = newSubuser.points;
      return Promise.resolve(_this6.httpClient.post('/subusers', _extends({}, newSubuser, {
        credentials: {
          username: credentials.username,
          password: credentials.password,
          api_password: credentials.apiPassword
        },
        points: points ? {
          from_account: points.fromAccount,
          per_month: points.perMonth
        } : undefined
      })));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.update = function update(subuserId, updateSubuser) {
    try {
      var _this8 = this;

      var credentials = updateSubuser.credentials,
          points = updateSubuser.points;
      return Promise.resolve(_this8.httpClient.put("/subusers/" + subuserId, _extends({}, updateSubuser, {
        credentials: credentials && (credentials.password || credentials.apiPassword) ? {
          password: credentials.password,
          api_password: credentials.apiPassword
        } : undefined,
        points: points && (points.fromAccount || points.perMonth) ? {
          from_account: points.fromAccount,
          per_month: points.perMonth
        } : undefined
      })));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.remove = function remove(subuserId) {
    try {
      var _this10 = this;

      return Promise.resolve(_this10.httpClient["delete"]("/subusers/" + subuserId)).then(function () {});
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return Subusers;
}(BaseModule);

var Templates = /*#__PURE__*/function (_BaseModule) {
  _inheritsLoose(Templates, _BaseModule);

  function Templates() {
    return _BaseModule.apply(this, arguments) || this;
  }

  var _proto = Templates.prototype;

  _proto.get = function get() {
    try {
      var _this2 = this;

      return Promise.resolve(_this2.httpClient.get('/sms/templates'));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.getById = function getById(templateId) {
    try {
      var _this4 = this;

      return Promise.resolve(_this4.httpClient.get("/sms/templates/" + templateId));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.create = function create(newTemplate) {
    try {
      var _this6 = this;

      return Promise.resolve(_this6.httpClient.post('/sms/templates', newTemplate));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.update = function update(templateId, newTemplate) {
    try {
      var _this8 = this;

      return Promise.resolve(_this8.httpClient.put("/sms/templates/" + templateId, newTemplate));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.remove = function remove(templateId) {
    try {
      var _this10 = this;

      return Promise.resolve(_this10.httpClient["delete"]("/sms/templates/" + templateId)).then(function () {});
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return Templates;
}(BaseModule);

var version = "2.0.0";

var formatKeys = function formatKeys(object) {
  return mapKeys(object, function (_, key) {
    return camelCase(key);
  });
};

var formatResponse = function formatResponse(object) {
  var newResponse = formatKeys(object);
  forEach(newResponse, function (value, key) {
    if (isObject(value)) {
      newResponse[key] = formatKeys(value);
    }
  });
  return newResponse;
};

var isApiCollection = function isApiCollection(data) {
  return !!data.collection && !!data.size;
};

var isSmsResponse = function isSmsResponse(data) {
  return !!data.list && !!data.message && !!data.count;
};

var extractDataFromResponse = function extractDataFromResponse(response) {
  var data = response.data;

  if (!data) {
    return data;
  }

  if (isArray(data)) {
    return data.map(formatResponse);
  }

  if (isApiCollection(data)) {
    return _extends({}, data, {
      collection: data.collection.map(formatResponse)
    });
  }

  if (isSmsResponse(data)) {
    return _extends({}, data, {
      list: data.list.map(formatResponse)
    });
  }

  return formatResponse(data);
};

/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-enable @typescript-eslint/ban-ts-comment */

var SMSAPI = /*#__PURE__*/function () {
  function SMSAPI(accessToken, apiUrl) {
    this.accessToken = accessToken;
    this.apiUrl = apiUrl;
    this.httpClient = this.setHttpClient();
    this.hlr = new Hlr(this.httpClient);
    this.profile = new Profile(this.httpClient);
    this.sendernames = new Sendernames(this.httpClient);
    this.sms = new Sms(this.httpClient);
    this.subusers = new Subusers(this.httpClient);
    this.templates = new Templates(this.httpClient);
  }

  var _proto = SMSAPI.prototype;

  _proto.getUserAgent = function getUserAgent() {
    return "smsapi/js-client:" + version;
  };

  _proto.setHttpClient = function setHttpClient() {
    var httpClient = axios.create({
      adapter: adapter,
      baseURL: this.apiUrl,
      headers: {
        Accept: 'application/json',
        Authorization: "Bearer " + this.accessToken,
        'User-Agent': this.getUserAgent()
      }
    });
    httpClient.interceptors.response.use(extractDataFromResponse);
    return httpClient;
  };

  return SMSAPI;
}();

var SMSAPIcom = /*#__PURE__*/function (_SMSAPI) {
  _inheritsLoose(SMSAPIcom, _SMSAPI);

  function SMSAPIcom(accessToken) {
    var API_URL = 'https://api.smsapi.com';
    return _SMSAPI.call(this, accessToken, API_URL) || this;
  }

  return SMSAPIcom;
}(SMSAPI);

var SMSAPIpl = /*#__PURE__*/function (_SMSAPI) {
  _inheritsLoose(SMSAPIpl, _SMSAPI);

  function SMSAPIpl(accessToken) {
    var API_URL = 'https://api.smsapi.pl';
    return _SMSAPI.call(this, accessToken, API_URL) || this;
  }

  return SMSAPIpl;
}(SMSAPI);



var index = {
  __proto__: null
};

exports.SMSAPI = index;
exports.SMSAPIcom = SMSAPIcom;
exports.SMSAPIpl = SMSAPIpl;
//# sourceMappingURL=smsapi-javascript-client.cjs.development.js.map
