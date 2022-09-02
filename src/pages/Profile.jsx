import React from 'react';
import Header from '../components/Header';

class Profile extends React.Component {
  render() {
    return (
      <>
        <Header className="linkk" />
        <div data-testid="page-profile" />
      </>
    );
  }
}

export default Profile;
