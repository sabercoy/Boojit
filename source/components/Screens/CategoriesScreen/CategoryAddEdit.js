import React from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native';
import { Content, Spinner, Header, Container, Left, Body, Right, Title, List, ListItem, Icon } from 'native-base';
import { Button, Spacer, TextField } from '../../Controls';
import Colors from '../../../theme/Colors';
import RF from 'react-native-responsive-fontsize';
import PropTypes from 'prop-types';
import { Category } from '../../../classes';

interface IProps {
  initialCategory: Category;
  addingCategory: boolean;
  onClose: () => void;
}

interface IState {
  selectedCategory: Category;
  categoryNameValid: boolean;
}

let textBoxDone = false;

class CategoryAddEdit extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: this.props.initialCategory,
      categoryNameValid: false
    };
  }

  onClose = () => {
    textBoxDone = false;
    this.props.onClose();
  }

  onDelete = () => {
    textBoxDone = false;
    console.log(/*this.state.initialItem*/);
    //make web call then:
    this.props.onClose();
  }

  onSave = () => {
    textBoxDone = false;
    console.log(/*this.state.initialItem*/);
    //make web call then:
    this.props.onClose();
  }

  onSubmitTextBoxValue = (value) => {
    textBoxDone = true;
    const valid = value.match(/^([A-Za-z]|[0-9])+$/g);

    if (valid) {
      this.setState({
        categoryNameValid: true
      });
    } else {
      this.setState({
        categoryNameValid: false
      });
    }
  }

  onTextBoxValueChange = () => {
    textBoxDone = false;

    this.setState({
      categoryNameValid: false
    });
  }

  render() {
    return (
      <View style={{ width: '75%', height: '25%', backgroundColor: Colors.lightGray }}>
        <View style={{ flex: 20, flexDirection: 'row' }}>
          <Spacer flex={1} />
          <View style={{ flex: 18 }}>
            <Spacer flex={1} />
            <TextField
              flex={3}
              onChangeText={this.onTextBoxValueChange}
              width={'100%'}
              maxLength={14}
              fontSize={RF(4)}
              onSubmitValue={this.onSubmitTextBoxValue}
              defaultValue={this.state.selectedCategory.name} //.name
              placeholder={'category name'}
              error={textBoxDone && !this.state.categoryNameValid}
              success={textBoxDone && this.state.categoryNameValid}
            />
            <Spacer flex={1} />
            <View style={{ flex: 2.6, flexDirection: 'row' }}>
              <Spacer flex={11.5} />
              <Button
                flex={6}
                onPress={this.onClose}
              >
                <Icon name={'md-close'} style={{ fontSize: RF(4) }} />
              </Button>
              <Spacer flex={0.5} />
              <Button
                flex={6}
                onPress={this.onDelete}
                color={this.props.addingCategory ? Colors.gray : Colors.white}
                disabled={this.props.addingCategory}
              >
                <Icon name={'md-trash'} style={{ fontSize: RF(4) }} />
              </Button>
              <Spacer flex={0.5} />
              <Button
                flex={6}
                onPress={this.onSave}
                color={this.state.categoryNameValid ? Colors.white : Colors.gray}
                disabled={!this.state.categoryNameValid}
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

CategoryAddEdit.propTypes = {
  initialCategory: PropTypes.instanceOf(Category).isRequired,
  addingCategory: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default CategoryAddEdit;