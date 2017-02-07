import React, { PropTypes } from 'react';
import { View, Text } from 'react-native-web';
import Dropdown from 'react-dropdown';
import SuperTextInput from '../SuperTextInput';
import './style.css';

const options = ['dpenny52@gmail.com', 'nette.l.derrick@gmail.com'];

const SplitSelector = ({splitWith, splitPercent, handleChange, handleDropdownChange, userPays, hidePercent}) => {

  const percentInput = hidePercent ? '' : (
    <SuperTextInput 
      id='splitPercent'
      label='Percentage You Pay'
      keyboardType='numeric'
      onChange={handleChange}
      value={splitPercent} 
    />
  );

  return (
    <View>
      <Dropdown options={options} onChange={handleDropdownChange} value={splitWith} placeholder="Split with..." />
      {percentInput}
      <Text>{userPays}</Text>
    </View>
  );
}

SplitSelector.propTypes = {
  splitWith: PropTypes.string,
  splitPercent: PropTypes.string,
  handleChange: PropTypes.func,
  handleDropdownChange: PropTypes.func,
  userPays: PropTypes.number,
  hidePercent: PropTypes.bool,
}

export default SplitSelector;