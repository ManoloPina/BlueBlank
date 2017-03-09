'use strict';

import HeaderComponent from './HeaderComponent';

class MainComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.$navbar.find('li').on('click', this.setView.bind(this));
  }

  render() {
    return (
      <div>
        <HeaderComponent/>
        <div className="row">
          <div className="col-sm-12">
            <h1>Transferências</h1>  
          </div>
        </div>
      </div>
    );
  }

  setView(event) {
    let controller = $(event.target).data('view');
    this.setState({view: this[controller].component});
  }

  get $navbar() {
    return $('.navbar');
  }

}

if($('#main-controller').get(0)) {
  ReactDOM.render(<MainComponent/>, $('#main-controller').get(0));
}
