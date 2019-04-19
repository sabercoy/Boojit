import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Colors from '../../../theme/Colors';
import { Spinner } from 'native-base';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  background: {
    backgroundColor: Colors.black,
    opacity: 0.6,
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  lightBox: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%'
  }
});

const lightBox = (props) => {
  return (
    <React.Fragment>
      <View style={styles.background} />
      <View style={styles.lightBox}>
        {props.content}
      </View>
    </React.Fragment>
  );
};

lightBox.propTypes = {
  content: PropTypes.element.isRequired
};

export default lightBox;