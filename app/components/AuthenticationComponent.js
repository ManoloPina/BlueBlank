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
    this.$alertBox.hide();
    this.$loginBtn.on('click', this.login.bind(this));
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
          <h2 className="text-primary">Acesso ao sitema</h2>
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
        <div className="form-group">
          <input className="form-control" type="text" name="email" ref="emailText" placeholder="email"/>
        </div>
        <div className="form-group">
          <input className="form-control" type="password" ref="passwordText" name="password" placeholder="Senha"/>
        </div>
        <div className="form-group">
          <button className="btn btn-success" ref="loginBtn">Login</button>
          <button className="btn btn-primary" ref="retrivePassBtn">Recuperar senha</button>
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

  get $loginBtn() {
    return $(this.refs.loginBtn);
  }

  get $retrivePassBtn() {
    return $(this.refs.retrivePassBtn);
  }

  get $passwordText() {
    return $(this.refs.passwordText);
  }

  get $emailText() {
    return $(this.refs.emailText);
  }

  get $alertBox() {
    return $(this.refs.alertBox);
  }

  get $closeAlertBtn() {
    return $(this.refs.closeBtn);
  }

}

if($('#authenticate-controller').get(0)) {
  ReactDOM.render(<AuthenticationComponent/>, $('#authenticate-controller').get(0));
}
