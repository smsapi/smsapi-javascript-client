# SMSAPI JavaScript (node.js) Client

[![npm version](https://badge.fury.io/js/smsapi.svg)](http://badge.fury.io/js/smsapi)

Klient JavaScript pozwalający na wysyłanie wiadomości SMS, MMS, VMS oraz zarządzanie kontem w serwisie SMSAPI.pl

## Instalacja (node.js)

```bash

$ npm install smsapi --save

```

## Przykład użycia

```javascript

var SMSAPI = require('smsapi'),
    smsapi = new SMSAPI();

smsapi.authentication
    .login('username', 'password')
    .then(sendMessage)
    .then(displayResult)
    .catch(displayError);

function sendMessage(){
    return smsapi.message
        .sms()
        .from('Info')
        .to('605xxxxxx')
        .message('My first message!')
        .execute(); // return Promise
}

function displayResult(result){
    console.log(result);
}

function displayError(err){
    console.error(err);
}

```

## Przykład wykorzystania serwera zapasowego

```javascript

var SMSAPI = require('smsapi'),
    smsapi = new SMSAPI({
	server: ‘https://api2.smsapi.pl/'
});

smsapi.authentication
    .login('username', 'password')
    .then(sendMessage)
    .then(displayResult)
    .catch(displayError);

function sendMessage(){
    return smsapi.message
        .sms()
        .from('Info')
        .to('605xxxxxx')
        .message('My first message!')
        .execute(); // return Promise
}

function displayResult(result){
    console.log(result);
}

function displayError(err){
    console.error(err);
}

```

# Dokumentacja

Dokumentacja interfejsu REST API znajduje się pod adresem [http://www.smsapi.pl/rest](http://www.smsapi.pl/rest).

Wszystkie odwołania do API zwracają obiekt `Promise` zgodny ze standardem [Promises/A+](https://promisesaplus.com). Użyta implementacja: https://github.com/tildeio/rsvp.js

## Dostępne operacje

* message
    * sms
    * mms
    * vms
* points
    * get
* sender
    * add
    * delete
    * status
    * default
    * list
* hlr
    * check
* user
    * add
    * delete
    * update
    * get
    * list
* phonebook (deprecated)
    * contact
        * add
        * get
        * update
        * list
        * delete
    * group
        * get
        * add
        * update
        * list
        * delete
* contacts
    * list
    * add
    * get
    * update
    * delete
    * fields
        * list
        * add
        * update
        * delete
    * groups
        * list
        * add
        * get
        * update
        * delete
        * assignments
            * list
            * add
            * get
            * delete
        * permissions
            * list
            * add
            * get
            * update
            * delete
        * members
            * add
            * get
            * delete

## Przykłady

Dodatkowe przykłady użycia dostępnych operacji można znaleźć w testach (./test).

## Testy

```bash

$ npm install mocha -g
$ npm install .
$ npm test

```

# Licencja

[Apache 2.0 License](LICENSE)
