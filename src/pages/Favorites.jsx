import React from 'react';
import Header from '../components/Header';

class Favorites extends React.Component {
  render() {
    return (
      <>
        <Header />
        <div className="content-favorite" data-testid="page-favorites" />
      </>
    );
  }
}

export default Favorites;
