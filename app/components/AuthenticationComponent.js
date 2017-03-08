'use strict';

import HeaderComponent from './HeaderComponent';
import Validator from 'validator';
const Constants = require('../Constants');
const NotificationSystem = require('react-notification-system');

class AuthenticationComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.state.alertMessage;
    console.log('URL', Constants.baseUrl);
  }

  componentDidMount() {
    this.notificationSystem = this.refs.notificationSystem;
    this.$agenciaText.inputmask('9999');
    this.$contaCorrenteText.inputmask('99999-9');
    this.$alertBox.hide();
    this.$checkAccountBtn.on('click', this.checkAccount.bind(this));
  }

  checkAccount(event) {
    event.preventDefault();
    console.log('Manolo');
    let agencia = this.$agenciaText.val();
    let conta = this.$contaCorrenteText.val();
  }

  login() {

    event.preventDefault();

    let email = this.$emailText.val();
    let password = this.$passwordText.val();
    let emailValidation = !Validator.isEmpty(email) && Validator.isEmail(email);
    let passwordValidation = !Validator.isEmpty(password);

    if (emailValidation && passwordValidation) {
      let url = `${Constants.baseUrl}/authenticate`;
      $.ajax({
        url: url,
        data: {email: email, password: password},
        type: 'post'
      }).done(data => {
        let modulos = sessionStorage.getItem('modulos');
        if(!modulos) sessionStorage.setItem('modulos', data.modulos);
        if(data.redirect) window.location.replace(data.redirect);
      })
      .fail(err => {
        console.log('err', err);
        this.notificationSystem.addNotification({
          message: JSON.stringify(err),
          level: 'error'
        });
      });
    } else {
      this.setState({alertMessage: "Os campos devem ser preenchidos"});
      this.$alertBox.show();
      this.$closeAlertBtn.on('click', () => {this.$alertBox.hide()});
      setTimeout(() => {this.$alertBox.hide()}, 3500);
    }
  }

  render() {
    return (
      <div>
        <HeaderComponent/>
        <div className="container">
          <NotificationSystem ref="notificationSystem"/>
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
        <div className="row">
          <div className="form-group col-sm-4">
            <input className="form-control" type="text" name="agencia" ref="agenciaText" placeholder="Agência"/>
          </div>
          <div className="form-group col-sm-4">
            <input className="form-control" type="text" ref="$contaCorrenteText" name="conta" placeholder="conta"/>
          </div>
          <div className="form-group col-sm-4">
            <button className="btn btn-success btn-block" ref="checkAccountBtn">Acessar</button>
          </div>
        </div>

      </form>
    );
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

}

if($('#authenticate-component').get(0)) {
  ReactDOM.render(<AuthenticationComponent/>, $('#authenticate-component').get(0));
}
