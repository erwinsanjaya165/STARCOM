import React, {Component, useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  Modal,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {
  Warna_Background,
  Warna_Utama,
  Warna_Disable,
  Warna_Sekunder,
} from '../../utils';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const EditProfile = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [uri, setUri] = React.useState(null);
  const [resPhoto, setResPhoto] = useState(false);
  const [nama, setNama] = useState('');
  const [no_telp, setNoTelp] = useState(0);
  const [alamat, setAlamat] = useState('');
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');
  const navigation = useNavigation();

  // useEffect ( () => {
  //   AsyncStorage.getItem ('token')
  //   .then(value =>{
  //     if (value != null) {

  //     }
  //   })
  // }

  const takePhoto = () => {
    const options = {
      maxHeight: 200,
      maxWidth: 200,
      selectionLimit: 0,
      mediaType: 'photo',
      includeBase64: false,
    };
    launchCamera(options, res => {
      if (res.didCancel) {
        console.log('User canceled camera');
      } else if (res.errorCode) {
        console.log(res.errorMessage);
      } else {
        setUri(res.assets[0].uri);
        setResPhoto(true);
        // console.log(res);
        // console.log(setUri);
      }
    });
  };
  const pickLibrary = () => {
    const options = {
      maxHeight: 200,
      maxWidth: 200,
      selectionLimit: 0,
      mediaType: 'photo',
      includeBase64: false,
    };
    launchImageLibrary(options, res => {
      if (res.didCancel) {
        console.log('User canceled gallery');
      } else if (res.errorCode) {
        console.log(res.errorMessage);
      } else {
        // const data = res.assets[0];
        setUri(res.assets[0].uri);
        setResPhoto(true);
        // console.log(res.assets[0].uri);
      }
    });
  };

  useEffect(() => {
    console.log(uri);
    // console.log(resPhoto);
    // resPhoto !== null
    //   ? setUri(resPhoto.assets[0].uri)
    //   : console.log('tidak ada foto');
    AsyncStorage.getItem('token')
      .then(value => {
        if (value != null) {
          setToken(value);
        } else {
          navigation.replace('Login');
        }
      })
      // .then(() => this.userData())
      .catch(err => {
        console.log(err);
      });
    if (uri !== null) {
      AsyncStorage.setItem('profilePhoto', uri);
      // setUri(resPhoto.assets[0].uri);
      // console.log(resPhoto);
    } else {
      console.log('tidak ada photo');
    }
  }, [uri]);

  function userEdit() {
    setLoading(true);
    var formdata = new FormData();
    formdata.append('nama', nama);
    formdata.append('alamat', alamat);
    formdata.append('no_telp', no_telp);
    formdata.append('_method', 'put');

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    fetch('https://star-comp.herokuapp.com/api/update', requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        setLoading(false);
        navigation.goBack('MyProfile');
      })

      .catch(error => {
        console.log('error', error);
        setLoading(false);
      });
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={styles.button}>
            <Material name="chevron-left" size={25} color="#000" />
          </View>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 20,
            fontFamily: 'Poppins-Regular',
            color: '#000',
          }}>
          Edit Profile
        </Text>
        <View style={styles.dummy}></View>
      </View>
      <View style={styles.body}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          {resPhoto ? (
            <Image
              source={{uri: uri}}
              style={{
                width: 150,
                height: 150,
                borderRadius: 100,
                marginTop: 15,
                marginBottom: 30,
              }}
            />
          ) : (
            <Image
              source={require('../../assets/image/user.png')}
              style={{
                width: windowWidth / 4,
                height: windowHeight / 7.7,
                borderRadius: 100,
                marginBottom: 25,
              }}
            />
          )}
        </TouchableOpacity>
        <View style={styles.frame}>
          <Text style={styles.title}>Nama Lengkap</Text>
        </View>

        <View style={styles.box}>
          <TextInput
            style={styles.input}
            value={nama}
            onChangeText={value => setNama(value)}
          />
        </View>
        <View style={styles.frame}>
          <Text style={styles.title}>Nomor Handphone</Text>
        </View>

        <View style={styles.box}>
          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            value={no_telp}
            onChangeText={value => setNoTelp(value)}
          />
        </View>
        <View style={styles.frame}>
          <Text style={styles.title}>Alamat Rumah</Text>
        </View>

        <View style={styles.box}>
          <TextInput
            style={styles.input}
            value={alamat}
            onChangeText={value => setAlamat(value)}
          />
        </View>
        <View style={styles.warn}>
          <Text style={styles.warning}>Perhatian !</Text>
          <Text style={styles.warning}>
            Pastikan data yang anda masukkan benar
          </Text>
        </View>
        <TouchableOpacity style={styles.box2} onPress={() => userEdit()}>
          {loading ? (
            <ActivityIndicator size={25} color="white" />
          ) : (
            <Text style={styles.done}>DONE</Text>
          )}
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          this.setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalView}>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              borderBottomWidth: 0.5,
              // backgroundColor: '#000',
            }}>
            <Material name="close" size={15} color="#ffff" />
            <Text
              style={{
                fontWeight: '500',
                fontSize: 20,
                color: '#000',
                fontFamily: 'Poppins-Regular',
              }}>
              Ubah Foto Profil
            </Text>
          </View>

          <View
            style={{
              // backgroundColor: '#000',
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              width: '100%',
              marginTop: 15,
            }}>
            <TouchableOpacity
              onPress={() => takePhoto()}
              style={{marginHorizontal: 20}}>
              <Icon name="camera" size={25} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => pickLibrary()}>
              <Icon name="images" size={25} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              // backgroundColor: '#000',
              alignItems: 'center',
              justifyContent: 'space-around',
              flexDirection: 'row',
              width: '80%',
              marginTop: 5,
              marginBottom: 10,
            }}>
            <Text style={styles.modalText}>Kamera</Text>
            <Text style={styles.modalText}>Galeri</Text>
          </View>
          <TouchableOpacity
            style={{
              width: windowWidth * 0.8,
              height: windowHeight * 0.05,
              borderRadius: 15,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#e5e5e5',
            }}
            onPress={() => setModalVisible(!modalVisible)}>
            <Text style={{color: '#000'}}>Batal</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Warna_Background,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: windowWidth / 1,
    paddingHorizontal: 25,
    paddingVertical: 15,
  },
  button: {
    width: windowWidth / 10,
    height: windowHeight / 20,
    borderRadius: 5,
    backgroundColor: Warna_Disable,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dummy: {
    width: windowWidth / 10,
    height: windowHeight / 20,
    borderRadius: 5,
    backgroundColor: Warna_Background,
  },
  body: {
    alignItems: 'center',
  },
  // username: {
  //   paddingTop: 15,
  //   paddingBottom: 30,
  //   fontSize: 20,
  //   fontFamily: 'Poppins-Regular',
  //   color: '#000',
  // },
  box: {
    width: windowWidth / 1.2,
    height: windowHeight / 20,
    marginTop: 9,
    marginBottom: 18,
    backgroundColor: '#ffff',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Warna_Sekunder,
  },
  input: {
    width: windowWidth / 1.2,
    height: windowHeight / 20,
  },
  title: {
    fontFamily: 'Poppins-Regular',
    color: '#000',
    fontSize: 12,
  },
  frame: {
    justifyContent: 'flex-end',
    width: windowWidth / 1.2,
  },
  warn: {
    width: windowWidth / 1.2,
    height: windowHeight / 10,
    marginTop: 9,
    marginBottom: 18,
    backgroundColor: '#ffff',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#CDD2DA',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'column',
  },
  warning: {
    fontFamily: 'Poppins-Regular',
    color: '#d03025',
    fontSize: 14,
  },
  box2: {
    width: windowWidth / 1.2,
    height: windowHeight / 15,
    marginTop: 12,
    backgroundColor: Warna_Utama,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  done: {
    fontSize: 20,
    fontFamily: 'Poppins-Regular',
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: '#000',
  },
  modalView: {
    // margin: 30,
    paddingTop: 15,
    paddingBottom: 5,
    paddingHorizontal: 15,
    backgroundColor: '#000',
    width: windowWidth * 1,
    top: '75%',
    backgroundColor: '#fff',
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    alignItems: 'center',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    fontSize: 15,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    color: '#000',
  },
});
