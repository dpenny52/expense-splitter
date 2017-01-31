import React, { Component } from 'react';
import { View } from 'react-native-web';
import Dropdown from 'react-dropdown';
import SuperTextInput from '../SuperTextInput';
import './style.css';

const options = ['dpenny52@gmail.com', 'nette.l.derrick@gmail.com'];

class SplitSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      splitWith: props.splitWith || '',
      splitPercent: props.splitPercent || 50,
      bgStyle: props.bgStyle || {},
      handleChange: props.handleChange || {},
      handleDropdownChange: props.handleDropdownChange || {}
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps);
  }

  render() {
    return (
      <View style={this.state.bgStyle}>
        <Dropdown options={options} onChange={this.state.handleDropdownChange} value={this.state.splitWith} placeholder="Split with..." />
        <SuperTextInput 
          id='splitPercent'
          label='Percentage They Pay'
          keyboardType='numeric'
          onChange={this.state.handleChange}
          value={this.state.splitPercent} />
      </View>
    );
  }
}

module.exports = SplitSelector;