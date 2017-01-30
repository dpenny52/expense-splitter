import React, { Component, PropTypes } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native-web';

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#1A192A',
    borderRadius: 4,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 20
  },
  text: {
    textAlign: 'center',
    color: '#fff',
    padding: 13,
    fontWeight: '500'
  },
  buttonDisabled: {
    backgroundColor: '#dfdfdf'
  },
  textDisabled: {
    color: '#a1a1a1'
  }
});

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

module.exports = CustomButton;
