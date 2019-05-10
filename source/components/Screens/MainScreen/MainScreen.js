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
  categories: Category[];
  selectedCategoryName: string;
  textBoxDone: boolean;
  textBoxValueValid: boolean;
  totalBalance: number;
  textBoxValue: string;
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
      selectedCategoryName: '',
      textBoxDone: false,
      textBoxValueValid: false,
      totalBalance: null,
      textBoxValue: ''
    };

    this.textBox = React.createRef();
  }

  componentWillMount() {
    this.props.setAppLoading(true);
  }

  componentDidMount() {
    this.getSetTransactionTotal();
    this.getSetCategories();
    this.props.setAppLoading(false);
  }

  getSetTransactionTotal = async () => {
    const transactionsQuery = this.props.fbFirestore.collection('transactions').where('user_id', '==', this.props.userID);
    const categoryTally = {};
    let total = 0;

    this.props.setAppLoading(true);
    try {
      const transactionsResult = await transactionsQuery.get();
      transactionsResult.forEach(t => {
        const transaction = t.data();
        const tallyValue = categoryTally[transaction.category_name];

        total += transaction.amount;
        categoryTally[transaction.category_name] = tallyValue ? tallyValue + 1 : 1;
      });

      this.setState({
        totalBalance: total,
        selectedCategoryName: this.getMostUsedCategory(categoryTally)
      });
    } catch {
      console.log('FAILED');
    }
    this.props.setAppLoading(false);
  }

  getMostUsedCategory = (categoryTally) => {
    if (Object.keys(categoryTally).length === 0) {
      return '';
    }

    let mostUsedCategory = Object.keys(categoryTally)[0];

    Object.keys(categoryTally).forEach(categoryName => {
      if (categoryTally[categoryName] > categoryTally[mostUsedCategory]) {
        mostUsedCategory = categoryName;
      }
    });

    return mostUsedCategory;
  }

  getSetCategories = async () => {
    const categoriesQuery = this.props.fbFirestore.collection('categories').where('user_id', '==', this.props.userID);
    const categories: Category[] = [];

    this.props.setAppLoading(true);
    try {
      const categoriesResult = await categoriesQuery.get();

      categoriesResult.forEach(c => {
        const category = c.data();

        categories.push(new Category(category.user_id + category.name, category.user_id, category.name, category.positive));
      });

      this.setState({
        categories: categories
      });
    } catch {
      console.log('FAILED');
    }
    this.props.setAppLoading(false);
  }

  onSubmitOperation = async () => {
    const transactionsRef = this.props.fbFirestore.collection('transactions');
    const finalCategory: Category = this.state.categories.find((c: Category) => c.name === this.state.selectedCategoryName);

    this.props.setAppLoading(true);
    try {
      await transactionsRef.add({
        amount: finalCategory.isPlus ? Math.abs(textBoxValue) : -Math.abs(textBoxValue),
        category_name: finalCategory.name,
        date: new Date(),
        user_id: this.props.userID
      });

      this.setState({
        textBoxValue: '',
        textBoxDone: false,
        textBoxValueValid: false
      });

      this.textBox.clear();
      this.getSetTransactionTotal();
    } catch {
      console.log('FAILED');
    }
    this.props.setAppLoading(false);
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

  onTextBoxValueChange = (newValue: string) => {
    this.setState({
      textBoxValueValid: false,
      textBoxDone: false,
      textBoxValue: newValue
    });
  }

  formatTotal = (amount: number): string[] => {
    const isNegative = amount < 0;
    const stringAmount = Math.abs(amount).toFixed(2);
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

    if (isNegative) {
      formattedWhole = '-' + formattedWhole;
    }

    return [formattedWhole, decimal];
  }

  onChangeCategory = (newCategoryName: string) => {
    this.setState({
      selectedCategoryName: newCategoryName
    });
  }

  render() {
    const formattedTotal = this.state.totalBalance === null ? ['', ''] : this.formatTotal(this.state.totalBalance);
    const enableSubmit = this.state.textBoxValueValid && this.state.selectedCategoryName;

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
              onBlur={() => this.onDollarAmountDone(this.state.textBoxValue)}
            />
          </View>
          <View style={{ height: '1%' }} />
          <View style={{ height: '10%', backgroundColor: Colors.white, borderRadius: 50 }}>
            <Picker
              rounded
              selectedValue={this.state.selectedCategoryName}
              onValueChange={this.onChangeCategory}
            >
              {this.state.categories.map((c: Category) => <Picker.Item key={c.id} label={c.name} value={c.name} />)}
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
  //setCanRewind: PropTypes.func.isRequired,  //replace this with a function that adds to a global list of transactions
  fbFirestore: PropTypes.any.isRequired,
  userID: PropTypes.string.isRequired
};

export default MainScreen;