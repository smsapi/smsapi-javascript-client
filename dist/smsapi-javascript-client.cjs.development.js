'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var axios = _interopDefault(require('axios'));
var adapter = _interopDefault(require('axios/lib/adapters/http'));
var mapKeys = _interopDefault(require('lodash/mapKeys'));
var snakeCase = _interopDefault(require('lodash/snakeCase'));
var camelCase = _interopDefault(require('lodash/camelCase'));
var forEach = _interopDefault(require('lodash/forEach'));
var isArray = _interopDefault(require('lodash/isArray'));
var isDate = _interopDefault(require('lodash/isDate'));
var isObject = _interopDefault(require('lodash/isObject'));
var querystring = require('querystring');
var mapValues = _interopDefault(require('lodash/mapValues'));
var fs = _interopDefault(require('fs'));
var FormData = _interopDefault(require('form-data'));

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

var formatKeys = function formatKeys(object) {
  return mapKeys(object, function (_, key) {
    return camelCase(key);
  });
};

var formatResponse = function formatResponse(object) {
  var newResponse = formatKeys(object);
  forEach(newResponse, function (value, key) {
    if (isDate(value)) {
      return;
    }

    if (isArray(value)) {
      newResponse[key] = value.map(function (arrayValue) {
        return isObject(arrayValue) && !isDate(arrayValue) ? formatKeys(arrayValue) : arrayValue;
      });
      return;
    }

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
  return !!data.list && !!data.count;
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

var BaseModule = function BaseModule(httpClient) {
  this.httpClient = httpClient;
};

var formatDate = function formatDate(date) {
  return date.toISOString().slice(0, 10);
};

var formatKeys$1 = function formatKeys(data) {
  return mapKeys(data, function (_, key) {
    return snakeCase(key);
  });
};

var prepareParamsForRequest = function prepareParamsForRequest(config) {
  var data = config.data,
      method = config.method,
      params = config.params;

  if (['get', 'delete'].includes(method.toLowerCase())) {
    var formattedParams = mapValues(params, function (value, key) {
      if (key === 'birthdayDate') {
        if (isArray(value)) {
          return value.map(formatDate);
        }

        return formatDate(value);
      }

      return value;
    });
    formattedParams = formatKeys$1(formattedParams);
    return _extends({}, config, {
      params: formattedParams,
      paramsSerializer: function paramsSerializer(params) {
        return querystring.stringify(params);
      }
    });
  }

  if (data) {
    return _extends({}, config, {
      data: querystring.stringify(formatKeys$1(data))
    });
  }

  return config;
};

var Groups = /*#__PURE__*/function (_BaseModule) {
  _inheritsLoose(Groups, _BaseModule);

  function Groups() {
    return _BaseModule.apply(this, arguments) || this;
  }

  var _proto = Groups.prototype;

  _proto.get = function get() {
    try {
      var _this2 = this;

      return Promise.resolve(_this2.httpClient.get('/contacts/groups'));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.getById = function getById(groupId) {
    try {
      var _this4 = this;

      return Promise.resolve(_this4.httpClient.get("/contacts/groups/" + groupId));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.create = function create(name, details) {
    try {
      var _this6 = this;

      return Promise.resolve(_this6.httpClient.post('/contacts/groups', _extends({
        name: name
      }, details)));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.update = function update(groupId, updateGroup) {
    try {
      var _this8 = this;

      return Promise.resolve(_this8.httpClient.put("/contacts/groups/" + groupId, updateGroup));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.remove = function remove(groupId, deleteContacts) {
    if (deleteContacts === void 0) {
      deleteContacts = false;
    }

    try {
      var _this10 = this;

      return Promise.resolve(_this10.httpClient["delete"]("/contacts/groups/" + groupId, {
        params: {
          deleteContacts: deleteContacts
        }
      })).then(function () {});
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return Groups;
}(BaseModule);

var isApiCollection$1 = function isApiCollection(data) {
  return !!data.size && !!data.collection;
};

var formatDates = function formatDates(group) {
  if (!group.date_created && !group.date_updated) {
    return _extends({}, group);
  }

  return _extends({}, group, {
    date_created: new Date(group.date_created),
    date_updated: new Date(group.date_updated)
  });
};

var formatResponseDates = function formatResponseDates(response) {
  var data = response.data;

  if (isApiCollection$1(data)) {
    return _extends({}, response, {
      data: {
        collection: data.collection.map(function (group) {
          return formatDates(group);
        }),
        size: data.size
      }
    });
  }

  return _extends({}, response, {
    data: formatDates(data)
  });
};

var Fields = /*#__PURE__*/function (_BaseModule) {
  _inheritsLoose(Fields, _BaseModule);

  function Fields() {
    return _BaseModule.apply(this, arguments) || this;
  }

  var _proto = Fields.prototype;

  _proto.get = function get() {
    try {
      var _this2 = this;

      return Promise.resolve(_this2.httpClient.get('/contacts/fields'));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.create = function create(fieldName, fieldType) {
    if (fieldType === void 0) {
      fieldType = 'text';
    }

    try {
      var _this4 = this;

      return Promise.resolve(_this4.httpClient.post('/contacts/fields', {
        name: fieldName,
        type: fieldType
      }));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.update = function update(fieldId, newName) {
    try {
      var _this6 = this;

      return Promise.resolve(_this6.httpClient.put("/contacts/fields/" + fieldId, {
        name: newName
      }));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.remove = function remove(fieldId) {
    try {
      var _this8 = this;

      return Promise.resolve(_this8.httpClient["delete"]("/contacts/fields/" + fieldId)).then(function () {});
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return Fields;
}(BaseModule);

var Contacts = /*#__PURE__*/function (_BaseModule) {
  _inheritsLoose(Contacts, _BaseModule);

  function Contacts(httpClient) {
    var _this;

    _this = _BaseModule.call(this, httpClient) || this;
    _this.contactHttpClient = axios.create({
      adapter: httpClient.defaults.adapter,
      baseURL: httpClient.defaults.baseURL,
      headers: httpClient.defaults.headers
    });

    _this.contactHttpClient.interceptors.request.use(prepareParamsForRequest);

    _this.contactHttpClient.interceptors.response.use(formatResponseDates);

    _this.contactHttpClient.interceptors.response.use(extractDataFromResponse);

    _this.fields = new Fields(_this.contactHttpClient);
    _this.groups = new Groups(_this.contactHttpClient);
    return _this;
  }

  var _proto = Contacts.prototype;

  _proto.get = function get(params) {
    try {
      var _this3 = this;

      return Promise.resolve(_this3.contactHttpClient.get('/contacts', {
        params: params
      }));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.getById = function getById(contactId) {
    try {
      var _this5 = this;

      return Promise.resolve(_this5.contactHttpClient.get("/contacts/" + contactId));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.create = function create(phoneNumber, details) {
    try {
      var _this7 = this;

      return Promise.resolve(_this7.contactHttpClient.post('/contacts', _extends({
        phone_number: phoneNumber
      }, _this7.formatContactDetails(details || {}))));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.update = function update(contactId, updateContact) {
    try {
      var _this9 = this;

      return Promise.resolve(_this9.contactHttpClient.put("/contacts/" + contactId, _extends({}, _this9.formatContactDetails(updateContact || {}))));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.remove = function remove(contactId) {
    try {
      var _this11 = this;

      return Promise.resolve(_this11.contactHttpClient["delete"]("/contacts/" + contactId)).then(function () {});
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.getGroups = function getGroups(contactId) {
    try {
      var _this13 = this;

      return Promise.resolve(_this13.contactHttpClient.get("/contacts/" + contactId + "/groups"));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.getGroupById = function getGroupById(contactId, groupId) {
    try {
      var _this15 = this;

      return Promise.resolve(_this15.contactHttpClient.get("/contacts/" + contactId + "/groups/" + groupId));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.assignContactToGroup = function assignContactToGroup(contactId, groupId) {
    try {
      var _this17 = this;

      return Promise.resolve(_this17.contactHttpClient.put("/contacts/" + contactId + "/groups/" + groupId));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.unpinContactFromGroup = function unpinContactFromGroup(contactId, groupId) {
    try {
      var _this19 = this;

      return Promise.resolve(_this19.contactHttpClient["delete"]("/contacts/" + contactId + "/groups/" + groupId)).then(function () {});
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.formatContactDetails = function formatContactDetails(details) {
    var formattedDetails = details;

    if (details.birthdayDate) {
      formattedDetails.birthdayDate = formatDate(details.birthdayDate);
    }

    return mapKeys(formattedDetails, function (_, key) {
      return snakeCase(key);
    });
  };

  return Contacts;
}(BaseModule);

var Hlr = /*#__PURE__*/function (_BaseModule) {
  _inheritsLoose(Hlr, _BaseModule);

  function Hlr() {
    return _BaseModule.apply(this, arguments) || this;
  }

  var _proto = Hlr.prototype;

  _proto.check = function check(numbers, idx) {
    try {
      var _this2 = this;

      var params = {
        number: isArray(numbers) ? numbers.join(',') : numbers
      };

      if (idx) {
        params.idx = isArray(idx) ? idx.join(',') : idx;
      }

      return Promise.resolve(_this2.httpClient.get('/hlr.do', {
        params: _extends({
          format: 'json'
        }, params)
      }));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return Hlr;
}(BaseModule);

var BaseMessageModule = /*#__PURE__*/function (_BaseModule) {
  _inheritsLoose(BaseMessageModule, _BaseModule);

  function BaseMessageModule() {
    return _BaseModule.apply(this, arguments) || this;
  }

  var _proto = BaseMessageModule.prototype;

  _proto.send = function send(content, recipient, details) {
    try {
      var _temp3 = function _temp3(_result) {
        return _exit2 ? _result : Promise.resolve(_this2.httpClient.post(_this2.endpoint, body)).then(function (data) {
          return _this2.formatSmsResponse(data);
        });
      };

      var _exit2 = false;

      var _this2 = this;

      var body = _extends({
        details: true,
        encoding: 'utf-8',
        format: 'json'
      }, _this2.formatSmsDetails(details || {}));

      if (_this2.isNumberRecipient(recipient)) {
        var to = recipient.to;
        body.to = isArray(to) ? to.join(',') : to;
      }

      if (_this2.isGroupRecipient(recipient)) {
        var group = recipient.group;
        body.group = isArray(group) ? group.join(',') : group;
      }

      if (_this2.isSms(content)) {
        body.message = content.message.trim();
      }

      if (_this2.isMms(content)) {
        body.subject = content.subject.trim();
        body.smil = content.smil;
      }

      if (_this2.isVmsText(content)) {
        body.tts = content.tts.trim();
        body.tts_lector = content.ttsLector || 'ewa';
      }

      if (_this2.isVmsRemotePath(content)) {
        body.file = content.remotePath;
      }

      var _temp4 = function () {
        if (_this2.isVmsLocalFile(content)) {
          var formData = _this2.getFormDataForVmsLocalFile(body, content);

          return Promise.resolve(_this2.httpClient.post(_this2.endpoint, formData.getBuffer(), {
            headers: formData.getHeaders()
          })).then(function (data) {
            _exit2 = true;
            return _this2.formatSmsResponse(data);
          });
        }
      }();

      return Promise.resolve(_temp4 && _temp4.then ? _temp4.then(_temp3) : _temp3(_temp4));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.isNumberRecipient = function isNumberRecipient(recipient) {
    return recipient.to !== undefined;
  };

  _proto.isGroupRecipient = function isGroupRecipient(recipient) {
    return recipient.group !== undefined;
  };

  _proto.isSms = function isSms(content) {
    return content.message !== undefined;
  };

  _proto.isMms = function isMms(content) {
    return content.smil !== undefined && content.subject !== undefined;
  };

  _proto.isVmsText = function isVmsText(content) {
    return content.tts !== undefined;
  };

  _proto.isVmsLocalFile = function isVmsLocalFile(content) {
    return content.localPath !== undefined;
  };

  _proto.isVmsRemotePath = function isVmsRemotePath(content) {
    return content.remotePath !== undefined;
  };

  _proto.getFormDataForVmsLocalFile = function getFormDataForVmsLocalFile(body, content) {
    var formData = new FormData();

    if (body.to) {
      formData.append('to', body.to);
    }

    if (body.group) {
      formData.append('group', body.group);
    }

    for (var _i = 0, _Object$entries = Object.entries(body); _i < _Object$entries.length; _i++) {
      var _Object$entries$_i = _Object$entries[_i],
          key = _Object$entries$_i[0],
          value = _Object$entries$_i[1];

      if (typeof value === 'boolean') {
        formData.append(key, value ? 1 : 0);
        continue;
      }

      formData.append(key, value);
    }

    formData.append('file', fs.readFileSync(content.localPath), {
      contentType: 'audio/wav',
      filename: 'vms.wav'
    });
    return formData;
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
          dateSent: new Date(sms.dateSent),
          points: typeof sms.points === 'string' ? parseFloat(sms.points) : sms.points
        });
      })
    });
  };

  return BaseMessageModule;
}(BaseModule);

var Mms = /*#__PURE__*/function (_BaseMessageModule) {
  _inheritsLoose(Mms, _BaseMessageModule);

  function Mms() {
    var _this;

    _this = _BaseMessageModule.apply(this, arguments) || this;
    _this.endpoint = '/mms.do';
    return _this;
  }

  var _proto = Mms.prototype;

  _proto.sendMms = function sendMms(numbers, subject, smil, details) {
    try {
      var _this3 = this;

      return Promise.resolve(_this3.send({
        smil: smil,
        subject: subject
      }, {
        to: numbers
      }, details));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.sendMmsToGroup = function sendMmsToGroup(groups, subject, smil, details) {
    try {
      var _this5 = this;

      return Promise.resolve(_this5.send({
        smil: smil,
        subject: subject
      }, {
        group: groups
      }, details));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return Mms;
}(BaseMessageModule);

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

var Sms = /*#__PURE__*/function (_BaseMessageModule) {
  _inheritsLoose(Sms, _BaseMessageModule);

  function Sms() {
    var _this;

    _this = _BaseMessageModule.apply(this, arguments) || this;
    _this.endpoint = '/sms.do';
    return _this;
  }

  var _proto = Sms.prototype;

  _proto.sendSms = function sendSms(numbers, message, details) {
    try {
      var _this3 = this;

      return Promise.resolve(_this3.send({
        message: message
      }, {
        to: numbers
      }, details));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.sendFlashSms = function sendFlashSms(numbers, message, details) {
    try {
      var _this5 = this;

      return Promise.resolve(_this5.sendSms(numbers, message, _extends({}, details, {
        flash: true
      })));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.sendSmsToGroup = function sendSmsToGroup(groups, message, details) {
    try {
      var _this7 = this;

      return Promise.resolve(_this7.send({
        message: message
      }, {
        group: groups
      }, details));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.sendFlashSmsToGroup = function sendFlashSmsToGroup(groups, message, details) {
    try {
      var _this9 = this;

      return Promise.resolve(_this9.sendSmsToGroup(groups, message, _extends({}, details, {
        flash: true
      })));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.removeScheduledSms = function removeScheduledSms(smsId) {
    try {
      var _this11 = this;

      var ids = isArray(smsId) ? smsId.join(',') : smsId;
      return Promise.resolve(_this11.httpClient.post(_this11.endpoint, {
        format: 'json',
        sch_del: ids
      }));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return Sms;
}(BaseMessageModule);

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
          api_password: credentials.apiPassword,
          password: credentials.password,
          username: credentials.username
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
          api_password: credentials.apiPassword,
          password: credentials.password
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

var Vms = /*#__PURE__*/function (_BaseMessageModule) {
  _inheritsLoose(Vms, _BaseMessageModule);

  function Vms() {
    var _this;

    _this = _BaseMessageModule.apply(this, arguments) || this;
    _this.endpoint = '/vms.do';
    return _this;
  }

  var _proto = Vms.prototype;

  _proto.sendVms = function sendVms(numbers, tts, ttsLector, details) {
    try {
      var _this3 = this;

      return Promise.resolve(_this3.send({
        tts: tts,
        ttsLector: ttsLector
      }, {
        to: numbers
      }, details));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.sendVmsWithLocalFile = function sendVmsWithLocalFile(numbers, pathToLocaleFile, details) {
    try {
      var _this5 = this;

      return Promise.resolve(_this5.send({
        localPath: pathToLocaleFile
      }, {
        to: numbers
      }, details));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.sendVmsWithRemoteFile = function sendVmsWithRemoteFile(numbers, pathToRemoteFile, details) {
    try {
      var _this7 = this;

      return Promise.resolve(_this7.send({
        remotePath: pathToRemoteFile
      }, {
        to: numbers
      }, details));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.sendVmsToGroup = function sendVmsToGroup(groups, tts, ttsLector, details) {
    try {
      var _this9 = this;

      return Promise.resolve(_this9.send({
        tts: tts,
        ttsLector: ttsLector
      }, {
        group: groups
      }, details));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.sendVmsWithLocalFileToGroup = function sendVmsWithLocalFileToGroup(groups, pathToLocaleFile, details) {
    try {
      var _this11 = this;

      return Promise.resolve(_this11.send({
        localPath: pathToLocaleFile
      }, {
        group: groups
      }, details));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.sendVmsWithRemoteFileToGroup = function sendVmsWithRemoteFileToGroup(groups, pathToRemoteFile, details) {
    try {
      var _this13 = this;

      return Promise.resolve(_this13.send({
        remotePath: pathToRemoteFile
      }, {
        group: groups
      }, details));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return Vms;
}(BaseMessageModule);

var version = "2.0.0";

var API_URL = 'https://smsapi.io/api';

/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-enable @typescript-eslint/ban-ts-comment */

var SMSAPI = /*#__PURE__*/function () {
  function SMSAPI(accessToken) {
    this.accessToken = accessToken;
    this.httpClient = this.setHttpClient();
    this.contacts = new Contacts(this.httpClient);
    this.hlr = new Hlr(this.httpClient);
    this.mms = new Mms(this.httpClient);
    this.profile = new Profile(this.httpClient);
    this.sendernames = new Sendernames(this.httpClient);
    this.sms = new Sms(this.httpClient);
    this.subusers = new Subusers(this.httpClient);
    this.templates = new Templates(this.httpClient);
    this.vms = new Vms(this.httpClient);
  }

  var _proto = SMSAPI.prototype;

  _proto.getUserAgent = function getUserAgent() {
    return "smsapi/js-client:" + version;
  };

  _proto.setHttpClient = function setHttpClient() {
    var httpClient = axios.create({
      adapter: adapter,
      baseURL: API_URL,
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

exports.SMSAPI = SMSAPI;
//# sourceMappingURL=smsapi-javascript-client.cjs.development.js.map
