import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {Input} from 'native-base';
import {Formik} from 'formik';
import * as Yup from 'yup';

import {connect} from 'react-redux';
import {transferToUser} from '../redux/actions/transfers';
import {getUserById} from '../redux/actions/users';

const validationSchema = Yup.object().shape({
  phoneNumberReceiver: Yup.string().min(11, 'Minimal 11 nomor!').required(''),
  deductedBalance: Yup.number().min(10000, 'Minimal 10.000!').required(''),
});

class Transfer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUpdate: false,
    };
  }

  transfer = values => {
    const {token} = this.props.auth;
    const data = {
      phoneNumberReceiver: values.phoneNumberReceiver,
      deductedBalance: values.deductedBalance,
      description: values.description,
    };
    this.props.transferToUser(token, data).then(() => {
      this.setState({
        isUpdate: !this.state.isUpdate,
      });
      ToastAndroid.showWithGravity(
        'Success transfer!',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
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
          initialValues={{
            phoneNumberReceiver: '',
            deductedBalance: '',
            description: '',
          }}
          onSubmit={values => this.transfer(values)}>
          {({handleChange, handleBlur, handleSubmit, errors, values}) => (
            <View style={styles.wrapperInput}>
              <Input
                width={360}
                marginTop={5}
                variant="underlined"
                type="number"
                keyboardType="number-pad"
                onChangeText={handleChange('phoneNumberReceiver')}
                onBlur={handleBlur('phoneNumberReceiver')}
                value={values.phoneNumberReceiver}
                placeholder="Masukan Nomor Tujuan"
              />
              {errors.phoneNumberReceiver ? (
                <Text style={styles.textError}>
                  {errors.phoneNumberReceiver}
                </Text>
              ) : null}
              <Text style={styles.text}>Nominal transfer</Text>
              <Input
                width={360}
                marginTop={5}
                fontSize={20}
                height={20}
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
              <Input
                width={360}
                marginTop={10}
                variant="underlined"
                onChangeText={handleChange('description')}
                onBlur={handleBlur('description')}
                value={values.description}
                placeholder="Pesan (optional)"
              />

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
  transfers: state.transfers,
  auth: state.auth,
  users: state.users,
});

const mapDispatchToProps = {transferToUser, getUserById};

export default connect(mapStateToProps, mapDispatchToProps)(Transfer);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  wrapperInput: {
    width: '100%',
    padding: 20,
    alignItems: 'center',
  },
  text: {
    marginTop: 20,
    width: 360,
    textAlign: 'left',
    fontFamily: 'Roboto-Bold',
    fontSize: 15,
  },
  button: {
    marginTop: 380,
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
