import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { Content, Spinner, Header, Container, Left, Body, Right, Title } from 'native-base';
import { LoginScreen, HomeScreen, StatsScreen, CategoriesScreen } from '../Screens';
import { LoadingSpinner, LightBox } from '../Controls';
import Colors from '../../theme/Colors';
import RF from 'react-native-responsive-fontsize';
import PropTypes from 'prop-types';
import { Screens } from '../../constants/ScreenTypes';

const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    height: screenHeight,
    backgroundColor: Colors.lightGray,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

class BoojitBody extends React.Component {
  getScreen = () => {
    switch (this.props.activeScreen) {
      case Screens.Login:
        return (
          <LoginScreen
            setActiveScreen={this.props.setActiveScreen}
            setShowLightBox={this.props.setShowLightBox}
            setAppLoading={this.props.setAppLoading}
            fbAuth={this.props.fbAuth}
            setUserID={this.props.setUserID}
          />
        );
      case Screens.Home:
        return (
          <HomeScreen
            setCanRewind={this.props.setCanRewind}
            setAppLoading={this.props.setAppLoading}
            fbFirestore={this.props.fbFirestore}
            userID={this.props.userID}
          />
        );
      case Screens.Categories:
        return (
          <CategoriesScreen
            setShowLightBox={this.props.setShowLightBox}
            setAppLoading={this.props.setAppLoading}
            fbFirestore={this.props.fbFirestore}
            userID={this.props.userID}
          />
        );
      case Screens.Stats:
        return (
          <StatsScreen
            setShowLightBox={this.props.setShowLightBox}
            setAppLoading={this.props.setAppLoading}
          />
        );
      default:
        return (
          <Text>DEFAULT</Text>
        );
    }
  }

  render() {
    return (
      <Container style={styles.container}>
        {this.getScreen()}
      </Container>
    );
  }
}

BoojitBody.propTypes = {
  setActiveScreen: PropTypes.func.isRequired,  
  setAppLoading: PropTypes.func.isRequired,
  setCanRewind: PropTypes.func.isRequired,
  activeScreen: PropTypes.number.isRequired,
  setShowLightBox: PropTypes.func.isRequired,
  fbAuth: PropTypes.any.isRequired,
  fbFirestore: PropTypes.any.isRequired,
  userID: PropTypes.string.isRequired,
  setUserID: PropTypes.func.isRequired
};

export default BoojitBody;