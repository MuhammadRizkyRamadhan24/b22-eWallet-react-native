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
import {showMessage} from 'react-native-flash-message';

import {connect} from 'react-redux';
import {transactionPulsa} from '../redux/actions/transactions';
import {getUserById} from '../redux/actions/users';

class TransactionPulsa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUpdate: false,
    };
  }

  transactionPulsa = values => {
    const {token} = this.props.auth;
    const data = {
      number: values.number,
      deductedBalance: values.deductedBalance,
      description: 'Beli Pulsa',
      trxFee: 1500,
    };
    this.props.transactionPulsa(token, data).then(() => {
      this.setState({
        isUpdate: !this.state.isUpdate,
      });
      // ToastAndroid.showWithGravity(
      //   'Transaction Success!',
      //   ToastAndroid.LONG,
      //   ToastAndroid.TOP,
      // );
      showMessage({
        message: 'Transaction Success!',
        type: 'success',
        backgroundColor: '#440A67',
        color: '#fff',
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
    const str = this.props.users.data.balance;
    const num = str.split(',').join('');
    const balance = parseInt(num, 10);
    console.log(balance);
    const validationSchema = Yup.object().shape({
      number: Yup.string().min(12, 'Minimal 11 angka!').required(''),
      deductedBalance: Yup.number()
        .min(5000, 'Minimal 5.000!')
        .max(balance, 'Balance tidak cukup!')
        .required(''),
    });
    return (
      <View style={styles.wrapper}>
        <Formik
          validationSchema={validationSchema}
          initialValues={{
            number: '',
            deductedBalance: '',
          }}
          onSubmit={values => this.transactionPulsa(values)}>
          {({handleChange, handleBlur, handleSubmit, errors, values}) => (
            <View style={styles.wrapperInput}>
              <Text style={styles.text}>Nomor</Text>
              <Input
                width={360}
                marginTop={5}
                fontSize={20}
                height={20}
                backgroundColor="#E0DEDE"
                type="number"
                keyboardType="number-pad"
                onChangeText={handleChange('number')}
                onBlur={handleBlur('number')}
                value={values.number}
                placeholder="Minimal 11 angka"
              />
              {errors.number ? (
                <Text style={styles.textError}>{errors.number}</Text>
              ) : null}
              <Text style={styles.text}>Nominal pulsa</Text>
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
                placeholder="Minimal 5.000"
              />
              {errors.deductedBalance ? (
                <Text style={styles.textError}>{errors.deductedBalance}</Text>
              ) : null}
              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.textButton}>Beli Pulsa Sekarang</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  transactions: state.transactions,
  auth: state.auth,
  users: state.users,
});

const mapDispatchToProps = {transactionPulsa, getUserById};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionPulsa);

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
