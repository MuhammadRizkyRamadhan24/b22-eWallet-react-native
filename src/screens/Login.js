import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  // ToastAndroid,
} from 'react-native';
import {Input} from 'native-base';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Logo from '../../assets/logo.png';
import {showMessage} from 'react-native-flash-message';

import {connect} from 'react-redux';
import {authLogin, authNotifToken} from '../redux/actions/auth';

const validationSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .min(11, 'Minimal 11 angka!')
    .required('Harus Diisi!'),
  password: Yup.string().min(8, 'Minimal 8 karakter!').required('Harus Diisi!'),
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  login = values => {
    this.props.authLogin(values.phoneNumber, values.password).then(() => {
      if (this.props.auth.msg === 'Login Success') {
        // ToastAndroid.showWithGravity(
        //   'Login success',
        //   ToastAndroid.LONG,
        //   ToastAndroid.TOP,
        // );
        showMessage({
          message: 'Login success!',
          type: 'success',
          backgroundColor: '#440A67',
          color: '#fff',
        });
      } else {
        showMessage({
          message: `${this.props.auth.msg}`,
          type: 'danger',
          backgroundColor: '#d63031',
          color: '#fff',
        });
      }
    });
  };

  render() {
    // console.log(this.props.auth);
    return (
      <View style={styles.wrapper}>
        <Image style={styles.logo} source={Logo} />
        <Text style={styles.title}>Masuk</Text>
        <Formik
          style={styles.wrapperInput}
          validationSchema={validationSchema}
          initialValues={{phoneNumber: '', password: ''}}
          onSubmit={values => this.login(values)}>
          {({handleChange, handleBlur, handleSubmit, errors, values}) => (
            <View style={styles.wrapperInput}>
              <Input
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
                <Text style={styles.textButton}>Masuk</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = {authLogin, authNotifToken};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

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
