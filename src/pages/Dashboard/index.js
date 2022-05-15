import {useBackHandler} from '@react-native-community/hooks';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import React, {useContext, useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {
  Card,
  CardListToko,
  Gap,
  Loading,
  SearchBarDash,
} from '../../components';
import firebase from '../../config/firebase/index';
import BackendDataContext from '../../contexts/backEndDataContext';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Dashboard = ({navigation, onPress}) => {
  const backEndData = useContext(BackendDataContext);
  const [dataToko, setDataToko] = useState([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    firebase
      .database()
      .ref('users/')
      .once('value', res => {
        if (res.val()) {
          //convert to array
          const rawData = res.val();
          const tokoMitra = [];
          Object.keys(rawData).map(item => {
            tokoMitra.push({
              id: item,
              ...rawData[item],
            });
          });
          setDataToko(tokoMitra);
        }
      });
    setLoading(false);
  }, []);

  //backHandler function for SignOut Google Account
  function backActionHanlder() {
    _signOut();
    navigation.replace('Login');
    return true;
  }

  useBackHandler(backActionHanlder);

  //function to logout with google account
  const _signOut = async () => {
    setLoading(true);
    // setGettingLoginStatus(true);
    // Remove user session from the device.
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const onChoose = item => {
    navigation.replace('MainApp', {
      screen: 'ListItemToko',
      params: {
        data: item,
      },
    });
  };

  // for handle search item
  const handleSearchInput = text => {
    if (!text) {
      setText('');
    } else {
      setText(text);
    }
  };

  //new list for result search
  const newMitraList =
    text == ''
      ? dataToko
      : dataToko.filter(dataToko => {
          const newText = text.toLowerCase();
          return `${dataToko.fullName}`.toLowerCase().includes(newText);
        });

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
                  Selamat Datang di e-Bunga
                </Text>
              </View>
              <SearchBarDash
                placeholder="Silahkan cari toko favorit anda"
                handleSearchInput={handleSearchInput}
                placeholderTextColor="#A0A0A0"
              />
            </View>
          </Card>
          <Text style={styles.TextTitleIncoming}>List Toko yang terdaftar</Text>
          <Gap height={15} />
          <ScrollView>
            <View>
              <>
                {newMitraList &&
                  newMitraList.map(item => (
                    <CardListToko
                      key={item.id}
                      fullName={item.fullName}
                      phone={item.phone}
                      onPress={() => onChoose(item)}
                    />
                  ))}
              </>
            </View>
          </ScrollView>
        </View>
      </View>
      {loading && <Loading />}
    </>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'white',
  },
  TextTitleIncoming: {
    flexDirection: 'row',
    fontSize: 18,
    color: '#3DB599',
    fontFamily: 'Poppins-Bold',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  form: {
    alignSelf: 'center',
    height:hp('100%'),
    width:wp('100%'),
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
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: 'white',
    marginLeft: 10,
  },
  headerInfo: {
    padding: 20,
    marginTop: 60,
    flexDirection: 'row',
    paddingLeft: 20,
  },
});
