import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { searchGames } from '../../actions';
import * as api from '../../helper/bg-api-cleaner';
import './Search.css';

export class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
      search: '',
      game: {}
    }
  }

  handleChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    this.triggerSearch(this.state.search);
    this.setState({search: ''})
  }

  triggerSearch = async (string) => {
    const search = string.toLowerCase().split(' ').join('+');
    const result = await api.fetchBoardGames(`https://cors-anywhere.herokuapp.com/www.boardgamegeek.com/xmlapi2/search?query=${search}`)
    const games = api.cleanSearch(result);
    this.setState({ games });  
  }

  handleChooseGame = async (gameSelected) => {
    const { id, name } = gameSelected;
    const result = await api.fetchBoardGames(`https://cors-anywhere.herokuapp.com/https://www.boardgamegeek.com/xmlapi2/thing?id=${id}`);
    const game = {...api.cleanGameDetails(result)[0], name};
    this.setState({game})
  }

  displayAllGames = () => {
    return this.state.games.length 
      ? this.state.games.map((game, index) => <h3 key={index} onClick={() => this.handleChooseGame(game)}>{game.name}</h3> )
      : <h4> No search results currently </h4>
  }

  displayGame = () => {
    return this.state.game.thumbnail 
    ?  <article className="game-description">
        <img src={this.state.game.thumbnail} alt="game-icon" />
        <div>
          <h4>{this.state.game.name}</h4>
          <p>{this.state.game.description}</p>
        </div>
      </article>
    : <div></div>
  }

  render() {
    return (
      <section className='Search'>
        <h1>Search for Games</h1>
        <form onSubmit={this.handleSubmit}>
          <input 
            type="text"
            name="search"
            placeholder="Search for board games"
            value={this.state.search}
            onChange={this.handleChange}
          />
          <button type="submit">Search</button>
        </form>
        <section className='search-results'>
          { this.displayAllGames() }
        </section>
        { this.displayGame() }
      </section>
    )
  }
}

export default Search;