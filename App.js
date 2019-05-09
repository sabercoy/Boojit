import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView, AsyncStorage } from 'react-native';
import { Container } from 'native-base';
import Boojit from './source/components/Boojit';
import { LoadingSpinner } from './source/components/Controls';
import RNSecureKeyStore, { ACCESSIBLE } from 'react-native-secure-key-store';
import firebase from 'react-native-firebase';

/*
ISSUES:

-undo last is available on login screen

*/

const BOOJIT_EMAIL = 'boojitEmail';
const BOOJIT_PASSWORD = 'boojitPassword';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loadingDeviceLoginInfo: true,
      successGettingLoginInfo: false,
      userID: ''
    };

    this.fbAuth = firebase.auth();
    this.fbFirestore = firebase.firestore();
  }

  async componentDidMount() {
    try {
      const email = await RNSecureKeyStore.get(BOOJIT_EMAIL);
      const password = await RNSecureKeyStore.get(BOOJIT_PASSWORD);

      const loginAttempt = await this.fbAuth.signInWithEmailAndPassword(email, password);

      this.setState({
        loadingDeviceLoginInfo: false,
        successGettingLoginInfo: true,
        userID: loginAttempt.user._user.uid
      });
    } catch {
      this.setState({
        loadingDeviceLoginInfo: false,
        successGettingLoginInfo: false
      });
    }
  }

  setUserID = (userID: string) => {
    this.setState({
      userID: userID
    });
  }

  render() {
    return (
      this.state.loadingDeviceLoginInfo ? (
        <LoadingSpinner />
      ) : (
        <Boojit
          successGettingLoginInfo={this.state.successGettingLoginInfo}
          fbAuth={this.fbAuth}
          fbFirestore={this.fbFirestore}
          userID={this.state.userID}
          setUserID={this.setUserID}
        />
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