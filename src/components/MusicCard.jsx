import React from 'react';
import PropTypes from 'prop-types';

import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Carregando from '../Loading';

class MusicCard extends React.Component {
  state = {
    CarregandoTexto: false,
    isFavorite: false,
  };

  componentDidMount() {
    this.favorit();
  }

  favorit = () => {
    const { favList, trackId } = this.props;
    if (favList.some((song) => song.trackId === trackId)) {
      this.setState({ isFavorite: true });
    }
  };

  adicionaAosFavoritos = async () => {
    this.setState({ CarregandoTexto: true });
    await addSong(this.props);
    this.setState({ CarregandoTexto: false });
  };

  apagaDosFavoritos = async () => {
    this.setState({ CarregandoTexto: true });
    await removeSong(this.props);
    this.setState({ CarregandoTexto: false });
  };

  handleCheckbox = ({ target: { checked } }) => {
    if (checked === true) {
      this.setState({ isFavorite: true });
      this.adicionaAosFavoritos();
    } else {
      this.setState({ isFavorite: false });
      this.apagaDosFavoritos();
    }
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { CarregandoTexto, isFavorite } = this.state;
    if (CarregandoTexto) return <Carregando />;
    return (
      <div className="musicas">
        <h4>{trackName}</h4>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          Não Encontrado!
          {' '}
          <p>áudio</p>
          .
        </audio>
        <div>
          {' '}
          <label htmlFor="favoriteInput">
            <input
              id="favoriteInput"
              data-testid={ `checkbox-music-${trackId}` }
              type="checkbox"
              onChange={ this.handleCheckbox }
              checked={ isFavorite }
            />
            Favorita
          </label>
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.string.isRequired,
  favList: PropTypes.shape({
    some: PropTypes.func.isRequired,
  }).isRequired,
};

export default MusicCard;
