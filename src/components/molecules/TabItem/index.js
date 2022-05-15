import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {
  HomeIconActive,
  HomeIconGreen,
  ChatIconActive,
  ChatIconGreen,
  KeranjangActive,
  KeranjangGreen,
  ProfileIconActive,
  ProfileIconGreen,
} from '../../../assets';

const TabItem = ({isFocused, onLongPress, onPress, label}) => {
  const Icon = () => {
    if (label === 'Home') {
      return isFocused ? <HomeIconActive /> : <HomeIconGreen />;
    }

    if (label === 'Chat') {
      return isFocused ? <ChatIconActive /> : <ChatIconGreen />;
    }

    if (label === 'Keranjang') {
      return isFocused ? <KeranjangActive /> : <KeranjangGreen />;
    }

    if (label === 'Profile') {
      return isFocused ? <ProfileIconActive /> : <ProfileIconGreen />;
    }

    return <HomeIconGreen />;
  };
  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.container}>
      <Icon />
      <Text style={styles.text(isFocused)}>{label}</Text>
    </TouchableOpacity>
  );
};

export default TabItem;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  text: isFocused => ({
    color: isFocused ? '#3DB599' : '#20735F',
    justifyContent: 'center',
    marginBottom: 2,
  }),
});
