import {NavigationContainer} from '@react-navigation/native';
import React, {useState} from 'react';
import FlashMessage from 'react-native-flash-message';
import {BackendDataProvider} from './contexts/backEndDataContext';
import Router from './router';

const App = () => {
  const [backEndData, setbackEndData] = useState();

  //for users
  const setUserDetail = data => {
    setbackEndData(prevState => ({...prevState, userData: data}));
  };

  const getUserDetails = () => {
    return backEndData.userData;
  };

  //for pick toko mo liat dpe item di dalam
  const setStoreItem = data => {
    setbackEndData(prevState => ({...prevState, storeData: data}));
  };

  const getStoreItem = () => {
    return backEndData.storeData;
  };

  //for ba save data order item dari customer
  const setOrderItem = data => {
    setbackEndData(prevState => ({...prevState, storeOrder: data}));
  };

  const getOrderItem = () => {
    return backEndData.storeOrder;
  };

  //for my order list to custom pesanan
  const setCustomItem = data => {
    setbackEndData(prevState => ({...prevState, customOrder: data}));
  };

  const getCustomItem = () => {
    return backEndData.customOrder;
  };

  //for passing snapMidtrans
  const setSnap = data => {
    setbackEndData(prevState => ({...prevState, snapMidtrans: data}));
  };

  const getSnap = () => {
    return backEndData.snapMidtrans;
  };

  //for saveLocation from maps
  const setLocation = data => {
    setbackEndData(prevState => ({...prevState, saveLocation: data}));
  };

  const getLocation = () => {
    return backEndData.saveLocation;
  };

  //for complain
  const setComplain = data => {
    setbackEndData(prevState => ({...prevState, complainItem: data}));
  };

  const getComplain = () => {
    return backEndData.complainItem;
  };

  return (
    <>
      <BackendDataProvider
        value={{
          data: backEndData,
          setUserDetail: setUserDetail,
          getUserDetails: getUserDetails,
          setStoreItem: setStoreItem,
          getStoreItem: getStoreItem,
          setOrderItem: setOrderItem,
          getOrderItem: getOrderItem,
          setCustomItem: setCustomItem,
          getCustomItem: getCustomItem,
          setSnap: setSnap,
          getSnap: getSnap,
          setLocation: setLocation,
          getLocation: getLocation,
          setComplain: setComplain,
          getComplain: getComplain,
        }}>
        <NavigationContainer>
          <Router />
        </NavigationContainer>
      </BackendDataProvider>
      <FlashMessage position="top" />
    </>
  );
};
export default App;
