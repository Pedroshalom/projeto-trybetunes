import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../Loading';

class Login extends Component {
  state = {
    nome: '',
    loading: false,
    buttonClick: false,
  };

  handleClick = () => {
    this.setState({ buttonClick: true });
    const { nome } = this.state;
    this.setState({ loading: true }, async () => {
      await createUser({ name: nome });
      this.setState({ loading: false });
    });
  };

  render() {
    const { nome, loading, buttonClick } = this.state;
    const numberMin = 3;
    return (
      <div data-testid="page-login">
        {loading === true && (
          <Loading />
        )}
        {
          (!loading && buttonClick) && (
            <Redirect to="/search" />
          )
        }
        Nome:
        <input
          placeholder="Digite seu nome"
          type="text"
          data-testid="login-name-input"
          onChange={ ({ target: { value } }) => this.setState({ nome: value }) }
        />

        <button
          type="button"
          data-testid="login-submit-button"
          onClick={ this.handleClick }
          disabled={ nome.length < numberMin }
        >
          Entrar
        </button>
      </div>
    );
  }
}

export default Login;
