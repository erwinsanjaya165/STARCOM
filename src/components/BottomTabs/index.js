import React, {Component} from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {MyProfile, Cart, Home} from '../../screen';
import {Warna_Disable, Warna_Sekunder, Warna_Utama} from '../../utils';

const Tab = createMaterialBottomTabNavigator();

export default class BottomTabs extends Component {
  render() {
    return (
      <Tab.Navigator
        initialRouteName="Home"
        activeColor={Warna_Utama}
        inactiveColor={Warna_Disable}
        shifting={true}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: 'Home',
            tabBarColor: 'white',
            tabBarIcon: ({color}) => (
              <Icon name="home" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Cart"
          component={Cart}
          options={{
            tabBarLabel: 'Cart',
            tabBarColor: 'white',
            tabBarIcon: ({color}) => (
              <Icon name="cart" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="MyProfile"
          component={MyProfile}
          options={{
            tabBarLabel: 'Profile',
            tabBarColor: 'white',
            tabBarIcon: ({color}) => (
              <Icon name="account" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}
