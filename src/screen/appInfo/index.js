import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {
  Logo,
  Title,
  IconBackHitam,
  IconCopyright,
  IconAkunAktif,
  IconBack,
} from '../../assets';
import {styles} from '../../styles/AppInfo.js';

export default class AppInfo extends Component {
  render() {
    return (
      <View style={styles.page}>
        <View style={styles.boxback}>
          <TouchableOpacity
            style={styles.back}
            onPress={() => this.props.navigation.goBack()}>
            <IconBack />
          </TouchableOpacity>
          <Text style={styles.textJdul}>App Info</Text>
        </View>
        <View style={styles.loTit}>
          <Image source={Logo} style={styles.logo} />
          <Image source={Title} style={styles.title} />
          <View style={styles.boxTextCopyright}>
            <Text style={styles.textCopyright}>Copyright</Text>
            <IconCopyright />
            <Text style={styles.textCopyright}>2021</Text>
          </View>
        </View>
        <View style={styles.boxNama2Pembuat}>
          <Text style={styles.textPembuat}>Pembuat Aplikasi</Text>
          <View style={styles.boxuser}>
            <IconAkunAktif />
            <Text style={styles.textNama}>Mikael Firdaus</Text>
            <Text style={styles.textJurusan}>Backend</Text>
          </View>
          <View style={styles.boxuser}>
            <IconAkunAktif />
            <Text style={styles.textNama}>Achmed Bintang</Text>
            <Text style={styles.textJurusan}>Mobile</Text>
          </View>
          <View style={styles.boxuser}>
            <IconAkunAktif />
            <Text style={styles.textNama}>Hafizh Nasrullah</Text>
            <Text style={styles.textJurusan}>Mobile</Text>
          </View>
          <View style={styles.boxuser}>
            <IconAkunAktif />
            <Text style={styles.textNama}>Akmal Tezar</Text>
            <Text style={styles.textJurusan}>Mobile</Text>
          </View>
          <View style={styles.boxuser}>
            <IconAkunAktif />
            <Text style={styles.textNama}>Erwin Sanjaya</Text>
            <Text style={styles.textJurusan}>Mobile</Text>
          </View>
        </View>
      </View>
    );
  }
}
