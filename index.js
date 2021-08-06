/**
 * @format
 */

import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import PushNotification from 'react-native-push-notification';
import {Provider} from 'react-redux';
// import store from './src/redux/store';
import FlashMessage from 'react-native-flash-message';
import reduxConfig from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';

const redux = reduxConfig();

PushNotification.configure({
  onRegister: token => {
    redux.store.dispatch({
      type: 'AUTH_NOTIF_TOKEN',
      payload: token,
    });
    console.log(token);
  },
});

PushNotification.createChannel({
  channelId: 'general-notif',
  channelName: 'General Notification',
});

const Main = () => {
  return (
    <Provider store={redux.store}>
      <PersistGate persistor={redux.persistor}>
        <App />
        <FlashMessage position="top" />
      </PersistGate>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => Main);
