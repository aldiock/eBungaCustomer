import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ItemB} from '../../../assets';
import {ButtonItem, Gap, ButtonOrderItem} from '../../atoms';
import Card from '../Card';

const ItemCard2 = ({navigation, onPress, ...props}) => {
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
          <Text style={styles.itemHeader}>Customer name : Sandi</Text>
          <Gap height={10} />
          <ButtonItem
            style={styles.buttonItem}
            title="Chat"
          />
          <ButtonOrderItem
            style={styles.buttonItem}
            title="Order"
            onPress={onPress}
          />
          <Gap height={10} />
          <Text style={{marginLeft: 5, fontWeight: 'bold'}}>
            Rp.1.500.000/pcs
          </Text>
        </View>
      </Card>
    </View>
  );
};

export default ItemCard2;

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
    fontSize: 12,
  },
  GambarItem: {
    borderRadius: 23,
  },
  buttonItem: {
    marginHorizontal: 18,
  },
});
