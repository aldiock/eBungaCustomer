import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Button, TextInput} from '../../';
import {MapsIco} from '../../../assets';
import {Gap} from '../../atoms';
import Card from '../Card';

const OrderCard = ({onPress, gambarItem, ...props}) => {
  return (
    <View style={styles.mainContentCard}>
      <Card>
        <View style={{justifyContent: 'center', borderRadius: 10}}>
          <Gap height={10} />
          <Image style={styles.GambarItem} source={{uri: gambarItem}} />
          <Gap height={10} />
        </View>
      </Card>
    </View>
  );
};

export default OrderCard;

const styles = StyleSheet.create({
  mainContentCard: {
    marginHorizontal: 30,
  },
  GambarItem: {
    borderRadius: 10,
    width: 155,
    height: 115,
  },
  InputUcapan: {
    width: 250,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'white',
    backgroundColor: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    height: 109,
    bottom: 32,
    paddingHorizontal: 17,
    elevation: 8,
  },
  InputCustom: {
    width: 250,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'white',
    backgroundColor: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    height: 45,
    paddingHorizontal: 17,
    paddingLeft: 10,
    elevation: 8,
    bottom: 32,
  },
  mapsIco: {
    marginHorizontal: 200,
    marginVertical: 3,
    marginBottom: 65,
  },
});
