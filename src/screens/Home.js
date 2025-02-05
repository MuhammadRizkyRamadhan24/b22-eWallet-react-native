import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import iconTopup from '../../assets/top-up.png';
import iconTransfer from '../../assets/transfer.png';
import iconHistory from '../../assets/history.png';
import {REACT_APP_BASE_URL} from '@env';
import iconGame from '../../assets/game.png';
import iconInternet from '../../assets/internet.png';
import iconMusic from '../../assets/musik.png';
import iconSchool from '../../assets/pendidikan.png';
import iconPulsa from '../../assets/pulsa.png';
import iconStream from '../../assets/streaming.png';
import PushNotification from 'react-native-push-notification';
import RNBootSplash from 'react-native-bootsplash';
import Toast from 'react-native-toast-message';
import {connect} from 'react-redux';
import {authNotifToken, authLogout} from '../redux/actions/auth';
import {getUserById} from '../redux/actions/users';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      refreshing: false,
    };
  }

  triggerNotif = () => {
    setTimeout(() => {
      PushNotification.localNotification({
        channelId: 'general-notif',
        title: 'Local Notif',
        message: 'Coba Notif broo',
      });
    }, 5000);
  };

  getUser = () => {
    const {token} = this.props.auth;
    this.props.getUserById(token).then(() => {
      this.setState({
        loading: false,
      });
      if (this.props.users.msg === 'You Must Login First') {
        this.props.authLogout();
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error',
          text2: `${this.props.transaction.errMsg}`,
          visibilityTime: 1000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
      }
    });
  };

  onRefresh = () => {
    this.setState(
      {
        refreshing: true,
      },
      () => {
        if (this.state.refreshing === true) {
          const {token} = this.props.auth;
          this.props.getUserById(token).then(() => {
            this.setState({
              loading: false,
            });
            if (this.props.users.msg === 'You Must Login First') {
              this.props.authLogout();
              Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Error',
                text2: `${this.props.transaction.errMsg}`,
                visibilityTime: 1000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40,
              });
            }
          });
        }
      },
    );
    setTimeout(() => {
      this.setState({
        refreshing: false,
      });
    }, 2000);
  };

  componentDidMount() {
    const {token, notifToken} = this.props.auth;
    this.props.authNotifToken(token, notifToken);
    this.getUser();
    RNBootSplash.hide({fade: true});
  }

  test = () => {
    Toast.show({
      type: 'success',
      position: 'top',
      text1: 'Hello',
      text2: 'This is some something 👋',
      visibilityTime: 800,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    });
  };

  render() {
    return (
      <>
        {this.state.loading === false ? (
          <View style={styles.wrapper}>
            <ScrollView
              contentContainerStyle={styles.wrapperHeader}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this.onRefresh}
                />
              }>
              <View style={styles.headerLeft}>
                <TouchableOpacity>
                  {this.props.users.data.image !== null ? (
                    <Image
                      style={styles.profile}
                      source={{
                        uri: `${REACT_APP_BASE_URL}/static/images/${this.props.users.data.image}`,
                      }}
                    />
                  ) : (
                    <Image
                      style={styles.profile}
                      source={{
                        uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
                      }}
                    />
                  )}
                </TouchableOpacity>
                <View style={styles.wrapperName}>
                  {this.props.users.data.name !== '' && (
                    <Text style={styles.name}>
                      {this.props.users.data.name}
                    </Text>
                  )}
                  <Text style={styles.number}>
                    {this.props.users.data.phone_number}
                  </Text>
                </View>
              </View>
              <View style={styles.headerRight}>
                <TouchableOpacity>
                  <MaterialCommunityIcons
                    name="android-messages"
                    color="#fff"
                    size={30}
                  />
                </TouchableOpacity>
              </View>
            </ScrollView>
            <View style={styles.wrapperContent}>
              <View style={styles.wrapperBalance}>
                <View style={styles.balance}>
                  <Text style={styles.textBalance}>Balance</Text>
                  <Text style={styles.numberBalance}>
                    {this.props.users.data.balance}
                  </Text>
                </View>
                <View style={styles.featureBalance}>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Topup')}
                    style={styles.wrapperFeature}>
                    <Image source={iconTopup} style={styles.iconTopup} />
                    <Text style={styles.textIcon}>Top Up</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Transfer')}
                    style={styles.wrapperFeature}>
                    <Image source={iconTransfer} style={styles.iconTransfer} />
                    <Text style={styles.textIcon}>Transfer</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('History')}
                    style={styles.wrapperFeature}>
                    <Image source={iconHistory} style={styles.iconHistory} />
                    <Text style={styles.textIcon}>History</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <ScrollView style={styles.sv}>
                <View style={styles.wrapperScroll}>
                  <View style={styles.wrapperPayment}>
                    <TouchableOpacity
                      onPress={() => this.props.navigation.navigate('Pulsa')}
                      style={styles.wrapperFeature}>
                      <Image source={iconPulsa} style={styles.iconPulsa} />
                      <Text style={styles.textIcon}>Pulsa</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.wrapperFeature}>
                      <Image source={iconSchool} style={styles.iconSchool} />
                      <Text style={styles.textIcon}>Pendidikan</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.wrapperFeature}>
                      <Image source={iconGame} style={styles.iconGame} />
                      <Text style={styles.textIcon}>Game</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.wrapperFeature}>
                      <Image source={iconStream} style={styles.iconStream} />
                      <Text style={styles.textIcon}>Streaming</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.wrapperFeature}>
                      <Image source={iconMusic} style={styles.iconMusic} />
                      <Text style={styles.textIcon}>Musik</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.wrapperFeature}>
                      <Image
                        source={iconInternet}
                        style={styles.iconInternet}
                      />
                      <Text style={styles.textIcon}>Internet</Text>
                    </TouchableOpacity>
                  </View>
                  <ScrollView
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    style={styles.wrapperCards}>
                    <View style={styles.wrapperCard}>
                      <Image
                        style={styles.imageCard}
                        source={{
                          uri: 'https://www.k24klik.com/blog/wp-content/uploads/2021/03/blog-banner-OVO-CLBK.jpg',
                        }}
                      />
                    </View>
                    <View style={styles.wrapperCard}>
                      <Image
                        style={styles.imageCard}
                        source={{
                          uri: 'https://images-loyalty.ovo.id/public/deal/78/88/l/15438.jpg?ver=1',
                        }}
                      />
                    </View>
                    <View style={styles.wrapperCard}>
                      <Image
                        style={styles.imageCard}
                        source={{
                          uri: 'https://infodigimarket.com/wp-content/uploads/2018/10/180320-ovo.jpg',
                        }}
                      />
                    </View>
                  </ScrollView>
                </View>
              </ScrollView>
            </View>
          </View>
        ) : (
          <View style={styles.wrapper}>
            <View style={styles.wrapperHeader} />
            <View style={styles.wrapperContent}>
              <View style={styles.wrapperBalanceLoading} />
              <View style={styles.wrapperPaymentLoading} />
              <View style={styles.wrapperCardLoading} />
            </View>
          </View>
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  users: state.users,
});

const mapDispatchToProps = {authNotifToken, getUserById, authLogout};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  wrapperHeader: {
    flex: 1,
    backgroundColor: '#440A67',
    flexDirection: 'row',
  },
  headerLeft: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '70%',
    height: 60,
    marginLeft: 27,
    marginTop: 60,
  },
  headerRight: {
    width: '15%',
    height: 60,
    marginTop: 60,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  profile: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  wrapperName: {
    marginLeft: 10,
  },
  name: {
    fontFamily: 'Roboto-Medium',
    color: '#fff',
    marginVertical: 2,
  },
  number: {
    fontFamily: 'Roboto-Regular',
    color: '#fff',
    marginVertical: 2,
  },
  wrapperContent: {
    flex: 5,
    alignItems: 'center',
  },
  sv: {
    marginTop: 20,
  },
  wrapperScroll: {
    width: '100%',
    alignItems: 'center',
  },
  wrapperBalance: {
    marginTop: '-15%',
    width: '95%',
    height: 200,
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    elevation: 5,
  },
  wrapperBalanceLoading: {
    backgroundColor: '#E0DEDE',
    marginTop: -110,
    width: '95%',
    height: 200,
    borderRadius: 20,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    elevation: 5,
  },
  balance: {
    width: '100%',
    height: 90,
    justifyContent: 'center',
    paddingHorizontal: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#E0DEDE',
  },
  textBalance: {
    fontFamily: 'Roboto-Medium',
    fontSize: 15,
    color: '#440A67',
  },
  numberBalance: {
    fontFamily: 'Roboto-Medium',
    fontSize: 24,
    color: '#440A67',
  },
  wrapperPayment: {
    justifyContent: 'center',
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '95%',
    height: 220,
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    elevation: 5,
  },
  wrapperPaymentLoading: {
    marginTop: 40,
    width: 340,
    height: 220,
    backgroundColor: '#E0DEDE',
    borderRadius: 20,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    elevation: 5,
  },
  wrapperCardLoading: {
    marginTop: 40,
    width: 340,
    height: 110,
    backgroundColor: '#E0DEDE',
    borderRadius: 20,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    elevation: 5,
  },
  featureBalance: {
    width: '100%',
    height: 110,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperFeature: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconTopup: {
    width: 30,
    height: 30,
  },
  iconTransfer: {
    width: 30,
    height: 35,
  },
  iconHistory: {
    width: 30,
    height: 30,
  },
  iconPulsa: {
    width: 19,
    height: 30,
  },
  iconSchool: {
    width: 38,
    height: 25,
    marginBottom: 5,
  },
  iconGame: {
    width: 40,
    height: 30,
    marginBottom: 5,
  },
  iconStream: {
    width: 30,
    height: 28,
    marginBottom: 2,
  },
  iconInternet: {
    width: 35,
    height: 25,
    marginBottom: 5,
  },
  iconMusic: {
    width: 25,
    height: 23,
    marginBottom: 5,
  },
  textIcon: {
    marginTop: 5,
    fontFamily: 'Roboto-Regular',
    color: '#440A67',
  },
  wrapperCards: {
    margin: '3%',
  },
  wrapperCard: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: '2%',
    marginRight: 15,
    width: 300,
    height: 130,
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    elevation: 5,
  },
  imageCard: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
});
