import React, { PropTypes } from 'react';
import CustomButton from '../CustomButton';
import FacebookLogin from 'react-facebook-login';

const FacebookLoginLogout = ({loggedIn, onLogoutPress, responseFacebook}) => {

  return loggedIn ? (
    <CustomButton 
      onPress={onLogoutPress} 
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
      callback={responseFacebook} 
    />
  )
}

FacebookLoginLogout.propTypes = {
  loggedIn: PropTypes.bool,
  onLogoutPress: PropTypes.func,
  responseFacebook: PropTypes.func
}

export default FacebookLoginLogout;