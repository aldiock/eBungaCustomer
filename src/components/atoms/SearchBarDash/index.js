import React from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import {SearchIco} from '../../../assets';

const SearchBarDash = ({placeholder, handleSearchInput, ...props}) => {
  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          onChangeText={text => handleSearchInput(text)}
        />
        <TouchableOpacity activeOpacity={0.5} {...props}></TouchableOpacity>
      </View>
      <SearchIco style={styles.iconSearch} />
    </View>
  );
};

export default SearchBarDash;

const styles = StyleSheet.create({
  input: {
    width: 320,
    height:48,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 42,
  },
  search: {
    flexDirection: 'row',
    marginHorizontal: 22,
    marginTop:8,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  iconSearch: {
    width: 32,
    height: 35,
    marginHorizontal: 34,
    marginTop: -34,
  },
});
