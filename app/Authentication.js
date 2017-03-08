'use strict';

const path = require('path');
const Bcrypt = require('bcrypt');
const fs = require('fs-extra');

class Authentication {

  constructor() {
  }

  authenticate(request, response, next) {
    if(request.url != '/authenticate' || request.url != '/verify-account'  && !request.session.userId) {
      response.render(path.join(__dirname, 'views', 'authentication.ejs'));
    }
    next();
  }


  post(request, response) {

    let userEmail = request.body.email;
    let password = request.body.password;

    this.users.find({email: userEmail}).then(data => {

      if(data.length > 0) {
        Bcrypt.compare(password, data[0].senha, (err, result) => {
          if(result) {
            request.session.userId = data[0]._id;
            this.grupoAcesso.find({nome: data[0].grupo}).then(grupo => {
              request.session.modulos = grupo[0].modulos;
              response.json({
                message: 'Usuário logado',
                modulos: grupo[0].modulos,
                redirect: '/'
              });
            });
          }else {
            response.json({message: 'Senha incorreta'});
          }

        });
      } else {
        response.json({message: 'Usuário não encontrado'});
      }

    });
  }

  verifyAccount(request, reponse) {
    response.json('checando usuário');
  }


}

module.exports = Authentication;
