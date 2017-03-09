'use strict';

const Connection = require('./Connection');

class Account extends Connection {

  constructor() {
    super();
    this.collection = 'conta';
  }

  find(query, sortObject = {}) {
    return new Promise((resolve, reject) => {
      this.findDocuments(this.collection, query, sortObject).then(data => {
        resolve(data);
      });
    });
  }

  update(query, object) {
    return new Promise((resolve, reject) => {
      this.updateDocument(this.collection, query, object).then(result => {
        resolve(result);
      });
    });
  }

}

module.exports = Account;
