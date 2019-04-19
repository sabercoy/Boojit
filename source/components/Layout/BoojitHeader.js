import React from 'react';
import { StyleSheet, Platform, StatusBar, View, TouchableWithoutFeedback } from 'react-native';
import { Spinner, Header, Container, Left, Body, Right, Title, Icon } from 'native-base';
import Colors from '../../theme/Colors';
import { Button, Spacer } from '../Controls';
import RF from 'react-native-responsive-fontsize';
import PropTypes from 'prop-types';
//import { Screens } from '../Screens/Constants/Types';

const runningAndroid = Platform.OS === 'android';

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.green
  },
  androidStatusBar: {
    height: runningAndroid ? StatusBar.currentHeight : 0,
    backgroundColor: '#9fe079'
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
      // case Screens.Home:
      //   return 'Home';
      // case Screens.Categories:
      //   return 'Categories';
      // case Screens.Stats:
      //   return 'Stats';
      default:
        return 'Default';
    }
  }

  render() {
    return (
      <React.Fragment>
        {
          runningAndroid ? (                         //the header will be covered up by the status bar in android...
            <View style={styles.androidStatusBar} /> //...so add a block to push the header down into full view
          ) : (
            null
          )
        }
        <Header noShadow style={styles.header}>
          <Left>
            <View style={{ marginLeft: '20%' }}>
              <TouchableWithoutFeedback onPress={() => null/*() => this.props.setActiveScreen(Screens.Home)*/}>
                <Icon name={'md-home'} style={{ color: /*this.props.activeScreen === Screens.Home ? Colors.lightGreen : */Colors.white }} />
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
              <Icon name={'md-undo'} style={{ color: this.props.canRewind ? Colors.white : Colors.lightGreen }} />
            </TouchableWithoutFeedback>
            <Spacer width={'15%'} />
            <TouchableWithoutFeedback onPress={() => null/*() => this.props.setActiveScreen(Screens.Categories)*/}>
              <Icon name={'md-filing'} style={{ color: /*this.props.activeScreen === Screens.Categories ? Colors.lightGreen : */Colors.white }} />
            </TouchableWithoutFeedback>
            <Spacer width={'15%'} />
            <TouchableWithoutFeedback onPress={() => null/*() => this.props.setActiveScreen(Screens.Stats)*/}>
              <Icon name={'md-pie'} style={{ color: /*this.props.activeScreen === Screens.Stats ? Colors.lightGreen : */Colors.white }} />
            </TouchableWithoutFeedback>
          </Right>
        </Header>
      </React.Fragment>
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