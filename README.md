# SMSAPI JavaScript Client

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
    .then(sendEcoMessage)
    .then(displayResult)
    .catch(displayError);

function sendEcoMessage(){
    return smsapi.message
        .sms()
        .eco()
        .to('605xxxxxx')
        .test()
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

Wszystkie odwołania do API zwracają obiekt `Promise` zgodny ze standardem [Promises/A+](https://promisesaplus.com).

Wykorzystywana implementacja: https://github.com/tildeio/rsvp.js

## Dostępne operacje

* message
    * sms
    * mms
    * vms
* phonebook
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
