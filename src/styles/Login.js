import {StyleSheet} from 'react-native';
import {Warna_Sekunder, Warna_Utama, Warna_Disable} from '../utils';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: Warna_Utama,
  },
  boxUser: {
    flexDirection: 'row',
    marginTop: '28%',
  },
  user: {
    marginLeft: 45,
  },
  boxText: {
    marginLeft: 25,
  },
  textWel: {
    fontSize: hp('2.3%'),
    color: 'white',
    fontFamily: 'Poppins-Regular',
  },
  textSign: {
    marginTop: '-7%',
    fontSize: hp('4%'),
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
  },
  container: {
    flex: 2,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    backgroundColor: 'white',
    paddingHorizontal: 30,
    marginTop: '15%',
    alignItems: 'center',
  },
  boxTextUsername: {
    marginTop: '15%',
  },
  boxUsername: {
    marginTop: '13%',
  },
  textUsername: {
    fontSize: hp('1.7%'),
    fontFamily: 'Poppins-Medium',
    color: 'black',
  },
  boxInput: {
    height: hp('7%'),
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Warna_Sekunder,
  },
  textInput: {
    marginLeft: 10,
    height: hp('6%'),
    width: wp('78%'),
  },
  boxBottom: {
    width: wp('80%'),
    height: hp('7%'),
    marginTop: '30%',
    backgroundColor: Warna_Utama,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBottom: {
    fontSize: hp('3%'),
    fontFamily: 'Poppins-Bold',
    color: 'white',
  },
  boxTextDont: {
    marginTop: '3%',
    flexDirection: 'row',
    textAlign: 'center',
  },
  textDon: {
    fontSize: hp('2%'),
    fontFamily: 'Poppins-Medium',
    color: Warna_Disable,
  },
  textSignUp: {
    fontSize: hp('2%'),
    fontFamily: 'Poppins-Medium',
    color: Warna_Utama,
  },
});
