import React from 'react';
import {StyleSheet, View} from 'react-native';

const Card = props => {
  return <View style={{...styles.card, ...props.style}}>{props.children}</View>;
};

export default Card;

const styles = StyleSheet.create({
  card: {
    elevation: 8,
    backgroundColor: 'white',
    marginVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
});
