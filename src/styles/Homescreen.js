import {StyleSheet} from 'react-native';
import {Warna_Background, Warna_Sekunder} from '../utils';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
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
  boxText: {
    position: 'absolute',
    bottom: 5,
    left: 15,
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
