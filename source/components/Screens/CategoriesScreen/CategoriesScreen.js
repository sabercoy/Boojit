import React from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback, FlatList, Dimensions } from 'react-native';
import { Content, Spinner, Header, Container, Left, Body, Right, Title, List, ListItem, Icon } from 'native-base';
import { Button, Spacer, TextField } from '../../Controls';
import Colors from '../../../theme/Colors';
import RF from 'react-native-responsive-fontsize';
import PropTypes from 'prop-types';
import CategoryAddEdit from './CategoryAddEdit';
import { Category } from '../../../classes';

interface IProps {
  setShowLightBox: (showLightBox: boolean, content: React.Component) => void;
  setAppLoading: (isAppLoading: boolean) => void;
}

interface IState {
  plusList: Category[];
  minusList: Category[];
  selectedCategory: Category;
}

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  column: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  listContainer: {
    flex: 1,
    width: '100%',
    marginRight: screenWidth * 0.04
  },
  listItem: {
    justifyContent: 'flex-end',
    backgroundColor: Colors.white
  },
  listText: {
    fontSize: RF(2.4),
    width: '80%',
  },
  buttonContainer: {
    height: screenHeight * 0.1,
  }
});

let isPlusOperation = false;
let addingCategory = false;

class CategoriesScreen extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {  //allow max of 12 for each so it will fit in pie chart
      plusList: [
        new Category(1, 1, 'alalsfkas'),
        new Category(2, 1, 'b'),
        new Category(3, 1, 'c'),
        new Category(4, 1, 'd'),
        new Category(5, 1, 'e'),
        new Category(6, 1, 'f'),
        new Category(10, 1, 'g'),
        new Category(11, 1, 'h'),
        new Category(12, 1, 'i'),
        new Category(13, 1, 'j'),
        new Category(14, 1, 'k'),
        new Category(15, 1, 'l')
      ],
      minusList: [
        new Category(7, 1, 'a'),
        new Category(8, 1, 'b'),
        new Category(9, 1, 'c'),
        new Category(6, 1, 'f'),
        new Category(10, 1, 'g'),
        new Category(11, 1, 'h'),
        new Category(12, 1, 'i'),
        new Category(13, 1, 'j'),
        new Category(14, 1, 'k'),
        new Category(15, 1, 'l')
      ],
      selectedCategory: new Category()
    };
  }

  componentDidMount() {
    //get the plus and minus lists
  }

  createAddEditBox = () => {
    return (
      <CategoryAddEdit
        initialCategory={this.state.selectedCategory}
        onClose={() => this.props.setShowLightBox(false)}
        addingCategory={addingCategory}
      />
    );
  }

  onAddListItem = (doingPlus) => {
    isPlusOperation = doingPlus;
    addingCategory = true;

    this.setState({
      selectedCategory: new Category()
    }, () => {
      this.props.setShowLightBox(true, this.createAddEditBox());
    });
  }

  onEditListItem = (doingPlus, listItemID) => {
    isPlusOperation = doingPlus;
    addingCategory = false;
    let newSelectedCategory;

    if (isPlusOperation) {
      newSelectedCategory = this.state.plusList.find(c => c.id === listItemID);
    } else {
      newSelectedCategory = this.state.minusList.find(c => c.id === listItemID);
    }

    this.setState({
      selectedCategory: newSelectedCategory
    }, () => {
      this.props.setShowLightBox(true, this.createAddEditBox());
    });
  }

  render() {
    const plusListItems = [];
    const minusListItems = [];

    this.state.plusList.forEach(category => {
      plusListItems.push(
        {
          key: category.id.toString(),
          component: (
            <ListItem key={category.id} style={styles.listItem}>
              <Text style={styles.listText}>{category.name}</Text>
              <TouchableWithoutFeedback onPress={() => this.onEditListItem(true, category.id)}>
                <Icon name={'md-create'} />
              </TouchableWithoutFeedback>
            </ListItem>
          )
        }
      );
    });

    this.state.minusList.forEach(category => {
      minusListItems.push(
        {
          key: category.id.toString(),
          component: (
            <ListItem key={category.id} style={styles.listItem}>
              <Text style={styles.listText}>{category.name}</Text>
              <TouchableWithoutFeedback onPress={() => this.onEditListItem(false, category.id)}>
                <Icon name={'md-create'} />
              </TouchableWithoutFeedback>
            </ListItem>
          )
        }
      );
    });

    return (
      <View style={styles.container}>
        <View style={styles.column}>
          <View style={styles.listContainer}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={plusListItems}
              renderItem={({ item }) => (
                item.component
              )}
            />
          </View>
          <Spacer flex={0.05} />
          <View style={styles.buttonContainer}>
            <Button width={'90%'} onPress={() => this.onAddListItem(true)}>
              <Text style={{ fontSize: RF(6) }}>NEW +</Text>
            </Button>
          </View>
          <Spacer flex={0.05} />
        </View>
        <View style={styles.column}>
          <View style={styles.listContainer}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={minusListItems}
              renderItem={({ item }) => (
                item.component
              )}
            />
          </View>
          <Spacer flex={0.05} />
          <View style={styles.buttonContainer}>
            <Button width={'90%'} onPress={() => this.onAddListItem(false)}>
              <Text style={{ fontSize: RF(6) }}>NEW -</Text>
            </Button>
          </View>
          <Spacer flex={0.05} />
        </View>
      </View>
    );
  }
}

CategoriesScreen.propTypes = {
  setShowLightBox: PropTypes.func.isRequired,
  //setAppLoading: PropTypes.func.isRequired    //uncomment when go to actually use
};

export default CategoriesScreen;