import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Input} from 'native-base';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Toast from 'react-native-toast-message';
import Logo from '../../assets/logo.png';

import {connect} from 'react-redux';
import {authRegister} from '../redux/actions/auth';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Email tidak valid!').required(''),
  phoneNumber: Yup.string()
    .min(11, 'Minimal 11 angka!')
    .required('Harus Diisi!'),
  password: Yup.string().min(8, 'Minimal 8 karakter!').required(''),
});

class Signup extends Component {
  signup = values => {
    this.props
      .authRegister(values.email, values.phoneNumber, values.password)
      .then(() => {
        if (this.props.auth.msg === 'User has been create') {
          Toast.show({
            type: 'success',
            position: 'top',
            text1: 'Success',
            text2: 'Signup success',
            visibilityTime: 800,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40,
          });
          this.props.navigation.navigate('Login');
        } else {
          Toast.show({
            type: 'error',
            position: 'top',
            text1: 'Error',
            text2: `${this.props.auth.msg}`,
            visibilityTime: 1000,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40,
          });
        }
      });
  };

  render() {
    return (
      <View style={styles.wrapper}>
        <Image style={styles.logo} source={Logo} />
        <View style={styles.wrapperInput}>
          <Text style={styles.title}>Daftar</Text>
          <Formik
            validationSchema={validationSchema}
            initialValues={{email: '', phoneNumber: '', password: ''}}
            onSubmit={values => this.signup(values)}>
            {({handleChange, handleBlur, handleSubmit, errors, values}) => (
              <>
                <Input
                  width={'85%'}
                  backgroundColor="#E0DEDE"
                  keyboardType="email-address"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  placeholder="Masukin email kamu ya!"
                  value={values.email}
                />
                {errors.email ? (
                  <Text style={styles.textError}>{errors.email}</Text>
                ) : null}
                <Input
                  width={'85%'}
                  marginTop={5}
                  backgroundColor="#E0DEDE"
                  keyboardType="number-pad"
                  onChangeText={handleChange('phoneNumber')}
                  onBlur={handleBlur('phoneNumber')}
                  placeholder="Masukin nomor HP kamu ya!"
                  value={values.phoneNumber}
                />
                {errors.phoneNumber ? (
                  <Text style={styles.textError}>{errors.phoneNumber}</Text>
                ) : null}
                <Input
                  width={'85%'}
                  marginTop={5}
                  backgroundColor="#E0DEDE"
                  type="password"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  placeholder="Masukin password kamu ya!"
                />
                {errors.password ? (
                  <Text style={styles.textError}>{errors.password}</Text>
                ) : null}
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                  <Text style={styles.textButton}>Daftar</Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = {authRegister};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    marginTop: 50,
    fontFamily: 'Roboto-Bold',
    color: '#440A67',
    fontSize: 35,
    width: '85%',
    marginVertical: 10,
  },
  logo: {
    width: 80,
    height: 80,
    marginTop: 100,
  },
  wrapperInput: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
  },
  button: {
    marginTop: 30,
    backgroundColor: '#440A67',
    width: '85%',
    height: '12%',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textError: {
    color: 'red',
    fontFamily: 'Roboto-Bold',
  },
  textButton: {
    fontFamily: 'Roboto-Bold',
    color: '#fff',
    fontSize: 15,
  },
});
