import {StyleSheet} from 'react-native';
import {Warna_Background, Warna_Utama, Warna_Disable} from '../utils';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white',
  },
  boxback: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  back: {
    width: wp('8%'),
    height: hp('5%'),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 15,
  },
  textJdul: {
    fontSize: hp('3%'),
    fontFamily: 'Poppins-SemiBold',
    color: 'black',
  },
  loTit: {
    marginTop: '20%',
    alignItems: 'center',
  },
  logo: {
    width: wp('25%'),
    height: hp('12%'),
  },
  title: {
    width: wp('50%'),
    height: hp('5%'),
  },
  boxTextCopyright: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textCopyright: {
    fontSize: hp('2%'),
    fontFamily: 'Poppins-SemiBold',
    color: Warna_Disable,
  },
  boxNama2Pembuat: {
    marginTop: '25%',
  },
  textPembuat: {
    marginLeft: 25,
    fontSize: hp('2.1%'),
    fontFamily: 'Poppins-SemiBold',
    color: 'black',
  },
  boxuser: {
    marginTop: '5%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  textNama: {
    fontSize: hp('2%'),
    color: 'black',
    fontFamily: 'Poppins-Medium',
    marginLeft: 35,
  },
  textJurusan: {
    fontSize: hp('2%'),
    color: Warna_Disable,
    fontFamily: 'Poppins-Medium',
    position: 'absolute',
    right: 25,
  },
});
