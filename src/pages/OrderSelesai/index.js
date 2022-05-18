import React, {useContext, useEffect} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {numberWithCommas} from '../../../utils/index';
import {Button, Card, Gap} from '../../components';
import BackendDataContext from '../../contexts/backEndDataContext';

const OrderSelesai = ({navigation, route, ...props}) => {
  const backEndData = useContext(BackendDataContext);

  //read value from params
  const nama = route.params.dataSelesai.orderBy;
  const harga = route.params.dataSelesai.harga;
  const photoProduct = route.params.dataSelesai.photo;
  const productName = route.params.dataSelesai.productName;
  const timeOrder = route.params.dataSelesai.timeOrder;
  const splitTime = timeOrder.substring(0, 21);
  const status = route.params.dataSelesai.status;
  const alamatLengkap = route.params.dataSelesai.specificAddress;
  const orderByID = route.params.dataSelesai.orderByID;
  const splitOrderID = orderByID.substring(0, 20);

  useEffect(() => {}, []);

  return (
    <View style={styles.Container}>
      <Gap height={30} />
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text
          style={{
            fontFamily: 'Poppins-Bold',
            fontSize: 18,
          }}>
          {splitTime}
        </Text>
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 12, fontFamily: 'Poppins-Bold'}}>
          Order ID :
        </Text>
        <Text style={{fontSize: 12, fontFamily: 'Poppins-Bold'}}>
          {splitOrderID}
        </Text>
      </View>
      <View style={styles.cardParent}>
        <Gap height={40} />
        <View style={{}}>
          <Text style={{fontSize: 14, fontFamily: 'Poppins-Bold'}}>
            Ringkasan Pesanan
          </Text>
        </View>
        <Card style={styles.cardHeaderRingkasan}>
          <View style={styles.rincianHeader}>
            <Text>{timeOrder}</Text>
            <Text>{alamatLengkap}</Text>
            <Text>Total Harga</Text>
            <Text
              style={{
                bottom: 24,
                paddingLeft: 182,
                fontFamily: 'Poppins-Bold',
                fontSize: 20,
              }}>
              Rp.{numberWithCommas(harga)},-
            </Text>
          </View>
        </Card>
        <View style={{}}>
          <Text style={{fontSize: 14, fontFamily: 'Poppins-Bold'}}>
            Foto Produk Dikirim
          </Text>
        </View>
        <Card style={styles.cardHeaderProduk}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image style={styles.photo} source={{uri: photoProduct}} />
          </View>
        </Card>
      </View>
      <Button
        title="Lanjut"
        onPress={() => navigation.goBack()}
        style={styles.buttonStyles}
      />
    </View>
  );
};

export default OrderSelesai;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'white',
    width: wp('100%'),
    height: hp('100%'),
  },
  cardParent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  userHeader: {
    marginTop: -40,
  },
  rincianHeader: {
    marginTop: 30,
  },
  cardHeader: {
    width: 414,
    height: 56,
    backgroundColor: '#EDEDF3',
    borderRadius: 0,
    elevation: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  cardHeaderRingkasan: {
    width: 414,
    height: 70,
    backgroundColor: '#EDEDF3',
    borderRadius: 0,
    elevation: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
  },
  cardHeaderProduk: {
    width: 414,
    height: 247,
    backgroundColor: '#EDEDF3',
    borderRadius: 0,
    elevation: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
  },
  avatar: {
    height: 45,
    width: 45,
    borderRadius: 48,
    top: 45,
    left: -60,
  },
  form: {
    alignSelf: 'center',
  },
  photoWrapper: {
    alignItems: 'center',
    marginTop: 30,
  },
  photo: {
    borderRadius: 8,
    width: 312,
    height: 205,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 15,
  },
  harga: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  wrapperOrderInfo: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  orderBy: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
  statusOrder: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  wrapperInfoCustom: {
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  cardCustom: {
    padding: 10,
  },
  cardCustomUcapan: {
    width: 300,
    height: 160,
    padding: 5,
  },
  buttonStyles: {
    width: 320,
    height: 45,
    alignSelf: 'center',
  },
});
