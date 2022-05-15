import {Dimensions} from 'react-native';

const heightMobileUI = 896;
const widthMobileUI = 414;

export const numberWithCommas = x => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const responsiveWidth = width => {
  return (Dimensions.get('window').width * width) / widthMobileUI;
};

export const responsiveHeight = height => {
  return (Dimensions.get('window').height * height) / heightMobileUI;
};
