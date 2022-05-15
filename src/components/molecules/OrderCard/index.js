import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, TextInput } from '../../';
import { ItemB } from '../../../assets';
import { Gap } from '../../atoms';
import Card from '../Card';

const OrderCard = ({...props}) => {
  return (
    <View style={styles.mainContentCard}>
      <Card>
        <View style={{justifyContent: 'center', borderRadius: 23}}>
          <Card>
            <Gap height={5} />
            <ItemB style={styles.GambarItem} />
            <Gap height={5} />
          </Card>
        </View>
        <Gap height={40} />
        <TextInput
          style={styles.InputUcapan}
          placeholder="Selamat & Sukses Hari Bhayangkara ke - 73 "></TextInput>
        <Gap height={10} />
        <TextInput
          style={styles.InputCustom}
          placeholder="Font selamat & sukses warna putih"></TextInput>

        <Gap height={10} />
      </Card>
      <Button title="Continue" />
    </View>
  );
};

export default OrderCard;

const styles = StyleSheet.create({
  mainContentCard: {
    marginHorizontal: 40,
  },
  GambarItem: {
    borderRadius: 23,
  },
  InputUcapan: {
    height: 109,
    width: 300,
    bottom: 32,
    paddingLeft: 10,
    borderColor: 'black',
    borderWidth: 1,
    alignSelf: 'center',
    borderRadius: 5,
  },
  InputCustom: {
    height: 45,
    width: 300,
    bottom: 32,
    paddingLeft: 10,
    borderColor: 'black',
    borderWidth: 1,
    alignSelf: 'center',
    borderRadius: 5,
  },
});
