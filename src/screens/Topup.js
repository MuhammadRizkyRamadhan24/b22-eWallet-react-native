import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  // ToastAndroid,
} from 'react-native';
import {Input} from 'native-base';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Toast from 'react-native-toast-message';

import {connect} from 'react-redux';
import {topupToUser} from '../redux/actions/topups';
import {getUserById} from '../redux/actions/users';

const validationSchema = Yup.object().shape({
  deductedBalance: Yup.number().min(10000, 'Minimal 10.000!').required(''),
});

class Topup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUpdate: false,
    };
  }

  topup = values => {
    const {token} = this.props.auth;
    this.props.topupToUser(token, values.deductedBalance).then(() => {
      this.setState({
        isUpdate: !this.state.isUpdate,
      });
      // ToastAndroid.showWithGravity(
      //   'Success topup!',
      //   ToastAndroid.LONG,
      //   ToastAndroid.TOP,
      // );
      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Success',
        text2: 'Success topup!',
        visibilityTime: 800,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const {token} = this.props.auth;
    if (prevState.isUpdate !== this.state.isUpdate) {
      this.props.getUserById(token);
    }
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <Formik
          validationSchema={validationSchema}
          initialValues={{deductedBalance: ''}}
          onSubmit={values => this.topup(values)}>
          {({handleChange, handleBlur, handleSubmit, errors, values}) => (
            <View style={styles.wrapperInput}>
              <Text style={styles.text}>Masukan nominal Top Up!</Text>
              <Input
                width={360}
                marginTop={5}
                backgroundColor="#E0DEDE"
                type="number"
                keyboardType="number-pad"
                onChangeText={handleChange('deductedBalance')}
                onBlur={handleBlur('deductedBalance')}
                value={values.deductedBalance}
                placeholder="Minimal 10.000"
              />
              {errors.deductedBalance ? (
                <Text style={styles.textError}>{errors.deductedBalance}</Text>
              ) : null}
              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.textButton}>Top Up Sekarang</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  topups: state.topups,
  auth: state.auth,
  users: state.users,
});

const mapDispatchToProps = {topupToUser, getUserById};

export default connect(mapStateToProps, mapDispatchToProps)(Topup);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  wrapperInput: {
    width: '100%',
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  text: {
    marginTop: 10,
    width: 360,
    textAlign: 'left',
    fontFamily: 'Roboto-Bold',
    fontSize: 17,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#440A67',
    width: 360,
    height: 60,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textError: {
    width: 360,
    textAlign: 'left',
    color: 'red',
    fontFamily: 'Roboto-Bold',
  },
  textButton: {
    fontFamily: 'Roboto-Bold',
    color: '#fff',
    fontSize: 15,
  },
});
