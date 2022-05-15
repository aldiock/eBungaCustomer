import React from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Gap} from '../../atoms';
import Card from '../Card';
import {numberWithCommas} from '../../../../utils';
import FastImage from 'react-native-fast-image';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';


const ItemCard = ({
  gambarItem,
  priceItem,
  namaItem,
  descItem,
  onPress,
  ...props
}) => {
  return (
    <View style={styles.mainContentCard}>
      <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
        <Card style={styles.cardProduk}>
          <FastImage
            style={styles.GambarItem}
            source={{uri: gambarItem, priority: FastImage.priority.high}}
          />
          <Gap height={10} />
          <View style={styles.inCardItem}>
            <View style={styles.produkInfo}>
              <Text numberOfLines={1} style={styles.itemHeaderProduk}>
                {namaItem}
              </Text>
              <Text numberOfLines={1} style={styles.itemHeaderDesc}>
                {descItem}
              </Text>
            </View>
            <Text style={styles.hargaProduk}>
              Rp.{numberWithCommas(priceItem)},-
            </Text>
          </View>
        </Card>
      </TouchableOpacity>
    </View>
  );
};

export default ItemCard;

const styles = StyleSheet.create({
  mainContentCard: {
    paddingHorizontal: wp('10%'),
    flex: 1,
  },
  cardProduk: {
    width: 320,
    height: 119,
    borderRadius: 8,
    alignItems: 'center',
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
    width: 150,
    height: 119,
    marginRight: 178,
  },
  produkInfo: {
    marginTop: -14,
    marginLeft: 30,
  },
  hargaProduk: {
    marginTop: 48,
    marginLeft: 88,
    fontWeight: 'bold',
  },
});
