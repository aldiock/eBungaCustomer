import React from 'react';
import { StyleSheet, TextInput as TextInputRN, View } from 'react-native';


const TextInput = ({ children, ...props }) => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <TextInputRN style={styles.input} {...props} />
        <View style={styles.iconWrapper}>{children}</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 30,
  },
  input: {
    width: 285,
    borderWidth: 1,
    height: 45,
    borderRadius: 5,
    backgroundColor: 'white',
    fontSize: 18,
    paddingHorizontal: 50,
    elevation: 8,
  },
  wrapper: {
    flexDirection: 'row-reverse',
  },
  iconWrapper: {
    justifyContent: 'center',
    height: 45,
    width: 30,
    borderRadius: 22,
    right: 40,
  },
});

export default TextInput;
