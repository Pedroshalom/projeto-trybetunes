import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../Loading';

class Header extends React.Component {
  state = {
    clientName: '',
    loading: false,
  };

  componentDidMount() {
    this.getUsername();
  }

  getUsername = async () => {
    this.setState({ loading: true });
    const userInfo = await getUser();
    this.setState({
      clientName: userInfo,
      loading: false,
    });
  };

  render() {
    const {
      clientName,
      loading,
    } = this.state;
    return (
      <header data-testid="header-component">
        <p data-testid="header-user-name">
          { loading ? <Loading /> : `${clientName.name}, você está logado` }
          <Link data-testid="link-to-search" to="/search">Search</Link>
          <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
          <Link data-testid="link-to-profile" to="/profile">Profile</Link>
        </p>

      </header>
    );
  }
}

export default Header;
