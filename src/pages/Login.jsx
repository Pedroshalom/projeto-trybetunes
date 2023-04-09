import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, TextField, CircularProgress } from '@mui/material';
import { createUser } from '../services/userAPI';
import logo from '../fone.avif';

import '../styles/Login.css';

class Login extends Component {
  state = {
    name: '',
    validName: true,
    loading: false,
    loadingReady: false,
  };

  handleName = ({ target: { value } }) => {
    this.setState({ name: value }, this.handleButton);
  };

  handleButton = () => {
    const { name } = this.state;
    if (name.length > 2) {
      this.setState({ validName: false });
    } else {
      this.setState({ validName: true });
    }
  };

  handleClick = async () => {
    const { name } = this.state;
    this.setState({ loading: true });
    await createUser({ name });
    this.setState({ loading: false, loadingReady: true });
  };

  render() {
    const { name, validName, loading, loadingReady } = this.state;

    return (
      <>
        {loadingReady && <Redirect to="/search" />}
        <form data-testid="page-login" className="formulario-login">
          <img src={ logo } alt="" />
          <h1 className="titulo-login">Music App</h1>
          <TextField
            label="Nome"
            id="outlined-size-small"
            size="small"
            sx={ { width: '80%', mb: 1 } }
            data-testid="login-name-input"
            onChange={ this.handleName }
            value={ name }
          />
          <Button
            variant="contained"
            size="medium"
            sx={ { width: '80%', mb: 5 } }
            data-testid="login-submit-button"
            disabled={ validName }
            onClick={ this.handleClick }
          >
            Entrar
          </Button>
          {loading && <CircularProgress />}
        </form>
      </>
    );
  }
}

export default Login;
