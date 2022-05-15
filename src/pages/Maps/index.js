import React, {useContext, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Button from '../../components/atoms/Button/index';
import {Card, Gap} from '../../components';
import BackendDataContext from '../../contexts/backEndDataContext';
import firebase from '../../config/firebase/index';

const Maps = ({navigation}) => {
  const backEndData = useContext(BackendDataContext);
  const latitude = 1.444826;
  const longitude = 125.184435;
  const [pickLoc, setPickLOc] = useState({
    coordinate: {
      longitude: longitude,
      latitude: latitude,
    },
  });

  const saveLocation = () => {
    // save data global
    backEndData.setLocation({
      pickLoc,
    });
    firebase
      .database()
      .ref(`users/${backEndData.getStoreItem().uidLogin}`)
      .child('_cekLocation')
      .set(pickLoc);

    navigation.goBack(pickLoc);
  };

  return (
    <>
      <View style={{flex: 1}}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{flex: 1}}
          initialRegion={{
            latitude: pickLoc.coordinate.latitude,
            longitude: pickLoc.coordinate.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.015,
          }}
          onRegionChangeComplete={region => {
            setPickLOc({
              coordinate: {
                longitude: region.longitude,
                latitude: region.latitude,
              },
            });
          }}>
          <Marker
            coordinate={pickLoc.coordinate}
            title={'Lokasi Pengantaran Anda disini'}
          />
        </MapView>
        <View style={{top: 10}}>
          <Card style={styles.cardBottomContainer}>
            <Text
              style={{
                fontSize: 16,
                color: '#3DB599',
                fontFamily: 'Poppins-Bold',
                marginRight: 55,
                marginTop: 20,
              }}>
              Pilih lokasi pengantaran anda...
            </Text>
            <Button
              style={{width: 320, height: 45, marginTop: 20}}
              title="Simpan Lokasi"
              onPress={saveLocation}
            />
          </Card>
        </View>
      </View>
    </>
  );
};

export default Maps;

const styles = StyleSheet.create({
  cardBottomContainer: {
    width: 414,
    height: 156,
    backgroundColor: '#EDEDF3',
  },
});
