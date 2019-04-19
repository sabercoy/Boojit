import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

const square = (props) => {
  return (
    <View style={{ backgroundColor: props.color, width: props.sideLength, height: props.sideLength }} />
  );
};

square.propTypes = {
  color: PropTypes.string.isRequired,
  sideLength: PropTypes.number.isRequired
};

export default square;