'use strict';
const express = require('express');
const path = require('path');
const fs = require('fs-extra');
const multer = require('multer');
const Authentication = require('./Authentication');
const Constants = require('./Constants');
const bodyParser = require('body-parser');
const Account = require('./models/Account');
const GrupoAcesso = require('./models/GrupoAcesso');
const Connection = require('./models/Connection');
const session = require('express-session')

class Server {
  constructor() {
    this.authenticantion = new Authentication();
    this.express = new express();
    this.parseUrlencoded = bodyParser.urlencoded({ extended: false });
    this.indexPage = path.join(__dirname, 'views', 'index.ejs');
    this.connection = new Connection();
    this.account = new Account();
    this.grupoAcesso = new GrupoAcesso();
    this.initialize();
  }

  initialize() {

    this.express.use(session({
      secret: Constants.SECRET_KEY,
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false },
      maxAge: 1800000
    }));

    //View engine
    this.express.set('view engine', 'ejs');
    this.express.use(express.static(path.join(__dirname, '..', 'vendor')));

    //Authentication router
    this.express.use(this.authenticantion.authenticate.bind(this));
    this.express.post('/authenticate', this.parseUrlencoded, this.authenticantion.post.bind(this));
    this.express.post('/verify-account', this.parseUrlencoded, this.authenticantion.verifyAccount.bind(this));

    this.express.get('/', (request, response) => {
      response.render(this.indexPage);
    });

    this.express.listen(3000);

  }


}

new Server();
