import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import RaisedButton from 'material-ui/lib/raised-button';
import CardText from 'material-ui/lib/card/card-text';
import TextField from 'material-ui/lib/text-field';
import {browserHistory, firebaseRef} from '../app';
import LinkStateMixin from 'react-addons-linked-state-mixin';
import CircularProgress from 'material-ui/lib/circular-progress';
var reactMixin = require('react-mixin');
import Divider from 'material-ui/lib/divider';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import Slider from 'material-ui/lib/slider';
import RT from '../sources/RottenTomato';
import MovieList from './MovieList.react';

class NewReleases extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      list: []
    };
    this.load("releases");
  }

  load = (type) => {
    if (type == "releases") {
      RT.recentMovie().then((result) => {
        this.setState({
          loaded: true,
          list: result.movies
        });
      })
    }
    if (type == "dvds") {
      RT.recentDvd().then((result) => {
        this.setState({
          loaded: true,
          list: result.movies
        });
      })
    }
  };

  handleOpen = (movieId) => {

  };

  handleActive = (tab) => {
    this.setState({loaded: false});
    this.load(tab.props.route);
  };

  render = () => {
    return (
      <Tabs>
        <Tab label="Latest Releases"
             route="releases"
             onActive={this.handleActive}>
          <List>

            {(() => {
              if (this.state.loaded) {
                return <MovieList movies={this.state.list} />
              } else {
                return (<CircularProgress size={2} />);
              }
            })()}
          </List>
        </Tab>
        <Tab label="Latest DVDs"
             route="dvds"
             onActive={this.handleActive}>
          <List>

            {(() => {
              if (this.state.loaded) {
                return this.state.list.map((m, i) => {
                  if (i != this.state.list.length - 1) {
                    return (<div key={i}>
                      <ListItem primaryText={m.title} />
                      <Divider />
                    </div>);
                  } else {
                    return (<div key={i}>
                      <ListItem primaryText={m.title} />
                    </div>);
                  }
                });
              } else {
                return (<CircularProgress size={2} />);
              }
            })()}
          </List>
        </Tab>
      </Tabs>
    );
  }
};
export default NewReleases;