import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Card from '../Card';

const CardListTokoDashboard = ({
  navigation,
  onPress,
  fullName,
  phone,
  photo,
  ...props
}) => {
  return (
    <View style={styles.mainContentCard}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        <Card style={{borderRadius: 15, width: 332, height: 97}}>
          <View style={styles.cardItemStyle}>
            <Card style={styles.GambarItem}>
              <Image
                style={styles.GambarItem}
                source={{
                  uri: 'http://cdn.onlinewebfonts.com/svg/img_566102.png',
                }}
              />
            </Card>
          </View>
          <View style={styles.inCardItem}>
            <Text style={styles.itemHeaderTitle}>{fullName}</Text>
            <Text style={styles.itemHeaderPhone}>{phone}</Text>
          </View>
        </Card>
      </TouchableOpacity>
    </View>
  );
};

export default CardListTokoDashboard;

const styles = StyleSheet.create({
  mainContentCard: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  inCardItem: {
    marginLeft: 100,
    marginTop: -80,
    width: 200,
    height: 80,
  },
  itemHeaderTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    paddingLeft: 20,
  },
  itemHeaderPhone: {
    fontSize: 12,
    paddingLeft: 20,
  },
  GambarItem: {
    borderRadius: 39,
    width: 81,
    height: 77,
  },
  cardItemStyle: {
    marginRight: 200,
    borderRadius: 23,
  },
});
