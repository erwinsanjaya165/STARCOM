import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Warna_Background, Warna_Utama} from '../../utils';
import LottieView from 'lottie-react-native';
import {IconBack} from '../../assets';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

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

  postOrder() {
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
      `https://star-comp.herokuapp.com/api/order/${this.state.id}`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        console.log(result);
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
          <TouchableOpacity
            style={styles.bottomCheck}
            onPress={() => this.postOrder()}>
            <Text style={styles.textCheck}>Checkout</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: Warna_Background,
  },
  boxBack: {
    paddingTop: 17,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  back: {
    position: 'absolute',
    left: 20,
  },
  textJdul: {
    fontSize: hp('2.5%'),
    fontFamily: 'Poppins-SemiBold',
    color: 'black',
  },
  containerGambar: {
    height: hp('60%'),
    alignItems: 'center',
    backgroundColor: 'white',
  },
  gambar: {
    marginTop: '5%',
    width: wp('90%'),
    height: hp('45%'),
  },
  boxTextNma: {
    position: 'absolute',
    bottom: 5,
    left: 20,
  },
  textNma: {
    fontSize: hp('2%'),
    fontFamily: 'Poppins-SemiBold',
    color: 'black',
  },
  textHrga: {
    fontSize: hp('2.7%'),
    fontFamily: 'Poppins-Bold',
    color: Warna_Utama,
  },
  boxText: {
    padding: 20,
    backgroundColor: 'white',
    marginTop: '2%',
  },
  textDes: {
    fontSize: hp('2.3%'),
    fontFamily: 'Poppins-Medium',
    color: 'black',
  },
  textDesbrang: {
    fontSize: hp('2%'),
    fontFamily: 'Poppins-Light',
    color: 'black',
  },
  containerBottom: {
    paddingVertical: 7,
    height: hp('9%'),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
  },
  bottomCheck: {
    width: wp('40%'),
    height: hp('6'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    backgroundColor: Warna_Utama,
  },
  bottomAdd: {
    width: wp('40%'),
    height: hp('6'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    borderColor: Warna_Utama,
    borderWidth: 2,
  },
  textAdd: {
    fontSize: hp('2.3%'),
    fontFamily: 'Poppins-SemiBold',
    color: Warna_Utama,
  },
  textCheck: {
    fontSize: hp('2.3%'),
    fontFamily: 'Poppins-SemiBold',
    color: 'white',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
