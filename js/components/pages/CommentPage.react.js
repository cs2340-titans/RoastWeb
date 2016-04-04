/**
 * Created by andy on 3/6/16.
 */
import React, { Component } from 'react';
import { Link } from 'react-router';
import CommentCard from '../CommentCard.react';
import CircularProgress from 'material-ui/lib/circular-progress';
import RT from '../../sources/RottenTomato';

class CommentPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <CommentCard movieId={this.props.params.movieId}
                   movieTitle={this.props.params.movieTitle} />
    );
  }
}

export default CommentPage;