import React from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native';
import { Content, Spinner, Header, Container, Left, Body, Right, Title, List, ListItem, Icon } from 'native-base';
import Button from '../Button/Button';
import Spacer from '../Spacing/Spacer';
import TextField from '../TextField/TextField';
import Colors from '../../../theme/Colors';
import RF from 'react-native-responsive-fontsize';
import PropTypes from 'prop-types';
import { Category } from '../../../classes';
import DatePicker from 'react-native-datepicker';

interface IProps {
  initialFromDate: Date;
  initialToDate: Date;
  onFinishDate: () => void; //TODO: have this set state in parent
  onClose: () => void;
}

interface IState {
  fromDate: Date;
  toDate: Date;
  dateRangeValid: boolean;
}

class DateRangePicker extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      fromDate: this.props.initialFromDate,
      toDate: this.props.initialToDate,
      dateRangeValid: false
    };
  }

  onChangeFromDate = (newDate: string) => {
    this.setState(prevState => {
      const newFromDate = new Date(newDate);
      const dateRangeValid = (prevState.toDate.getTime() - newFromDate.getTime()) > 0;
      console.log(dateRangeValid);
      return {
        fromDate: newFromDate,
        dateRangeValid: dateRangeValid
      };
    });
  }

  onChangeToDate = (newDate: Date) => {
    this.setState(prevState => {
      const newToDate = new Date(newDate);
      const dateRangeValid = (newToDate.getTime() - prevState.fromDate.getTime()) > 0;

      return {
        toDate: newToDate,
        dateRangeValid: dateRangeValid
      };
    });
  }

  onSubmitDateRange = () => {
    this.props.onFinishDate(this.state.fromDate, this.state.toDate);
    this.props.onClose();
  }

  render() {
    return (
      <View style={{ width: '75%', height: '25%', backgroundColor: Colors.lightGray }}>
        <View style={{ flex: 20, flexDirection: 'row' }}>
          <Spacer flex={1} />
          <View style={{ flex: 18 }}>
            <Spacer flex={1} />
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ width: '30%', fontSize: RF(4) }}>{'From:'}</Text>
              <View style={{ width: '70%', borderRadius: 50, backgroundColor: Colors.white, justifyContent: 'center', alignItems: 'center' }}>
                <DatePicker
                  style={{ width: '100%' }}
                  date={this.state.fromDate}
                  mode="date"
                  placeholder="select date"
                  format="MM/DD/YYYY"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  showIcon={false}
                  onDateChange={this.onChangeFromDate}
                  customStyles={{
                    placeholderText: {
                      fontSize: RF(4),
                      color: Colors.black
                    },
                    dateInput: {
                      borderColor: 'transparent'
                    },
                    dateText: {
                      fontSize: RF(4)
                    }
                  }}
                />
              </View>
            </View>
            <Spacer flex={1} />
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ width: '30%', fontSize: RF(4) }}>{'To:'}</Text>
              <View style={{ width: '70%', borderRadius: 50, backgroundColor: Colors.white, justifyContent: 'center', alignItems: 'center' }}>
                <DatePicker
                  style={{ width: '100%' }}
                  date={this.state.toDate}
                  mode="date"
                  placeholder="select date"
                  format="MM/DD/YYYY"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  showIcon={false}
                  onDateChange={this.onChangeToDate}
                  customStyles={{
                    placeholderText: {
                      fontSize: RF(4),
                      color: Colors.black
                    },
                    dateInput: {
                      borderColor: 'transparent'
                    },
                    dateText: {
                      fontSize: RF(4)
                    },
                    datePickerCon: {
                      backgroundColor: 'green'
                    }
                  }}
                />
              </View>
            </View>
            <Spacer flex={1} />
            <View style={{ flex: 4.2, flexDirection: 'row' }}>
              <Spacer flex={18} />
              <Button
                flex={6}
                onPress={this.props.onClose}
              >
                <Icon name={'md-close'} style={{ fontSize: RF(4) }} />
              </Button>
              <Spacer flex={0.5} />
              <Button
                flex={6}
                onPress={this.onSubmitDateRange}
                color={this.state.dateRangeValid ? Colors.white : Colors.gray}
                disabled={!this.state.dateRangeValid}
              >
                <Icon name={'md-checkmark-circle-outline'} style={{ fontSize: RF(4) }} />
              </Button>
            </View>
            <Spacer flex={1} />
          </View>
          <Spacer flex={1} />
        </View>
      </View>
    );
  }
}

DateRangePicker.propTypes = {
  initialFromDate: PropTypes.instanceOf(Date).isRequired,
  initialToDate: PropTypes.instanceOf(Date).isRequired,
  onFinishDate: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};

export default DateRangePicker;