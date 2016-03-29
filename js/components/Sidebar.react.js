import React from 'react';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';
import RaisedButton from 'material-ui/lib/raised-button';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';
import Divider from 'material-ui/lib/divider';
import {browserHistory, firebaseRef} from '../app';

export default class LeftNavBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false, loggedIn: false};
    firebaseRef.onAuth((authData) => {
      if (authData) {
        let user = firebaseRef.child('profile/' + authData.uid + '/fullname');
        try {
          this.setState({
            loggedIn: true
          });
        } catch (e) {
          this.state.loggedIn = true;
        }
        user.on("value", (data) => {
          this.setState({userName: data.val()});
        });
      } else {
        try {
          this.setState({
            loggedIn: false
          });
        } catch (e) {
          this.state.loggedIn = false;
        }
      }
    })
  }

  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({open: false});

  doLogOut = () => {
    firebaseRef.unauth();
    browserHistory.push('/');
  };

  render() {
    return (
      <div>
        <LeftNav
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={open => this.setState({open})}
        >
          {(()=>{switch(this.state.loggedIn){
            case true:
            return (<Card>
              <CardHeader
                title={this.state.userName}
                subtitle="RoastWeb User"
                avatar="https://en.gravatar.com/userimage/18026152/e80f4a5f81ef7d667a2ef8f012093396.png"
              />
            </Card>);
            default:
              return null;
          }})()}
          <MenuItem onTouchTap={() => {browserHistory.push('/')}}>Home</MenuItem>
          <MenuItem onTouchTap={() => {browserHistory.push('/recommendations')}}>Recommendations</MenuItem>
          <MenuItem onTouchTap={() => {browserHistory.push('/releases')}}>New Releases</MenuItem>
          <MenuItem onTouchTap={() => {browserHistory.push('/search')}}>Search</MenuItem>
          <Divider />
          {(()=>{switch(this.state.loggedIn){
            case true:
              return (<MenuItem onTouchTap={this.doLogOut}>Log Out</MenuItem>);
            default:
              return (<MenuItem onTouchTap={() => {browserHistory.push('/login')}}>Log In</MenuItem>);
          }})()}
        </LeftNav>
      </div>
    );
  }
}/**
 * Created by andy on 3/5/16.
 */
