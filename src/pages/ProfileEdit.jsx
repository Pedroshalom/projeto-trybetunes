import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import { getUser, updateUser } from '../services/userAPI';

import Header from '../components/Header';

import '../styles/ProfileEdit.css';

class ProfileEdit extends Component {
  state = {
    name: '',
    email: '',
    description: '',
    image: '',
    disabledButton: true,
  };

  async componentDidMount() {
    const userProfile = await getUser();
    this.setState({
      name: userProfile.name,
      email: userProfile.email,
      description: userProfile.description,
      image: userProfile.image,
      disabledButton: false,
    });
  }

  handleUserProfile = async ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value }, this.handleButton);
  };

  handleButton = () => {
    const { name, email, description, image } = this.state;
    const reEmail = /\S+@\S+\.\S+/;
    const validEmail = reEmail.test(email);
    if (name !== '' && description !== '' && image !== '' && validEmail) {
      this.setState({ disabledButton: false });
    } else {
      this.setState({ disabledButton: true });
    }
  };

  handleUpdateUser = async () => {
    const { name, email, description, image } = this.state;
    await updateUser({ name, email, description, image });
  };

  render() {
    const { name,
      email, description, image, disabledButton } = this.state;

    return (
      <>
        <Header />
        <main data-testid="page-profile-edit" className="conteudo-editar-perfil">
          <h2 className="titulo-editar-perfil">Atualizar Perfil</h2>
          <form>
            <TextField
              label="Nome"
              variant="filled"
              type="text"
              id="fielName"
              value={ name }
              data-testid="edit-input-name"
              onChange={ this.handleUserProfile }
              name="name"
              size="small"
              sx={ { mb: 3 } }
              fullWidth
            />
            <TextField
              label="E-mail"
              variant="filled"
              type="text"
              id="fielEmail"
              value={ email }
              data-testid="edit-input-email"
              onChange={ this.handleUserProfile }
              name="email"
              size="small"
              sx={ { mb: 3 } }
              fullWidth
            />
            <TextField
              label="URL Foto"
              variant="filled"
              type="text"
              id="fielImage"
              value={ image }
              data-testid="edit-input-image"
              onChange={ this.handleUserProfile }
              name="image"
              size="small"
              sx={ { mb: 3 } }
              fullWidth
            />
            <TextField
              label="Descrição"
              variant="filled"
              type="text"
              id="fielDescription"
              value={ description }
              data-testid="edit-input-description"
              onChange={ this.handleUserProfile }
              name="description"
              size="small"
              sx={ { mb: 3 } }
              rows={ 4 }
              multiline
              fullWidth
            />
            <br />
            <Link to="/profile" className="botao-salvar-perfil">
              <Button
                variant="contained"
                type="button"
                data-testid="edit-button-save"
                disabled={ disabledButton }
                onClick={ this.handleUpdateUser }
                fullWidth
              >
                Salvar
              </Button>
            </Link>
          </form>
        </main>
      </>
    );
  }
}

export default ProfileEdit;
