import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native-web';

const styles = StyleSheet.create({
  textInput: {
    padding: '10px',
    marginLeft: 20,
    marginRight: 20,
    borderStyle: 'solid',
    borderWidth: '2px', 
    borderColor: '#121212',
    fontWeight: 'bold',
    transitionProperty: 'box-shadow, border',
    transitionDuration: '0.3s',
    flex: 1 
  },
  textInputFocus: {
    padding: '10px',
    marginLeft: 20,
    marginRight: 20,
    borderStyle: 'solid',
    borderWidth: '2px', 
    borderColor: '#707070',
    fontWeight: 'bold',
    boxShadow: '0 0 5px 1px #969696',
    transitionProperty: 'box-shadow, border',
    transitionDuration: '0.3s',
    flex: 1
  },
  textLabel: {
    color: 'midnightblue',
    margin: '10px',
    fontWeight: 'bold',
    fontSize: '18pt'
  },
  container: {
    display: 'flex',
    alignItems: 'center'
  }
});

class SuperTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      style: styles.textInput
    };

    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  onFocus(event) {
    this.setState({style: styles.textInputFocus});
  }

  onBlur(event) {
    this.setState({style: styles.textInput});
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textLabel}>{this.props.label}</Text>
        <TextInput 
          id={this.props.id}
          keyboardType={this.props.keyboardType}
          value={this.props.value}
          onChange={this.props.onChange}
          style={this.state.style}
          onFocus={this.onFocus}
          onBlur={this.onBlur} />
      </View>
    );
  }
};

module.exports = SuperTextInput;