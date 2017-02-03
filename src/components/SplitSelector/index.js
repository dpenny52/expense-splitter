import React, { PropTypes } from 'react';
import { View } from 'react-native-web';
import Dropdown from 'react-dropdown';
import SuperTextInput from '../SuperTextInput';
import './style.css';

const options = ['dpenny52@gmail.com', 'nette.l.derrick@gmail.com'];

const SplitSelector = ({splitWith, splitPercent, handleChange, handleDropdownChange}) => {

  return (
    <View>
      <Dropdown options={options} onChange={handleDropdownChange} value={splitWith} placeholder="Split with..." />
      <SuperTextInput 
        id='splitPercent'
        label='Percentage They Pay'
        keyboardType='numeric'
        onChange={handleChange}
        value={splitPercent} />
    </View>
  );
}

SplitSelector.propTypes = {
  splitWith: PropTypes.string,
  splitPercent: PropTypes.string,
  handleChange: PropTypes.func,
  handleDropdownChange: PropTypes.func
}

export default SplitSelector;