import React from 'react';
import { StyleSheet } from 'react-native';
import RootNavigators from './src/navigations/RootNavigators';
import { hide } from 'react-native-bootsplash';
import {networkService} from "./src/networking";
import {persistor, store} from "./src/store";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  const handleStoreRehydration = () => {
    const { accessToken } = store.getState().user;

    if (accessToken) {
      networkService.setAccessToken(accessToken);
    }
  };
  return (
      <Provider store={store}>
            <RootNavigators />
      </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
