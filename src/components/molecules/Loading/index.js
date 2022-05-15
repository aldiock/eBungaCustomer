import React from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';

const Loading = () => {
  return (
    <View style={styles.wrapper}>
      <ActivityIndicator size="large" color={'#D88B01'} />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    width: '100%',
    height: '100%',
  },
  text: {
    fontSize: 18,
    color: 'black',
    marginTop: 16,
  },
});
