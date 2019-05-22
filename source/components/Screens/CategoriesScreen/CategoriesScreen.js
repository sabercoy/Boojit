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
      plusList: [],
      minusList: [],
      selectedCategory: new Category()
    };
  }

  componentWillMount() {
    this.props.setAppLoading(true);
  }

  componentDidMount() {
    this.refreshCategories();
    this.props.setAppLoading(false);
  }

  refreshCategories = async () => {
    this.props.setAppLoading(true);

    const categoriesQuery = this.props.fbFirestore.collection('categories').where('user_id', '==', this.props.userID);
    const categories: Category[] = [];

    try {
      const categoriesResult = await categoriesQuery.get();

      categoriesResult.forEach(c => {
        const category = c.data();
        categories.push(new Category(c._ref._documentPath._parts[1], category.user_id, category.name, category.positive));
      });

      this.setState({
        plusList: categories.filter(c => c.isPlus),
        minusList: categories.filter(c => !c.isPlus)
      });
    } catch {
      console.log('FAILED');
    }

    this.props.setAppLoading(false);
  }

  createAddEditBox = () => {
    return (
      <CategoryAddEdit
        initialCategory={this.state.selectedCategory}
        onClose={() => this.props.setShowLightBox(false)}
        addingCategory={addingCategory}
        onSave={this.onSaveCategory}
        onDelete={this.onDeleteCategory}
      />
    );
  }

  onAddListItemClicked = (doingPlus: boolean) => {
    isPlusOperation = doingPlus;
    addingCategory = true;

    this.setState({
      selectedCategory: new Category()
    }, () => {
      this.props.setShowLightBox(true, this.createAddEditBox());
    });
  }

  onDeleteCategory = async () => {
    const categoriesRef = this.props.fbFirestore.collection('categories').doc(this.state.selectedCategory.id);

    this.props.setAppLoading(true);

    try {
      await categoriesRef.delete();
    } catch {
      console.log('FAILED');
    }

    this.refreshCategories();
    this.props.setAppLoading(false);
  }

  onSaveCategory = async (newCategoryName: string) => {
    this.props.setAppLoading(true);

    try {
      if (addingCategory) {
        this.props.fbFirestore.collection('categories').add({
          name: newCategoryName,
          positive: isPlusOperation,
          user_id: this.props.userID
        });
      } else {
        const categoriesRef = this.props.fbFirestore.collection('categories').doc(this.state.selectedCategory.id);

        await categoriesRef.update({
          name: newCategoryName
        });
      }
    } catch {
      console.log('FAILED');
    }

    this.refreshCategories();
    this.props.setAppLoading(false);
  }

  onEditListItemClicked = (doingPlus, listItemID) => {
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
          key: category.id,
          component: (
            <ListItem key={category.id} style={styles.listItem}>
              <Text style={styles.listText}>{category.name}</Text>
              <TouchableWithoutFeedback onPress={() => this.onEditListItemClicked(true, category.id)}>
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
          key: category.id,
          component: (
            <ListItem key={category.id} style={styles.listItem}>
              <Text style={styles.listText}>{category.name}</Text>
              <TouchableWithoutFeedback onPress={() => this.onEditListItemClicked(false, category.id)}>
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
            <Button width={'90%'} onPress={() => this.onAddListItemClicked(true)}>
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
            <Button width={'90%'} onPress={() => this.onAddListItemClicked(false)}>
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
  setAppLoading: PropTypes.func.isRequired,
  fbFirestore: PropTypes.any.isRequired,  
  userID: PropTypes.string.isRequired
};

export default CategoriesScreen;