import React from 'react';
import { StyleSheet, TouchableHighlight, View } from 'react-native';
import { Container, Text, Button } from 'native-base';
import PropTypes from 'prop-types';
import Colors from '../../../theme/Colors';

const button = (props) => {
  return (
    <View style={{ flex: props.flex, width: props.width, backgroundColor: 'transparent' }}>
      <Button {...props} light full rounded style={{ height: '100%', width: '100%', backgroundColor: props.color }} />
    </View>
  );
};

button.defaultProps = {
  flex: 1,
  color: Colors.white,
  width: '100%'
};

button.propTypes = {
  flex: PropTypes.number,
  width: PropTypes.string,
  color: PropTypes.string
};

export default button;