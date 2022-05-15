import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const ButtonItem = ({title, onPress, ...props}) => {
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

export default ButtonItem;

const styles = StyleSheet.create({
  container: {
    width:87,
    height:22,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: '#F44545',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
