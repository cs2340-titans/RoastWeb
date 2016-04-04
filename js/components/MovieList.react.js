/**
 * Created by andy on 4/2/16.
 */

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
import {navigateTo, firebaseRef} from '../app';
import RT from '../sources/RottenTomato';

export default class MovieList extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <List>
        {this.props.movies.map((m, i) => {
          if (i != this.props.movies.length - 1) {
            return (<div key={i}>
              <ListItem primaryText={m.title} onTouchTap={() => {navigateTo('/movie/' + m.id + '/' + m.title)}}/>
              <Divider />
            </div>);
          } else {
            return (<div key={i}>
              <ListItem primaryText={m.title} onTouchTap={() => {navigateTo('/movie/' + m.id+ '/' + m.title)}}/>
            </div>);
          }
        })}
      </List>
    );
  }
}
/**
 * Created by andy on 3/5/16.
 */
