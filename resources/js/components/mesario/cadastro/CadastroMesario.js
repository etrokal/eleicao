import React, { Component } from "react";
import ReactDOM from "react-dom";

class CadastroMesario extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }

  }


  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">Example Component</div>

              <div className="card-body">I'm an example component!</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Example;

if (document.getElementById("cadastro-mesario-app")) {
  ReactDOM.render(<CadastroMesario />, document.getElementById("cadastro-mesario-app"));
}
