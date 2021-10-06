import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Alert} from 'react-native';
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
      this.props.navigation.navigate('Dashboard');
    });
  };

  alertTopup = values => {
    Alert.alert('Confirm Topup', 'Do you want to Topup?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => this.topup(values),
      },
    ]);
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
          onSubmit={values => this.alertTopup(values)}>
          {({handleChange, handleBlur, handleSubmit, errors, values}) => (
            <View style={styles.wrapperInput}>
              <Text style={styles.text}>Masukan nominal Top Up!</Text>
              <Input
                width={'95%'}
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
    width: '95%',
    textAlign: 'left',
    fontFamily: 'Roboto-Bold',
    fontSize: 17,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#440A67',
    width: '95%',
    height: 50,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textError: {
    width: '95%',
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
