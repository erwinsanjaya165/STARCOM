import React, {Component} from 'react';
import {Dimensions, StyleSheet, View, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

var Spinner = require('react-native-spinkit');
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

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
      color: '#03AC0E',
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
    backgroundColor: '#ffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginTop: 200,
  },
  title: {
    width: windowWidth / 1.2,
    height: windowHeight / 10,
    marginBottom: 200,
  },
  spinner: {
    width: windowWidth / 7.5,
    height: windowHeight / 7.5,
  },
});
