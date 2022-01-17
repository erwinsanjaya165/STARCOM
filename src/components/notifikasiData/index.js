import {Alert} from 'react-native';
export const DataKsong = () =>
  Alert.alert('Perhatian !', 'Anda belum memasukkan data', [
    {
      text: 'Ok',
    },
  ]);

export const DataEmail = () =>
  Alert.alert('Email !', 'alamat email anda salah', [
    {
      text: 'Ok',
    },
  ]);

export const DataPassword = () =>
  Alert.alert('Password !', 'Kata sandi minimal 6 karakter', [
    {
      text: 'Ok',
    },
  ]);

export const DataFinis = () =>
  Alert.alert('sukses !', 'Anda berhasil mendaftar', [
    {
      text: 'Ok',
    },
  ]);

export const DtaFnisLgin = () =>
  Alert.alert('Welcome to Starcom!', 'Selamat datang di star computer', [
    {
      text: 'Ok',
    },
  ]);

export const PasswordLogin = () =>
  Alert.alert('Password & email !', 'data yang anda masukkan salah', [
    {
      text: 'Ok',
    },
  ]);
