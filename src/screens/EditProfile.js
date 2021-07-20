import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ToastAndroid,
} from 'react-native';
import {Input} from 'native-base';
import {launchImageLibrary} from 'react-native-image-picker';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {REACT_APP_BASE_URL} from '@env';
import {connect} from 'react-redux';
import {getUserById, changeUser} from '../redux/actions/users';

const validationSchema = Yup.object().shape({
  fullName: Yup.string(),
  email: Yup.string().email('Email tidak valid!').required('Harus Diisi!'),
  phoneNumber: Yup.string()
    .min(11, 'Minimal 11 angka!')
    .required('Harus Diisi!'),
});

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      pictureUri: '',
      phone_number: '',
      email: '',
      name: '',
      isUpdate: false,
    };
  }

  selectPicture = e => {
    if (!e.didCancel) {
      this.setState({
        pictureUri: e.assets[0].uri,
        image: e.assets[0],
      });
    }
  };

  edit = values => {
    const {token} = this.props.auth;
    if (this.state.image === null) {
      const data = {
        fullName: values.fullName,
        email: values.email,
        phoneNumber: values.phoneNumber,
      };
      // console.log(data);
      this.props.changeUser(token, data).then(() => {
        this.setState({
          isUpdate: !this.state.isUpdate,
        });
        // showMessage({
        //   message: 'Success update data!',
        //   type: 'success',
        //   backgroundColor: '#6A4029',
        //   color: '#fff',
        // });
        ToastAndroid.showWithGravity(
          'Success update data!',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        );
      });
    } else {
      const data = {
        fullName: values.fullName,
        email: values.email,
        phoneNumber: values.phoneNumber,
        image: this.state.image,
      };
      // console.log(data);
      this.props.changeUser(token, data).then(() => {
        this.setState({
          isUpdate: !this.state.isUpdate,
        });
        ToastAndroid.showWithGravity(
          'Success update data!',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        );
      });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    const {token} = this.props.auth;
    if (prevState.isUpdate !== this.state.isUpdate) {
      this.props.getUserById(token);
    }
  }

  render() {
    console.log(this.props.users.data.name);
    return (
      <View style={styles.wrapper}>
        <Formik
          validationSchema={validationSchema}
          initialValues={{
            fullName: `${this.props.users.data.name}`,
            email: `${this.props.users.data.email}`,
            phoneNumber: `${this.props.users.data.phone_number}`,
          }}
          onSubmit={values => this.edit(values)}>
          {({handleChange, handleBlur, handleSubmit, errors, values}) => (
            <View style={styles.wrapperInput}>
              <View style={styles.wrapperImage}>
                {this.props.users.data.image === null ? (
                  <Image
                    style={styles.image}
                    source={
                      this.state.pictureUri === ''
                        ? {
                            uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
                          }
                        : {
                            uri: this.state.pictureUri,
                          }
                    }
                  />
                ) : (
                  <Image
                    style={styles.image}
                    source={
                      this.state.pictureUri === ''
                        ? {
                            uri: `${REACT_APP_BASE_URL}/static/images/${this.props.users.data.image}`,
                          }
                        : {
                            uri: this.state.pictureUri,
                          }
                    }
                  />
                )}
                <TouchableOpacity
                  onPress={() =>
                    launchImageLibrary({quality: 0.5}, this.selectPicture)
                  }>
                  <Text style={styles.textImage}>Perbarui Foto Profile</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.textLabel}>Nama Lengkap</Text>
              <Input
                marginTop={5}
                variant="underlined"
                onChangeText={handleChange('fullName')}
                onBlur={handleBlur('fullName')}
                placeholder="Edit Nama Lengkap"
                value={values.fullName}
              />
              {errors.fullName ? (
                <Text style={styles.textError}>{errors.fullName}</Text>
              ) : null}
              <Text style={styles.textLabel}>Email</Text>
              <Input
                marginTop={5}
                variant="underlined"
                keyboardType="email-address"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                placeholder="Edit email"
                value={values.email}
              />
              {errors.email ? (
                <Text style={styles.textError}>{errors.email}</Text>
              ) : null}
              <Text style={styles.textLabel}>Nomor Ponsel</Text>
              <Input
                marginTop={5}
                variant="underlined"
                keyboardType="number-pad"
                onChangeText={handleChange('phoneNumber')}
                onBlur={handleBlur('phoneNumber')}
                placeholder="Edit No. Hp"
                value={values.phoneNumber}
              />
              {errors.phoneNumber ? (
                <Text style={styles.textError}>{errors.phoneNumber}</Text>
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

const mapDispatchToProps = {getUserById, changeUser};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);

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
