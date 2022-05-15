import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import TabItem from '../TabItem';

const BottomNav = ({state, descriptors, navigation}) => {
  return (
    <View style={styles.Container}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TabItem
            key={index}
            label={label}
            isFocused={isFocused}
            onLongPress={onLongPress}
            onPress={onPress}
          />
        );
      })}
    </View>
  );
};

export default BottomNav;

const styles = StyleSheet.create({
  Container: {
    flexDirection: 'row',
    backgroundColor: '#F3EDED',
    paddingVertical: 10,
    paddingHorizontal: 5,
    justifyContent: 'space-between',
    elevation: 5,
    borderRadius: 10,
  },
});
