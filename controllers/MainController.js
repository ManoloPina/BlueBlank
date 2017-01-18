'use strict';

import TransferController from './TransferController';

class MainController extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <TransferController/>
    );

  }
}

ReactDOM.render(<MainController/>, $('main').get(0));
