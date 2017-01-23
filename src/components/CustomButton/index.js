import React, { Component, PropTypes } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native-web';

class CustomButton extends Component {
  static propTypes = {
    accessibilityLabel: PropTypes.string,
    disabled: PropTypes.bool,
    onPress: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired
  };

  render() {
    const {
      accessibilityLabel,
      color,
      disabled,
      onPress,
      title
    } = this.props;

    return (
      <TouchableOpacity
        accessibilityLabel={accessibilityLabel}
        accessibilityRole={'button'}
        disabled={disabled}
        onPress={onPress}
        style={[
          styles.button,
          color && { backgroundColor: color },
          disabled && styles.buttonDisabled
        ]}>
        <Text style={[
          styles.text,
          disabled && styles.textDisabled
        ]}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2196F3',
    borderRadius: 2,
    margin: 30
  },
  text: {
    textAlign: 'center',
    color: '#fff',
    padding: 8,
    fontWeight: '500'
  },
  buttonDisabled: {
    backgroundColor: '#dfdfdf'
  },
  textDisabled: {
    color: '#a1a1a1'
  }
});

module.exports = CustomButton;
