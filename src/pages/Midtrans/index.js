import React, {useContext, useEffect} from 'react';
import {WebView} from 'react-native-webview';
import BackendDataContext from '../../contexts/backEndDataContext';

const Midtrans = ({navigation}) => {
  const backEndData = useContext(BackendDataContext);

  useEffect(() => {
    console.log('INI LINK', backEndData.getSnap().dataHistoryItem);
  }, []);

  const onMessage = data => {
    if (data.nativeEvent.data === 'Selesai') {
      navigation.replace('RecentOrderPage');
    }
  };

  return (
    <WebView source={{uri: backEndData.getSnap().url}} onMessage={onMessage} />
  );
};

export default Midtrans;
