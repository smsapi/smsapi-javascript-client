import axios from 'axios';
import adapter from 'axios/lib/adapters/http';

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
    if (idx === void 0) {
      idx = '';
    }

    try {
      var _this2 = this;

      return Promise.resolve(_this2.httpClient.get('/hlr.do', {
        params: {
          format: 'json',
          idx: idx || undefined,
          number: numbers.join(',')
        }
      })).then(function (_ref) {
        var data = _ref.data;
        return data;
      });
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

var version = "2.0.0";

/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-enable @typescript-eslint/ban-ts-comment */

var SMSAPI = /*#__PURE__*/function () {
  function SMSAPI(accessToken, apiUrl) {
    this.accessToken = accessToken;
    this.apiUrl = apiUrl;
    this.httpClient = this.setHttpClient();
    this.hlr = new Hlr(this.httpClient);
    this.profile = new Profile(this.httpClient);
  }

  var _proto = SMSAPI.prototype;

  _proto.getUserAgent = function getUserAgent() {
    return "smsapi/js-client:" + version;
  };

  _proto.setHttpClient = function setHttpClient() {
    return axios.create({
      adapter: adapter,
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

export { index as SMSAPI, SMSAPIcom, SMSAPIpl };
//# sourceMappingURL=smsapi-javascript-client.esm.js.map
