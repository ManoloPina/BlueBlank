'use strict';

 class TransferController extends React.Component {

   constructor(props) {
     super(props);
     this.state = {};
     this.state.selectedtUser = 'origem';
     this.state.showOrigin = false;
     this.state.showDestiny = false;
     this.state.originAgency;
     this.state.originAccount;
     this.state.destinyAgency;
     this.state.destinyAccount;
     this.state.alertMessage = '';
   }

   componentDidMount() {
     this.$alert.hide();
     this.$inputAgency.mask('9999');
     this.$inputAccount.mask('99999-9');
     this.$btnAdd.on('click', this.addAccount.bind(this));
     this.$select.on('change', this.changeUser.bind(this));
   }

   render() {
     return (
       <div className="container transfer-controller">

         <div className="row">

             {this.warningMessage}

             <h3 className="text-primary">Transferência bancária</h3>
             <form className="form-inline">

               <div className="col-sm-12">
                 <div className="form-group">
                   <input type="text" className="form-control agency" ref="agency" placeholder="Agência"/>
                   <input type="text" className="form-control account" ref="account" placeholder="Conta corrente"/>
                   <select defaultValue={this.state.selectedtUser} className="form-control">
                     <option value="origem">Origem</option>
                     <option value="destino">Destino</option>
                   </select>
                   <button className="btn btn-primary add">Adicionar</button>
                 </div>
               </div>

               <div className="col-sm-12">
                 {this.state.showOrigin && this.state.showDestiny ? this.transferBox : ''}
               </div>


             </form>


         </div>

         <div className="row">
           <div className={this.state.showOrigin ? 'col-sm-12' : 'hidden'}>
             {this.originPanel}
           </div>
         </div>


         <div className="row">
           <div className={this.state.showDestiny ? 'col-sm-12' : 'hidden'}>
             {this.destinyPanel}
           </div>
         </div>

       </div>
     );
   }

   addAccount(event) {
     event.preventDefault();
     let agency = this.$inputAgency.val();
     let account = this.$inputAccount.val();
     if(agency && account) {
       if(this.state.selectedtUser == 'origem') {
         this.setState({
           showOrigin: true,
           originAgency: agency,
           originAccount: account
         });
       }

       if(this.state.selectedtUser == 'destino') {
         this.setState({
           showDestiny: true,
           destinyAgency: agency,
           destinyAccount: account
         });
       }
     }
     else {
       this.showAlert('A agência e conta devem ser informados');
     }


   }

   showAlert(message) {
      this.setState({alertMessage: message});
      this.$alert.show();
      setTimeout(() => {
        this.$alert.hide();
      }, 5000);
   }

   changeUser(event) {
     let user = event.target.value;
     this.setState({selectedtUser: user})
   }

   get $btnAdd() {
     return $('.btn.add');
   }

   get $select() {
     return $('select');
   }

   get $inputAgency() {
     return $('input.agency');
   }

   get $inputAccount() {
     return $('input.account');
   }

   get $alert() {
     return $('.alert');
   }

   get transferBox() {
     return  (
       <div className="form-group">
         <input type="text" className="form-control" placeholder="valor"/>
         <button className="btn btn-success">Transferir</button>
       </div>
     );
   }

   get originPanel() {
     return (
       <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Origem</h3>
          </div>
          <div className="panel-body">
            <div className="row">
              <div className="col-sm-6">
                <h5 className="text-info">Agência</h5>
                <p>{this.state.originAgency}</p>
              </div>
              <div className="col-sm-6">
                <h5 className="text-info">conta</h5>
                <p>{this.state.originAccount}</p>
              </div>
            </div>
          </div>
        </div>
     );
   }

   get destinyPanel() {
     return (
       <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Destino</h3>
          </div>
          <div className="panel-body">
            <div className="col-sm-6">
              <h5 className="text-info">Agência</h5>
              <p>{this.state.destinyAgency}</p>
            </div>
            <div className="col-sm-6">
              <h5 className="text-info">conta</h5>
              <p>{this.state.destinyAccount}</p>
            </div>
          </div>
        </div>
     );
   }

   get warningMessage() {
     return (
       <div className="alert alert-warning alert-dismissible fade in" role="alert">
         <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button>
           <p>{this.state.alertMessage}</p>
       </div>
     );
   }

 }

 export default TransferController;
