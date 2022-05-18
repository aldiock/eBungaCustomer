import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {LogoGoogleNew} from '../../../assets';

const ButtonGoogle = ({title, ...props}) => {
  return (
    <TouchableOpacity activeOpacity={0.8} {...props} style={{...props.style}}>
      <View style={styles.container}>
        <Text style={styles.text}>{title}</Text>
        <LogoGoogleNew
          style={{marginLeft: 85, marginTop: -26, marginRight: 330}}
        />
      </View>
    </TouchableOpacity>
  );
};

export default ButtonGoogle;

const styles = StyleSheet.create({
  container: {
    width: 352,
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
    paddingLeft:10,
  },
});
