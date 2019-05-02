import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const spacer = (props) => {
  const styles = StyleSheet.create({
    spacer: {
      flex: props.flex,
      width: props.width,
      height: props.height,
      backgroundColor: props.backgroundColor ? props.backgroundColor : 'transparent'
    }
  });

  return (
    <View style={styles.spacer} />
  );
};

spacer.defaultProps = {
  flex: null,
  height: null,
  width: '0%',
  backgroundColor: null
};

spacer.propTypes = {
  flex: PropTypes.number,
  height: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired
  ]),
  width: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired
  ]),
  backgroundColor: PropTypes.string
};

export default spacer;