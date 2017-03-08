'use strict';

const Connection = require('./Connection');

class Account extends Connection {

  constructor() {
    super();
  }

  find(query, sortObject = {}) {
    return new Promise((resolve, reject) => {
      this.findDocuments('conta', query, sortObject).then(data => {
        resolve(data);
      });
    });
  }

}

module.exports = Account;
