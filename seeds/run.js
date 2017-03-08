'use strict';

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const Constants = require('../app/Constants');

class Seeds {
  constructor() {
    new Promise((resolve, reject) => {
      this.createCollection('conta').then(collection => {
        if(collection) {
          this.insertOne('conta', {
            cpf: `${Math.floor((Math.random() * 999999999) + 100000000)}`,
            numero: `${Math.floor((Math.random() * 999999) + 100000)}`,
            agencia: `${Math.floor((Math.random() * 9999) + 1000)}`,
            senha: `${Math.floor((Math.random() * 9999) + 1000)}`,
            saldo: `${Math.floor((Math.random() * 10000) + -10)}`
          }).then(result => {
            if(result.result.n) {
              console.log('Seed created');
              process.exit();
            }
          });
        }
      });
    });
  }

  connect() {
    return new Promise((resolve, reject) => {
      MongoClient.connect(`${Constants.DB_PATH}`, (err, db) => {
        err ? reject(err) : resolve(db);
      });
    });
  }

  createCollection(collectionName) {
    return new Promise((resolve, reject) => {
      this.connect().then(db => {
        db.createCollection(collectionName, (err, collection) => {
          err ? reject(err) : resolve(collection);
    	   	console.log("Created testCollection");
        });
      });
    });
  }

  insertOne(collection, object) {
    return new Promise((resolve, reject) => {
      this.connect().then(db => {
        db.collection(collection).insertOne(object, (err, result) => {
          result ? resolve(result) : reject(err);
        });
      });
    });
  }



  result(err, result) {
    assert.equal(null, err);
    assert.equal(1,result.insertedCount);
  }

}

new Seeds();
