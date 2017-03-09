'use strict';
const Constants = require('../Constants');
const Validator = require('validator');
import HeaderComponent from './HeaderComponent';
import NotificationComponent from './NotificationComponent';

class MainComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.state.agencia;
    this.state.conta;
    this.state.saldo;
    this.state.cpf;
  }

  componentDidMount() {
    this.notificationComponent = this.refs.notificationComponent;
    console.log(this.notificationComponent);
    this.$agenciaText.inputmask('9999');
    this.$contaCorrenteText.inputmask('99999-9');
    this.$navbar.find('li').on('click', this.setView.bind(this));
    this.$transferirBtn.on('click', this.transferAmount.bind(this));
    this.getAccountData();
  }

  transferAmount(event) {
    event.preventDefault();

    let agencia = this.$agenciaText.val();
    let conta = this.$contaCorrenteText.val().replace('-', '');
    let valor = this.$valorText.val();
    let url = `${Constants.baseUrl}/account/transfer`;

    $.ajax({
      url: url,
      data: {agencia: agencia, conta: conta, valor: valor},
      type: 'post'
    }).done(response => {
      this.notificationComponent.add(response.message, response.type);
    })
    .fail(err => {
      console.log('err', err);
      this.notificationComponent.add(`Erro: ${err.responseText}`, 'danger');
    });
  }

  getAccountData(event) {
    return new Promise((resolve, reject) => {
      let url = `${Constants.baseUrl}/account/get`;
      let userId = this.userId;
      $.ajax({
        url: url,
        data: {userId:  userId},
        type: 'post'  
      }).done(response => {
        console.log(response);
        let conta = `${response[0].numero.charAt(response[0].numero.length-1)}`;
        console.log('conta', conta);
        this.setState({
          agencia: response[0].agencia,
          conta: response[0].numero,
          saldo: response[0].saldo,
          cpf: response[0].cpf
        });
      }).fail(err => {
        console.log('erro', err);
      });
    });
  }

  render() {
    return (
      <div>
        <HeaderComponent/>
        <div className="container">
          <NotificationComponent ref="notificationComponent"/>
          <h1>Transferências</h1>
          <div className="jumbotron">
            <div className="row info">
              <div className="col-sm-12">
                <p className="lead bg-info"><span className="text-primary">CPF:</span> {this.state.cpf}</p>
              </div>

              <div className="col-sm-6">
                <p className="lead "><span className="text-primary">Agência:</span> {this.state.agencia}</p>
              </div>

              <div className="col-sm-6">
                <p className="lead"><span className="text-primary">Conta:</span> {this.state.conta}</p>
              </div>

              <div className="col-sm-12">
                  <p className="lead"><span className="text-primary">saldo:</span> {this.state.conta}</p>
              </div>
            </div>

            <form>
              <h4>Favorecido</h4>
              <div className="row">
                <div className="form-group col-sm-4">
                  <label>Agência</label>
                  <input className="form-control" type="text" ref="agenciaText" defaultValue="4895"/>
                </div>
                
                <div className="form-group col-sm-4">
                  <label>Conta</label>
                  <input className="form-control" type="text" ref="contaCorrenteText" defaultValue="111438"/>
                </div>

                <div className="form-group col-sm-4">
                  <label>Valor:</label>
                  <input className="form-control" type="text" ref="valorText" />
                </div>
                <div className="col-xs-12">
                  <button className="btn btn-success btn-block" ref="transferirBtn">Transferir</button>
                </div>
              </div>
            </form>

          </div>
        </div>
      </div>
    );
  }

  setView(event) {
    let controller = $(event.target).data('view');
    this.setState({view: this[controller].component});
  }

  get userId() {
    return sessionStorage.getItem('userId') ? sessionStorage.getItem('userId') : '';
  }

  get $navbar() {
    return $('.navbar');
  }

  get $agenciaText() {
    return $(this.refs.agenciaText);
  }

  get $contaCorrenteText() {
    return $(this.refs.contaCorrenteText);
  }

  get $valorText() {
    return $(this.refs.valorText);
  }

  get $transferirBtn() {
    return $(this.refs.transferirBtn);
  }

}

if($('#main-controller').get(0)) {
  ReactDOM.render(<MainComponent/>, $('#main-controller').get(0));
}
