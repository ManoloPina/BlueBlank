'use strict';

 class TransferController extends React.Component {

   constructor(props) {
     super(props);
     this.state = {};
   }

   componentDidMount() {
     this.$btnAdd.on('click', this.addAccount.bind(this));
     console.log('select', this.$select);
     this.$selected.on('change', this.changeUser.bind(this));
   }

   render() {
     return (
       <div className="container transfer-controller">

         <div className="row">

           <div className="col-sm-12">

             <h3 className="text-primary">Transferência bancária</h3>
             <form className="form-inline">
               <div className="form-group">
                 <input type="number" className="form-control" placeholder="Agência"/>
                 <input type="text" className="form-control" placeholder="Conta corrente"/>
                 <select className="form-control">
                   <option value="origem">Origem</option>
                   <option value="destino">Destino</option>
                 </select>
                 <button className="btn btn-default add">Adicionar</button>
               </div>
             </form>

           </div>

         </div>

       </div>
     );
   }

   addAccount(event) {
     event.preventDefault();
     console.log('button clcked');
   }

   changeUser(event) {
     console.log(event.target);
   }

   get $btnAdd() {
     return $('.btn.add');
   }

   get $select() {
     return $('select');
   }

   get originPanel() {
     return (
       <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Origem</h3>
          </div>
          <div className="panel-body">
            Panel content
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
            Panel content
          </div>
        </div>
     );
   }

 }

 export default TransferController;
