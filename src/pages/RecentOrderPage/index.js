/* eslint-disable prettier/prettier */
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
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {CloseIco, EmptyOrder} from '../../assets';
import {
  ButtonConfirm,
  ButtonItem2,
  Gap,
  ItemCardRecentOrder,
  Loading,
} from '../../components';
import firebase from '../../config/firebase/index';
import BackendDataContext from '../../contexts/backEndDataContext';

const RecentOrderPage = ({navigation, key}) => {
  const backEndData = useContext(BackendDataContext);
  const [dataHistoryPayment, setDataHistoryPayment] = useState([]);
  const [dataHistoryItem, setDataHistoryItem] = useState([]);
  const [hasItem, setHasItem] = useState(false);
  const [loading, setLoading] = useState(false);
  const jamSekarang = new Date().getTime();
  const [dataOrderBarang, setDataOrderBarang] = useState({});

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadHistoryPayment();
    });

    return unsubscribe;
  }, [navigation]);

  //PAYMENT GATEWAY
  const URL_MIDTRANS_STATUS = 'https://api.sandbox.midtrans.com/v2/';
  const KEY_MIDTRANS = 'U0ItTWlkLXNlcnZlci1nY1NPUFRra2dCS1FrcENkX21BVGJkR2o=';
  const uid =
    backEndData.getUserDetails().uid || backEndData.getUserDetails().user.id;

  const loadHistoryPayment = key => {
    setLoading(true);
    firebase
      .database()
      .ref('histories')
      .orderByChild('user')
      .equalTo(uid)
      .on('value', querySnapshot => {
        setLoading(false);
        let data = querySnapshot.val();
        setDataHistoryPayment(data);
      });

    if (key === undefined || key === null) {
      setHasItem(false);
    } else {
      setHasItem(true);
    }
  };

  const updateStatus = key => {
    setLoading(true);
    const dataSelesai = dataHistoryPayment[key];

    axios({
      method: 'GET',
      url: URL_MIDTRANS_STATUS + `${key}/status`,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + KEY_MIDTRANS,
      },
      timeout: 12000,
    })
      .then(response => {
        if (dataHistoryPayment[key].status === 'Sampai') {
          const tanggalDatabase = dataHistoryPayment[key].timeOrder;
          const d = new Date(tanggalDatabase);
          setLoading(false);
          if (jamSekarang - d > 43200000) {
            orderApprove(key);
          }
          showMessage({
            message:
              'Mohon Konfirmasi Jika Produk Sudah Sampai. Dalam 12 Jam Order Akan Selesai Otomatis Jika Tidak Ada Konfirmasi Dari Anda',
            type: 'success',
            duration: 5000,
          });
          console.log('INI DATA ORDER DARI DATABSE', d.getTime());
          console.log('HASIL OPRASI', jamSekarang - d);
        } else {
          if (dataHistoryPayment[key].status === 'LUNAS') {
            setLoading(false);
            showMessage({
              message: 'Mohon Menunggu Toko Memproses Order Anda',
              type: 'success',
              duration: 15000,
            });
          } else {
            if (dataHistoryPayment[key].status === 'Selesai') {
              navigation.navigate('OrderSelesai', {dataSelesai});
              showMessage({
                message: 'Pesanan Anda Sudah Selesai',
                type: 'success',
                duration: 5000,
              });
              setLoading(false);
            } else {
              if (dataHistoryPayment[key].status === 'Proceed') {
                setLoading(false);
                showMessage({
                  message: 'Pesanan Anda Sudah Sementara Proses Di Toko',
                  type: 'success',
                  duration: 5000,
                });
              } else {
                if (
                  response.data.transaction_status === 'settlement' ||
                  response.data.transaction_status === 'capture'
                ) {
                  setLoading(false);
                  firebase.database().ref('histories').child(key).update({
                    status: 'LUNAS',
                  });
                  firebase
                    .database()
                    .ref(
                      `users/${
                        backEndData.getStoreItem().uidLogin
                      }/_incomingOrder/${key}`,
                    )
                    .update({
                      status: 'LUNAS',
                    });
                  setLoading(false);
                } else if (
                  response.data.status_code === '404' ||
                  dataHistoryPayment[key].status === 'Payment'
                ) {
                  const param = {
                    url: dataHistoryPayment[key].url,
                  };
                  backEndData.setSnap({
                    ...param,
                  });
                  setLoading(false);
                  navigation.navigate('Midtrans');
                }
              }
            }
          }
        }
      })
      .catch(function (error) {
        showMessage({
          message: error,
        });
      });
  };

  //function for complain
  const complainOrder = key => {
    const dataHistory = dataHistoryPayment[key];
    navigation.navigate('ComplainPage', {dataHistory});
    // console.log('INI DATA HISTORY', dataHistory);
  };

  //function for approve diterima
  const orderApprove = key => {
    setLoading(true);
    firebase.database().ref('histories').child(key).update({
      status: 'Selesai',
    });
    showMessage({
      message: 'Order Anda Selesai',
      type: 'success',
      duration: 3000,
    });
    firebase
      .database()
      .ref(
        `users/${
          backEndData.getStoreItem().uidLogin
        }/_recentIncomingOrder/${key}`,
      )
      .update({
        status: 'Selesai',
      });
    setLoading(false);
  };

  return (
    <>
      <View style={styles.Container}>
        <View style={styles.form}>
          <View style={styles.containerHeader}>
            <TouchableOpacity
              style={styles.closeIcoHeader}
              onPress={() => navigation.navigate('Profile')}>
              <CloseIco />
            </TouchableOpacity>
            <Text style={styles.TextTitleOrder}>Riwayat Pemesanan</Text>
          </View>
          <Gap height={30} />
          <ScrollView showsVerticalScrollIndicator={false}>
            {dataHistoryPayment ? (
              Object.keys(dataHistoryPayment).map(key => {
                return (
                  <>
                    {
                      <ItemCardRecentOrder
                        id={key}
                        pesanan={dataHistoryPayment[key]}
                        key={key}
                        status={dataHistoryPayment[key].status}
                        gambarItem={dataHistoryPayment[key].photo}
                        harga={dataHistoryPayment[key].harga}
                        nama={dataHistoryPayment[key].productName}
                        onPress={() => updateStatus(key)}
                      />
                    }
                    {dataHistoryPayment[key].status === 'Selesai' ? (
                      <ButtonItem2
                        style={styles.buttonItem}
                        title="Komplain"
                        onPress={() => complainOrder(key)}
                      />
                    ) : (
                      <Text> </Text>
                    )}
                    {dataHistoryPayment[key].status === 'Sampai' ? (
                      <ButtonConfirm
                        style={styles.buttonItemKonfirmas}
                        title="Konfirmasi"
                        onPress={() => orderApprove(key)}
                      />
                    ) : (
                      <Text> </Text>
                    )}
                  </>
                );
              })
            ) : (
              <View style={{marginVertical: 190, alignItems: 'center'}}>
                <EmptyOrder />
                <Gap height={10} />
                <Text style={{fontFamily: 'Poppins-Bold', color: '#11A962'}}>
                  Anda belum memiliki riwayat pemesanan...
                </Text>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
      {loading && <Loading />}
    </>
  );
};

export default RecentOrderPage;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'white',
    height: hp('100%'),
    width: wp('100%'),
  },
  containerHeader: {
    width: 414,
    height: 56,
    borderRadius: 0,
    elevation: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
  },
  closeIcoHeader: {
    marginLeft: -345,
    top: 25,
    bottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextTitleOrder: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    fontWeight: 'bold',
    fontSize: 18,
  },
  form: {
    flex: 1,
    width: wp('100%'),
    height: hp('100%'),
  },
  backIcon: {
    paddingLeft: 110,
  },
  buttonItem: {
    alignItems: 'center',
    bottom: 30,
    left: 100,
  },
  buttonItemKonfirmas: {
    alignItems: 'center',
    bottom: 50,
    left: 100,
  },
});
