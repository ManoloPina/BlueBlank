'use strict';
const Constants = require('../Constants');
import HeaderComponent from './HeaderComponent';
import Validator from 'validator';
import NotificationComponent from './NotificationComponent';

class AuthenticationComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.state.alertMessage;
    this.state.acessoText = 'Acesso';
  }

  componentDidMount() {
    this.notificationComponent = this.refs.notificationComponent;
    this.$agenciaText.inputmask('9999');
    this.$contaCorrenteText.inputmask('99999-9');
    this.$alertBox.hide();
    this.$checkAccountBtn.on('click', this.checkAccount.bind(this));
    this.$cancelBtn.on('click', this.cancelAccess.bind(this));
    this.$passwordBtn.on('click', this.login.bind(this));
  }

  cancelAccess(event) {
    event.preventDefault();
    this.$passwordBox.addClass('hide');
    this.$contaBox.removeClass('hide');
  }

  checkAccount(event) {
    event.preventDefault();
    let agencia = this.$agenciaText.val();
    let conta = this.$contaCorrenteText.val().replace('-', '');
    if(!Validator.isEmpty(agencia) && !Validator.isEmpty(conta)) {
      let url = `${Constants.baseUrl}/verify-account`;
      new Promise((resolve, reject) => {
        this.setState({acessoText: ''});
        this.$checkAccountBtn.attr('disabled', 'disabled');
        this.$checkAccountBtn.append(this.loaderIcon);
        resolve();
      }).then(() => {
        return new Promise((resolve, reject) => {
          $.ajax({
            url: url,
            data: {agencia: agencia, conta: conta},
            type: 'post'
          })
          .done(response => {
            console.log('response', response);
            this.$checkAccountBtn.find('svg').remove();
            this.$checkAccountBtn.removeAttr('disabled');
            this.setState({acessoText: 'Acesso'});
            if(response.length > 0) {
              this.$passwordBox.removeClass('hide');
              this.$contaBox.addClass('hide');
            } else {
              this.notificationComponent.add('Conta inexistente', 'warning');
            }
          })
          .fail(err => {
            console.log('err', err);
            this.notificationComponent.add(`Erro: ${err}`, 'danger');
            this.$checkAccountBtn.find('svg').remove();
            this.setState({acessoText: 'Acesso'});
            this.$checkAccountBtn.removeAttr('disabled');
          });
        });
      });
      
    }else {
    
    }
  }

  login() {

    event.preventDefault();

    let agencia = this.$agenciaText.val();
    let conta = this.$contaCorrenteText.val().replace('-', '');
    let password = this.$passwordText.val();

    if (!Validator.isEmpty(password)) {
      let url = `${Constants.baseUrl}/authenticate`;
      $.ajax({
        url: url,
        data: {agencia: agencia, numero: conta, senha: password},
        type: 'post'
      }).done(response => {
        if(response.message) this.notificationComponent.add(`${response.message}`, 'warning');
        sessionStorage.setItem('userId', response.userId);
        if(response.redirect) window.location.replace(response.redirect);
      })
      .fail(err => {
        console.log('err', err);
        this.notificationComponent.add(`Erro: ${err.responseText}`, 'danger');
      });
    } else {
      this.notificationComponent.add('A senha deve ser informada', 'warning');
    }
  }


  render() {
    return (
      <div>
        <HeaderComponent/>
        <div className="container">
          <NotificationComponent ref="notificationComponent"/>
          {this.alertBox}
          <div className="jumbotron">
            {this.loginBox}
          </div>
        </div>
      </div>
    );
  }

  get loginBox() {
    return (
      <form action="/authenticate" method="post">
        <div className="row" ref="contaBox">
          <div className="form-group col-sm-4">
            <input className="form-control" type="text" name="agencia" ref="agenciaText" placeholder="Agência"/>
          </div>
          <div className="form-group col-sm-4">
            <input className="form-control" type="text" ref="$contaCorrenteText" name="conta" placeholder="conta"/>
          </div>
          <div className="form-group col-sm-4">
            <button className="btn btn-primary btn-block" ref="checkAccountBtn">{this.state.acessoText}</button>
          </div>
        </div>

        <div className="row hide" ref="passwordBox">
          <div className="form-group col-sm-8">
            <input className="form-control" type="password" name="password" ref="passwordText" placeholder="Senha"/>
          </div>
          <div className="col-sm-4">
            <div className="btn-group">
              <button className="btn btn-primary" ref="passwordBtn">acesar</button>
              <button className="btn btn-danger" ref="cancelBtn">cancelar</button>
            </div>
          </div>
        </div>

      </form>
    );
  }

  get loaderIcon() {
    return `<svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.0" width="50%" height="20px" viewBox="0 0 128 16" xml:space="preserve"><path fill="#ffffff" d="M6.4,4.8A3.2,3.2,0,1,1,3.2,8,3.2,3.2,0,0,1,6.4,4.8Zm12.8,0A3.2,3.2,0,1,1,16,8,3.2,3.2,0,0,1,19.2,4.8ZM32,4.8A3.2,3.2,0,1,1,28.8,8,3.2,3.2,0,0,1,32,4.8Zm12.8,0A3.2,3.2,0,1,1,41.6,8,3.2,3.2,0,0,1,44.8,4.8Zm12.8,0A3.2,3.2,0,1,1,54.4,8,3.2,3.2,0,0,1,57.6,4.8Zm12.8,0A3.2,3.2,0,1,1,67.2,8,3.2,3.2,0,0,1,70.4,4.8Zm12.8,0A3.2,3.2,0,1,1,80,8,3.2,3.2,0,0,1,83.2,4.8ZM96,4.8A3.2,3.2,0,1,1,92.8,8,3.2,3.2,0,0,1,96,4.8Zm12.8,0A3.2,3.2,0,1,1,105.6,8,3.2,3.2,0,0,1,108.8,4.8Zm12.8,0A3.2,3.2,0,1,1,118.4,8,3.2,3.2,0,0,1,121.6,4.8Z"/><g><path fill="#ffffff" d="M-42.7,3.84A4.16,4.16,0,0,1-38.54,8a4.16,4.16,0,0,1-4.16,4.16A4.16,4.16,0,0,1-46.86,8,4.16,4.16,0,0,1-42.7,3.84Zm12.8-.64A4.8,4.8,0,0,1-25.1,8a4.8,4.8,0,0,1-4.8,4.8A4.8,4.8,0,0,1-34.7,8,4.8,4.8,0,0,1-29.9,3.2Zm12.8-.64A5.44,5.44,0,0,1-11.66,8a5.44,5.44,0,0,1-5.44,5.44A5.44,5.44,0,0,1-22.54,8,5.44,5.44,0,0,1-17.1,2.56Z"/><animateTransform attributeName="transform" type="translate" values="23 0;36 0;49 0;62 0;74.5 0;87.5 0;100 0;113 0;125.5 0;138.5 0;151.5 0;164.5 0;178 0" calcMode="discrete" dur="1170ms" repeatCount="indefinite"/></g></svg>`;
  }

  get alertBox() {
    return (
      <div className="alert alert-warning alert-dismissible" role="alert" ref="alertBox">
        <button type="button" className="close" ref="closeBtn">
          <span>&times;</span>
        </button>
        <strong>{this.state.alertMessage}</strong>
      </div>
    );
  }

  get $contaBox() {
    return $(this.refs.contaBox);
  }

  get $passwordBox() {
    return $(this.refs.passwordBox);
  }

  get $passwordBtn() {
    return $(this.refs.passwordBtn);
  }

  get $cancelBtn() {
    return $(this.refs.cancelBtn);
  }

  get $checkAccountBtn() {
    return $(this.refs.checkAccountBtn);
  }

  get $retrivePassBtn() {
    return $(this.refs.retrivePassBtn);
  }

  get $passwordText() {
    return $(this.refs.passwordText);
  }

  get $agenciaText() {
    return $(this.refs.agenciaText);
  }

  get $contaCorrenteText() {
    return $(this.refs.$contaCorrenteText);
  }

  get $alertBox() {
    return $(this.refs.alertBox);
  }

  get $closeAlertBtn() {
    return $(this.refs.closeBtn);
  }

  get $passwordText() {
    return $(this.refs.passwordText);
  }

}

if($('#authenticate-component').get(0)) {
  ReactDOM.render(<AuthenticationComponent/>, $('#authenticate-component').get(0));
}
