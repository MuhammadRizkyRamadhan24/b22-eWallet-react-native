import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import {historyReceiver, historySender} from '../redux/actions/transfers';

// const footerComponent = () => {
//   return (
//     <View>
//       <ActivityIndicator size="large" color="#440A67" />
//     </View>
//   );
// };

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'Transfer',
      pageReceiver: 1,
      pageSender: 1,
      historyReceive: [],
      historySender: [],
    };
  }

  componentDidMount() {
    const {token} = this.props.auth;
    this.props.historyReceiver(token, this.state.pageReceiver).then(() => {
      this.setState({
        historyReceive: this.props.transfers.dataReceiver,
      });
    });
    this.props.historySender(token, this.state.pageSender).then(() => {
      this.setState({
        historySender: this.props.transfers.dataSender,
      });
    });
  }

  loadMoreReceiver = () => {
    const {token} = this.props.auth;
    this.setState(
      {
        pageReceiver: this.state.pageReceiver + 1,
      },
      () => {
        this.props.historyReceiver(token, this.state.pageReceiver).then(() => {
          if (this.props.transfers.msgReceiver !== 'User Not Found') {
            this.setState({
              historyReceive: this.state.historyReceive.concat(
                this.props.transfers.dataReceiver,
              ),
            });
          }
        });
      },
    );
  };

  loadMoreSender = () => {
    const {token} = this.props.auth;
    this.setState(
      {
        pageSender: this.state.pageSender + 1,
      },
      () => {
        this.props.historySender(token, this.state.pageSender).then(() => {
          if (this.props.transfers.msgSender !== 'User Not Found') {
            this.setState({
              historySender: this.state.historySender.concat(
                this.props.transfers.dataSender,
              ),
            });
          }
        });
      },
    );
  };

  render() {
    // console.log(this.state.historySender);
    return (
      <View style={styles.wrapper}>
        <View style={styles.wrapperHeader}>
          <Text style={styles.titleBalance}>Balance</Text>
          <Text style={styles.balance}>{this.props.users.data.balance}</Text>
        </View>
        <View style={styles.wrapperContent}>
          <View style={styles.nav}>
            <Text style={styles.title}>{this.state.status}</Text>
            <TouchableOpacity
              onPress={() => this.setState({status: 'Transfer'})}
              style={styles.wrapButton}>
              <Text style={styles.textButton}>Transfer</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.setState({status: 'Receive'})}
              style={styles.wrapButton}>
              <Text style={styles.textButton}>Receive</Text>
            </TouchableOpacity>
          </View>
          {this.state.status === 'Transfer' && (
            <FlatList
              style={styles.wrapperCard}
              scrollEnabled={true}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.id}
              data={this.state.historySender}
              renderItem={({item}) => (
                <View style={styles.card}>
                  <View style={styles.cardLeft}>
                    <Text style={styles.textName}>
                      Transfer to {item.userDetailReceiver.name}
                    </Text>
                    <Text style={styles.textDesc}>{item.description}</Text>
                  </View>
                  <View style={styles.cardRight}>
                    <Text style={styles.textBalance}>
                      {item.deductedBalance}
                    </Text>
                  </View>
                </View>
              )}
              onEndReached={this.loadMoreSender}
              onEndReachedThreshold={0}
              // ListFooterComponent={
              //   this.props.transfers.msgSender !== 'User Not Found' &&
              //   footerComponent
              // }
              // ListFooterComponentStyle={styles.footer}
            />
          )}
          {this.state.status === 'Receive' && (
            <FlatList
              style={styles.wrapperCard}
              scrollEnabled={true}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.id}
              data={this.state.historyReceive}
              renderItem={({item}) => (
                <View style={styles.card}>
                  <View style={styles.cardLeft}>
                    <Text style={styles.textName}>
                      Receive from {item.userDetailSender.name}
                    </Text>
                    <Text style={styles.textDesc}>{item.description}</Text>
                  </View>
                  <View style={styles.cardRight}>
                    <Text style={styles.textBalance}>
                      {item.deductedBalance}
                    </Text>
                  </View>
                </View>
              )}
              onEndReached={this.loadMoreReceiver}
              onEndReachedThreshold={0}
              // ListFooterComponent={
              //   this.props.transfers.msgReceiver !== 'User Not Found' &&
              //   footerComponent
              // }
              // ListFooterComponentStyle={styles.footer}
            />
          )}
          {/* <View style={styles.wrapperCard}>
            <View style={styles.card}>
              <View style={styles.cardLeft}>
                <Text style={styles.textName}>Transfer to Muhammad</Text>
                <Text style={styles.textDesc}>Buat Jajan</Text>
              </View>
              <View style={styles.cardRight}>
                <Text style={styles.textBalance}>200.000</Text>
              </View>
            </View>
          </View> */}
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  users: state.users,
  transfers: state.transfers,
});

const mapDispatchToProps = {historyReceiver, historySender};

export default connect(mapStateToProps, mapDispatchToProps)(History);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  wrapperHeader: {
    flex: 1,
    backgroundColor: '#440A67',
    padding: 30,
    justifyContent: 'center',
  },
  wrapperContent: {
    flex: 4,
    alignItems: 'center',
  },
  titleBalance: {
    fontFamily: 'Roboto-Medium',
    color: '#FFF',
    fontSize: 17,
  },
  balance: {
    fontFamily: 'Roboto-Bold',
    color: '#FFF',
    fontSize: 33,
  },
  nav: {
    backgroundColor: 'white',
    width: '100%',
    height: 60,
    paddingHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    width: 190,
    fontFamily: 'Roboto-Medium',
    fontSize: 20,
  },
  wrapButton: {
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    marginTop: 5,
    fontFamily: 'Roboto-thin',
    fontSize: 16,
  },
  wrapperCard: {
    marginTop: 20,
    width: '100%',
    flex: 1,
  },
  card: {
    width: '100%',
    height: 80,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E0DEDE',
    borderTopWidth: 1,
    borderTopColor: '#E0DEDE',
    flexDirection: 'row',
    padding: 10,
  },
  cardLeft: {
    width: '70%',
    justifyContent: 'center',
  },
  cardRight: {
    width: '30%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  textName: {
    fontFamily: 'Roboto-Bold',
    fontSize: 15,
  },
  textDesc: {
    marginTop: 10,
    fontFamily: 'Roboto-thin',
    fontSize: 13,
    color: 'gray',
  },
  textBalance: {
    fontFamily: 'Roboto-Bold',
    fontSize: 18,
  },
  footer: {
    marginTop: 20,
  },
});
