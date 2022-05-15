import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ItemB} from '../../../assets';
import {ButtonItem, Gap} from '../../atoms';
import Card from '../Card';

const ItemCardOrderSummary = ({navigation, onPress, ...props}) => {
  return (
    <View style={styles.mainContentCard}>
      <Card>
        <View style={{marginRight: 150, borderRadius: 23}}>
          <Card style={styles.GambarItem}>
            <Gap height={5} />
            <ItemB style={styles.GambarItem} />
            <Gap height={5} />
          </Card>
        </View>
        <Gap height={10} />
        <View style={styles.inCardItem}>
          <Text style={styles.itemHeader}>Bunga Papan</Text>
          <Text style={styles.itemHeader}>Status : Selesai</Text>
          <Gap height={10} />
          <ButtonItem
            style={styles.buttonItem}
            title="Order Summary"
            onPress={onPress}
          />
          <Gap height={10} />
          <Text style={{marginLeft: 10, fontWeight: 'bold'}}>
            Rp. 1.500.000 / pcs
          </Text>
        </View>
      </Card>
    </View>
  );
};

export default ItemCardOrderSummary;

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
    marginLeft: 10,
  },
  GambarItem: {
    borderRadius: 23,
  },
  buttonItem: {
    marginHorizontal: 18,
  },
});
