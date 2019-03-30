import React, { Component } from 'react';
import Movie from './Movie';
 
class AllMovies extends Component {
  render() {
    return (
      <div className="list">
      <h1>Movie-list:</h1> 
        {this.props.allmovies.map(m=> <Movie  refresh={this.props.refresh}  key={m.ID} currentMovie={m}  />)}
      </div>
    );
  }
}

export default AllMovies;
