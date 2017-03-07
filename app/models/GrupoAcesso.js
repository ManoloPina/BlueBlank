'use strict';

const Connection = require('./Connection');

class GrupoAcesso extends Connection {

  constructor() {
    super();
  }

  find(query, sortObject = {}) {
    return new Promise((resolve, reject) => {
      this.findDocuments('grupo_acesso', query, sortObject).then(data => {
        resolve(data);
      });
    });
  }

}

module.exports = GrupoAcesso;
