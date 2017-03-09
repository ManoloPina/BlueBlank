'use strict';

const path = require('path');
const Bcrypt = require('bcrypt');
const fs = require('fs-extra');

class Authentication {

  constructor() {
  }

  authenticate(request, response, next) {
    if(request.url != '/authenticate' && request.url != '/verify-account'  && !request.session.userId) {
      response.render(path.join(__dirname, 'views', 'authentication.ejs'));
    }
    next();
  }

  post(request, response) {

    let agencia = request.body.agencia;
    let numero = request.body.numero;
    let password = request.body.senha;
    console.log('agencia', agencia, 'numero', numero, 'senha', password);
    this.account.find({agencia: agencia, numero: numero}).then(data => {

      if(data.length > 0) {
        Bcrypt.compare(password, data[0].senha, (err, result) => {
          if(result) {
            request.session.userId = data[0]._id;
            response.json({userId: data[0]._id, redirect: '/'});
          }else {
            response.json({message: 'Senha incorreta'});
          }

        });
      } else {
        response.json({message: 'Usuário não encontrado'});
      }

    });
  }

  verifyAccount(request, response) {
    let agencia = request.body.agencia;
    let conta = request.body.conta;
    this.account.find({agencia: agencia, numero: conta})
    .then(result => {
      response.json(result);
    });
  }


}

module.exports = Authentication;
