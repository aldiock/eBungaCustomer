import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import React, {useContext, useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {HideEye, LogoEBungaLogin, ShowEye} from '../../assets';
import {
  Button,
  ButtonGoogle,
  Card,
  Gap,
  Loading,
  TextInput,
} from '../../components';
import firebase from '../../config/firebase';
import BackendDataContext from '../../contexts/backEndDataContext';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const LoginScreen = ({navigation}) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [visible, setVisible] = useState(true);
  const [valid, setValid] = useState(true);

  useEffect(() => {
    GoogleSignin.configure({});
  }, []);

  //Login with Google
  const googleLogin = async () => {
    setLoading(true);
    try {
      setLoading(true);
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();
      setUserInfo(userInfo);
      backEndData.setUserDetail({
        ...userInfo,
      });
      setLoading(false);
      navigation.replace('Dashboard');
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        setLoading(false);
        //show error using flash messages if user cancel login process
        showMessage({
          message: 'Login dengan Akun Google dibatalkan',
          type: 'danger',
          duration: 3000,
          backgroundColor: '#FF5C5C',
        });
        console.log(error);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        setLoading(false);
        showMessage({
          message: error,
        });
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        setLoading(false);
        showMessage({
          message: error,
        });
        console.log(error);
      } else {
        setLoading(false);
        showMessage({
          message: error,
        });
        console.log(error);
      }
    }
  };

  //Login with email biasa save on Firebase
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const backEndData = useContext(BackendDataContext);
  const onSubmit = () => {
    setLoading(true);
    if (email == '' && password == '') {
      showMessage({
        message: 'Mohon masukkan Email dan Password Anda terlebih dahulu',
        type: 'danger',
        duration: 3000,
        backgroundColor: '#FF5C5C',
      });
      setLoading(false);
      setValid(false);
    } else if (password == '') {
      showMessage({
        message: 'Mohon masukkan Password Anda',
        type: 'danger',
        duration: 3000,
        backgroundColor: '#FF5C5C',
      });
      setValid(false);
    } else if (email == '') {
      showMessage({
        message: 'Mohon masukkan Email Anda',
        type: 'danger',
        duration: 3000,
        backgroundColor: '#FF5C5C',
      });
      setValid(false);
    } else {
      setValid(true);
      setLoading(true);
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(userCredential => {
          setLoading(true);
          //get data from firebase based on uid
          firebase
            .database()
            .ref('userscust')
            .child(userCredential.user.uid)
            .get()
            .then(snapshot => {
              if (snapshot.exists()) {
                //get the data
                const data = snapshot.val();
                const dataBaru = {...data};
                dataBaru.email = data.email;
                dataBaru.fullName = data.fullName;
                dataBaru.phone = data.phone;
                dataBaru.photo = `https://ui-avatars.com/api/?name=${dataBaru.fullName}`;
                //save the data in global
                backEndData.setUserDetail({
                  ...dataBaru,
                  uid: userCredential.user.uid,
                });
                setLoading(true);
                navigation.replace('Dashboard');
              } else {
                showMessage({
                  message:
                    'Tidak ada data yang tersedia dan diambil ketika login',
                  type: 'default',
                });
              }
            })
            .catch(error =>
              showMessage({
                message: error.message,
                type: 'danger',
                icon: 'danger',
                duration: 3000,
                titleStyle: {color: '#fff'},
                descriptionStyle: {color: '#fff'},
                containerStyle: {backgroundColor: '#f44336'},
              }),
            );
        })
        .catch(error => {
          showMessage({
            message: `Maaf akun dengan email ${email} belum terdaftar!`,
            type: 'warning',
            duration: 4000,
            backgroundColor: '#EDEDF3',
            color: '#223733',
          });
        });
      setEmail('');
      setPassword('');
    }
    setLoading(false);
  };

  return (
    <>
      <ScrollView>
        <View style={styles.Container}>
          <Gap height={50} />
          <View style={styles.Logo}>
            <LogoEBungaLogin width={166} height={172} />
          </View>
          <View style={styles.form}>
            <Card style={styles.cardLogin}>
              <TextInput
                style={[
                  valid === false ? styles.InputInvalid : styles.InputValid,
                ]}
                placeholder=" Masukkan Email Anda"
                placeholderTextColor="#A0A0A0"
                value={email}
                onChangeText={value => setEmail(value)}></TextInput>
              <Gap height={10} />
              <TextInput
                style={[
                  valid === false ? styles.InputInvalid : styles.InputValid,
                ]}
                placeholder=" Masukkan Password Anda"
                placeholderTextColor="#A0A0A0"
                secureTextEntry={visible}
                value={password}
                onChangeText={value => setPassword(value)}></TextInput>
              <TouchableOpacity
                onPress={() => {
                  setVisible(!visible);
                  setShow(!show);
                }}
                style={{
                  alignItems: 'center',
                  left: 140,
                  top: -42,
                }}>
                {show === false ? <ShowEye /> : <HideEye />}
              </TouchableOpacity>
              <Button
                style={styles.ButtonStyles}
                title="Masuk"
                onPress={onSubmit}
              />
            </Card>
          </View>
          <Gap height={10} />
          <View style={styles.textWrap}>
            <View style={styles.TextLogin}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 18,
                  fontFamily: 'Poppins-Medium',
                }}>
                Belum ada akun ? Daftar dulu
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.TextBold}> disini</Text>
              </TouchableOpacity>
            </View>
            <Text
              style={{
                alignSelf: 'center',
                marginTop: -110,
                fontFamily: 'Poppins-Medium',
                color: 'white',
                fontSize: 18,
              }}>
              Atau
            </Text>
            <Gap height={10} />
            <View style={{alignItems: 'center'}}>
              <ButtonGoogle
                title="    Masuk dengan Akun Google"
                onPress={googleLogin}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      {loading && <Loading />}
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#3DB599',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40,
    bottom: 120,
  },
  InputValid: {
    width: 324,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#3DB599',
    fontSize: 14,
    height: 45,
    marginTop: 10,
    bottom: 10,
  },
  InputInvalid: {
    width: 324,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#FF5C5C',
    fontSize: 14,
    height: 45,
    marginTop: 10,
    bottom: 10,
  },
  Logo: {
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('30%'),
    width: wp('100%'),
  },
  TextLogin: {
    height: 260,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  TextBold: {
    fontFamily: 'Poppins-Bold',
    color: 'white',
    fontSize: 18,
  },
  ButtonStyles: {
    width: 324,
    height: 45,
    alignSelf: 'center',
    marginTop: -10,
  },
  form: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: wp('5%'),
  },
  logoStyle: {
    alignSelf: 'center',
    width: 50,
    height: 50,
  },
  cardLogin: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    height: hp('30%'),
    width: wp('90%'),
  },
});
