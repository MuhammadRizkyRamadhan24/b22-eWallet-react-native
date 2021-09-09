import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Logo from '../../assets/logo.png';
import Coin from '../../assets/coin.png';
import RNBootSplash from 'react-native-bootsplash';

export default class Welcome extends Component {
  componentDidMount() {
    RNBootSplash.hide({fade: true});
  }
  render() {
    return (
      <View style={styles.wrapper}>
        <Image style={styles.logo} source={Logo} />
        <Image style={styles.coin} source={Coin} />
        <Text style={styles.title}>Solusi Cerdas Finansial</Text>
        <Text style={styles.paragraph}>
          Nikmati berbagai layanan finansial dan kemudahan pembayaran dalam
          genggaman
        </Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Login')}
          style={styles.button}>
          <Text style={styles.textButton}>Sudah punya akun?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Signup')}
          style={styles.button}>
          <Text style={styles.textButton}>Belum punya akun?</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#440A67',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
  },
  title: {
    marginTop: 40,
    fontFamily: 'Roboto-Bold',
    color: '#fff',
    fontSize: 24,
  },
  coin: {
    marginTop: 80,
    width: 285,
    height: 238,
  },
  paragraph: {
    marginTop: 5,
    marginBottom: 20,
    textAlign: 'center',
    width: 335,
    fontFamily: 'Roboto-Regular',
    color: '#fff',
    fontSize: 17,
  },
  button: {
    marginVertical: 10,
    backgroundColor: '#fff',
    width: 360,
    height: 60,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    fontFamily: 'Roboto-Bold',
    color: '#440A67',
    fontSize: 15,
  },
});
