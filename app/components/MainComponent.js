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
        <HeaderController/>
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
  ReactDOM.render(<MainComponent/>, $('#main-controller').get(0));
}
