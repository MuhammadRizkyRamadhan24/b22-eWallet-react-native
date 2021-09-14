import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {Input} from 'native-base';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Toast from 'react-native-toast-message';
import {connect} from 'react-redux';
import {getUserById, changePass} from '../redux/actions/users';
import {authLogout} from '../redux/actions/auth';

const validationSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .min(8, 'Minimal 8 karakter!')
    .required('Harus Diisi!'),
  newPassword: Yup.string()
    .min(8, 'Minimal 8 karakter!')
    .required('Harus Diisi!'),
});

class EditPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUpdate: false,
    };
  }

  alertEdit = values => {
    Alert.alert('Update Password', 'Do you want to Update?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => this.edit(values),
      },
    ]);
  };

  edit = values => {
    const {token} = this.props.auth;
    this.props
      .changePass(token, values.oldPassword, values.newPassword)
      .then(() => {
        this.setState({
          isUpdate: !this.state.isUpdate,
        });
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Success',
          text2: 'Success update password!',
          visibilityTime: 1000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
        this.props.authLogout();
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
            oldPassword: '',
            newPassword: '',
          }}
          onSubmit={values => this.alertEdit(values)}>
          {({handleChange, handleBlur, handleSubmit, errors, values}) => (
            <View style={styles.wrapperInput}>
              <Text style={styles.textLabel}>Password Saat Ini</Text>
              <Input
                marginTop={5}
                variant="underlined"
                type="password"
                onChangeText={handleChange('oldPassword')}
                onBlur={handleBlur('oldPassword')}
                placeholder="Isi Password saat ini"
                value={values.oldPassword}
              />
              {errors.oldPassword ? (
                <Text style={styles.textError}>{errors.oldPassword}</Text>
              ) : null}
              <Text style={styles.textLabel}>Password Baru</Text>
              <Input
                marginTop={5}
                variant="underlined"
                type="password"
                onChangeText={handleChange('newPassword')}
                onBlur={handleBlur('newPassword')}
                placeholder="Isi Password Baru"
                value={values.newPassword}
              />
              {errors.newPassword ? (
                <Text style={styles.textError}>{errors.newPassword}</Text>
              ) : null}
              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.textButton}>Simpan</Text>
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
  users: state.users,
});

const mapDispatchToProps = {getUserById, changePass, authLogout};

export default connect(mapStateToProps, mapDispatchToProps)(EditPassword);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  wrapperInput: {
    width: '100%',
    textAlign: 'center',
  },
  button: {
    marginTop: 280,
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
  textLabel: {
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    marginTop: 20,
  },
  wrapperImage: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginVertical: 20,
  },
  textImage: {
    marginLeft: 15,
    fontFamily: 'Roboto-Medium',
    fontSize: 15,
  },
});
