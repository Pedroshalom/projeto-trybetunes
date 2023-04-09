import React, { Component } from 'react';
import Checkbox from '@mui/material/Checkbox';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { getFavoriteSongs, addSong, removeSong } from '../services/favoriteSongsAPI';

import Carregando from '../components/Carregando';
import Header from '../components/Header';

import '../styles/Favorites.css';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

class Favorites extends Component {
  state = {
    favoriteList: [],
    loading: false,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const list = await getFavoriteSongs();
    this.setState({ loading: false, favoriteList: list });
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

    return (
      <>
        <Header />
        {loading && <Carregando />}
        <ul data-testid="page-favorites" className="lista-musicas-favoritadas">
          {favoriteList.length > 0 && (
            favoriteList.map((music, index) => (
              <li key={ `${music.artistId}-${index}` }>
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
              </li>
            ))
          )}
          {favoriteList.length < 1 && <p>Você ainda não favoritou nenhuma música!</p>}
        </ul>
      </>
    );
  }
}

export default Favorites;
