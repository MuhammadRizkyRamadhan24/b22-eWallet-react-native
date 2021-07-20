import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Input} from 'native-base';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Logo from '../../assets/logo.png';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Email tidak valid!').required('Harus Diisi!'),
  number: Yup.string().min(11, 'Minimal 11 angka!').required('Harus Diisi!'),
  password: Yup.string().min(8, 'Minimal 8 karakter!').required('Harus Diisi!'),
});

export default class Signup extends Component {
  signup = values => {
    console.log(values);
    this.props.navigation.navigate('Login');
  };

  render() {
    return (
      <View style={styles.wrapper}>
        <Image style={styles.logo} source={Logo} />
        <Text style={styles.title}>Daftar</Text>
        <Formik
          style={styles.wrapperInput}
          validationSchema={validationSchema}
          initialValues={{email: '', number: '', password: ''}}
          onSubmit={values => this.signup(values)}>
          {({handleChange, handleBlur, handleSubmit, errors, values}) => (
            <View style={styles.wrapperInput}>
              <Input
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
                marginTop={5}
                backgroundColor="#E0DEDE"
                keyboardType="number-pad"
                onChangeText={handleChange('number')}
                onBlur={handleBlur('number')}
                placeholder="Masukin nomor HP kamu ya!"
                value={values.number}
              />
              {errors.number ? (
                <Text style={styles.textError}>{errors.number}</Text>
              ) : null}
              <Input
                marginTop={5}
                backgroundColor="#E0DEDE"
                type="password"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                placeholder="Masukin password kamu ya!"
                keyboardType="visible-password"
              />
              {errors.password ? (
                <Text style={styles.textError}>{errors.password}</Text>
              ) : null}
              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.textButton}>Daftar</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    );
  }
}

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
    width: 360,
    marginVertical: 10,
  },
  logo: {
    width: 100,
    height: 100,
    marginTop: 100,
  },
  wrapperInput: {
    width: 360,
  },
  button: {
    marginTop: 40,
    backgroundColor: '#440A67',
    width: 360,
    height: 60,
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
