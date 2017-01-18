'use strict';

 const React = require('react');
 const ReactDOM = require('react-dom');
 const $ = require('jquery');

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

 ReactDOM.render(<TransferController/>, $('.render-container')[0]);
