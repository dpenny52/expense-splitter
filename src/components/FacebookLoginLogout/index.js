import React, { Component } from 'react';
import CustomButton from '../CustomButton';
import FacebookLogin from 'react-facebook-login';

class FacebookLoginLogout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: props.loggedIn,
      onLogoutPress: props.onLogoutPress,
      responseFacebook: props.responseFacebook
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      loggedIn: nextProps.loggedIn || false
    });
  }

  render() {
    return this.state.loggedIn ? (
      <CustomButton 
        onPress={this.state.onLogoutPress} 
        title='Log Out'
      />
    ) : (
      <FacebookLogin
        containerStyle={{
          display: 'flex'
        }}
        buttonStyle={{
          padding: '13px',
          marginLeft: '20px',
          marginRight: '20px',
          marginBottom: '20px',
          borderRadius: '4px',
          fontSize: 14,
          flex: 1,
          alignItems: 'center'
        }}
        appId="394523654233558"
        autoLoad={true}
        fields="name,email"
        callback={this.state.responseFacebook} 
      />
    )
  }
}

module.exports = FacebookLoginLogout;