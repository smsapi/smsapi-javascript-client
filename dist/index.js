
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./smsapi-javascript-client.cjs.production.min.js')
} else {
  module.exports = require('./smsapi-javascript-client.cjs.development.js')
}
