import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const pageHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  cell: {
    justifyContent: 'center',
    marginTop: -1
  }
});

const table = (props) => {
  return (
    <View style={{ backgroundColor: props.backgroundColor }}>
      {
        props.rows.map((r, rowIndex) => (
          <View key={rowIndex.toString()} style={{ flexDirection: 'row' }}>
            {
              r.map((cellData, cellDataIndex) => (
                <View
                  key={rowIndex.toString() + ':' + cellDataIndex.toString()}
                  style={{ ...styles.cell, width: props.columnWidths[cellDataIndex], borderBottomColor: 'black' }}
                >
                  {cellData}
                </View>
              ))
            }
          </View>
        ))
      }
    </View>
  );
};

table.defaultProps = {
  backgroundColor: 'transparent'
};

table.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.element)).isRequired,
  columnWidths: PropTypes.arrayOf(PropTypes.string).isRequired,
  backgroundColor: PropTypes.string
};
  
export default table;