import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import RaisedButton from 'material-ui/lib/raised-button';
import CardText from 'material-ui/lib/card/card-text';
import TextField from 'material-ui/lib/text-field';
import browserHistory from '../app';
import LinkStateMixin from 'react-addons-linked-state-mixin';
var reactMixin = require('react-mixin');

class RegisterCard extends React.Component {
  state = {
    email: '',
    password: ''
  };
  constructor(props) {
    super(props);
  }

  changeState(key, event){
    let obj = {};
    obj[key] = event.target.value;
    this.setState(obj);
  }

  doRegister = () => {
    console.log(this.state.email, this.state.password);
  }
  render = () => {
    return (
      <Card>
        <CardTitle title="Register" subtitle="Register a new account. Make a strong password."/>
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
          />
        </CardText>
        <CardActions>
          <RaisedButton label="Register" primary={true} onTouchTap={this.doRegister}/>
          <RaisedButton label="Cancel" secondary={true} onTouchTap={() => {browserHistory.push('/login')}}/>
        </CardActions>
      </Card>
    );
  }
};
export default RegisterCard;