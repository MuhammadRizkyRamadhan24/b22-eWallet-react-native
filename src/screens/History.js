import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {connect} from 'react-redux';
import {historyReceiver, historySender} from '../redux/actions/transfers';
import {historyTransaction} from '../redux/actions/transactions';

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'Transfer',
      pageReceiver: 1,
      pageSender: 1,
      pageTransaction: 1,
      historyReceive: [],
      historySender: [],
      historyTransaction: [],
    };
  }

  componentDidMount() {
    const {token} = this.props.auth;
    this.props.historyReceiver(token, this.state.pageReceiver).then(() => {
      console.log(this.props.transfers.dataReceiver, 'hehe');
      if (this.props.transfers.dataReceiver === 'User Not Found') {
        this.setState({
          historyReceive: [],
        });
      } else {
        this.setState({
          historyReceive: this.props.transfers.dataReceiver,
        });
      }
    });
    this.props.historySender(token, this.state.pageSender).then(() => {
      if (this.props.transfers.dataSender === 'User Not Found') {
        this.setState({
          historySender: [],
        });
      } else {
        this.setState({
          historySender: this.props.transfers.dataSender,
        });
      }
    });
    this.props
      .historyTransaction(token, this.state.pageTransaction)
      .then(() => {
        if (this.props.transactions.data === 'User Not Found') {
          this.setState({
            historyTransaction: [],
          });
        } else {
          this.setState({
            historyTransaction: this.props.transactions.data,
          });
        }
      });
  }

  loadMoreTransaction = () => {
    const {token} = this.props.auth;
    this.setState(
      {
        pageTransaction: this.state.pageTransaction + 1,
      },
      () => {
        this.props
          .historyTransaction(token, this.state.pageTransaction)
          .then(() => {
            if (this.props.transactions.msg !== 'User Not Found') {
              this.setState({
                historyTransaction: this.state.historyTransaction.concat(
                  this.props.transactions.data,
                ),
              });
            }
          });
      },
    );
  };

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
    return (
      <View style={styles.wrapper}>
        <View style={styles.wrapperHeader}>
          <Text style={styles.titleBalance}>Balance</Text>
          <Text style={styles.balance}>{this.props.users.data.balance}</Text>
          <Text style={styles.title}>{this.state.status}</Text>
        </View>
        <View style={styles.wrapperContent}>
          <View style={styles.nav}>
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
            <TouchableOpacity
              onPress={() => this.setState({status: 'Transactions'})}
              style={styles.wrapButton}>
              <Text style={styles.textButton}>Transactions</Text>
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
            />
          )}
          {this.state.status === 'Transactions' && (
            <FlatList
              style={styles.wrapperCard}
              scrollEnabled={true}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.id}
              data={this.state.historyTransaction}
              renderItem={({item}) => (
                <View style={styles.card}>
                  <View style={styles.cardLeft}>
                    <Text style={styles.textName}>{item.refNo}</Text>
                    <Text style={styles.textDesc}>{item.description}</Text>
                  </View>
                  <View style={styles.cardRight}>
                    <Text style={styles.textBalance}>
                      {item.deductedBalance}
                    </Text>
                  </View>
                </View>
              )}
              onEndReached={this.loadMoreTransaction}
              onEndReachedThreshold={0}
            />
          )}
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  users: state.users,
  transfers: state.transfers,
  transactions: state.transactions,
});

const mapDispatchToProps = {historyReceiver, historySender, historyTransaction};

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
    marginTop: 20,
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
    justifyContent: 'center',
  },
  title: {
    marginTop: '10%',
    fontFamily: 'Roboto-Medium',
    fontSize: 24,
    color: '#fff',
  },
  wrapButton: {
    paddingHorizontal: 16,
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
    fontSize: 13,
  },
  textDesc: {
    marginTop: 10,
    fontFamily: 'Roboto-thin',
    fontSize: 11,
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
