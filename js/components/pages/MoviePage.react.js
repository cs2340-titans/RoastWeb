/**
 * Created by andy on 3/6/16.
 */
import React, { Component } from 'react';
import { Link } from 'react-router';
import MovieCard from '../MovieCard.react';
import CircularProgress from 'material-ui/lib/circular-progress';
import RT from '../../sources/RottenTomato';

class MoviePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      movie: null
    };
    RT.movieDetails(props.params.movieTitle).then(obj => {
      this.state.movie = obj.data.movies[0];
      this.state.loaded = true;
      this.setState({loaded: true});
    })
  }

  render() {
    return (
      <div>
        {(()=> {
          if (this.state.loaded) {
            return <MovieCard movie={this.state.movie}
                              movieId={this.props.params.movieId}
                              movieTitle={this.props.params.movieTitle} />;
          } else {
            return <CircularProgress size={2}/>;
          }
        })()}
      </div>
    );
  }
}

export default MoviePage;