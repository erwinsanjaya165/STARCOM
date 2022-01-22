import React, {Component} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Warna_Background, Warna_Utama} from '../../utils';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

var Spinner = require('react-native-spinkit');

class Splash extends Component {
  constructor(props) {
    super(props);
    setTimeout(() => {
      AsyncStorage.getItem('token').then(value => {
        if (value != null) {
          this.props.navigation.replace('Homescreen');
        } else {
          this.props.navigation.replace('Login');
        }
      });
    }, 3000);
    this.state = {
      index: 0,
      types: [
        'CircleFlip',
        'Bounce',
        'Wave',
        'WanderingCubes',
        'Pulse',
        'ChasingDots',
        'ThreeBounce',
        'Circle',
        '9CubeGrid',
        'WordPress',
        'FadingCircle',
        'FadingCircleAlt',
        'Arc',
        'ArcAlt',
      ],
      size: 50,
      color: Warna_Utama,
      isVisible: true,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../../assets/image/logo.png')}
          style={styles.logo}
        />
        <Image
          source={require('../../assets/image/title.png')}
          style={styles.title}
        />
        <Spinner
          style={styles.spinner}
          isVisible={this.state.isVisible}
          size={this.state.size}
          type={'ThreeBounce'}
          color={this.state.color}
        />
      </View>
    );
  }
}

export default Splash;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  logo: {
    width: wp('30%'),
    height: hp('15%'),
    marginTop: '50%',
  },
  title: {
    width: wp('70%'),
    height: hp('7%'),
    marginBottom: '50%',
  },
  spinner: {
    width: wp('100%'),
    height: hp('10%'),
  },
});
