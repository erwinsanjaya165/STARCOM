import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Image, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LottieView from 'lottie-react-native';
import {styles} from '../../styles/DetailProduct';

export default class DetailProduct extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      token: '',
      loading: false,
    };
  }
  componentDidMount() {
    this.setState({id: this.props.route.params.id});
    AsyncStorage.getItem('token')
      .then(value => {
        if (value != null) {
          this.setState({
            token: value,
          });
          this.getProduct(this.props.route.params.id);
        } else {
          this.props.navigation.replace('Home');
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  getProduct(id) {
    this.setState({loading: true});
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: {
        Authorization: `Bearer ${this.state.token}`,
      },
    };

    fetch(`https://star-comp.herokuapp.com/api/show/${id}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        this.setState({
          gambar_barang: result.gambar_barang,
          nama_barang: result.nama_barang,
          harga_barang: result.harga_barang,
          deskripsi_barang: result.deskripsi_barang,
        });
      })
      .catch(error => console.log('error', error));
  }

  postKranjang() {
    var formdata = new FormData();
    formdata.append('jumlah', '1');

    var requestOptions = {
      method: 'POST',
      redirect: 'follow',
      body: formdata,
      headers: {
        Authorization: `Bearer ${this.state.token}`,
      },
    };

    fetch(
      `https://star-comp.herokuapp.com/api/keranjang/${this.state.id}`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        console.log(result);
        this.props.navigation.navigate('Cart');
      })
      .catch(error => console.log('error', error));
  }

  render() {
    return (
      <View style={styles.page}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* HEADER */}
          <View style={styles.boxBack}>
            <TouchableOpacity
              style={styles.back}
              onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-left" color="black" size={26} />
            </TouchableOpacity>
            <Text style={styles.textJdul}>Detail</Text>
          </View>
          {/* CONTAINER GAMBAR */}
          <View style={styles.containerGambar}>
            {this.state.loading ? (
              <Image
                source={{uri: this.state.gambar_barang}}
                style={styles.gambar}
              />
            ) : (
              <LottieView
                loop={true}
                autoPlay={true}
                source={require('../../assets/lottie/lf30_editor_jnnqakzj.json')}
              />
            )}
            {/* TEXT NAMA DAN HARGA BARANG */}
            <View style={styles.boxTextNma}>
              <Text style={styles.textNma}>{this.state.nama_barang}</Text>
              <Text style={styles.textHrga}>{this.state.harga_barang}</Text>
            </View>
          </View>
          {/* TEXT DESKRIPSION */}
          <View style={styles.boxText}>
            <Text style={styles.textDes}>Deskripsion</Text>
            {this.state.loading ? (
              <Text style={styles.textDesbrang}>
                {this.state.deskripsi_barang}
              </Text>
            ) : (
              <LottieView
                loop={true}
                autoPlay={true}
                source={require('../../assets/lottie/lf30_editor_jnnqakzj.json')}
              />
            )}
          </View>
        </ScrollView>
        {/* CONTAINER BAWAH */}
        <View style={styles.containerBottom}>
          <TouchableOpacity
            style={styles.bottomAdd}
            onPress={() => this.postKranjang()}>
            <Text style={styles.textAdd}>Add To Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
