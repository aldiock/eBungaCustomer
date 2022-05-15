import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {ItemB} from '../../../assets';
import {ButtonItem, Gap} from '../../atoms';
import Card from '../Card';
import {numberWithCommas} from '../../../../utils/index';

const ItemCardOrderLists2 = ({
  navigation,
  onPress,
  namaProduk,
  hargaProduk,
  gambarItem,
  ...props
}) => {
  return (
    <View style={styles.mainContentCard}>
      <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
        <View style={styles.cardProduk}>
          <Image style={styles.GambarItem} source={{uri: gambarItem}} />
          <Gap height={10} />
          <View style={styles.inCardItem}>
            <View style={styles.produkInfo}>
              <Text numberOfLines={1} style={styles.itemHeaderProduk}>{namaProduk}</Text>
            </View>
            <Text style={styles.hargaProduk}>
              Rp.{numberWithCommas(hargaProduk)},-
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ItemCardOrderLists2;

const styles = StyleSheet.create({
  mainContentCard: {
    marginHorizontal: 40,
  },
  cardProduk: {
    width: 328,
    height: 120,
    alignItems: 'center',
    backgroundColor: '#EDEDF3',
    borderRadius:8
  },
  inCardItem: {
    marginLeft: 120,
    marginTop: -110,
  },
  itemHeaderProduk: {
    fontSize: 14,
    fontWeight: 'bold',

  },
  itemHeaderDesc: {
    fontSize: 12,
  },
  GambarItem: {
    width: 149,
    height: 118,
    marginRight: 176,
    marginTop: 1,
    borderRadius:8
  },
  produkInfo: {
    marginTop: -14,
    marginLeft: 30,
  },
  hargaProduk: {
    marginTop: 58,
    marginLeft: 90,
    fontWeight: 'bold',
  },
});
