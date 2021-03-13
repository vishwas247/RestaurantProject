import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../containers/Auth/LoginScreen";
import SignUpScreen from "../containers/Auth/SignUpScreen";
import RestaurantList from "../containers/Restaurant/RestaurantList";
import RestaurantDetail from "../containers/Restaurant/RestaurantDetail";

import {enableScreens}  from 'react-native-screens'
enableScreens(true)
const Stack = createStackNavigator();

// import { createStackNavigator } from '@react-navigation/stack';

// const Stack = createStackNavigator();

function MyStack() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName={'SignUp'}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="RestaurantList" component={RestaurantList}
      options={({ navigation }) => ({
        headerLeft:null
      })} />
      <Stack.Screen name="RestaurantDetail" component={RestaurantDetail} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MyStack


