import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  state = {
    artist: '',
    albums: [],
    search: '',
    ButtonDisabled: true,
    loading: false,
  };

  handlechange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    }, () => {
      const { artist } = this.state;
      if (artist.length > 1) {
        this.setState({ ButtonDisabled: false });
      }
    });
  };

  handleclick = () => {
    const { artist } = this.state;
    this.setState(
      { loading: true, search: artist },
      async () => {
        const albums = await searchAlbumsAPI(artist);
        this.setState({
          albums,
          artist: '',
          loading: false,
        });
      },

    );
  };

  render() {
    const {
      artist, albums, search, ButtonDisabled, loading } = this.state;
    return (
      <>
        <Header />
        {loading ? <Loading /> : (
          <div>
            <input
              type="text"
              name="artist"
              placeholder="Digite o nome da banda"
              data-testid="search-artist-input"
              value={ artist }
              onChange={ this.handlechange }
            />
            <button
              type="submit"
              data-testid="search-artist-button"
              disabled={ ButtonDisabled }
              onClick={ this.handleclick }
            >
              Pesquisar
            </button>
          </div>
        )}
        <div>
          {!albums.length ? 'Nenhum álbum foi encontrado' : (
            <div>
              <p>{`Resultado para: ${search}`}</p>
              {albums.map(({
                artistName,
                collectionId,
                collectionName,
                collectionPrice,
                artworkUrl100,
                releaseDate,
                trackCount,
              }) => (
                <div key={ collectionId }>
                  <img src={ artworkUrl100 } alt={ artistName } />
                  <h4>{ artistName }</h4>
                  <p>{ collectionPrice }</p>
                  <p>{ releaseDate }</p>
                  <p>{ trackCount }</p>
                  <Link
                    to={ `/album/${collectionId}` }
                    data-testid={ `link-to-album-${collectionId}` }
                  >
                    {collectionName}
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </>
    );
  }
}

export default Search;
