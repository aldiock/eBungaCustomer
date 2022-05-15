import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {BottomNav} from '../components';
import {
  CekProsesPesanan,
  Chat,
  ComplainPage,
  CustomPage,
  Dashboard,
  ListItemToko,
  LoginScreen,
  MyOrderLists,
  ProfilePage,
  RecentOrderPage,
  SignUp,
  SplashScreen,
  Midtrans,
  Maps,
  OrderSelesai,
  Success,
} from '../pages';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MainApp = ({}) => {
  return (
    <Tab.Navigator tabBar={props => <BottomNav {...props} />}>
      <Tab.Screen
        name="ListItemToko"
        component={ListItemToko}
        options={{
          headerShown: false,
          title: 'Home',
          tabBarHideOnKeyboard: true,
        }}
      />
      <Tab.Screen name="Chat" component={Chat} options={{headerShown: false}} />
      <Tab.Screen
        name="Keranjang"
        component={MyOrderLists}
        options={{headerShown: false, title: 'Keranjang'}}
      />
      <Tab.Screen
        name="Profile"
        component={ProfilePage}
        options={{headerShown: false, title: 'Profile'}}
      />
    </Tab.Navigator>
  );
};

const Router = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RecentOrderPage"
        component={RecentOrderPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CustomPage"
        component={CustomPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ComplainPage"
        component={ComplainPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ListItemToko"
        component={ListItemToko}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CekOrderPesanan"
        component={CekProsesPesanan}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Midtrans"
        component={Midtrans}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Maps"
        component={Maps}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OrderSelesai"
        component={OrderSelesai}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Success"
        component={Success}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Router;
