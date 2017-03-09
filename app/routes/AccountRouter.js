'use strict';

const ObjectID = require('bson-objectid');

class AccountRouter {
  constructor() {
  }

  getAccount(request, response) {
    let userId = request.body.userId;
    console.log('userId', userId);
    this.account.find({_id: ObjectID(userId)})
    .then(result => {
      response.json(result);
    });
  }

  transferAmount(request, response) {
    let userId = request.session.userId;
    console.log('userId', userId);
    let agencia = request.body.agencia;
    let conta = request.body.conta;
    let valor = request.body.valor;
    //Checa favorecido
    console.log('agencia', agencia, 'numero', conta);
    this.account.find({agencia: agencia, numero: conta})
    .then(result => {
      let favorecidoId = result[0]._id;
      let saldoFavorecido = result[0].saldo;
      if(result.length == 0) {
        response.json({message: 'Favorecido não encontrado'});
      }else{
        //checa valor disponível
        this.account.find({_id: ObjectID(userId)})
        .then(result => {
          if(result[0].saldo < valor) {
            response.json({message: 'Saldo insuficiente'});
          }else {
            //Atribui ao favorecido
            try {
            this.account.update({_id: ObjectID(favorecidoId)}, {saldo: saldoFavorecido+valor});
            //Subtrai do usuario
            this.account.update({_id: ObjectID(userId)}, {saldo: result[0].saldo-valor});
            response.json({message: 'Transferência concluída com sucesso', type: 'success'});
            }catch(err) {
              response.json({message: 'Ocorreu algum erro na transferência '+err});
            }
          }
        });
      }
    })
    .catch(err => {
      response.json({messagee: `${err}`});
    });
  }

}

module.exports =  AccountRouter;