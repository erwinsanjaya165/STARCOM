import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  AppInfo,
  Checkout,
  DetailProduct,
  Login,
  Register,
  Splash,
} from '../../src/screen';
import {Warna_Sekunder, Warna_Utama} from '../utils';
import {BottomTabs} from '../components/index';

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

export default class Router extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Homescreen"
            component={BottomTabs}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="DetailProduct"
            component={DetailProduct}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Checkout"
            component={Checkout}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AppInfo"
            component={AppInfo}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
