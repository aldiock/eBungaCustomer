import React, {useContext, useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import {EmptyChat, SendM} from '../../assets';
import {Gap, Loading, Card} from '../../components';
import firebase from '../../config/firebase/index';
import BackendDataContext from '../../contexts/backEndDataContext';
import {showMessage} from 'react-native-flash-message';

const Chat = ({route, navigation}) => {
  const backEndData = useContext(BackendDataContext);
  const [loading, setLoading] = useState(false);
  const [chat, setChat] = useState('');
  const [chatLoad, setChatLoad] = useState('');
  const [mineChat, setMineChat] = useState(true);
  const tanggal = `${new Date().toString()}`;
  const uidLogin = backEndData.getStoreItem().uidLogin;
  const idUser =
    backEndData.getUserDetails().uid || backEndData.getUserDetails().user.id;

  useEffect(() => {
    loadChat();
  }, []);

  const CardChat = ({textChat, namaUser, date, photo, ...props}) => {
    const newDate = date;
    const subDate = newDate.substring(0, 24);
    return (
      <View style={styles.mainContentCard}>
        <View
          style={[
            mineChat === true
              ? styles.photoUserContainer
              : styles.photoUserContainerLawan,
          ]}>
          <Text style={styles.textUsername}>{namaUser}</Text>
          <Image
            style={styles.GambarItem}
            source={{
              uri: photo,
            }}
          />
        </View>
        <View style={styles.cardContainerChat}>
          <Card style={styles.cardStyle}>
            <Text style={{}} numberOfLines={4}>
              {textChat}
            </Text>
          </Card>
          <Text style={styles.dateStyle}>{subDate}</Text>
        </View>
      </View>
    );
  };

  const sendChat = () => {
    if (chat == '') {
      showMessage({
        message: 'Chat tidak boleh kosong',
        type: 'danger',
        icon: 'danger',
        duration: 2000,
        description: 'Silahkan isi chat anda',
        titleStyle: {color: '#fff'},
        descriptionStyle: {color: '#fff'},
        containerStyle: {backgroundColor: '#f44336'},
      });
    } else {
      setLoading(true);
      const data = {
        chat: chat,
        date: tanggal,
        idUser: idUser,
        namaUser: `${
          backEndData.getUserDetails().fullName ||
          backEndData.getUserDetails().user.name
        }`,
        photo: `${
          backEndData.getUserDetails().photo ||
          backEndData.getUserDetails().user.photo
        }`,
        idToko: uidLogin,
      };
      firebase.database().ref(`users/${uidLogin}`).child('chat').push(data);
      setChat('');
    }
  };

  const loadChat = () => {
    setLoading(true);
    firebase
      .database()
      .ref(`users/${uidLogin}/chat`)
      .orderByChild('idToko')
      .equalTo(uidLogin)
      .on('value', querySnapshot => {
        setLoading(false);
        let dataChat = querySnapshot.val();
        setChatLoad(dataChat);
      });
    console.log('INI CHATLOAD', chatLoad);
  };

  return (
    <>
      <View style={styles.Container}>
        <ScrollView>
          {chatLoad ? (
            Object.keys(chatLoad).map(key => {
              return (
                <>
                  {
                    //made function to make card chat condition different based on idUser if idUser is mine set mineChat to true else set mineChat to false
                    chatLoad[key].idUser === idUser ? (
                      <CardChat
                        key={key}
                        textChat={chatLoad[key].chat}
                        namaUser={chatLoad[key].namaUser}
                        date={chatLoad[key].date}
                        photo={chatLoad[key].photo}
                        mineChat={true}
                      />
                    ) : (
                      <CardChat
                        key={key}
                        textChat={chatLoad[key].chat}
                        namaUser={chatLoad[key].namaUser}
                        date={chatLoad[key].date}
                        photo={chatLoad[key].photo}
                        mineChat={false}
                      />
                    )
                  }
                </>
              );
            })
          ) : (
            <View style={{alignItems: 'center', marginTop: 248}}>
              <EmptyChat />
              <Gap height={10}/>
              <Text style={{fontFamily:'Poppins-Bold', color:'#11A962'}}>Belum ada percakapan di toko ini...</Text>
            </View>
          )}
        </ScrollView>
        <View style={styles.containerInput}>
          <TextInput
            style={styles.inputTextStyle}
            placeholder="Ketik pesan anda"
            maxLength={36}
            value={chat}
            onChangeText={e => setChat(e)}
          />
        </View>
        <TouchableOpacity onPress={sendChat} style={styles.iconSend}>
          <SendM />
        </TouchableOpacity>
        <Gap height={10} />
      </View>
    </>
  );
};

export default Chat;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'white',
  },
  inputTextStyle: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#5A5A5A',
    width: 380,
    height: 48,
    paddingHorizontal: 16,
  },
  containerInput: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconSend: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    paddingHorizontal: 10,
  },
  //BATAS STYLE FOR CARD
  mainContentCard: {
    marginHorizontal: 30,
    marginTop: 5,
  },
  photoUserContainer: {
    marginRight: 180,
    borderRadius: 23,
  },
  photoUserContainerLawan: {
    marginLeft: 180,
    left: 80,
    borderRadius: 23,
  },
  cardContainerChat: {
    width: 180,
    marginLeft: 28,
  },
  cardContainerChatLawan: {
    width: 180,
    marginLeft: 58,
  },
  cardStyle: {
    borderRadius: 6,
    width: 261,
    height: 26,
    backgroundColor: '#EBEBEB',
  },
  cardStyleLawan: {
    borderRadius: 6,
    width: 261,
    height: 26,
    backgroundColor: '#A7FF99',
  },
  textUsername: {
    paddingLeft: 60,
    top: 30,
  },
  textUsernameLawan: {
    paddingLeft: 60,
    left: -180,
    top: 30,
  },
  dateStyle: {
    fontSize: 12,
    opacity: 0.5,
    bottom: 5,
  },
  dateStyleLawan: {
    fontSize: 12,
    opacity: 0.5,
    bottom: 5,
    left: 85,
  },
  itemHeader: {
    fontSize: 14,
  },
  GambarItem: {
    borderRadius: 40,
    width: 50,
    height: 50,
    marginRight: 60,
  },
});
