import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Warna_Background} from '../../utils';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Cart extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      token: '',
      id: '',
    };
  }

  componentDidMount() {
    console.log(this.state.token);
    AsyncStorage.getItem('token')
      .then(value => this.getKeranjang(value))
      .catch(error => console.log('error', error));
  }

  getKeranjang(token) {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    fetch('https://star-comp.herokuapp.com/api/keranjang', requestOptions)
      .then(response => response.json())
      .then(result => {
        this.setState({data: result.keranjang});
        console.log(this.state.data);
      })
      .catch(error => console.log('error', error));
  }

  render() {
    return (
      <View style={styles.page}>
        <View style={styles.boxJdul}>
          <Text style={styles.textJdul}>Keranjang</Text>
        </View>
        {this.state.data.map(item => {
          return <Text>{item.harga}</Text>;
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: Warna_Background,
  },
  boxJdul: {
    paddingTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textJdul: {
    fontSize: hp('2.5%'),
    fontFamily: 'Poppins-SemiBold',
    color: 'black',
  },
});
