import React from 'react';
import { StyleSheet, TouchableHighlight, View, TouchableWithoutFeedback } from 'react-native';
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

class MainScreen extends React.Component<IState, IProps> {
  constructor(props) {
    super(props);
    this.state = {
      minusSelected: true,
      selectedCategory: '',                   //make this their most popular category in didMount()
      textBoxValueValid: false,
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

  onTogglePlusMinus = () => {
    this.setState(prevState => ({
      minusSelected: !prevState.minusSelected
    }));
  }

  onDollarAmountDone = (value) => {
    textBoxDone = true;
    const decimalCount = (value.match(/\./g) === null ? 0 : value.match(/\./g).length);
    const otherCharCount = (value.match(/[^0-9.]/g) === null ? 0 : value.match(/[^0-9.]/g).length);
    const digitsAfterDecimalCount = (decimalCount === 1 ? value.split('.')[1].length : 0);

    if (value !== '' && value !== '.' && decimalCount <= 1 && otherCharCount === 0 && digitsAfterDecimalCount <= 2) {
      textBoxValue = parseFloat(value);

      this.setState({
        textBoxValueValid: true
      });
    } else {
      this.setState({
        textBoxValueValid: false
      });
    }
  }

  onTextBoxValueChange = () => {
    textBoxDone = false;

    this.setState({
      textBoxValueValid: false
    });
  }

  render() {
    return (
      <React.Fragment>
        <View style={{ flex: 8, width: '95%', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: RF(9) }}>$999,999.99</Text>
        </View>
        <View style={{ flex: 3.5, flexDirection: 'row', width: '95%' }}>
          <View style={{ flex: 1, width: '13%' }}>
            <View style={{ flex: 4 }}>
              <Button
                color={this.state.minusSelected ? Colors.white : Colors.gray}
                large
                onPress={this.state.minusSelected ? this.onTogglePlusMinus : null}
              >
                <Icon name={'md-add'} style={{ fontSize: RF(4), color: (this.state.minusSelected ? Colors.black : Colors.white) }} />
              </Button>
            </View>
            <Spacer flex={0.5} />
            <View style={{ flex: 4 }}>
              <Button
                color={this.state.minusSelected ? Colors.gray : Colors.white}
                large
                onPress={this.state.minusSelected ? null : this.onTogglePlusMinus}
              >
                <Icon name={'md-remove'} style={{ fontSize: RF(4), color: (this.state.minusSelected ? Colors.white : Colors.black) }} />
              </Button>
            </View>
          </View>
          <Spacer width={'2%'} />
          <View style={{ width: '85%' }}>
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
              autoFocus
            />
          </View>
        </View>
        <Spacer flex={0.25} width={'95%'} />
        <View style={{ flex: 2, width: '95%', backgroundColor: Colors.white, borderRadius: 50 }}>
          <Picker
            rounded
            selectedValue={this.state.selectedCategory}
            onValueChange={(newValue) => { this.setState({ selectedCategory: newValue }); }}
          >
            <Picker.Item label="Java" value="Java" />
            <Picker.Item label="JavaScript" value="JavaScript" />
          </Picker>
        </View>
        <Spacer flex={1} />
        <Button
          disabled={!this.state.textBoxValueValid}
          flex={6}
          width={'95%'}
          color={this.state.textBoxValueValid ? Colors.white : Colors.gray}
          large
          onPress={this.onSubmitOperation}
        >
          <Icon name={'md-checkmark-circle-outline'} style={{ fontSize: RF(20), color: this.state.textBoxValueValid ? Colors.black : Colors.white }} />
        </Button>
        <Spacer flex={1} />
      </React.Fragment>
    );
  }
}

MainScreen.propTypes = {
  setAppLoading: PropTypes.func.isRequired,
  setCanRewind: PropTypes.func.isRequired
};

export default MainScreen;