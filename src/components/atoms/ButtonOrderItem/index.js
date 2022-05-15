import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const ButtonOrderItem = ({title, onPress, ...props}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      {...props}
      onPress={onPress}
      style={{...props.style}}>
      <View style={styles.container}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ButtonOrderItem;

const styles = StyleSheet.create({
  container: {
    height: 16,
    width: 87,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 7,
    backgroundColor: '#2A7CC8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
