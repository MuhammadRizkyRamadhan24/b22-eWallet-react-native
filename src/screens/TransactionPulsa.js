import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {Input} from 'native-base';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Toast from 'react-native-toast-message';

import {connect} from 'react-redux';
import {transactionPulsa} from '../redux/actions/transactions';
import {getUserById} from '../redux/actions/users';

class TransactionPulsa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUpdate: false,
      balancePulsa: '',
    };
  }

  alertPulsa = values => {
    Alert.alert('Confirm Payment', 'Do you want to pay it?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => this.transactionPulsa(values),
      },
    ]);
  };

  transactionPulsa = values => {
    const {token} = this.props.auth;
    const data = {
      number: values.number,
      deductedBalance: this.state.balancePulsa,
      description: 'Beli Pulsa',
      trxFee: 1500,
    };
    this.props.transactionPulsa(token, data).then(() => {
      this.setState({
        isUpdate: !this.state.isUpdate,
      });
      if (this.props.transactions.msg === 'Transaction successfully') {
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Success',
          text2: 'Transaction Success!',
          visibilityTime: 800,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
        this.props.navigation.navigate('Dashboard');
      } else {
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error',
          text2: `${this.props.transactions.msg}`,
          visibilityTime: 2000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
      }
    });
  };

  press = value => {
    this.setState({
      balancePulsa: value,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const {token} = this.props.auth;
    if (prevState.isUpdate !== this.state.isUpdate) {
      this.props.getUserById(token);
    }
  }

  render() {
    const validationSchema = Yup.object().shape({
      number: Yup.string().min(12, 'Minimal 11 angka!').required(''),
    });
    console.log(this.props.transactions);
    return (
      <View style={styles.wrapper}>
        <Formik
          validationSchema={validationSchema}
          initialValues={{
            number: '',
          }}
          onSubmit={values => this.alertPulsa(values)}>
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
              ) : (
                <Text style={styles.textError} />
              )}
              <Text style={styles.text}>Nominal pulsa</Text>
              <Input
                width={360}
                marginTop={5}
                fontSize={20}
                height={20}
                backgroundColor="#E0DEDE"
                type="number"
                keyboardType="number-pad"
                value={this.state.balancePulsa}
                placeholder="Minimal 5.000"
              />
              <View style={styles.wrapperPulsa}>
                <TouchableOpacity onPress={() => this.press('5000')}>
                  <View style={styles.pulsa}>
                    <Text style={styles.balancePulsa}>5,000</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.press('10000')}>
                  <View style={styles.pulsa}>
                    <Text style={styles.balancePulsa}>10,000</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.press('20000')}>
                  <View style={styles.pulsa}>
                    <Text style={styles.balancePulsa}>20,000</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.press('50000')}>
                  <View style={styles.pulsa}>
                    <Text style={styles.balancePulsa}>50,000</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.press('100000')}>
                  <View style={styles.pulsa}>
                    <Text style={styles.balancePulsa}>100,000</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.press('150000')}>
                  <View style={styles.pulsa}>
                    <Text style={styles.balancePulsa}>150,000</Text>
                  </View>
                </TouchableOpacity>
              </View>
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
    color: '#000',
  },
  button: {
    marginTop: 50,
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
  wrapperPulsa: {
    marginTop: 30,
    width: '100%',
    height: 300,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  pulsa: {
    width: 155,
    height: 80,
    backgroundColor: 'white',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    elevation: 5,
  },
  balancePulsa: {
    fontFamily: 'Roboto-Bold',
    fontSize: 15,
  },
});
