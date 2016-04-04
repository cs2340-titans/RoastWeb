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
import Slider from 'material-ui/lib/slider';

export default class CommentCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      comment: "",
      rating: 5,
      user: null
    };
    let authData = firebaseRef.getAuth();
    if (authData) {
      let userRef = firebaseRef.child('profile/' + authData.uid + '/');
      let commentRef = firebaseRef.child('comments/' + authData.uid + '_' + this.props.movieId);
      this.state["uid"] = authData.uid;
      this.state["commentRef"] = commentRef
      userRef.on("value", (data) => {
        let user = data.val();
        this.setState({user: user});
        commentRef.on("value", (data) => {
          let commentData = data.val();
          if (commentData != null) this.setState(this.fromFBObj(commentData));
        })
      });
    }

  };

  getFBObj = () => {
    return {
      comment: this.state.comment,
      score: this.state.rating,
      ranking: 6 - this.state.rating,
      movie: this.props.movieTitle,
      userMajor: this.state.user.major
    };
  };

  fromFBObj = (obj) => {
    return {
      comment: obj.comment,
      score: obj.rating
    };
  };

  changeState(key, event, value) {

    if (value === undefined) {
      value = event.target.value;
    }
    let obj = {};
    obj[key] = value;
    this.setState(obj, () => {
      this.state.commentRef.update(this.getFBObj());
      this.setState({
        fbObj: this.getFBObj()
      })
    });
  }

  render() {
    return (
      <Card>
        <Toolbar>
          <ToolbarGroup float="left">
            <ToolbarTitle text={"Comment on " + this.props.movieTitle}/>
          </ToolbarGroup>
        </Toolbar>
        <CardText>
          All changes are saved in real-time. <br />
          Rating Score: {this.state.rating}
          <Slider step={0.5} value={this.state.rating}
                  min={1} max={5}
                  style={{maxWidth: 300}}
                  onChange={this.changeState.bind(this, 'rating')}/>
          <br />
          Your comment:
          <br />
          <TextField
            hintText="I love this movie."
            floatingLabelText="Comment"
            onChange={this.changeState.bind(this, 'comment')}
            value={this.state.comment}
            multiLine={true}
          /><br/>
        </CardText>

      </Card>
    );
  }
}