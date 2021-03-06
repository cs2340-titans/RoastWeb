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
import Snackbar from 'material-ui/lib/snackbar';
var reactMixin = require('react-mixin');

class LoginCard extends React.Component {
  state = {
    email: '',
    password: '',
    errorText: ''
  };
  constructor(props) {
    super(props);
  }

  changeState(key, event){
    let obj = {};
    obj[key] = event.target.value;
    this.setState(obj);
  }

  doLogin = () => {
    firebaseRef.authWithPassword({
      email: this.state.email,
      password: this.state.password
    }, (error, authData) => {
      if (error) {
        this.setState({
          errorText: error.message
        });
      } else {
        browserHistory.push("/");
      }
    });
    console.log(firebaseRef);
    console.log(this.state.email, this.state.password);
  };

  render = () => {
  return (
  <Card>
    <CardTitle title="Login" subtitle="Use your email & password, or register a new account."/>
    <CardText>
      <TextField
        hintText="user@example.com"
        floatingLabelText="Email"
        onChange={this.changeState.bind(this, 'email')}
        value={this.state.email}
      /><br/>
      <TextField
        floatingLabelText="Password"
        type="password"
        onChange={this.changeState.bind(this, 'password')}
        value={this.state.password}
        errorText={this.state.errorText}
      />
    </CardText>
    <CardActions>
      <RaisedButton label="Login" primary={true} onTouchTap={this.doLogin}/>
      <RaisedButton label="Register" secondary={true} onTouchTap={() => {browserHistory.push('/register')}}/>
    </CardActions>
  </Card>
  );
  }
};

reactMixin(LoginCard.prototype, LinkStateMixin);

export default LoginCard;