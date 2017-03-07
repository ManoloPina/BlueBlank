'use strict';

import EstoqueController from './EstoqueController';
const Helpers = require('../Helpers');
const _ = require('underscore');

class HeaderController extends React.Component {
  constructor(props) {
    super(props);
    this.estoqueController = new EstoqueController();
  }

  componentDidMount() {
    console.log('modulos', typeof this.modules);
  }

  render() {
    return (
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="/">Toque Mágico ERP</a>
          </div>
          <ul className="nav navbar-nav menu">
            {this.modulesList}
          </ul>
        </div>
      </nav>
    );
  }

  authenticatedView() {
    return (
      <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul className="nav navbar-nav">
          <li className="active">
            <a href="#">Link</a>
          </li>
          <li>
            <a href="#">Link</a>
          </li>
        </ul>
        <form className="navbar-form navbar-right">
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Search"/></div>
        </form>
      </div>
    );
  }

  get modulesList() {
    let enableModules = ['usuarios', 'estoque', 'vendas', 'dispesas'];
    let list = this.modules.map(module => {
      if($.inArray(module, enableModules) != -1) {
        return (
          <div>
            {this[module+'Controller'].menu}
          </div>
        );
      }
      enableModules = _.without(enableModules, module);
    });
    return list;
  }

  get modules() {
    return sessionStorage.getItem('modulos').split(',');
  }

}

export default HeaderController;
