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
import SelectField from 'material-ui/lib/select-field';
import Divider from 'material-ui/lib/divider';
import CardText from 'material-ui/lib/card/card-text';
import {browserHistory, firebaseRef} from '../app';
import RT from '../sources/RottenTomato';
import MovieList from './MovieList.react';

export default class RecCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      query: "Computer Science",
      showResults: false,
      movies: []
    };
  }

  changeState(key, event, value) {
    let obj = {
      value: 1,
      query: "Computer Science"
    };
    console.log(value);
    if (value == 1) {
      obj.value = 1;
      obj.query = "Industrial Engineering";
    }
    if (value == 0) {
      obj.value = 0;
      obj.quey = "Computer Science";
    }
    console.log(obj);
    this.setState(obj, () => {
      this.sendQuery();
    });
  }

  sendQuery = () => {
    firebaseRef.child("/comments").orderByChild("ranking").on("value", (snapshot) => {
      let movies = [];
      snapshot.forEach((data) => {
        if (data.val().userMajor == this.state.query) {
          movies.push({
            id: data.key().split('_')[1],
            title: data.val().movie
          });
        }
      });
      this.setState({
        showResults: true,
        movies: movies
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
          <SelectField value={this.state.value} onChange={this.changeState.bind(this, 'query')}>
            <MenuItem value={0} primaryText="Computer Science"/>
            <MenuItem value={1} primaryText="Industrial Engineering"/>
          </SelectField>
        </CardText>
        {(()=> {
          switch (this.state.showResults) {
            case true:
              return (<MovieList movies={this.state.movies}/>);
            default:
              return null;
          }
        })()}
      </Card>
    );
  }
}
/**
 * Created by andy on 3/5/16.
 */
