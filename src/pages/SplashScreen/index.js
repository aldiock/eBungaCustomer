import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {LogoBungaPutihSplash} from '../../assets';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Login'); 
    }, 3000); 
  }, []);

  return (
    <View style={styles.splash}>
      <LogoBungaPutihSplash/>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#11A962',
  },
});