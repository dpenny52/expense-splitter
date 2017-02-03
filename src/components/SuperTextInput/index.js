import React, { PropTypes } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native-web';

const styles = StyleSheet.create({
  textInput: {
    padding: '10px',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
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
    marginBottom: 20,
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
    color: '#000',
    marginBottom: '10px',
    fontWeight: 'bold',
    fontSize: '18pt'
  },
  container: {
    marginTop: '10px',
    display: 'flex',
    alignItems: 'center'
  }
});

let style = styles.textInput;

const onFocus = (event) => {
  style = styles.textInputFocus;
}

const onBlur = (event) => {
  style = styles.textInput;
}

const SuperTextInput = ({label, id, keyboardType, value, onChange}) => {

  return (
    <View style={styles.container}>
      <Text style={styles.textLabel}>{label}</Text>
      <TextInput 
        id={id}
        keyboardType={keyboardType}
        value={value}
        onChange={onChange}
        style={style}
        onFocus={onFocus}
        onBlur={onBlur} />
    </View>
  );
};

SuperTextInput.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  keyboardType: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func
}

export default SuperTextInput;