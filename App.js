import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView } from 'react-native';

import firebase from 'react-native-firebase';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  async componentDidMount() {
    // TODO: You: Do firebase things
    // const { user } = await firebase.auth().signInAnonymously();
    // console.warn('User -> ', user.toJSON());

    // await firebase.analytics().logEvent('foo', { bar: '123'});
  }

  render() {
    return (
      <Text>Lets GOOO</Text>
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