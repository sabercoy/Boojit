import React from 'react';
import { StyleSheet, TouchableHighlight, View, ScrollView, Dimensions } from 'react-native';
import { Container, Text, Input, Item, Icon, Picker } from 'native-base';
import PropTypes from 'prop-types';
import Colors from '../../../theme/Colors';
import { Button, TextField, Spacer } from '../../Controls';
import RF from 'react-native-responsive-fontsize';
import { Category, Transaction } from '../../../classes';

interface IProps {
  setAppLoading: (isLoading: boolean) => void;
  setCanRewind: (canRewind: boolean) => void;
}

interface IState {
  minusSelected: boolean;
  selectedCategory: Category;
  textBoxValueValid: boolean;
}

let textBoxValue = 0;
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const pageHeight = screenHeight * 0.85;
const pageWidth = screenWidth * 0.95;

class MainScreen extends React.Component<IState, IProps> {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      selectedCategory: '',
      textBoxDone: false,
      textBoxValueValid: false,
      totalBalance: null
      //categories: [],
    };
    this.textBox = React.createRef();
  }

  componentWillMount() {
    this.props.setAppLoading(true);
  }

  async componentDidMount() {
    const transactionsQuery = this.props.fbFirestore.collection('transactions').where('user_id', '==', this.props.userID);
    const categoriesQuery = this.props.fbFirestore.collection('categories').where('user_id', '==', this.props.userID);
    const categories = [];
    let total = 0;

    try {
      const [transactionsResult, categoriesResult] = await Promise.all([transactionsQuery.get(), categoriesQuery.get()]);

      transactionsResult.forEach(t => {
        total += t.data().amount;
      });

      categoriesResult.forEach(c => {
        categories.push(c.data().name);
      });

      this.setState({
        totalBalance: total,
        categories: categories
      });
    } catch {
      console.log('FAILED');
    }

    this.props.setAppLoading(false);
  }

  onSubmitOperation = () => {
    this.props.setAppLoading(true);
    setTimeout(() => {
      this.props.setAppLoading(false);
      this.textBox.clear();
      this.props.setCanRewind(true);
      this.setState({
        textBoxValueValid: false,
        textBoxDone: false
      });
    }, 2000);
  }

  onDollarAmountDone = (value) => {
    const decimalCount = (value.match(/\./g) === null ? 0 : value.match(/\./g).length);
    const otherCharCount = (value.match(/[^0-9.]/g) === null ? 0 : value.match(/[^0-9.]/g).length);
    const digitsAfterDecimalCount = (decimalCount === 1 ? value.split('.')[1].length : 0);

    if (value !== '' && value !== '.' && decimalCount <= 1 && otherCharCount === 0 && digitsAfterDecimalCount <= 2) {
      textBoxValue = parseFloat(value);

      this.setState({
        textBoxValueValid: true,
        textBoxDone: true
      });
    } else {
      this.setState({
        textBoxValueValid: false,
        textBoxDone: true
      });
    }
  }

  onTextBoxValueChange = () => {
    this.setState({
      textBoxValueValid: false,
      textBoxDone: false
    });
  }

  formatTotal = (amount: number): string[] => {
    const stringAmount = amount.toFixed(2);
    const [whole, decimal] = stringAmount.split('.');
    const lastIndex = whole.length - 1;
    let formattedWhole = '';
    let count = 0;

    for (let i = lastIndex; i >= 0; i--) {
      if (i !== lastIndex && count % 3 === 0) {
        formattedWhole = ',' + formattedWhole;
      }
      formattedWhole = whole[i] + formattedWhole;
      count++;
    }

    return [formattedWhole, decimal];
  }

  render() {
    const formattedTotal = this.state.totalBalance === null ? ['', ''] : this.formatTotal(this.state.totalBalance);
    const enableSubmit = this.state.textBoxValueValid && this.state.selectedCategory;

    return (
      <ScrollView
        scrollEnabled={false}
      >
        <View
          style={{
            height: pageHeight,
            width: pageWidth
          }}
        >
          <View style={{ height: '35%', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: RF(8) }}>
              {this.state.totalBalance === null ? '...' : '$' + formattedTotal[0]}
              <Text style={{ fontSize: RF(4) }}>
                {this.state.totalBalance === null ? '' : '.' + formattedTotal[1]}
              </Text>
            </Text>
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
              error={this.state.textBoxDone && !this.state.textBoxValueValid}
              success={this.state.textBoxDone && this.state.textBoxValueValid}
              moneyField
            />
          </View>
          <View style={{ height: '1%' }} />
          <View style={{ height: '10%', backgroundColor: Colors.white, borderRadius: 50 }}>
            <Picker
              rounded
              selectedValue={this.state.selectedCategory}
              onValueChange={(newValue) => { this.setState({ selectedCategory: newValue }); }}
            >
              {this.state.categories.map(i => <Picker.Item key={i} label={i} value={i} />)}
            </Picker>
          </View>
          <View style={{ height: '4%' }} />
          <View style={{ height: '35%' }}>
            <Button
              disabled={!enableSubmit}
              color={enableSubmit ? Colors.white : Colors.gray}
              large
              onPress={this.onSubmitOperation}
            >
              <Icon name={'md-checkmark-circle-outline'} style={{ fontSize: RF(20), color: enableSubmit ? Colors.black : Colors.white }} />
            </Button>
          </View>
          <Spacer flex={1} />
        </View>
      </ScrollView>
    );
  }
}

MainScreen.propTypes = {
  setAppLoading: PropTypes.func.isRequired,
  setCanRewind: PropTypes.func.isRequired,
  fbFirestore: PropTypes.any.isRequired
};

export default MainScreen;