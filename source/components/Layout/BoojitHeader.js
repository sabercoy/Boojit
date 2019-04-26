import React from 'react';
import { StyleSheet, Platform, StatusBar, View, TouchableWithoutFeedback } from 'react-native';
import { Spinner, Header, Container, Left, Body, Right, Title, Icon } from 'native-base';
import Colors from '../../theme/Colors';
import { Button, Spacer } from '../Controls';
import RF from 'react-native-responsive-fontsize';
import PropTypes from 'prop-types';
import { Screens } from '../../constants/ScreenTypes';

const runningAndroid = Platform.OS === 'android';

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.green
  }
});

class BoojitHeader extends React.Component {
  rewindLastOperation = () => {
    this.props.setAppLoading(true);
    this.props.setCanRewind(false);
    setTimeout(() => {
      this.props.setAppLoading(false);
    }, 2000);
  }

  getTitle = () => {
    switch (this.props.activeScreen) {
      case Screens.Login:
        return 'Login';
      case Screens.Home:
        return 'Home';
      case Screens.Categories:
        return 'Categories';
      case Screens.Stats:
        return 'Stats';
      default:
        return 'Default';
    }
  }

  render() {
    const disableHome = this.props.activeScreen === Screens.Login || this.props.activeScreen === Screens.Home;
    const disableCategories = this.props.activeScreen === Screens.Login || this.props.activeScreen === Screens.Categories;
    const disableStats = this.props.activeScreen === Screens.Login || this.props.activeScreen === Screens.Stats;

    return (
      <Header noShadow style={styles.header}>
        <Left>
          <View style={{ marginLeft: '20%' }}>
            <TouchableWithoutFeedback onPress={disableHome ? () => null : () => this.props.setActiveScreen(Screens.Home)}>
              <Icon
                name={'md-home'}
                style={{ color: disableHome ? Colors.lightGreen : Colors.white }}
              />
            </TouchableWithoutFeedback>
          </View>
        </Left>
        <Body>
          <Title style={{ fontSize: RF(3) }}>
            {this.getTitle()}
          </Title>
        </Body>
        <Right>
          <TouchableWithoutFeedback onPress={this.props.canRewind ? this.rewindLastOperation : () => null}>
            <Icon
              name={'md-undo'}
              style={{ color: this.props.canRewind ? Colors.white : Colors.lightGreen }}
            />
          </TouchableWithoutFeedback>
          <Spacer width={'15%'} />
          <TouchableWithoutFeedback onPress={disableCategories ? () => null : () => this.props.setActiveScreen(Screens.Categories)}>
            <Icon
              name={'md-filing'}
              style={{ color: disableCategories ? Colors.lightGreen : Colors.white }}
            />
          </TouchableWithoutFeedback>
          <Spacer width={'15%'} />
          <TouchableWithoutFeedback onPress={disableStats ? () => null : () => this.props.setActiveScreen(Screens.Stats)}>
            <Icon
              name={'md-pie'}
              style={{ color: disableStats ? Colors.lightGreen : Colors.white }}
            />
          </TouchableWithoutFeedback>
        </Right>
      </Header>
    );
  }
}

BoojitHeader.propTypes = {
  setAppLoading: PropTypes.func.isRequired,
  canRewind: PropTypes.bool.isRequired,
  setCanRewind: PropTypes.func.isRequired,
  activeScreen: PropTypes.number.isRequired,
  setActiveScreen: PropTypes.func.isRequired
};

export default BoojitHeader;