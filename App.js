import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView, AsyncStorage } from 'react-native';
import { Container } from 'native-base';
import Boojit from './source/components/Boojit';
import { LoadingSpinner } from './source/components/Controls';
import RNSecureKeyStore, { ACCESSIBLE } from 'react-native-secure-key-store';

import firebase from 'react-native-firebase';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loadingDeviceLoginInfo: true
    };
    // RNSecureKeyStore.set('boojitEmail', 'sabianpugh12@gmail.com', { accessible: ACCESSIBLE.WHEN_UNLOCKED })
    //   .then((res) => {
    //     console.warn(res);
    //   }, (err) => {
    //     console.warn(err);
    //   });
    // RNSecureKeyStore.set('boojitPassword', 'PENguin12!', { accessible: ACCESSIBLE.WHEN_UNLOCKED })
    //   .then((res) => {
    //     console.warn(res);
    //   }, (err) => {
    //     console.warn(err);
    //   });

    // RNSecureKeyStore.get('testKeyForAndroidDevice')
    //   .then((res) => {
    //     console.warn(res);
    //   }, (err) => {
    //     console.warn(err);
    //   });

    RNSecureKeyStore.remove('boojitEmail')
      .then((res) => {
        console.warn(res);
      }, (err) => {
        console.warn(err);
      });
    RNSecureKeyStore.remove('boojitPassword')
      .then((res) => {
        console.warn(res);
      }, (err) => {
        console.warn(err);
      });
  }

  async componentDidMount() {
    try {
      const username = await RNSecureKeyStore.get('boojitEmail');
      const password = await RNSecureKeyStore.get('boojitPassword');

      //may not need password?

      this.setState({
        loadingDeviceLoginInfo: false
      });
    } catch {
      this.setState({
        loadingDeviceLoginInfo: false
      });
    }
  }

  getDeviceLoginInfo = () => {
    // RNSecureKeyStore.set('key1', 'value1', { accessible: ACCESSIBLE.WHEN_UNLOCKED })
    //   .then((res) => {
    //     console.log(res);
    //   }, (err) => {
    //     console.log(err);
    //   });
  }

  render() {
    return (
      this.state.loadingDeviceLoginInfo ? (
        <LoadingSpinner />
      ) : (
        <Boojit />
      )
    );
  }
}

/*
  <Text style={styles.modulesHeader}>The following Firebase modules are pre-installed: YE</Text>
  {firebase.admob.nativeModuleExists && <Text style={styles.module}>admob()</Text>}
  {firebase.analytics.nativeModuleExists && <Text style={styles.module}>analytics()</Text>}
  {firebase.auth.nativeModuleExists && <Text style={styles.module}>auth()</Text>}
  {firebase.config.nativeModuleExists && <Text style={styles.module}>config()</Text>}
  {firebase.crashlytics.nativeModuleExists && <Text style={styles.module}>crashlytics()</Text>}
  {firebase.database.nativeModuleExists && <Text style={styles.module}>database()</Text>}
  {firebase.firestore.nativeModuleExists && <Text style={styles.module}>firestore()</Text>}
  {firebase.functions.nativeModuleExists && <Text style={styles.module}>functions()</Text>}
  {firebase.iid.nativeModuleExists && <Text style={styles.module}>iid()</Text>}
  {firebase.invites.nativeModuleExists && <Text style={styles.module}>invites()</Text>}
  {firebase.links.nativeModuleExists && <Text style={styles.module}>links()</Text>}
  {firebase.messaging.nativeModuleExists && <Text style={styles.module}>messaging()</Text>}
  {firebase.notifications.nativeModuleExists && <Text style={styles.module}>notifications()</Text>}
  {firebase.perf.nativeModuleExists && <Text style={styles.module}>perf()</Text>}
  {firebase.storage.nativeModuleExists && <Text style={styles.module}>storage()</Text>}
*/