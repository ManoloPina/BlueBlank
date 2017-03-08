'use strict';

class Constants {

  static get SECRET_KEY() {
    return "Gh5=:2(gF)85DhEB3mM[&-5<VJ[htX^K";
  }

  static get DB_PATH() {
    return "mongodb://localhost:27017/blue_bank";
  }

  static get baseUrl() {
    return 'http://localhost:3000';
  }

}

module.exports = Constants;
