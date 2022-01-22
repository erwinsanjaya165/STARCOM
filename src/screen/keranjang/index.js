import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {Warna_Background} from '../../utils';
import {IconDelete} from '../../assets';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class Cart extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      token: '',
      id: '',
      loading: false,
      barang_id: '',
      nama1: 'Motherboard B450',
      nama2: 'Ryzen 5 3600',
      img1:
        'https://res.cloudinary.com/star-com/image/upload/v1640835812/MP1/Mobo_B450_ouptc3.jpg',
      img2:
        'https://res.cloudinary.com/star-com/image/upload/v1642347784/MP1/2022-01-16_154304_Ryzen_5.jpg',
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('token')
      .then(value => {
        if (value != null) {
          this.setState({token: value});
        } else {
          this.props.navigation.navigate('Home');
        }
      })
      .then(() => this.getKeranjang())
      .catch(err => {
        console.log(err);
      });
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getKeranjang();
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  getKeranjang() {
    this.setState({loading: true});
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: {
        Authorization: `Bearer ${this.state.token}`,
      },
    };

    fetch('https://star-comp.herokuapp.com/api/keranjang', requestOptions)
      .then(response => response.json())
      .then(result => {
        this.setState({
          data: result.keranjang,
          loading: false,
          // .map(item => item[0]),
        });
        this.render();
        console.log(this.state.data);
        // .map(item => item[0]);
      })
      .catch(error => {
        this.setState({loading: false});
        console.log('error', error);
      });
  }

  DelKranjang(id) {
    console.log(id);
    var requestOptions = {
      method: 'DELETE',
      redirect: 'follow',
      headers: {
        Authorization: `Bearer ${this.state.token}`,
      },
    };

    fetch(
      `https://star-comp.herokuapp.com/api/hapus_keranjang/${id}`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        this.getKeranjang();
        console.log(result);
      })
      .catch(error => console.log('error', error));
  }

  // postOrder() {
  //   console.log(this.state.id);
  //   var requestOptions = {
  //     method: 'POST',
  //     redirect: 'follow',
  //     headers: {
  //       Authorization: `Bearer ${this.state.token}`,
  //     },
  //   };

  //   fetch(
  //     `https://star-comp.herokuapp.com/api/order/${this.state.id}`,
  //     requestOptions,
  //   )
  //     .then(response => response.json())
  //     .then(result => console.log(result))
  //     .catch(error => console.log('error', error));
  // }

  imgProduct(id) {
    if (id == 1) {
      return <Image source={{uri: this.state.img1}} style={styles.gambar} />;
    } else if (id == 2) {
      return <Image source={{uri: this.state.img2}} style={styles.gambar} />;
    } else {
      console.log('Gambar Tidak ada');
    }
  }

  namaProduct(id) {
    if (id == 1) {
      return <Text style={styles.textNmaBrang}>{this.state.nama1}</Text>;
    } else if (id === 2) {
      return <Text style={styles.textNmaBrang}>{this.state.nama2}</Text>;
    } else {
      console.log('nama Tidak ada');
    }
  }

  render() {
    return (
      <View style={styles.page}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* HEADER */}
          <View style={styles.boxJdul}>
            <Text style={styles.textJdul}>Keranjang</Text>
          </View>
          {/* BOX BARANG */}
          {this.state.loading ? (
            <View style={styles.loading}>
              <LottieView
                loop={true}
                autoPlay={true}
                source={require('../../assets/lottie/lf30_editor_jnnqakzj.json')}
              />
            </View>
          ) : (
            <View style={styles.containerBrang}>
              {this.state.data.map((value, index) => (
                <View key={index} style={styles.boxBrang}>
                  <TouchableOpacity
                    style={styles.iconHapus}
                    onPress={() => this.DelKranjang(value.id)}>
                    <Icon name="trash-can-outline" color="black" size={23} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.boxImgText}
                    onPress={() => {
                      this.props.navigation.navigate('Order', {
                        data: value.barang_id,
                        harga: value.harga,
                      });
                    }}>
                    {this.imgProduct(value.barang_id)}
                    <View style={styles.boxText}>
                      {this.namaProduct(value.barang_id)}
                      <Text style={styles.textJmlahBrang}>
                        jumlah barang : 1
                      </Text>
                      <View style={styles.boxTextHarga}>
                        <Text style={styles.textHarga}> Rp</Text>
                        <Text style={styles.textHrgaBrang}>{value.harga}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('100%'),
    height: hp('100%'),
  },
  page: {
    flex: 1,
    backgroundColor: Warna_Background,
  },
  boxJdul: {
    paddingTop: '5%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textJdul: {
    fontSize: hp('2.5%'),
    fontFamily: 'Poppins-SemiBold',
    color: 'black',
  },
  containerBrang: {
    marginTop: '7%',
    padding: 15,
  },
  boxBrang: {
    marginTop: '5%',
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: 'black',
    padding: 15,
  },
  iconHapus: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  boxImgText: {
    flexDirection: 'row',
  },
  gambar: {
    width: wp('30%'),
    height: hp('15%'),
  },
  boxText: {
    padding: 10,
    paddingLeft: 15,
  },
  textNmaBrang: {
    fontSize: hp('2%'),
    fontFamily: 'Poppins-Regular',
    color: 'black',
  },
  textJmlahBrang: {
    marginTop: '3%',
    fontSize: hp('1.7%'),
    fontFamily: 'Poppins-Light',
    color: 'black',
  },
  boxTextHarga: {
    flexDirection: 'row',
    marginTop: '10%',
  },
  textHarga: {
    fontSize: hp('2%'),
    fontFamily: 'Poppins-Bold',
    color: 'black',
  },
  textHrgaBrang: {
    marginLeft: 5,
    fontSize: hp('2%'),
    fontFamily: 'Poppins-Bold',
    color: 'black',
  },
});
