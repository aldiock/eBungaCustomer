import React from 'react';
import {
  ScrollView, StyleSheet,
  Text,
  View
} from 'react-native';
import { Gap, ItemCardOrderSummary } from '../../components';

const CekProsesPesanan = ({navigation, ...props}) => {
  return (
    <View style={styles.Container}>
      <View style={styles.form}>
        <Gap height={30} />
        <Text style={styles.TextTitleOrderLists}>
          <Text>Re-check your order</Text>
        </Text>
        <Gap height={20} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <ItemCardOrderSummary
            onPress={() => navigation.navigate('MainApp')}
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default CekProsesPesanan;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  TextTitleOrderLists: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    fontWeight: 'bold',
    fontSize: 18,
  },
  form: {
    alignSelf: 'center',
  },
  backIcon: {
    paddingLeft: 110,
  },
});
