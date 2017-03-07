'use strict';

import HeaderController from './HeaderController';
import PainelController from './PainelController';
import EstoqueController from './EstoqueController';

class MainController extends React.Component {

  constructor(props) {
    super(props);
    this.estoqueController = new EstoqueController();
    this.state = {};
    this.state.view = <PainelController/>;
  }

  componentDidMount() {
    this.$navbar.find('li').on('click', this.setView.bind(this));
  }

  render() {
    return (
      <div>
        <HeaderController/>
        {this.state.view}
      </div>
    );
  }

  setView(event) {
    let controller = $(event.target).data('view');
    console.log('controller', controller);
    this.setState({view: this[controller].component});
  }

  get $navbar() {
    return $('.navbar');
  }

}

if($('#main-controller').get(0)) {
  ReactDOM.render(<MainController/>, $('#main-controller').get(0));
}
