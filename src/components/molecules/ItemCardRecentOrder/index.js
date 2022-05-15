import React, {useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {ItemA} from '../../../assets';
import {ButtonItem2, Gap} from '../../atoms';
import Card from '../Card';
import {numberWithCommas} from '../../../../utils';

const ItemCardOrderLists = ({
  status,
  pesanan,
  id,
  nama,
  gambarItem,
  harga,
  onPress,
  ...props
}) => {
  return (
    <View style={styles.mainContentCard}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        <View style={styles.containerCard}>
          <View style={styles.containerGambar}>
            <Image style={styles.GambarItem} source={{uri: gambarItem}} />
          </View>
          <View style={styles.inCardItem}>
            <View style={{paddingLeft:40}}>
              <Text numberOfLines={1} style={styles.itemHeader}>{nama}</Text>
              <Text style={styles.itemHeader}>Status : {status}</Text>
              <Text style={{justifyContent: 'center', fontWeight: 'bold'}}>
                Rp.{numberWithCommas(harga)}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ItemCardOrderLists;

const styles = StyleSheet.create({
  mainContentCard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inCardItem: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -90,
  },
  containerGambar: {
    marginRight: 225,
  },
  containerCard: {
    width: 332,
    height: 97,
    alignItems: 'center',
    backgroundColor: '#EDEDF3',
    borderRadius: 8,
  },
  itemHeader: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  StyleText: {
    marginHorizontal: 30,
  },
  GambarItem: {
    borderRadius: 15,
    width: 95,
    height: 84,
    marginVertical: 5,
  },
  buttonItem: {
    marginHorizontal: 18,
  },
});
