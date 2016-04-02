import React from 'react';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import IconButton from 'material-ui/lib/icon-button';
import FontIcon from 'material-ui/lib/font-icon';
import NavigationExpandMoreIcon from 'material-ui/lib/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/lib/menus/menu-item';
import DropDownMenu from 'material-ui/lib/DropDownMenu';
import Card from 'material-ui/lib/card/card';
import RaisedButton from 'material-ui/lib/raised-button';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';
import TextField from 'material-ui/lib/text-field';
import CircularProgress from 'material-ui/lib/circular-progress';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import CardText from 'material-ui/lib/card/card-text';
import {browserHistory, firebaseRef} from '../app';
import RT from '../sources/RottenTomato';
import MovieList from './MovieList.react';

export default class SearchCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      query: "",
      showLoading: false,
      showResults: false,
      movies: []
    };
  }

  changeState(key, event) {
    let obj = {};
    obj[key] = event.target.value;
    this.setState(obj);
  }

  sendQuery = (event) => {
    let query = event.target.value;
    this.setState({showLoading: true});
    RT.search(query).then((result) => {
      this.setState({
        showLoading: false,
        showResults: true,
        movies: result.movies
      });
    })
  };

  render() {
    return (
      <Card>
        <Toolbar>
          <ToolbarGroup float="left">
            <ToolbarTitle text={'Search'}/>
          </ToolbarGroup>
        </Toolbar>
        <CardText>
          <TextField
            hintText="Panda Express 3"
            floatingLabelText="Search Query"
            onChange={this.changeState.bind(this, 'query')}
            onEnterKeyDown={this.sendQuery}
            value={this.state.query}
          />

          {(()=> {
            if (this.state.showLoading) {
              return (<CircularProgress size={2}/>);
            } else if (this.state.showResults) {
              return (<MovieList movies={this.state.movies} />)
            }
          })()}
        </CardText>
      </Card>
    );
  }
}
/**
 * Created by andy on 3/5/16.
 */
