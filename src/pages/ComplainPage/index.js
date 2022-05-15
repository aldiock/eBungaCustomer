import React, {useEffect, useState, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';
import {Gap, Button, Card} from '../../components';
import firebase from '../../config/firebase/index';
import {numberWithCommas} from '../../../utils';
import {showMessage} from 'react-native-flash-message';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ComplainPage = ({route, navigation, ...props}) => {
  const namaProduct = route.params.dataHistory.productName;
  const photoProduct = route.params.dataHistory.photo;
  const hargaProduct = route.params.dataHistory.harga;
  const orderBy = route.params.dataHistory.orderBy;
  const orderByID = route.params.dataHistory.orderByID;
  const splitOrderID = orderByID.substring(0, 20);
  const timeOrderSelesai = route.params.dataHistory.timeOrder;
  const timeOrderSplit = timeOrderSelesai.substring(0, 16);
  const status = route.params.dataHistory.status;
  const orderOn = route.params.dataHistory.orderOn;
  const [complain, setComplain] = useState('');

  useEffect(() => {
    console.log('INI PARAMS TERIMA', route.params.dataHistory);
  }, []);

  const submitComplain = () => {
    const data = {
      complain: complain,
    };

    if (complain === '') {
      showMessage({
        message: 'Maaf anda belum mengisi complain',
        type: 'warning',
      });
    } else {
      //send complain
      firebase
        .database()
        .ref(`users/${orderOn}/_recentIncomingOrder/${orderByID}`)
        .update({
          complain: data.complain,
        });
      showMessage({
        message: 'Terima kasih atas kritik dan saran anda',
        type: 'success',
      });
      setComplain('');
    }
  };

  return (
    <View style={styles.Container}>
      <View style={styles.form}>
        <Card style={styles.cardContainer}>
          <Gap height={80} />
          <View style={{alignItems: 'center'}}>
            <Text
              style={{
                fontFamily: 'Poppins-Bold',
                fontSize: 18,
                color: 'white',
              }}>
              Komplain Pesanan
            </Text>
          </View>
          <Gap height={20} />
          <View style={{paddingRight: 220}}>
            <Text
              style={{
                fontSize: 10,
                fontFamily: 'Poppins-Bold',
                color: 'white',
              }}>
              Order ID :
            </Text>
            <Text
              style={{
                fontSize: 10,
                fontFamily: 'Poppins-Bold',
                color: 'white',
              }}>
              {splitOrderID}
            </Text>
          </View>
          <View style={{paddingRight: 224}}>
            <Text
              style={{
                fontSize: 10,
                fontFamily: 'Poppins-Bold',
                color: 'white',
              }}>
              Tanggal Order Selesai :
            </Text>
            <Text
              style={{
                fontSize: 10,
                fontFamily: 'Poppins-Bold',
                color: 'white',
              }}>
              {timeOrderSplit}
            </Text>
          </View>
          <Gap height={20} />
          <View style={{alignItems: 'center'}}>
            <TextInput
              style={styles.customInput}
              multiline
              value={complain}
              onChangeText={e => setComplain(e)}
              maxLength={150}
              placeholder="Masukkan komplain anda..."></TextInput>
          </View>
        </Card>
        <Gap height={30} />
        <Button
          title="Kirim Komplain"
          onPress={submitComplain}
          style={styles.buttonStyles}
        />
      </View>
    </View>
  );
};

export default ComplainPage;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'white',
    height: hp('100%'),
    width: wp('100%'),
  },
  cardContainer: {
    backgroundColor: '#3DB599',
    width: wp('100%'),
    height: 400,
    bottom: hp('5%'),
    borderBottomLeftRadius: 13,
    borderBottomRightRadius: 13,
  },
  photo: {
    borderRadius: 10,
    width: 200,
    height: 140,
  },
  photoWrapper: {
    alignItems: 'center',
    marginTop: 30,
  },
  wrapperInfoCustom: {
    justifyContent: 'center',
    flexDirection: 'column',
  },
  cardCustom: {
    padding: 10,
  },
  garis: {
    borderWidth: 0.5,
    marginVertical: 5,
  },
  customInput: {
    alignItems: 'center',
    width: 348,
    height: 235,
    backgroundColor: 'white',
    borderRadius: 13,
    borderWidth: 1,
    elevation: 2,
    borderColor: '#EDEDF3',
    paddingLeft: 10,
  },
  buttonStyles: {
    width: 348,
    height: 30,
    alignSelf: 'center',
  },
});
