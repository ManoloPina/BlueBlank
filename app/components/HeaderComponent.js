'use strict';

const Helpers = require('../Helpers');
const _ = require('underscore');

class HeaderComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    return (
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="/">BlueBank</a>
          </div>
          <ul className="nav navbar-nav menu">
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

}

export default HeaderComponent;
