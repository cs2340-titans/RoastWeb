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
var reactMixin = require('react-mixin');

class ProfileCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profileRef: firebaseRef.child('profile/' + firebaseRef.getAuth().uid),
      profile: {
        email: "",
        fullname: "",
        gtid: "",
        major: ""
      }
    };
    this.state.profileRef.on("value", (data) => {
      this.state.profile = data.val();
      this.setState({profile: data.val()});
    });
  }

  changeState(key, event){
    let obj = {};
    obj[key] = event.target.value;
    let myProfile = {
      ...this.state.profile,
      ...obj
    };
    this.setState({
      profile: {
        ...this.state.profile,
        ...obj
    }});
    this.state.profileRef.update(myProfile);
  }

  render = () => {
    return (
      <Card>
        <CardTitle title="Your Profile" subtitle="View and edit your user profile here. Changes are saved in real time."/>
        <CardText>
          <TextField
            hintText="user@example.com"
            floatingLabelText="Email"
            onChange={this.changeState.bind(this, 'email')}
            value={this.state.profile.email}
          /><br/>
          <TextField
            hintText="George P. Burdell"
            floatingLabelText="Full Name"
            onChange={this.changeState.bind(this, 'fullname')}
            value={this.state.profile.fullname}
          /><br/>
          <TextField
            hintText="90XXXXXXX"
            floatingLabelText="GTID"
            onChange={this.changeState.bind(this, 'gtid')}
            value={this.state.profile.gtid}
          /><br/>
          <TextField
            hintText="Computer Science"
            floatingLabelText="Major"
            onChange={this.changeState.bind(this, 'major')}
            value={this.state.profile.major}
          /><br/>
        </CardText>
      </Card>
    );
  }
};
export default ProfileCard;/**
 * Created by andy on 3/30/16.
 */
