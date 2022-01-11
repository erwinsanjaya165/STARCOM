import {StyleSheet} from 'react-native';
import {Warna_Sekunder, Warna_Utama} from '../utils';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: Warna_Utama,
  },
  back: {
    margin: 25,
    width: wp('10%'),
    height: hp('5%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxUser: {
    flexDirection: 'row',
    marginTop: '10%',
  },
  user: {
    marginLeft: 55,
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
    width: wp('100%'),
    height: hp('75%'),
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    backgroundColor: 'white',
    paddingHorizontal: 30,
    marginTop: '10%',
    alignItems: 'center',
  },
  boxTextUsername: {
    marginTop: '10%',
  },
  boxUsername: {
    marginTop: '10%',
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
    marginTop: '15%',
    backgroundColor: Warna_Utama,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: '17%',
  },
  textBottom: {
    fontSize: hp('3%'),
    fontFamily: 'Poppins-Bold',
    color: 'white',
  },
});
