import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {LogoGoogleNew} from '../../../assets';

const ButtonGoogle = ({title, ...props}) => {
  return (
    <TouchableOpacity activeOpacity={0.8} {...props} style={{...props.style}}>
      <View style={styles.container}>
        <Text style={styles.text}>{title}</Text>
        <LogoGoogleNew
          style={{marginLeft: 65, marginTop: -28, marginRight: 330}}
        />
      </View>
    </TouchableOpacity>
  );
};

export default ButtonGoogle;

const styles = StyleSheet.create({
  container: {
    width: 324,
    height: 45,
    borderRadius: 10,
    backgroundColor: '#11A962',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
