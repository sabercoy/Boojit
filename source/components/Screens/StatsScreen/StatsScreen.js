import React from 'react';
import { StyleSheet, View, Text, Dimensions, FlatList } from 'react-native';
import { Icon, Content, Spinner, Header, Container, Left, Body, Right, Title } from 'native-base';
import { LoadingSpinner, Button, Spacer, PieChart, Square, DateRangePicker, Table } from '../../Controls';
import Colors from '../../../theme/Colors';
import RF from 'react-native-responsive-fontsize';
import PropTypes from 'prop-types';
import { Category, Transaction } from '../../../classes';
import { DateUtilities } from '../../../utilities';

interface PieChartSection {
  categoryID: number;
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
      categoryList: [
        new Category(1, 1, 'h', true),
        new Category(2, 1, 'i', true),
        new Category(3, 1, 'j', true),
        new Category(4, 1, 'k', true),
        new Category(5, 1, 'l', true),
        new Category(6, 1, 'm', true),
        new Category(7, 1, 'n', true),
        new Category(8, 1, 'k', true),
        new Category(9, 1, 'h', true),
        new Category(10, 1, 'i', true),
        new Category(11, 1, 'j', true),
        new Category(12, 1, 'k', true),

        new Category(13, 1, 'a', false), //minus here and below
        new Category(14, 1, 'b', false),
        new Category(15, 1, 'c', false),
        new Category(16, 1, 'd', false),
        new Category(17, 1, 'e', false),
        new Category(18, 1, 'f', false),
        new Category(19, 1, 'g', false)
      ],
      transactionList: [                            //TODO: order this by date in DB or webservice
        new Transaction(5, 1, 3, 9.67, new Date()),
        new Transaction(10, 1, 6, 9.67, new Date()),
        new Transaction(4, 1, 2, 8.67, new Date()),
        new Transaction(9, 1, 5, 8.67, new Date()),
        new Transaction(3, 1, 2, 7.67, new Date()),
        new Transaction(8, 1, 4, 7.67, new Date()),
        new Transaction(2, 1, 1, 6.67, new Date()),
        new Transaction(7, 1, 3, 6.67, new Date()),
        new Transaction(1, 1, 1, 5.67, new Date()),
        new Transaction(6, 1, 3, 5.67, new Date()),

        new Transaction(9, 1, 15, 4.67, new Date()),
        new Transaction(8, 1, 14, 3.67, new Date()),
        new Transaction(7, 1, 13, 2.67, new Date()),
        new Transaction(6, 1, 13, 1.67, new Date()),
      ],
      pieChartSections: [],
      fromDate: DATE_MONTH_AGO,
      toDate: DATE_NOW
    };
  }

  componentDidMount() {
    //fetch categoryList and transactionList then call calculatePieChartSections()

    this.calculatePieChartSections();
  }

  formatDateRange = (fromDate, toDate) => {
    return DateUtilities.formatDate(fromDate) + ' - ' + DateUtilities.formatDate(toDate);
  }

  calculatePieChartSections = () => {
    const newPieChartSections: PieChartSection[] = [];

    const transactionList = this.state.plusMode ? (
      this.state.transactionList.filter(t => this.mapCategoryIDToIsPlus(t.categoryID))
    ) : (
      this.state.transactionList.filter(t => !this.mapCategoryIDToIsPlus(t.categoryID))
    );

    transactionList.forEach(t => {
      const uniqueCategoryIndex = newPieChartSections.findIndex(s => s.categoryID === t.categoryID);

      if (uniqueCategoryIndex === -1) {
        newPieChartSections.push(
          {
            categoryID: t.categoryID,
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

  mapCategoryIDToString = (categoryID: number): string => {
    const { categoryList } = this.state;

    for (let i = 0; i < categoryList.length; i++) {
      if (categoryList[i].id === categoryID) {
        return categoryList[i].name;
      }
    }
  }

  mapCategoryIDToIsPlus = (categoryID: number): boolean => {
    const { categoryList } = this.state;

    for (let i = 0; i < categoryList.length; i++) {
      if (categoryList[i].id === categoryID) {
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
                  <Text>{this.mapCategoryIDToString(s.categoryID)}</Text>,
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
                    <View style={{ backgroundColor: (this.mapCategoryIDToIsPlus(t.categoryID) ? Colors.lightGreen : Colors.lightRed) }}>
                      <Text>{DateUtilities.formatDate(t.date)}</Text>
                    </View>,
                    <View style={{ backgroundColor: (this.mapCategoryIDToIsPlus(t.categoryID) ? Colors.lightGreen : Colors.lightRed) }}>                    
                      <Text>{this.mapCategoryIDToString(t.categoryID)}</Text>
                    </View>,
                    <View style={{ backgroundColor: (this.mapCategoryIDToIsPlus(t.categoryID) ? Colors.lightGreen : Colors.lightRed) }}>                    
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