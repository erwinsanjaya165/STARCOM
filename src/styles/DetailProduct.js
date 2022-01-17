import {StyleSheet} from 'react-native';
import {Warna_Background, Warna_Utama} from '../utils';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: Warna_Background,
  },
  boxBack: {
    paddingTop: '4%',
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
    fontSize: hp('2.3%'),
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
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomAdd: {
    width: wp('80%'),
    height: hp('6'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    backgroundColor: Warna_Utama,
  },
  textAdd: {
    fontSize: hp('2.5%'),
    fontFamily: 'Poppins-SemiBold',
    color: 'white',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
