import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Warna_Background, Warna_Disable, Warna_Utama} from '../../utils';
import {IconMaps, IconUang} from '../../assets';

export default class Checkout extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      id: '',
      nama_barang: '',
      gambar_barang: '',
      harga_barang: '',
      deskripsi_barang: '',
    };
  }
  componentDidMount() {
    console.log(this.props.route.params.data);
    AsyncStorage.getItem('token')
      .then(value => {
        if (value != null) {
          this.setState({
            data: this.props.route.params.data,
          });
        } else {
          this.props.navigation.goBack();
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return (
      <View style={styles.page}>
        <ScrollView>
          <View style={styles.boxBack}>
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
              style={styles.back}>
              <Icon name="arrow-left" color="black" size={26} />
            </TouchableOpacity>
            <Text style={styles.textJdul}>Checkout</Text>
          </View>
          <View style={styles.boxPertama}>
            <View style={styles.boxAlamat}>
              <Text style={styles.textAlmat}>Alamat Penerima</Text>
              <View style={styles.boxMapsText}>
                <IconMaps />
                <Text style={styles.textJlan}>
                  jl.mappasessu rt 08 rw 09 sungai jfdsgfdgfdgdsgfdgsd
                  dffdgdfdsgdsfgdsfgamatan sadu
                </Text>
              </View>
            </View>
            <View style={styles.boxProduct}>
              <Image
                source={{uri: this.state.data.gambar_barang}}
                style={styles.gambar}
              />
              <View style={styles.boxText}>
                <Text style={styles.textNmaBrang}>
                  {this.state.data.nama_barang}
                </Text>
                <Text style={styles.textHrgaBrang}>
                  {this.state.data.harga_barang}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={styles.boxBawah}>
          <View style={styles.boxCodAndBottom}>
            <View style={styles.boxCod}>
              <IconUang />
              <Text>pilih metode pembayaran </Text>
            </View>
            <TouchableOpacity style={styles.boxBeli}>
              <Text style={styles.textBeli}>Beli</Text>
            </TouchableOpacity>
          </View>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  back: {
    position: 'absolute',
    left: 15,
  },
  textJdul: {
    fontSize: hp('2.5%'),
    fontFamily: 'Poppins-SemiBold',
    color: 'black',
  },
  boxPertama: {
    alignItems: 'center',
  },
  boxAlamat: {
    marginTop: '17%',
    width: wp('90%'),
    height: hp('13%'),
    backgroundColor: 'white',
    padding: 7,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Warna_Disable,
  },
  textAlmat: {
    fontSize: hp('1.7%'),
    fontFamily: 'Poppins-SemiBold',
    color: 'black',
  },
  boxMapsText: {
    padding: 5,
    flexDirection: 'row',
  },
  textJlan: {
    marginLeft: 10,
    fontSize: hp('1.5%'),
    fontFamily: 'Poppins-Regular',
    color: 'black',
  },
  boxProduct: {
    marginTop: '5%',
    paddingVertical: 7,
    paddingHorizontal: 20,
    flexDirection: 'row',
    elevation: 3,
    backgroundColor: 'white',
    borderRadius: 5,
    width: wp('90%'),
    height: hp('13%'),
  },
  gambar: {
    width: wp('27%'),
    height: hp('11%'),
  },
  boxText: {
    marginTop: '3%',
    marginLeft: '4%',
  },
  textNmaBrang: {
    fontSize: hp('1.7%'),
    fontFamily: 'Poppins-Regular',
    color: 'black',
  },
  textHrgaBrang: {
    fontSize: hp('2%'),
    fontFamily: 'Poppins-SemiBold',
    color: 'black',
  },
  boxBawah: {
    backgroundColor: Warna_Background,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  boxCodAndBottom: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  boxCod: {
    width: wp('54%'),
    height: hp('10%'),
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Warna_Disable,
  },
  boxBeli: {
    width: wp('30%'),
    height: hp('7%'),
    backgroundColor: Warna_Utama,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBeli: {
    fontSize: hp('2.3%'),
    fontFamily: 'Poppins-SemiBold',
    color: 'black',
  },
});
