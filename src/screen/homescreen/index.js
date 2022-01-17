import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import {styles} from '../../styles/Homescreen';
import {IconSearch} from '../../assets';
import {Warna_Sekunder, Warna_Background, Warna_Utama} from '../../utils/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      loading: false,
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('token')
      .then(value => {
        if (value != null) {
          this.setState({token: value});
        } else {
          this.props.navigation.replace('Login');
        }
      })
      .then(() => this.getStar())
      .catch(err => {
        console.log(err);
      });
    // this._unsubscribe = this.props.navigation.addListener('focus', () => {
    //   this.getStar();
    // });
  }

  // componentWillUnmount() {
  //   this._unsubscribe();
  // }

  getStar() {
    this.setState({loading: true});
    fetch('https://star-comp.herokuapp.com/api/home', {
      method: 'GET',
      redirect: 'follow',
      headers: {
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then(response => response.json())
      .then(result => {
        console.log(result);
        this.setState({data: result});
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => this.setState({loading: false}));
  }

  render() {
    return this.state.loading ? (
      <View style={styles.loading}>
        <LottieView
          loop={true}
          autoPlay={true}
          source={require('../../assets/lottie/loading.json')}
        />
      </View>
    ) : (
      <View style={styles.page}>
        {/* TEXT TITLE */}
        <View style={styles.boxTextJudul}>
          <Text style={styles.textStar}>StarCom</Text>
          <Text style={styles.textCom}>Computer Store</Text>
        </View>
        {/* SEARCH */}
        <View style={styles.boxSerCon}>
          <View style={styles.boxSearch}>
            <TextInput placeholder="search" style={styles.textInput} />
          </View>
          <TouchableOpacity style={styles.boxIconSearch}>
            <IconSearch />
          </TouchableOpacity>
        </View>
        {/* DATA */}
        <View style={styles.boxProduct}>
          {this.state.data.map((value, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                this.props.navigation.navigate('DetailProduct', {
                  id: value.id,
                });
              }}
              style={styles.boxBarang}>
              <Image
                source={{uri: value.gambar_barang}}
                style={styles.gambar}
              />
              <View style={styles.boxText}>
                <Text style={styles.textNamBrang}>{value.nama_barang}</Text>
                <Text style={styles.textHargaBrang}>{value.harga_barang}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }
}
