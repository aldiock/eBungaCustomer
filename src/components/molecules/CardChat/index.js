import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Gap} from '../../atoms';
import Card from '../Card';

const CardChat = ({textChat, namaUser, date, photo, ...props}) => {
  const newDate = date;
  const subDate = newDate.substring(0, 24);
  return (
    <View style={styles.mainContentCard}>
      <View style={styles.photoUserContainer}>
        <Text style={styles.textUsername}>{namaUser}</Text>
        <Image
          style={styles.GambarItem}
          source={{
            uri: photo,
          }}
        />
      </View>
      <View style={styles.cardContainerChat}>
        <Card style={styles.cardStyle}>
          <Text style={{}} numberOfLines={4}>
            {textChat}
          </Text>
        </Card>
        <Text style={styles.dateStyle}>{subDate}</Text>
      </View>
    </View>
  );
};

export default CardChat;

const styles = StyleSheet.create({
  mainContentCard: {
    marginHorizontal: 30,
    marginTop: 5,
  },
  photoUserContainer: {
    marginRight: 180,
    borderRadius: 23,
  },
  cardContainerChat: {
    width: 180,
    marginHorizontal: 28,
    color: 'red',
  },
  cardStyle: {
    borderRadius: 6,
    width: 261,
    height: 26,
    backgroundColor: '#EBEBEB',
  },
  textUsername: {
    paddingLeft: 60,
    top: 30,
  },
  dateStyle: {
    fontSize: 12,
    opacity: 0.5,
    bottom: 5,
  },
  itemHeader: {
    fontSize: 14,
  },
  GambarItem: {
    borderRadius: 40,
    width: 50,
    height: 50,
    marginRight: 60,
  },
});
