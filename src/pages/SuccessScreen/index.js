import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Centang, CentangText} from '../../assets';
import {Gap} from '../../components';

const Success = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('RecentOrderPage');
    }, 3000); //satuan ms = 3 detik
  }, []);

  return (
    <View style={styles.splash}>
      <Centang />
      <Gap height={20} />
      <CentangText />
    </View>
  );
};

export default Success;

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0c3b2e',
  },
});
