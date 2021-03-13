import React from 'react';
import {Text} from 'react-native';

export default ErrorText = ({text}) => {
  return <Text style={{color: 'red'}}>{text}</Text>;
};
