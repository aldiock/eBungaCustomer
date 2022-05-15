import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {BackIcon} from '../../assets';
import {Button, Gap, TextInput, Loading} from '../../components';
import {showMessage} from 'react-native-flash-message';
import firebase from '../../config/firebase';

const SignUp = ({navigation}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  //fucntion to validate fullName,email,password,phone using regex and return true or false value to show error message
  const Validate = () => {
    //check condition is not empty text input fullname, email, password, phone before submit form
    if (fullName === '' && email === '' && password === '' && phone === '') {
      showMessage({
        message: 'Form Pendaftaran Belum Lengkap',
        type: 'danger',
      });
      return false;
    }

    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const phoneRegex = /^[0-9]{10,}$/;
    if (fullName === '') {
      showMessage({
        message: 'Mohon isi nama lengkap anda',
        type: 'danger',
      });
      return false;
    } else if (email === '') {
      showMessage({
        message: 'Mohon isi email anda',
        type: 'danger',
      });
      return false;
    } else if (!emailRegex.test(email)) {
      showMessage({
        message: 'Email anda tidak valid',
        type: 'danger',
      });
      return false;
    } else if (password === '') {
      showMessage({
        message: 'Mohon isi password anda',
        type: 'danger',
      });
      return false;
    } else if (password.length < 6) {
      showMessage({
        message: 'Password terlalu pendek',
        type: 'danger',
      });
      return false;
      //made else if for password doesn't match with confirm password field to show error message
    } else if (password !== confirmPassword) {
      showMessage({
        message: 'Password tidak Valid',
        type: 'danger',
      });
      return false;
    } else if (phone.length <= 11) {
      showMessage({
        message:
          'Mohon isi nomor telepon anda, pastikan tidak kurang dari 12 digit',
        type: 'danger',
      });
      return false;
    } else if (!phoneRegex.test(phone)) {
      showMessage({
        message: 'Nomor telepon anda tidak valid',
        type: 'danger',
      });
      return false;
    } else {
      return true;
    }
  };

  const onSubmit = () => {
    //use validate condition before submit to firebase backend server and show error message if there is any error on validation process or show success message if there is no error on validation process
    if (Validate()) {
      setLoading(true);
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
          setLoading(false);
          //get data from firebase based on uid
          firebase
            .database()
            .ref('userscust')
            .child(userCredential.user.uid)
            .set({
              fullName,
              email,
              phone,
            })
            .then(() => {
              showMessage({
                message: 'Pendaftaran Akun Berhasil',
                type: 'success',
              });
              navigation.navigate('Login');
            })
            .catch(error => {
              setLoading(false);
              showMessage({
                message: error.message,
                type: 'danger',
              });
            });
        })
        .catch(error => {
          setLoading(false);
          showMessage({
            message: error.message,
            type: 'danger',
          });
        });
    }
  };

  return (
    <>
      <ScrollView style={styles.Container}>
        <View style={styles.Container}>
          <Gap height={64} />
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <BackIcon style={styles.backIcon} />
          </TouchableOpacity>
          <View style={styles.form}>
            <Text style={styles.textHeader}>Daftar</Text>
            <Gap height={50} />
            <TextInput
              style={styles.Input}
              placeholder="Masukkan Nama Lengkap"
              placeholderTextColor="#A0A0A0"
              value={fullName}
              onChangeText={value => setFullName(value)}>
              <Text style={styles.TextTitle}>Nama Lengkap</Text>
            </TextInput>
            <Gap height={28} />
            <TextInput
              style={styles.Input}
              placeholder="Masukkan Email Anda"
              placeholderTextColor="#A0A0A0"
              value={email}
              onChangeText={value => setEmail(value)}>
              <Text style={styles.TextTitle}>Email</Text>
            </TextInput>
            <Gap height={28} />
            <TextInput
              style={styles.Input}
              placeholder="Minimal Password 6 Huruf/Angka"
              placeholderTextColor="#A0A0A0"
              secureTextEntry
              value={password}
              onChangeText={value => setPassword(value)}>
              <Text style={styles.TextTitle}>Password</Text>
            </TextInput>
            <Gap height={28} />
            <TextInput
              style={styles.Input}
              placeholder="Masukkan Lagi Password Anda"
              placeholderTextColor="#A0A0A0"
              secureTextEntry
              value={confirmPassword}
              onChangeText={value => setConfirmPassword(value)}>
              <Text style={styles.TextTitle}>Validasi Password</Text>
            </TextInput>
            <Gap height={28} />
            <TextInput
              style={styles.Input}
              placeholder="082XXXXXXXXX"
              placeholderTextColor="#A0A0A0"
              keyboardType={'numeric'}
              value={phone}
              onChangeText={value => setPhone(value)}>
              <Text style={styles.TextTitle}>Nomor Telepon</Text>
            </TextInput>
            <Gap height={15} />
            <Button
              style={styles.ButtonStyles}
              title="Lanjut"
              onPress={onSubmit}
            />
          </View>
        </View>
      </ScrollView>
      {loading && <Loading />}
    </>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#EDEDF3',
  },
  Input: {
    width: 334,
    height: 48,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'white',
    backgroundColor: 'white',
    fontSize: 14,
    paddingHorizontal: 15,
    elevation: 8,
    marginTop: 10,
    bottom: 5,
  },
  ButtonStyles: {
    width: 334,
    height: 45,
    alignSelf: 'center',
    borderRadius: 10,
  },
  form: {
    alignSelf: 'center',
  },
  TextTitle: {
    marginTop: -60,
    marginRight: -85,
    paddingHorizontal: 5,
    marginLeft: -15,
  },
  backIcon: {
    paddingLeft: 92,
  },
  textHeader: {
    alignSelf: 'center',
    fontFamily:'Poppins-Bold',
    fontSize: 18,
    marginTop: -30,
  },
});
