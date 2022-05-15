import React, {useContext, useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {CheckIco, DeleteIco} from '../../assets';
import {Gap, ItemCardOrderLists2, Loading} from '../../components';
import firebase from '../../config/firebase/index';
import BackendDataContext from '../../contexts/backEndDataContext';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const MyOrderLists = ({route, navigation}) => {
  const backEndData = useContext(BackendDataContext);
  const [dataMyOder, setDataMyOrder] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const unsubs = navigation.addListener('focus', () => {
      setRefresh(true);
      loadMyOrder();
    });
    return () => {
      unsubs();
    };
  }, [navigation, route.params]);

  const loadMyOrder = () => {
    firebase
      .database()
      .ref(
        `userscust/${
          backEndData.getUserDetails().uid ||
          backEndData.getUserDetails().user.id
        }/${backEndData.getStoreItem().uidLogin}/_MyOrderList`,
      )
      .once('value', res => {
        if (res.val()) {
          const rawData = res.val();
          const orderItem = [];
          Object.keys(rawData).map(item => {
            orderItem.push({
              id: item,
              ...rawData[item],
            });
          });
          setDataMyOrder(orderItem);
        }
      });
    setRefresh(false);
  };

  //function to select item for custom
  const onChooseCustom = item => {
    setLoading(true);
    navigation.navigate('CustomPage', {item});
    setLoading(false);
    loadMyOrder();
    // console.log(item);
  };

  //function to delete item from keranjang
  const onDeleteItem = item => {
    const deleteId = item.id;
    const ref = firebase
      .database()
      .ref(
        `userscust/${
          backEndData.getUserDetails().uid ||
          backEndData.getUserDetails().user.id
        }/${backEndData.getStoreItem().uidLogin}/_MyOrderList`,
      );
    const query = ref.orderByChild('id').equalTo(deleteId);
    query.once('value').then(snapshot => {
      snapshot.forEach(child => {
        child.ref.remove();
      });
    });
  };

  return (
    <>
      <View style={styles.Container}>
        <View style={styles.form}>
          <Gap height={40} />
          <Text style={styles.TextTitleOrderLists}>
            <Text>Keranjang Pesanan</Text>
          </Text>
          <Gap height={20} />
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refresh} onRefresh={loadMyOrder} />
            }
            showsVerticalScrollIndicator={false}>
            {dataMyOder ? (
              dataMyOder.map(item => (
                <>
                  <ItemCardOrderLists2
                    key={item.id}
                    gambarItem={item.photo}
                    hargaProduk={item.priceProduct}
                    namaProduk={item.productName}
                    onPress={() => onChooseCustom(item)}
                  />
                  <View style={styles.cardAction}>
                    <TouchableOpacity onPress={() => onDeleteItem(item)}>
                      <DeleteIco />
                      <Text style={{marginHorizontal: 20, bottom: 20}}>
                        Hapus Pesanan
                      </Text>
                    </TouchableOpacity>
                  </View>
                </>
              ))
            ) : (
              <View style={{alignItems: 'center', justifyContent:'center'}}>
                <Text>Anda belum memilih salah satu product</Text>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
      {loading && <Loading />}
    </>
  );
};

export default MyOrderLists;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'white',
  },
  TextTitleOrderLists: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: '#3DB599',
  },
  form: {
    height: hp('100%'),
    width: wp('100%'),
  },
  cardAction: {
    marginLeft: 208,
    top: -90,
  },
});
