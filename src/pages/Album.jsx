import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Carregando from '../Loading';

class Album extends React.Component {
  state = {
    CarregandoTexto: false,
    listaDeMusicas: [],
    artistName: '',
    collectionName: '',
    artworkUrl100: '',
    musicaFavorita: [],
  };

  componentDidMount() {
    this.getlistaDeMusicas();
    this.getListOfFavs();
  }

  updateState = (requestedSongs) => {
    this.setState({ artistName: requestedSongs[0].artistName,
      collectionName: requestedSongs[0].collectionName,
      artworkUrl100: requestedSongs[1].artworkUrl100 });
  };

  getlistaDeMusicas = async () => {
    const { match: { params: { id } } } = this.props;
    const requestedSongs = await getMusics(id);
    this.setState(
      { listaDeMusicas: requestedSongs },
      () => this.updateState(requestedSongs),
    );
  };

  getListOfFavs = async () => {
    this.setState({ CarregandoTexto: true });
    const muscasFavoritas = await getFavoriteSongs();
    this.setState({ CarregandoTexto: false,
      musicaFavorita: muscasFavoritas });
  };

  render() {
    const { listaDeMusicas, artistName,
      collectionName, artworkUrl100,
      CarregandoTexto, musicaFavorita } = this.state;
    if (CarregandoTexto) return <Carregando />;
    return (
      <div data-testid="page-album">
        <Header />
        <section>
          <div>
            <img alt="album cover" src={ artworkUrl100 } />
            <h3 data-testid="album-name">{`${collectionName}`}</h3>
            <p data-testid="artist-name">{`By ${artistName}`}</p>

          </div>
          <div>
            {
              listaDeMusicas.flatMap((song) => song.kind === 'song'
            && <MusicCard { ... song } favList={ musicaFavorita } />)
            }
          </div>
        </section>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.string.isRequired,
  }).isRequired,
};

export default Album;
