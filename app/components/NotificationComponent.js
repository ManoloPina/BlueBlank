'use strict';

class NotificationComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.hidden = true;
    this.state.type = 'info';
    this.state.message = 'Message here';
  }

  componentDidMount() {
  }
 
  render() {
    return (
     <div className="row">
       <div className="col-xs-12">
         <div className={'alert'+' alert-'+this.state.type} role="alert" hidden={this.state.hidden}>{this.state.message}</div>
       </div>    
     </div>
    );
  }

  add(message, type) {
    this.setState({hidden: false});
    this.setState({type: type});
    this.setState({message: message});
				setTimeout(() => {
					this.remove();
				}, 5000);
  }

  remove() {
    this.setState({hidden: true});   
  }
}

export default NotificationComponent;
