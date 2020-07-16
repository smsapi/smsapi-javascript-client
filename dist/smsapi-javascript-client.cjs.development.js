'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var axios = _interopDefault(require('axios'));

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

var BaseModule = function BaseModule(httpClient) {
  this.httpClient = httpClient;
};

var Profile = /*#__PURE__*/function (_BaseModule) {
  _inheritsLoose(Profile, _BaseModule);

  function Profile() {
    return _BaseModule.apply(this, arguments) || this;
  }

  var _proto = Profile.prototype;

  _proto.get = function get() {
    try {
      var _this2 = this;

      return Promise.resolve(_this2.httpClient.get('/profile')).then(function (_ref) {
        var data = _ref.data;
        return {
          email: data.email,
          name: data.name,
          paymentType: data.payment_type,
          phoneNumber: data.phone_number,
          userType: data.user_type,
          username: data.username,
          points: data.points
        };
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return Profile;
}(BaseModule);

var version = "1.7.1";

var SMSAPI = /*#__PURE__*/function () {
  function SMSAPI(accessToken, apiUrl) {
    this.accessToken = accessToken;
    this.apiUrl = apiUrl;
    this.httpClient = this.setHttpClient();
    this.profile = new Profile(this.httpClient);
  }

  var _proto = SMSAPI.prototype;

  _proto.getUserAgent = function getUserAgent() {
    return "smsapi/js-client:" + version;
  };

  _proto.setHttpClient = function setHttpClient() {
    return axios.create({
      baseURL: this.apiUrl,
      headers: {
        Accept: 'application/json',
        Authorization: "Bearer " + this.accessToken,
        'User-Agent': this.getUserAgent()
      }
    });
  };

  return SMSAPI;
}();

var SMSAPIcom = /*#__PURE__*/function (_SMSAPI) {
  _inheritsLoose(SMSAPIcom, _SMSAPI);

  function SMSAPIcom(accessToken) {
    return _SMSAPI.call(this, accessToken, 'https://api.smsapi.com') || this;
  }

  return SMSAPIcom;
}(SMSAPI);

var SMSAPIpl = /*#__PURE__*/function (_SMSAPI) {
  _inheritsLoose(SMSAPIpl, _SMSAPI);

  function SMSAPIpl(accessToken) {
    return _SMSAPI.call(this, accessToken, 'https://api.smsapi.pl') || this;
  }

  return SMSAPIpl;
}(SMSAPI);

exports.SMSAPIcom = SMSAPIcom;
exports.SMSAPIpl = SMSAPIpl;
//# sourceMappingURL=smsapi-javascript-client.cjs.development.js.map
