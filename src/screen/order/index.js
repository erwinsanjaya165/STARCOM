import React, {Component} from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default class order extends Component {
  componentDidMount() {
    console.log(this.props.route.params);
  }

  render() {
    return (
      <View style={styles.page}>
        <View style={styles.boxHeader}>
          <TouchableOpacity
            style={styles.back}
            onPress={() => this.props.navigation.goBack()}>
            <Icon name="arrow-left" color="black" size={26} />
          </TouchableOpacity>
          <Text style={styles.textJdul}>My Order</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white',
  },
  boxHeader: {
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
});
