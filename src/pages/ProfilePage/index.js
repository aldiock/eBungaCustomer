import {GoogleSignin} from '@react-native-google-signin/google-signin';
import React, {useContext, useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Button, ButtonLogOut, Gap, Loading} from '../../components';
import BackendDataContext from '../../contexts/backEndDataContext';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Profile = ({navigation}) => {
  const backEndData = useContext(BackendDataContext);
  const [loading, setLoading] = useState(false);
  const onSubmit = () => {
    setLoading(true);
    _signOut();
    setLoading(false);
    navigation.replace('Login');
  };

  const _signOut = async () => {
    setLoading(true);
    // setGettingLoginStatus(true);
    // Remove user session from the device.
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setLoading(false);
      // Removing user Info
      // setUserInfo(null);
    } catch (error) {
      console.error(error);
    }
    // setGettingLoginStatus(false);
  };
  useEffect(() => {
    console.log(backEndData.getUserDetails().photo);
  }, []);

  // const [hasPhoto, setHasPhoto] = useState(false);

  return (
    <>
      <View style={styles.Container}>
        <Gap height={20} />
        <View style={styles.form}>
          <Gap height={25} />
          <Text style={styles.textHeader}>Profile</Text>
          <Gap height={80} />
          <Image
            source={{
              uri:
                backEndData.getUserDetails().photo ||
                backEndData.getUserDetails().user.photo,
            }}
            style={styles.avatar}
          />
          <Gap height={20} />
          <View style={styles.form}>
            <Text
              style={{alignSelf: 'center', fontSize: 16, fontFamily:'Poppins-Bold', color: '#3DB599',}}>
              {backEndData.getUserDetails().fullName ||
                backEndData.getUserDetails().user.name}
            </Text>
            <Text style={{alignSelf: 'center', fontFamily:'Poppins-Regular', color: '#3DB599'}}>
              {backEndData.getUserDetails().email ||
                backEndData.getUserDetails().user.email}
            </Text>
          </View>
          <Gap height={30} />
          <Button
            style={styles.ButtonStyles}
            title="Riwayat Pesanan"
            onPress={() => navigation.navigate('RecentOrderPage')}
          />
          <Gap height={40} />
          <ButtonLogOut
            style={styles.LogOut}
            title="Keluar"
            onPress={onSubmit}
          />
        </View>
      </View>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'white',
    width: wp('100%'),
    height: hp('100%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  Gambar: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 48,
  },
  ButtonStyles: {
    width: 328,
    height: 32,
    alignSelf: 'center',
    borderRadius: 10,
  },
  form: {
    alignSelf: 'center',
    justifyContent: 'center',
  },
  textHeader: {
    alignSelf: 'center',
    fontSize: 18,
    marginTop: hp('1%'),
    fontFamily:'Poppins-Bold',
    color: '#3DB599',
  },
  LogOut: {
    width: 328,
    height: 32,
    alignSelf: 'center',
    borderRadius: 10,
  },
  avatar: {
    height: 128,
    width: 128,
    borderRadius: 80,
    marginHorizontal: 120,
  },
});
