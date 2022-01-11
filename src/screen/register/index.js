import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {styles} from '../../styles/Register';
import {
  IconBackPutih,
  IconEmail,
  IconPassword1,
  IconUser,
  IconUser2,
} from '../../assets';
import {
  DataKsong,
  DataEmail,
  DataPassword,
  DataFinis,
} from '../../components/notifikasiData/index';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nama: '',
      email: '',
      password: '',
      isLoading: false,
    };
  }

  userRegis() {
    this.setState({loading: true});
    const {nama, email, password} = this.state;

    const dataTosend = {
      nama: nama,
      email: email,
      password: password,
    };

    let formdata = new FormData();

    for (let key in dataTosend) {
      formdata.append(key, dataTosend[key]);
    }

    fetch('https://star-comp.herokuapp.com/api/register', {
      method: 'POST',
      redirect: 'follow',
      body: formdata,
      headers: {
        Accept: 'aplication/json',
        'Content-Tipe': 'multipart/form-data',
      },
    })
      .then(response => response.json())
      .then(result => {
        console.log(result);

        if (nama === '') {
          DataKsong();
        } else if (
          this.state.email.split('@')[1] !== 'gmail.com' &&
          this.state.email.split('@')[1] !== 'email.com'
        ) {
          DataEmail();
        } else if (this.state.password.length < 6) {
          DataPassword();
        } else {
          DataFinis();
          this.props.navigation.replace('Login');
        }
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => this.setState({loading: false}));
  }
  render() {
    return (
      <View style={styles.page}>
        <ScrollView>
          <TouchableOpacity
            style={styles.back}
            onPress={() => this.props.navigation.goBack()}>
            <IconBackPutih />
          </TouchableOpacity>
          <View style={styles.boxUser}>
            <View style={styles.user}>
              <IconUser />
            </View>
            <View style={styles.boxText}>
              <Text style={styles.textWel}>Welcome</Text>
              <Text style={styles.textSign}>Sign Up</Text>
            </View>
          </View>
          <View style={styles.container}>
            <View style={styles.boxTextUsername}>
              <View style={styles.boxUsername}>
                <Text style={styles.textUsername}>Username</Text>
                <View style={styles.boxInput}>
                  <IconUser2 />
                  <TextInput
                    placeholder="Username"
                    keyboardType="default"
                    style={styles.textInput}
                    onChangeText={value => this.setState({nama: value})}
                  />
                </View>
              </View>
              <View style={styles.boxUsername}>
                <Text style={styles.textUsername}>Email</Text>
                <View style={styles.boxInput}>
                  <IconEmail />
                  <TextInput
                    placeholder="Email"
                    keyboardType="default"
                    style={styles.textInput}
                    onChangeText={value => this.setState({email: value})}
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
                    onChangeText={value => this.setState({password: value})}
                  />
                </View>
              </View>
            </View>
            <TouchableOpacity
              style={styles.boxBottom}
              onPress={() => this.userRegis()}>
              {this.state.loading ? (
                <ActivityIndicator size={25} color="white" />
              ) : (
                <Text style={styles.textBottom}>Sign Up</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}
