'use strict';

const Connection = require('./Connection');

class Users extends Connection {

  constructor() {
    super();
  }

  find(query, sortObject = {}) {
    return new Promise((resolve, reject) => {
      this.findDocuments('usuarios', query, sortObject).then(data => {
        resolve(data);
      });
    });
  }

}

module.exports = Users;
