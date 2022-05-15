import React from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import {SearchIco} from '../../../assets';

const SearchBar = ({placeholder, handleSearchInput, ...props}) => {
  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          onChangeText={text => handleSearchInput(text)}
        />
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.iconSearch}
          {...props}>
          <SearchIco />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: 310,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    height: 41,
    paddingHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  search: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginHorizontal: 22,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  iconSearch: {
    marginLeft: 5,
  },
});

export default SearchBar;
