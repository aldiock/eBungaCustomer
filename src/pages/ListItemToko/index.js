import React, {useContext, useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Card, Gap, ItemCard, Loading, SearchBarDash} from '../../components';
import firebase from '../../config/firebase/index';
import BackendDataContext from '../../contexts/backEndDataContext';

const ListItemToko = ({route, navigation, onPress, ...props}) => {
  const [dataItem, setDataItem] = useState([]);
  const backEndData = useContext(BackendDataContext);
  const uidLogin = route.params.data.id;
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadItem();
    backEndData.setStoreItem({
      uidLogin,
    });
  }, []);

  // for handle search item
  const handleSearchInput = text => {
    if (!text) {
      setText('');
    } else {
      setText(text);
    }
  };

  //new list for result search item by productName
  const newItemList =
    text == ''
      ? dataItem
      : dataItem.filter(dataItem => {
          const newText = text.toLowerCase();
          return `${dataItem.productName}`.toLowerCase().includes(newText);
        });

  //for loadItem from mitra
  const loadItem = () => {
    setLoading(true);
    firebase
      .database()
      .ref(`users/${uidLogin}/_mitraProduct`)
      .once('value', res => {
        setLoading(false);
        if (res.val()) {
          const rawData = res.val();
          const mitraProduct = [];
          Object.keys(rawData).map(item => {
            mitraProduct.push({
              id: item,
              ...rawData[item],
            });
          });
          setDataItem(mitraProduct);
        }
      });
  };

  //for pick and order one item
  const orderItem = item => {
    setLoading(true);
    firebase
      .database()
      .ref(
        `userscust/${
          backEndData.getUserDetails().uid ||
          backEndData.getUserDetails().user.id
        }/${backEndData.getStoreItem().uidLogin}`,
      )
      .child('_MyOrderList')
      .push(item);
    showMessage({
      message: 'Produk berhasil masuk di keranjang',
      type: 'success',
    });
    setLoading(false);
    navigation.navigate('Keranjang', {item});
  };

  return (
    <>
      <View style={styles.Container}>
        <View style={styles.form}>
          <Card style={styles.cardStyleHeader}>
            <View style={{alignItems: 'center'}}>
              <View style={styles.headerInfo}>
                <Image
                  source={{
                    uri:
                      backEndData.getUserDetails().photo ||
                      backEndData.getUserDetails().user.photo,
                  }}
                  style={styles.avatar}
                />
                <Text style={styles.userName}>
                  Hi, {''}
                  {backEndData.getUserDetails().fullName ||
                    backEndData.getUserDetails().user.name}{' '}
                  ! {'\n'}
                  Cari apa di {route.params.data.fullName} ?
                </Text>
              </View>
              <Gap height={30} />
              <View style={{bottom: 30}}>
                <SearchBarDash
                  placeholder="Silahkan cari produk yang anda inginkan"
                  handleSearchInput={handleSearchInput}
                />
              </View>
            </View>
          </Card>
          <Text style={styles.TextTitleIncoming}>
            Daftar Produk - {route.params.data.fullName}
          </Text>
          {newItemList ? (
            <ScrollView showsVerticalScrollIndicator={false}>
              {newItemList.map(item => (
                <>
                  <View style={{justifyContent:'center',alignItems:'center'}}>
                    <ItemCard
                      key={item.id}
                      gambarItem={item.photo}
                      descItem={item.descProduct}
                      priceItem={item.priceProduct}
                      namaItem={item.productName}
                      onPress={() => orderItem(item)}
                    />
                  </View>
                </>
              ))}
            </ScrollView>
          ) : (
            <Text>Belum Ada Produk</Text>
          )}
        </View>
      </View>

      {loading && <Loading />}
    </>
  );
};

export default ListItemToko;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'white',
  },
  TextTitleIncoming: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    fontSize: hp('2.5%'),
    color: '#3DB599',
    fontFamily: 'Poppins-Bold',
  },
  form: {
    alignSelf: 'center',
    height: hp('100%'),
    width: wp('100%'),
  },
  cardStyleHeader: {
    backgroundColor: '#3DB599',
    width: wp('100%'),
    height: hp('40%'),
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    paddingTop: hp('2%'),
    marginBottom: hp('3%'),
    marginTop: hp('-1%'),
  },
  avatar: {
    height: 45,
    width: 45,
    borderRadius: 48,
  },
  userName: {
    fontSize: hp('2.5%'),
    fontFamily: 'Poppins-Bold',
    color: 'white',
    marginLeft: 10,
  },
  headerInfo: {
    padding: 20,
    marginTop: hp('8%'),
    flexDirection: 'row',
  },
});
