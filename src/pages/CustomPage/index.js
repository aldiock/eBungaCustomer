import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {numberWithCommas} from '../../../utils/index';
import {CloseIco, MapsIco} from '../../assets';
import {Button, Card, Gap, Loading, TextInput} from '../../components';
import firebase from '../../config/firebase/index';
import BackendDataContext from '../../contexts/backEndDataContext';

const CustomPage = ({navigation, route, ...props}) => {
  const backEndData = useContext(BackendDataContext);
  const totalHarga = route.params.item.priceProduct;
  const tanggal = `${new Date().getTime()}`;
  const idLogin = `${
    backEndData.getUserDetails().uid || backEndData.getUserDetails().user.id
  }`;
  const orderID = 'E-BUNGA-' + tanggal + '-' + idLogin;
  const splitID = orderID.split('-')[3];
  const [loading, setLoading] = useState(false);
  const [coordinateValid, setCoordinateValid] = useState(true);

  //PAYMENT GATEWAY
  const URL_MIDTRANS = 'https://app.sandbox.midtrans.com/snap/v1/transactions';
  const KEY_MIDTRANS = 'U0ItTWlkLXNlcnZlci1nY1NPUFRra2dCS1FrcENkX21BVGJkR2o=';

  const [ucapan, setUcapan] = useState('');
  const [customColor, setCustomColor] = useState('');
  const [specificAddress, setSpecificAddress] = useState('');

  useEffect(() => {
    // const unsubscribe = navigation.addListener('focus', () => {
    //   loadLocaction();
    //   if (!coordinateValid) {
    //     showMessage({
    //       message: 'Lokasi ditemukan',
    //       type: 'success',
    //       icon: 'success',
    //       duration: 3000,
    //       description: 'Silahkan cek lokasi anda',
    //       titleStyle: {color: '#fff'},
    //       descriptionStyle: {color: '#fff'},
    //       containerStyle: {backgroundColor: '#4caf50'},
    //     });
    //   } else {
    //     showMessage({
    //       message: 'Lokasi tidak ditemukan',
    //       type: 'danger',
    //       icon: 'danger',
    //       duration: 3000,
    //       description: 'Silahkan cek lokasi anda',
    //       titleStyle: {color: '#fff'},
    //       descriptionStyle: {color: '#fff'},
    //       containerStyle: {backgroundColor: '#f44336'},
    //     });
    //   }
    // });
    // return unsubscribe;
  });

  const submitCustom = () => {
    const data = {
      ucapan: ucapan,
      customColor: customColor,
      specificAddress: specificAddress,
      photo: route.params.item.photo,
      productName: route.params.item.productName,
      orderOn: backEndData.getStoreItem().uidLogin,
      orderBy: `${
        backEndData.getUserDetails().fullName ||
        backEndData.getUserDetails().user.name
      }`,
      orderByID: orderID,
      user: splitID,
      timeOrder: `${new Date().toString()}`,
      status: 'Payment',
      harga: totalHarga,
      coordinate: backEndData.getLocation().pickLoc.coordinate
        ? backEndData.getLocation().pickLoc.coordinate
        : null,
    };

    if (ucapan == '' || customColor == '' || specificAddress == '') {
      showMessage({
        message: 'Data custom belum lengkap',
        type: 'danger',
      });
    } else {
      //SEND ORDER TO SELECTED MITRA
      setLoading(true);
      firebase
        .database()
        .ref(`users/${backEndData.getStoreItem().uidLogin}/_incomingOrder`)
        .child(orderID)
        .set(data);
      showMessage({
        message: 'Item Berhasil Terpesan Dan Silahkan Lakukan Pembayaran',
        type: 'warning',
        duration: 5000,
      });

      //SEND ITEM TO RECENT ORDER PAGES ON CUSTOMER
      firebase
        .database()
        .ref(
          `userscust/${
            backEndData.getUserDetails().uid ||
            backEndData.getUserDetails().user.id
          }/_recentOrderList`,
        )
        .child(orderID)
        .set(data);

      //SEND TO HISTORY
      firebase.database().ref('histories').child(orderID).set(data);

      //REMOVE ITEM FROM MY ORDER LIST
      firebase
        .database()
        .ref(
          `userscust/${
            backEndData.getUserDetails().uid ||
            backEndData.getUserDetails().user.id
          }/${backEndData.getStoreItem().uidLogin}/_MyOrderList`,
        )
        .remove();

      //TRANSAKSI
      const dataTransaksi = {
        transaction_details: {
          order_id: orderID,
          gross_amount: parseInt(totalHarga),
        },
        credit_card: {
          secure: true,
        },
      };

      axios({
        method: 'POST',
        url: URL_MIDTRANS,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Basic ' + KEY_MIDTRANS,
        },
        data: dataTransaksi,
        timeout: 12000,
      })
        .then(function (response) {
          const param = {
            url: response.data.redirect_url,
          };
          backEndData.setSnap({
            ...param,
          });
          firebase.database().ref('histories').child(orderID).update({
            url: param.url,
          });
          setLoading(false);
          navigation.navigate('Midtrans');
        })
        .catch(function (error) {
          showMessage({
            message: error.response,
          });
        });
    }
    setUcapan('');
    setCustomColor('');
    setSpecificAddress('');
  };

  //function to back and delete location from firebase
  const closeCustom = () => {
    firebase
      .database()
      .ref(`users/${backEndData.getStoreItem().uidLogin}/_cekLocation`)
      .remove();
    navigation.navigate('Keranjang');
  };

  return (
    <>
      <View style={styles.Container}>
        <View style={styles.form}>
          <Card style={styles.cardHeader}>
            <TouchableOpacity
              style={styles.closeIcoHeader}
              onPress={closeCustom}>
              <CloseIco />
            </TouchableOpacity>
            <Text style={styles.TextTitleOrderLists}>
              <Text>Custom {route.params.item.productName}</Text>
            </Text>
          </Card>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Card style={styles.ContainerCustom}>
              <Text style={{marginLeft: -195, fontSize: 18}}>
                Diantarkan ke alamat
              </Text>
              <View style={styles.mapsText}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.mapsPickValid}
                  onPress={() => navigation.navigate('Maps')}>
                  <Text style={styles.textIco}>
                    Pilih titik pengantaran via Maps
                  </Text>
                  <MapsIco style={styles.mapsIco} />
                </TouchableOpacity>
              </View>
              <Gap height={40} />
              <TextInput
                style={styles.InputCustom}
                placeholder="Masukkan alamat spesifik"
                value={specificAddress}
                maxLength={40}
                onChangeText={value => setSpecificAddress(value)}></TextInput>
            </Card>
            <Card style={styles.cardUcapanContainer}>
              <Text style={{marginLeft: -164, fontSize: 18}}>
                Custom order anda disini
              </Text>
              <Gap height={10} />
              <TextInput
                style={styles.InputUcapan}
                multiline
                placeholder="Masukkan ucapan anda..."
                value={ucapan}
                maxLength={120}
                onChangeText={value => setUcapan(value)}></TextInput>
              <Gap height={40} />
              <TextInput
                style={styles.InputCustom}
                placeholder="Masukkan custom warna"
                value={customColor}
                maxLength={20}
                onChangeText={value => setCustomColor(value)}></TextInput>
            </Card>
            <Card style={styles.cardTotalContainer}>
              <Text
                style={{paddingRight: 314, fontSize: 18, fontWeight: 'bold'}}>
                Total
              </Text>
              <Text
                style={{paddingLeft: 180, fontSize: 24, fontWeight: 'bold'}}>
                Rp.{numberWithCommas(totalHarga)},-
              </Text>
              <Button
                style={styles.buttonStyle}
                title="Lanjutkan ke Pembayaran"
                onPress={submitCustom}
              />
            </Card>
          </ScrollView>
        </View>
      </View>
      {loading && <Loading />}
    </>
  );
};

export default CustomPage;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent:'center',
    alignItems:'center',
  },
  ContainerCustom: {
    alignItems: 'center',
    width: 414,
    height: 149,
    backgroundColor: '#EDEDF3',
    elevation: 0,
    borderRadius: 0,
  },
  cardUcapanContainer: {
    alignItems: 'center',
    width: 414,
    height: 215,
    backgroundColor: '#EDEDF3',
    elevation: 0,
    borderRadius: 0,
  },
  cardTotalContainer: {
    alignItems: 'center',
    width: 414,
    height: 110,
    backgroundColor: '#EDEDF3',
    elevation: 0,
    borderRadius: 0,
  },
  TextTitleOrderLists: {
    flexDirection: 'row',
    fontWeight: 'bold',
    fontSize: 18,
    bottom: 10,
    justifyContent: 'center',
  },
  form: {
    alignSelf: 'center',
    justifyContent:'center',
  },
  backIcon: {
    paddingLeft: 110,
  },
  InputCustom: {
    width: 320,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'white',
    backgroundColor: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    height: 48,
    paddingHorizontal: 17,
    paddingLeft: 10,
    elevation: 8,
    bottom: 32,
  },
  InputUcapan: {
    width: 320,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'white',
    backgroundColor: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    height: 112,
    paddingHorizontal: 10,
    elevation: 8,
  },
  mapsIco: {
    marginHorizontal: 280,
    bottom: 20,
  },
  textIco: {
    bottom: -10,
    marginHorizontal: 10,
    fontSize: 18,
    color: '#808080',
  },
  cardHeader: {
    width: 414,
    height: 56,
    backgroundColor: '#EDEDF3',
    borderRadius: 0,
    elevation: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
  },
  closeIcoHeader: {
    marginLeft: -345,
    top: 15,
    bottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapsPickValid: {
    width: 320,
    height: 48,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'white',
    backgroundColor: 'white',
    elevation: 8,
  },
  mapsPickInvalid: {
    width: 320,
    height: 48,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'white',
    backgroundColor: 'red',
    elevation: 8,
  },
  mapsText: {
    marginTop: 12,
  },
  buttonStyle: {
    width: 320,
  },
});
