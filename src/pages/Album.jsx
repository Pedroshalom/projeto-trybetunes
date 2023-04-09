import React, { Component } from 'react';
import { shape, string } from 'prop-types';
import getMusics from '../services/musicsAPI';

import Header from '../components/Header';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  state = {
    selectedAlbum: [],
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.setState({ selectedAlbum: await getMusics(id) });
  }

  render() {
    const { selectedAlbum } = this.state;
    return (
      <>
        <Header />
        <main data-testid="page-album">
          <MusicCard selectedAlbum={ selectedAlbum } />
        </main>
      </>
    );
  }
}

Album.propTypes = {
  match: shape,
  params: shape,
  id: string,
}.isRequired;

export default Album;
