import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet} from 'react-native';
import Welcome from './src/screens/Welcome';
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import Home from './src/screens/Home';
import Profile from './src/screens/Profile';
import History from './src/screens/History';
import {NativeBaseProvider} from 'native-base';
import Toast from 'react-native-toast-message';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Topup from './src/screens/Topup';
import MethodTopup from './src/screens/MethodTopup';
import {connect} from 'react-redux';
import {LogBox} from 'react-native';
import Transfer from './src/screens/Transfer';
import EditProfile from './src/screens/EditProfile';
import TransactionPulsa from './src/screens/TransactionPulsa';
LogBox.ignoreLogs(['Reanimated 2']);

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const TabTop = createMaterialTopTabNavigator();

const TopTab = () => {
  return (
    <TabTop.Navigator
      tabBarOptions={{
        activeTintColor: '#FFF',
        labelStyle: {
          fontSize: 14,
          fontFamily: 'Roboto-Bold',
        },
        style: {backgroundColor: '#440A67'},
      }}>
      <TabTop.Screen name="Instan Top up" component={Topup} />
      <TabTop.Screen name="Methode Lain" component={MethodTopup} />
    </TabTop.Navigator>
  );
};

const BottomTab = () => {
  return (
    <>
      <Tab.Navigator
        barStyle={styles.background}
        activeColor="#440A67"
        inactiveColor="#776D8A">
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons
                name="home-variant"
                color={color}
                size={26}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({color}) => (
              <EvilIcons name="user" color={color} size={28} />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#FFF',
  },
});

const App = props => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {props.auth.token === null ? (
            <React.Fragment>
              <Stack.Screen
                name="Welcome"
                component={Welcome}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Login"
                component={Login}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Signup"
                component={Signup}
                options={{headerShown: false}}
              />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Stack.Screen
                name="Dashboard"
                component={BottomTab}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="History"
                component={History}
                options={{
                  title: 'History',
                  headerStyle: {
                    backgroundColor: '#440A67',
                  },
                  headerTintColor: '#fff',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },
                }}
              />
              <Stack.Screen
                name="Topup"
                component={TopTab}
                options={{
                  title: 'Top Up',
                  headerStyle: {
                    backgroundColor: '#440A67',
                  },
                  headerTintColor: '#fff',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },
                }}
              />
              <Stack.Screen
                name="Transfer"
                component={Transfer}
                options={{
                  title: 'Transfer',
                  headerStyle: {
                    backgroundColor: '#440A67',
                  },
                  headerTintColor: '#fff',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },
                }}
              />
              <Stack.Screen
                name="EditProfile"
                component={EditProfile}
                options={{
                  title: 'Edit Profile',
                  headerStyle: {
                    backgroundColor: '#440A67',
                  },
                  headerTintColor: '#fff',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },
                }}
              />
              <Stack.Screen
                name="Pulsa"
                component={TransactionPulsa}
                options={{
                  title: 'Pulsa',
                  headerStyle: {
                    backgroundColor: '#440A67',
                  },
                  headerTintColor: '#fff',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },
                }}
              />
            </React.Fragment>
          )}
        </Stack.Navigator>
      </NavigationContainer>
      <Toast ref={ref => Toast.setRef(ref)} />
    </NativeBaseProvider>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(App);
