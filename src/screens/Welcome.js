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
        <View style={styles.wrapperImg}>
          <Image style={styles.logo} source={Logo} />
          <Image style={styles.coin} source={Coin} />
        </View>
        <View style={styles.wrapperDown}>
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
  wrapperImg: {
    flex: 3,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperDown: {
    flex: 2,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
  },
  title: {
    fontFamily: 'Roboto-Bold',
    color: '#fff',
    fontSize: 20,
  },
  coin: {
    marginTop: '15%',
    width: 229,
    height: 190,
  },
  paragraph: {
    marginBottom: 10,
    textAlign: 'center',
    width: 335,
    fontFamily: 'Roboto-Regular',
    color: '#fff',
    fontSize: 15,
  },
  button: {
    marginVertical: 10,
    backgroundColor: '#fff',
    width: '85%',
    height: '22%',
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
