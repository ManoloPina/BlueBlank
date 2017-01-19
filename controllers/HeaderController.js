'use strict';

class HeaderController extends React.Component {

  constructor(props)  {
    super(props);
  }

  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">BlueBlank</a>
          </div>
        </div>
      </nav>
    );
  }

}

ReactDOM.render(<HeaderController/>, $('header').get(0));
