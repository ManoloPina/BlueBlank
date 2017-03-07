'use strict';
class EstoqueController extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <h1>EstoqueController</h1>
      </div>
    );
  }

  get menu() {
    return (
      <li class="dropdown">
        <a href="#" class="dropdown-toggle" data-view="EstoqueController" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Estoque <span class="caret"></span></a>
        <ul className="dropdown-menu">
          <li><a>Inserir</a></li>
          <li><a>Relatório</a></li>
        </ul>
      </li>
    );
  }

  get form() {
  }

  get reportList() {

  }

  get component() {
    return <EstoqueController/>;
  }
}

export default EstoqueController;
