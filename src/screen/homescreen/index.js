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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
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
  }

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
        console.log(result[0]);
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
          <TouchableOpacity
            style={styles.boxIconSearch}
            onPress={() => this.props.navigation.navigate('AppInfo')}>
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
              <View>
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

const styles = StyleSheet.create({
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  page: {
    flex: 1,
    backgroundColor: Warna_Background,
  },
  boxTextJudul: {
    marginHorizontal: 20,
    marginTop: '20%',
  },
  textStar: {
    fontSize: hp('3.5%'),
    fontFamily: 'Poppins-SemiBold',
    color: 'black',
  },
  textCom: {
    fontSize: hp('2%'),
    marginTop: '-4%',
    fontFamily: 'Poppins-Light',
    color: 'black',
  },
  boxSerCon: {
    flexDirection: 'row',
    marginTop: '5%',
    paddingHorizontal: 15,
  },
  boxSearch: {
    width: wp('73%'),
    height: hp('6%'),
    borderRadius: 8,
    backgroundColor: 'white',
    marginRight: 15,
    elevation: 1,
  },
  textInput: {
    width: wp('67%'),
    height: hp('6%'),
    marginLeft: 10,
  },
  boxIconSearch: {
    width: wp('14.3%'),
    height: hp('6%'),
    elevation: 3,
    borderRadius: 8,
    backgroundColor: Warna_Sekunder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxProduct: {
    padding: 7,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  boxBarang: {
    width: wp('44%'),
    height: hp('25%'),
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 5,
    elevation: 3,
    margin: '2%',
  },
  gambar: {
    marginTop: '6%',
    width: wp('37%'),
    height: hp('17%'),
  },
  textNamBrang: {
    fontSize: hp('1.7%'),
    fontFamily: 'Poppins-Regular',
    color: 'black',
  },
  textHargaBrang: {
    fontSize: hp('1.7%'),
    fontFamily: 'Poppins-SemiBold',
    color: 'black',
  },
});
