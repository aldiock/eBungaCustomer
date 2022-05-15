import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ItemB } from '../../../assets';
import { Gap } from '../../atoms';
import Card from '../Card';

const RecentOrder = ({navigation, onPress, ...props}) => {
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
          <TouchableOpacity>
            <Text style={styles.buttonItem}> Status:Done</Text>
          </TouchableOpacity>
          <Gap height={10} />
          <Text style={{justifyContent: 'center', fontWeight: 'bold'}}>
            Rp. 1.500.000 / pcs
          </Text>
        </View>
      </Card>
    </View>
  );
};

export default RecentOrder;

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
    fontSize: 14,
  },
  GambarItem: {
    borderRadius: 23,
  },
  buttonItem: {
    marginHorizontal:20,
  },
});
