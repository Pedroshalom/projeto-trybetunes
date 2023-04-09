import React, { Component } from 'react';
import { arrayOf } from 'prop-types';
import { Checkbox } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

import Carregando from './Carregando';

import '../styles/MusicCard.css';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

class MusicCard extends Component {
  state = {
    loading: false,
    favoriteList: [],
  };

  async componentDidMount() {
    this.setState({ favoriteList: await getFavoriteSongs() });
  }

  handleFavorite = async (music) => {
    this.setState({
      loading: true,
    }, async () => {
      const list = await getFavoriteSongs();
      if (!list.some((m) => m.trackId === music.trackId)) {
        await addSong(music);
      } else {
        await removeSong(music);
      }
      this.setState({ loading: false, favoriteList: await getFavoriteSongs() });
    });
  };

  render() {
    const { loading, favoriteList } = this.state;
    const { selectedAlbum } = this.props;

    if (loading) return <Carregando />;
    return (
      <ul className="lista-musicas-album">
        {selectedAlbum.map((music, index) => (
          <li key={ `${music.artistId}-${index}` }>
            {index === 0 && (
              <>
                <img
                  src={ music.artworkUrl100 }
                  alt={ `Nome do álbum: ${music.collectionName}` }
                />
                <p data-testid="artist-name">
                  { `Nome banda/artista: ${music.artistName}` }
                </p>
                <p data-testid="album-name">
                  { `Nome do álbum: ${music.collectionName}` }
                </p>
                <p>{ `Quantidade de músicas: ${music.trackCount}` }</p>
                <p>{ `Preço: USD ${music.collectionPrice}` }</p>
              </>
            )}
            {index > 0 && (
              <>
                <h4>{music.trackName}</h4>
                <section className="card-musica-checkbox">
                  <audio data-testid="audio-component" src={ music.previewUrl } controls>
                    <track kind="captions" />
                    O seu navegador não suporta o elemento
                    {' '}
                    <code>audio</code>
                    .
                  </audio>
                  <Checkbox
                    { ...label }
                    icon={ <FavoriteBorder /> }
                    checkedIcon={ <Favorite /> }
                    type="checkbox"
                    data-testid={ `checkbox-music-${music.trackId}` }
                    id={ `favorita-${index}` }
                    onChange={ () => this.handleFavorite(music) }
                    checked={ favoriteList.some((m) => m.trackId === music.trackId) }
                    color="error"
                  />
                </section>
              </>
            )}
          </li>
        ))}
      </ul>
    );
  }
}

MusicCard.propTypes = {
  selectedAlbum: arrayOf,
}.isRequired;

export default MusicCard;
