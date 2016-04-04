import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';
import RT from '../sources/RottenTomato';
import MovieList from './MovieList.react';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import {navigateTo} from '../app';
class MovieCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      list: []
    };
  }


  render = () => {
    return (
      <Card style={{maxWidth: 500, margin: "auto", position: "relative"}}>
        <FloatingActionButton style={{position: "absolute", zIndex: 9999, right: 0, top: 270}}
                              onTouchTap={() => {navigateTo('/comment/' + this.props.movieId + '/' + this.props.movieTitle)}}>
          <ContentAdd />
        </FloatingActionButton>
        <CardMedia
          style={{maxHeight: 300, overflow: "hidden"}}
          overlay={<CardTitle title={this.props.movie.title} subtitle={this.props.movie.simplePlot}  />}
        >
          <img src={this.props.movie.urlPoster}  />
        </CardMedia>
        <CardText>
          {this.props.movie.plot}
        </CardText>
        <CardActions>
          <FlatButton label="Comment" onTouchTap={() => {navigateTo('/comment/' + this.props.movieId + '/' + this.props.movieTitle)}} />
        </CardActions>
      </Card>
    );
  }
};
export default MovieCard;