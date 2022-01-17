import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  IconBack,
  IconLogout,
  IconHp,
  IconMaps,
  IconEdit,
  IconInfo,
} from '../../assets';
import {
  Warna_Sekunder,
  Warna_Utama,
  Warna_Disable,
  Warna_Background,
} from '../../utils';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class MyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      uriPhoto: null,
      token: '',
      loading: false,
      nama: '',
      no_telp: '',
      alamat: '',
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('profilePhoto').then(respon =>
      this.setState({uriPhoto: respon}),
    );
    AsyncStorage.getItem('token')
      .then(value => {
        if (value != null) {
          this.setState({token: value});
        } else {
          this.props.navigation.replace('Login');
        }
      })
      .then(() => this.userData())
      .catch(err => {
        console.log(err);
      });
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.userData();
    });
  }
  componentWillUnmount() {
    this.unsubscribe();
  }

  logOut() {
    console.log(this.state.token);
    fetch('https://star-comp.herokuapp.com/api/logout', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then(response => response.json())
      .then(result => {
        console.log(result.token);
        this.props.navigation.replace('Login');
      })
      .catch(error => {
        console.log('error', error);
      })
      .finally(() => this.setState({loading: false}));
  }
  warningLogout = () =>
    Alert.alert('Logout', 'Are you sure you want to log out', [
      {
        text: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => this.logOut(),
      },
    ]);

  userData() {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: {
        Authorization: `Bearer ${this.state.token}`,
      },
    };

    fetch('https://star-comp.herokuapp.com/api/me', requestOptions)
      .then(response => response.json())
      .then(result => {
        this.setState({
          nama: result.nama,
          no_telp: result.no_telp,
          alamat: result.alamat,
        });
        console.log(result);
      })
      .catch(error => console.log('error', error));
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.dummy}></View>

          <Text
            style={{
              fontSize: 20,
              fontFamily: 'Poppins-Regular',
              color: '#000',
            }}>
            My Profile
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.warningLogout()}>
            <IconLogout />
          </TouchableOpacity>
        </View>
        <View style={styles.body}>
          {this.state.uriPhoto !== null ? (
            <Image
              source={{uri: this.state.uriPhoto}}
              style={{
                width: windowWidth / 4,
                height: windowHeight / 7.7,
                borderRadius: 100,
              }}
            />
          ) : (
            <Image
              source={require('../../assets/image/user.png')}
              style={{
                width: windowWidth / 4,
                height: windowHeight / 7.7,
                borderRadius: 100,
              }}
            />
          )}
          <Text style={styles.username}>{this.state.nama}</Text>
          <View style={styles.frame}>
            <Text style={styles.teks}>Nomor Telepon</Text>
          </View>

          <View style={styles.box}>
            <IconHp />
            {this.state.no_telp !== null ? (
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: 13,
                  color: '#000',
                }}>
                {this.state.no_telp}
              </Text>
            ) : (
              <Text
                style={{
                  color: '#d03025',
                  fontSize: 15,
                  fontFamily: 'Poppins-Regular',
                }}>
                {' '}
                Data belum diisi{' '}
              </Text>
            )}
          </View>
          <View style={styles.frame}>
            <Text style={styles.teks}> Alamat </Text>
          </View>

          <View style={styles.box2}>
            <IconMaps />
            {this.state.alamat != null ? (
              <Text
                multiline={true}
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: 13,
                  color: '#000',
                }}>
                {this.state.alamat}
              </Text>
            ) : (
              <Text
                style={{
                  color: '#d03025',
                  fontSize: 15,
                  fontFamily: 'Poppins-Regular',
                }}>
                {' '}
                Data belum diisi{' '}
              </Text>
            )}
          </View>
          <View style={styles.layout}>
            <IconEdit />
            <Text
              style={{
                color: '#000',
                fontSize: 15,
                fontFamily: 'Poppins-Regular',
              }}>
              Edit Profile
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.props.navigation.navigate('EditProfile')}>
              <Icon name="chevron-right" size={30} color="#000" />
            </TouchableOpacity>
          </View>
          <View style={styles.layout}>
            <IconInfo />
            <Text
              style={{
                color: '#000',
                fontSize: 15,
                fontFamily: 'Poppins-Regular',
              }}>
              App Info
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.props.navigation.navigate('AppInfo')}>
              <Icon name="chevron-right" size={30} color="#000" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default MyProfile;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: Warna_Background,
  },
  body: {
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: windowWidth / 1,
    paddingHorizontal: 25,
    paddingVertical: 15,
  },
  username: {
    // paddingTop: 15,
    // paddingBottom: 30,
    marginTop: 15,
    marginBottom: 30,
    fontSize: 20,
    fontFamily: 'Poppins-Regular',
    color: '#000',
  },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    width: windowWidth / 1.2,
    height: windowHeight / 18,
    borderRadius: 5,
    // elevation: 8,
    backgroundColor: '#fff',
  },
  box2: {
    flexDirection: 'row',
    padding: 7,
    // alignItems: 'center',
    width: windowWidth / 1.2,
    height: windowHeight / 10,
    borderRadius: 5,
    // elevation: 8,
    backgroundColor: '#fff',
  },
  teks: {
    color: '#000',
    paddingTop: 15,
    paddingBottom: 5,
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
  },
  frame: {
    justifyContent: 'flex-end',
    width: windowWidth / 1.2,
    marginLeft: 15,
  },
  layout: {
    width: windowWidth / 1.2,
    height: windowHeight / 12,
    paddingTop: 30,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    width: windowWidth / 10,
    height: windowHeight / 20,
    borderRadius: 5,
    backgroundColor: '#fff',
    elevation: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dummy: {
    width: windowWidth / 10,
    height: windowHeight / 20,
    borderRadius: 5,
    backgroundColor: Warna_Background,
  },
});
