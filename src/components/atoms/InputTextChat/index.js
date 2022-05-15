import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { SendM } from '../../../assets';

const InputTextChat = ({...props}) => {
  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <TextInput
          placeholder="Type your messages"
        />
        <TouchableOpacity
          activeOpacity={0.5}
          {...props}>
          <SendM />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default InputTextChat;

const styles = StyleSheet.create({
  input: {
    width: 310,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: 'white',
    fontSize: 18, 
    height: 41,
    paddingHorizontal: 15,
    elevation: 8,
  },
  search: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginHorizontal: 22,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 50,
  },

});
