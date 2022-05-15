import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const Button = ({title, ...props}) => {
  return (
    <TouchableOpacity activeOpacity={0.8} {...props} style={{...props.style}}>
      <View style={styles.container}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    height: 45,
    borderColor: 'transparent',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#FFBA00',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
  },
});
