import React from 'react';
import { StyleSheet, View } from 'react-native';
import Colors from '../../../theme/Colors';
import { Spinner } from 'native-base';
import PieChart from 'react-native-pie-chart';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  pieChart: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  },
  centerItem: {
    position: 'absolute'
  }
});

const pieChart = (props) => {
  return (
    <React.Fragment>
      <View style={styles.pieChart}>
        <PieChart
          chart_wh={props.diameter}
          series={props.series}
          sliceColor={props.colors}
          doughnut={props.centerHole}
          coverRadius={props.centerRadiusPercent}
          coverFill={props.centerColor}
        />
        <View style={styles.centerItem}>
          {props.centerItem}
        </View>
      </View>
    </React.Fragment>
  );
};

pieChart.defaultProps = {
  centerHole: false,
  centerRadiusPercent: 0,
  centerColor: '',
  centerItem: null
};

pieChart.propTypes = {
  diameter: PropTypes.number.isRequired,
  series: PropTypes.arrayOf(PropTypes.number).isRequired,
  centerHole: PropTypes.bool,
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
  centerRadiusPercent: PropTypes.number,
  centerColor: PropTypes.string,
  centerItem: PropTypes.element
};

export default pieChart;