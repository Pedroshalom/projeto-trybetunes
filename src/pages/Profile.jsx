import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Button } from '@mui/material';
import { getUser } from '../services/userAPI';

import Carregando from '../components/Carregando';
import Header from '../components/Header';

import '../styles/Profile.css';

class Profile extends Component {
  state = {
    userProfile: {},
    loading: false,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const user = await getUser();
    this.setState({ userProfile: user, loading: false });
  }

  render() {
    const { userProfile, loading } = this.state;

    if (loading) return <Carregando />;

    return (
      <>
        <Header />
        <main data-testid="page-profile" className="conteudo-profile">
          <section>
            <h2 className="titulo-profile">Perfil</h2>
            <Avatar
              src={ userProfile.image }
              alt={ `Foto do usúario: ${userProfile.name}` }
              data-testid="profile-image"
              sx={ { height: 200, width: 200, mx: 'auto', mb: 10 } }
            />
            <label htmlFor="fieldName">
              Nome:
              <p data-testid="header-user-name">{userProfile.name}</p>
            </label>
            <label htmlFor="fieldEmail">
              Email:
              <p>{userProfile.email}</p>
            </label>
            <label htmlFor="fieldDescription">
              Descrição:
              <p className="descricao">{userProfile.description}</p>
            </label>
            <Link to="/profile/edit" className="botao-editar-perfil">
              <Button variant="contained" fullWidth>Editar perfil</Button>
            </Link>
          </section>
        </main>
      </>
    );
  }
}

export default Profile;
