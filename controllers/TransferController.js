'use strict';

 class TransferController extends React.Component {
   constructor(props) {
     super(props);
     console.log("Classe em funcionamento!");
   }

   render() {
     return (
       <h1>Está funcionando!!!</h1>
     );
   }


 }

 new TransferController();

 // ReactDOM.render(<TransferController/>, $('.render-container')[0]);
