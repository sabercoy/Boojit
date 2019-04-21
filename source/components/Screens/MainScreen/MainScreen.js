import React from 'react';
import { StyleSheet, TouchableHighlight, View, ScrollView, Dimensions } from 'react-native';
import { Container, Text, Input, Item, Icon, Picker } from 'native-base';
import PropTypes from 'prop-types';
import Colors from '../../../theme/Colors';
import { Button, TextField, Spacer } from '../../Controls';
import RF from 'react-native-responsive-fontsize';
import { Category } from '../../../classes';

interface IProps {
  setAppLoading: (isLoading: boolean) => void;
  setCanRewind: (canRewind: boolean) => void;
}

interface IState {
  minusSelected: boolean;
  selectedCategory: Category;
  textBoxValueValid: boolean;
}

let textBoxDone = false;
let textBoxValue = 0;
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const pageWidth = screenWidth * 0.95;

class MainScreen extends React.Component<IState, IProps> {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: '',                   //make this their most popular category in didMount()
      textBoxValueValid: false,
      textFieldFocused: false
      //totalBalance: '',
      //categories: [],
    };

    this.textBox = React.createRef();
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
      this.setState({
        textBoxValueValid: false
      });
    }, 2000);
  }

  onDollarAmountDone = (value) => {
    textBoxDone = true;
    const decimalCount = (value.match(/\./g) === null ? 0 : value.match(/\./g).length);
    const otherCharCount = (value.match(/[^0-9.]/g) === null ? 0 : value.match(/[^0-9.]/g).length);
    const digitsAfterDecimalCount = (decimalCount === 1 ? value.split('.')[1].length : 0);

    if (value !== '' && value !== '.' && decimalCount <= 1 && otherCharCount === 0 && digitsAfterDecimalCount <= 2) {
      textBoxValue = parseFloat(value);

      this.setState({
        textBoxValueValid: true,
        textFieldFocused: false
      });
    } else {
      this.setState({
        textBoxValueValid: false,
        textFieldFocused: false
      });
    }
  }

  onTextBoxValueChange = () => {
    textBoxDone = false;

    this.setState({
      textBoxValueValid: false
    });
  }

  onTextFieldFocus = () => {
    this.setState({
      textFieldFocused: true
    });
  }

  render() {
    return (
      <View
        style={{
          height: screenHeight,
          width: pageWidth
        }}
      >
        <View style={{ height: '5%' }} />
        <View style={{ height: '30%', justifyContent: 'center', alignItems: 'center' }}>
          {
            this.state.textFieldFocused ? (
              null
            ) : ( 
              <Text style={{ fontSize: RF(8) }}>
                $999,999,999
                <Text style={{ fontSize: RF(4) }}>
                  .99
                </Text>
              </Text>
            )
          }
        </View>
        <View style={{ height: '15%', flexDirection: 'row' }}>
          <TextField
            ref={(me) => { this.textBox = (me ? me.textBox : null); }}  //me is null between renders, so do not try to read from it then
            onChangeText={this.onTextBoxValueChange}
            flex={1}
            width={'100%'}
            maxLength={11}
            fontSize={RF(6)}
            onSubmitValue={this.onDollarAmountDone}
            error={textBoxDone && !this.state.textBoxValueValid}
            success={textBoxDone && this.state.textBoxValueValid}
            moneyField
            onFocus={this.onTextFieldFocus}
          />
        </View>
        <View style={{ height: '1%' }} />
        <View style={{ height: '8%', backgroundColor: Colors.white, borderRadius: 50 }}>
          <Picker
            rounded
            selectedValue={this.state.selectedCategory}
            onValueChange={(newValue) => { this.setState({ selectedCategory: newValue }); }}
          >
            <Picker.Item label="Java" value="Java" />
            <Picker.Item label="JavaScript" value="JavaScript" />
          </Picker>
        </View>
        <View style={{ height: '2%' }} />
        <View style={{ height: '30%' }}>
          <Button
            disabled={!this.state.textBoxValueValid}
            color={this.state.textBoxValueValid ? Colors.white : Colors.gray}
            large
            onPress={this.onSubmitOperation}
          >
            <Icon name={'md-checkmark-circle-outline'} style={{ fontSize: RF(20), color: this.state.textBoxValueValid ? Colors.black : Colors.white }} />
          </Button>
        </View>
        <Spacer flex={1} />
      </View>
    );
  }
}

MainScreen.propTypes = {
  setAppLoading: PropTypes.func.isRequired,
  setCanRewind: PropTypes.func.isRequired
};

export default MainScreen;