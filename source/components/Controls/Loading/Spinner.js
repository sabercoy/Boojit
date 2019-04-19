import React from 'react';
import { StyleSheet, View } from 'react-native';
import Colors from '../../../theme/Colors';
import { Spinner } from 'native-base';

const styles = StyleSheet.create({
  loadingBackground: {
    backgroundColor: Colors.black,
    opacity: 0.6,
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  loadingSpinner: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%'
  }
});

const loadingSpinner = () => {
  return (
    <React.Fragment>
      <View style={styles.loadingBackground} />
      <View style={styles.loadingSpinner}>
        <Spinner color={Colors.green} />
      </View>
    </React.Fragment>
  );
};

export default loadingSpinner;