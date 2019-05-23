import React from 'react';
import { StyleSheet, View, Text, Dimensions, FlatList } from 'react-native';
import { Icon, Content, Spinner, Header, Container, Left, Body, Right, Title } from 'native-base';
import { LoadingSpinner, Button, Spacer, PieChart, Square, DateRangePicker, Table } from '../../Controls';
import Colors from '../../../theme/Colors';
import RF from 'react-native-responsive-fontsize';
import PropTypes from 'prop-types';
import { Category, Transaction } from '../../../classes';
import { DateUtilities } from '../../../utilities';

//order dates

interface PieChartSection {
  categoryName: string;
  totalAmount: number;
}

interface IProps {

}

interface IState {
  plusMode: boolean;
  categoryList: Category[];
  transactionList: Transaction[];
  pieChartSections: PieChartSection[];
  fromDate: Date;
  toDate: Date;
}

const pageHeight = Dimensions.get('window').height;
const chartWidth = 0.44 * pageHeight;
const innerWidth = 0.5 * chartWidth;
const colors = ['#800000', '#FF0000', '#FF89B0', '#FF9300', '#FFE119', '#BFEF45', '#3CB44B', '#42D4F4', '#4363D8', '#000075', '#9742FF', '#5E0091'];

const styles = StyleSheet.create({
  categoriesContainer: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 15
  },
  categoryCell: {
    justifyContent: 'center'
  }
});

const MONTH = 2592000000;
const DATE_NOW = new Date();
const DATE_MONTH_AGO = new Date(DATE_NOW.getTime() - MONTH);

class StatsScreen extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      plusMode: false,
      categoryList: [],
      transactionList: [],
      pieChartSections: [],
      fromDate: DATE_MONTH_AGO,
      toDate: DATE_NOW
    };
  }

  componentWillMount() {
    this.props.setAppLoading(true);
  }

  componentDidMount() {
    this.refreshScreen();
    this.props.setAppLoading(false);
  }

  refreshScreen = async () => {
    const transactionsQuery = this.props.fbFirestore.collection('transactions').where('user_id', '==', this.props.userID);
    const categoriesQuery = this.props.fbFirestore.collection('categories').where('user_id', '==', this.props.userID);
    const newTransactionList: Transaction[] = [];
    const newCategoriesList: Category[] = [];

    this.props.setAppLoading(true);
    try {
      const [transactionsResult, categoriesResult] = await Promise.all([transactionsQuery.get(), categoriesQuery.get()]);

      transactionsResult.forEach(t => {
        const transaction = t.data();
        newTransactionList.push(new Transaction(
          t._ref._documentPath._parts[1],
          transaction.user_id,
          transaction.category_name,
          Math.abs(transaction.amount),
          transaction.date
        ));        
      });

      categoriesResult.forEach(c => {
        const category = c.data();
        newCategoriesList.push(new Category(
          category.user_id + category.name,
          category.user_id,
          category.name,
          category.positive
        ));
      });

      this.setState({
        transactionList: newTransactionList,
        categoryList: newCategoriesList
      }, this.calculatePieChartSections);
    } catch {
      console.log('FAILED');
    }
    this.props.setAppLoading(false);
  }

  formatDateRange = (fromDate, toDate) => {
    return DateUtilities.formatDate(fromDate) + ' - ' + DateUtilities.formatDate(toDate);
  }

  calculatePieChartSections = () => {
    const newPieChartSections: PieChartSection[] = [];

    const transactionList = this.state.plusMode ? (
      this.state.transactionList.filter(t => this.mapCategoryNameToIsPlus(t.categoryName))
    ) : (
      this.state.transactionList.filter(t => !this.mapCategoryNameToIsPlus(t.categoryName))
    );

    transactionList.forEach((t: Transaction) => {
      const uniqueCategoryIndex = newPieChartSections.findIndex(s => s.categoryName === t.categoryName);

      if (uniqueCategoryIndex === -1) {
        newPieChartSections.push(
          {
            categoryName: t.categoryName,
            totalAmount: t.amount
          }
        );
      } else {
        newPieChartSections[uniqueCategoryIndex].totalAmount += t.amount;
      }
    });

    newPieChartSections.sort((s1, s2) => (s2.totalAmount - s1.totalAmount));

    this.setState({
      pieChartSections: newPieChartSections
    });
  }

  toggleMode = () => {
    this.setState(prevState => ({
      plusMode: !prevState.plusMode
    }), this.calculatePieChartSections);
  }

  mapCategoryNameToIsPlus = (categoryName: string): boolean => {
    const { categoryList } = this.state;

    for (let i = 0; i < categoryList.length; i++) {
      if (categoryList[i].name === categoryName) {
        return categoryList[i].isPlus;
      }
    }
  }

  createDateRangeBox = () => {
    return (
      <DateRangePicker
        onClose={() => this.props.setShowLightBox(false)}
        initialFromDate={this.state.fromDate}
        initialToDate={this.state.toDate}
        onFinishDate={this.setDateRange}
      />
    );
  }

  onClickDateRange = () => {
    this.props.setShowLightBox(true, this.createDateRangeBox());
  }

  setDateRange = (fromDate: Date, toDate: Date) => {
    this.setState({
      fromDate: fromDate,
      toDate: toDate
    });
  }

  render() {
    const listItems = [];

    const plusButton = (
      <View style={{ width: 0.20 * chartWidth, height: 0.20 * chartWidth }}>
        <Button
          color={Colors.white}
          large
          onPress={this.toggleMode}
        >
          <Icon name={this.state.plusMode ? 'md-add' : 'md-remove'} style={{ fontSize: RF(5), color: Colors.black }} />
        </Button>
      </View>
    );

    const timePeriodButton = (
      {
        key: '1',
        component: (
          <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
            <Button
              width={'95%'}
              onPress={this.onClickDateRange}
            >
              <Text style={{ fontSize: RF(3.5) }}>
                {this.formatDateRange(this.state.fromDate, this.state.toDate)}
              </Text>
            </Button>
          </View>
        )
      }
    );

    const pieChart = (
      {
        key: '2',
        component: (
          <View style={{ height: 0.48 * pageHeight }}>
            <PieChart
              diameter={chartWidth}
              series={this.state.pieChartSections.map(s => s.totalAmount)}
              colors={colors}
              centerItem={plusButton}
            />
          </View>
        )
      }
    );

    const categoryTable = (
      {
        key: '3',
        component: (
          <Table
            backgroundColor={Colors.white}
            rows={
              this.state.pieChartSections.map((s, index) => (
                [
                  <Square color={colors[index]} sideLength={15} />,
                  <Text>{s.categoryName}</Text>,
                  <Text>{'$' + s.totalAmount.toFixed(2)}</Text>
                ]
              ))
            }
            columnWidths={['5%', '40%', '55%']}
          />
        )
      }
    );

    const transactionTable = (
      {
        key: '4',
        component: (
          <View style={{ marginTop: 15 }}>
            <Table
              backgroundColor={Colors.white}
              rows={
                this.state.transactionList.map(t => (
                  [
                    <View style={{ backgroundColor: (this.mapCategoryNameToIsPlus(t.categoryName) ? Colors.lightGreen : Colors.lightRed) }}>
                      <Text>{DateUtilities.formatDate(t.date)}</Text>
                    </View>,
                    <View style={{ backgroundColor: (this.mapCategoryNameToIsPlus(t.categoryName) ? Colors.lightGreen : Colors.lightRed) }}>                    
                      <Text>{t.categoryName}</Text>
                    </View>,
                    <View style={{ backgroundColor: (this.mapCategoryNameToIsPlus(t.categoryName) ? Colors.lightGreen : Colors.lightRed) }}>                    
                      <Text>{'$' + t.amount}</Text>
                    </View>                    
                  ]
                ))
              }
              columnWidths={['25%', '30%', '45%']}
            />
          </View>
        )
      }
    );

    listItems.push(timePeriodButton);
    listItems.push(pieChart);
    listItems.push(categoryTable);
    listItems.push(transactionTable);

    return (
      <View style={{ height: '100%', width: '95%' }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={listItems}
          renderItem={({ item }) => (
            item.component
          )}
        />
      </View>
    );
  }
}

StatsScreen.propTypes = {
  setShowLightBox: PropTypes.func.isRequired,
  setAppLoading: PropTypes.func.isRequired
};

export default StatsScreen;