import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {styles} from '../../styles/Login';
import {IconEmail, IconPassword1, IconPassword2, IconUser} from '../../assets';
import {
  DataFinis,
  DtaFnisLgin,
  PasswordLogin,
} from '../../components/notifikasiData/index';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isLoading: false,
    };
  }
  userLogin() {
    this.setState({loading: true});
    const {email, password} = this.state;

    const dataTosend = {
      email: email,
      password: password,
    };

    let formdata = new FormData();

    for (let key in dataTosend) {
      formdata.append(key, dataTosend[key]);
    }

    fetch('https://star-comp.herokuapp.com/api/login', {
      method: 'POST',
      redirect: 'follow',
      body: formdata,
      headers: {
        Accept: 'aplication/json',
        'Content-Tipe': 'multipart/form-data',
      },
    })
      .then(async response => {
        const res = await response.json();
        if (response.status == 401) {
          Alert.alert('Peringatan', 'Pasitkan email dan password anda benar!', [
            {
              text: 'Siap',
            },
          ]);
        } else if (response.status == 200) {
          Alert.alert('Peringatan', 'Login Berhasil!', [
            {
              text: 'Siap',
            },
          ]);
          this.props.navigation.replace('Homescreen');
        }
      })
      // .then(result => {
      //   console.log(result.access_token);
      //   const {role_data} = result;
      //   if (role_data) {
      //     AsyncStorage.setItem('token', result.access_token).then(() => {
      //       PasswordLogin();
      //     });
      //   } else {
      //     DataFinis();
      //     this.props.navigation.replace('Homescreen');
      //   }
      // })
      .catch(err => {
        console.log(err);
      })
      .finally(() => this.setState({loading: false}));
  }

  render() {
    return (
      <View style={styles.page}>
        <View style={styles.boxUser}>
          <View style={styles.user}>
            <IconUser />
          </View>
          <View style={styles.boxText}>
            <Text style={styles.textWel}>Welcome</Text>
            <Text style={styles.textSign}>Sign In</Text>
          </View>
        </View>
        <View style={styles.container}>
          <View style={styles.boxTextUsername}>
            <View style={styles.boxUsername}>
              <Text style={styles.textUsername}>Email</Text>
              <View style={styles.boxInput}>
                <IconEmail />
                <TextInput
                  placeholder="Email"
                  keyboardType="default"
                  style={styles.textInput}
                  onChangeText={email => this.setState({email})}
                />
              </View>
            </View>
            <View style={styles.boxUsername}>
              <Text style={styles.textUsername}>Password</Text>
              <View style={styles.boxInput}>
                <IconPassword1 />
                <TextInput
                  placeholder="Password"
                  keyboardType="visible-password"
                  style={styles.textInput}
                  onChangeText={password => this.setState({password})}
                />
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={styles.boxBottom}
            onPress={() => this.userLogin()}>
            {this.state.loading ? (
              <ActivityIndicator size={25} color="white" />
            ) : (
              <Text style={styles.textBottom}>Sign In</Text>
            )}
          </TouchableOpacity>
          <View style={styles.boxTextDont}>
            <Text style={styles.textDon}>Don't have an account ? </Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Register')}>
              <Text style={styles.textSignUp}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
