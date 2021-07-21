import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {REACT_APP_BASE_URL} from '@env';

import {connect} from 'react-redux';
import {authLogout} from '../redux/actions/auth';

class Profile extends Component {
  logout = () => {
    this.props.authLogout();
  };

  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.wrapperContent}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.wrapperProfile}>
              <Text style={styles.textProfile}>Profile</Text>
              <View style={styles.wrapperCardProfile}>
                {/* <Image
                  style={styles.image}
                  source={{
                    uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
                  }}
                /> */}
                {this.props.users.data.image !== null ? (
                  <Image
                    style={styles.image}
                    source={{
                      uri: `${REACT_APP_BASE_URL}/static/images/${this.props.users.data.image}`,
                    }}
                  />
                ) : (
                  <Image
                    style={styles.image}
                    source={{
                      uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
                    }}
                  />
                )}
                <View style={styles.wrapperRightCardProfile}>
                  <Text style={styles.textNameRightCard}>
                    {this.props.users.data.name}
                  </Text>
                  <Text style={styles.textNumberRightCard}>
                    {this.props.users.data.phone_number}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.wrapperAccount}>
              <Text style={styles.textAccount}>Akun</Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('EditProfile')}
                style={[styles.wrapperCardProfile, styles.buttonAccount]}>
                <MaterialCommunityIcons
                  name="account-edit"
                  size={35}
                  color="#440A67"
                />
                <Text style={styles.textCardAccount}>Ubah Profile</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
        <View style={styles.wrapperButton}>
          <TouchableOpacity onPress={this.logout} style={styles.button}>
            <Text style={styles.textButton}>Keluar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  users: state.users,
});

const mapDispatchToProps = {authLogout};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  wrapperContent: {
    flex: 5,
  },
  wrapperProfile: {
    backgroundColor: '#fff',
  },
  textProfile: {
    marginTop: 80,
    fontFamily: 'Roboto-Bold',
    fontSize: 28,
    marginLeft: 20,
  },
  wrapperCardProfile: {
    width: '100%',
    height: 80,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  wrapperRightCardProfile: {
    marginLeft: 10,
  },
  textNameRightCard: {
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
  },
  textNumberRightCard: {
    fontFamily: 'Roboto-Regular',
  },
  image: {
    height: 55,
    width: 55,
    borderRadius: 30,
  },
  wrapperAccount: {
    marginTop: 10,
    backgroundColor: '#fff',
  },
  textAccount: {
    fontFamily: 'Roboto-Bold',
    fontSize: 20,
    marginLeft: 20,
    marginVertical: 25,
  },
  textCardAccount: {
    marginLeft: 15,
    fontFamily: 'Roboto-Bold',
    fontSize: 18,
  },
  wrapperButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#440A67',
    width: 360,
    height: 60,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    fontFamily: 'Roboto-Bold',
    color: '#fff',
    fontSize: 15,
  },
  buttonAccount: {
    borderBottomWidth: 1,
    borderBottomColor: '#E0DEDE',
    borderTopWidth: 1,
    borderTopColor: '#E0DEDE',
  },
});
