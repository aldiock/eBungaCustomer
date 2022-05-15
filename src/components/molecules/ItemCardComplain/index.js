import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ItemA} from '../../../assets';
import {Gap} from '../../atoms';
import Card from '../Card';

const ItemCardOrderLists = ({...props}) => {
  return (
    <View style={styles.mainContentCard}>
      <Card>
        <View style={{marginRight: 150, borderRadius: 23}}>
          <Card style={styles.GambarItem}>
            <Gap height={5} />
            <ItemA style={styles.GambarItem} />
            <Gap height={5} />
          </Card>
        </View>
        <Gap height={10} />
        <View style={styles.inCardItem}>
          <Text style={styles.itemHeader}>Bunga Krans Standart</Text>
          <Text style={styles.itemHeader}>Status : Selesai</Text>
          <Gap height={10} />
          <Text style={{marginLeft: 10, fontWeight: 'bold'}}>Rp. 75.000 / pcs</Text>
        </View>
      </Card>
    </View>
  );
};

export default ItemCardOrderLists;

const styles = StyleSheet.create({
  mainContentCard: {
    marginHorizontal: 40,
  },
  inCardItem: {
    marginLeft: 190,
    marginTop: -110,
    width: 200,
    height: 120,
  },
  itemHeader: {
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: 15,
  },
  StyleText: {
    marginHorizontal: 30,
  },
  GambarItem: {
    borderRadius: 23,
  },
  buttonItem: {
    marginHorizontal: 18,
  },
});
