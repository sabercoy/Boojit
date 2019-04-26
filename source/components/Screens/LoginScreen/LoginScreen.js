import React from 'react';
import { StyleSheet, TouchableHighlight, View, ScrollView, Dimensions } from 'react-native';
import { Container, Text, Input, Item, Icon, Picker } from 'native-base';
import PropTypes from 'prop-types';
import Colors from '../../../theme/Colors';
import { Button, TextField, Spacer } from '../../Controls';
import RF from 'react-native-responsive-fontsize';
import { Category } from '../../../classes';

interface IProps {

}

interface IState {

}

let textBoxDone = false;
//let textBoxValue = 0;
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const pageWidth = screenWidth * 0.95;

class LoginScreen extends React.Component<IState, IProps> {
  constructor(props) {
    super(props);
    this.state = {

    };

    //this.textBox = React.createRef();
  }

  componentDidMount() {
    //fetch data
  }

  onSubmitOperation = () => {
    this.props.setAppLoading(true);
    setTimeout(() => {
      this.props.setAppLoading(false);
      textBoxDone = false;
      this.textBox.clear();
      this.props.setCanRewind(true);
      // this.setState({
      //   textBoxValueValid: false
      // });
    }, 2000);
  }

  // onDollarAmountDone = (value) => {
  //   textBoxDone = true;
  //   const decimalCount = (value.match(/\./g) === null ? 0 : value.match(/\./g).length);
  //   const otherCharCount = (value.match(/[^0-9.]/g) === null ? 0 : value.match(/[^0-9.]/g).length);
  //   const digitsAfterDecimalCount = (decimalCount === 1 ? value.split('.')[1].length : 0);

  //   if (value !== '' && value !== '.' && decimalCount <= 1 && otherCharCount === 0 && digitsAfterDecimalCount <= 2) {
  //     textBoxValue = parseFloat(value);

  //     this.setState({
  //       textBoxValueValid: true,
  //       textFieldFocused: false
  //     });
  //   } else {
  //     this.setState({
  //       textBoxValueValid: false,
  //       textFieldFocused: false
  //     });
  //   }
  // }

  onTextBoxValueChange = () => {
    // textBoxDone = false;

    // this.setState({
    //   textBoxValueValid: false
    // });
  }

  onTextFieldFocus = () => {
    // this.setState({
    //   textFieldFocused: true
    // });
  }

  render() {
    return (
      <Text>Login</Text>
    );
  }
}

LoginScreen.propTypes = {
  // setAppLoading: PropTypes.func.isRequired,
  // setCanRewind: PropTypes.func.isRequired
};

export default LoginScreen;