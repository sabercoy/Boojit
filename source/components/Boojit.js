import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Spinner, Header, Container, Left, Body, Right, Title } from 'native-base';
import BoojitHeader from './Layout/BoojitHeader';
import BoojitBody from './Layout/BoojitBody';
import { Screens } from '../constants/ScreenTypes';
import { LoadingSpinner, LightBox, Button } from './Controls';
import PropTypes from 'prop-types';

interface IProps {
  successGettingLoginInfo: boolean;
  fbAuth: any;
}

interface IState {

}

const EMPTY_VIEW = <View />;
let lightBoxContent = EMPTY_VIEW;
let operationCount = 0;

class Boojit extends React.Component<IState, IProps> {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      canRewind: false,
      activeScreen: this.props.successGettingLoginInfo ? Screens.Home : Screens.Login,
      showLightBox: false
    };
  }

  setLoading = (isLoading) => {
    operationCount += (isLoading ? 1 : -1);
    this.setState({
      loading: operationCount > 0
    });
  }

  setCanRewind = (canRewind) => {
    this.setState({
      canRewind: canRewind
    });
  }

  setActiveScreen = (newActiveScreen) => {
    this.setState({
      activeScreen: newActiveScreen
    });
  }

  setShowLightBox = (showLightBox, content = EMPTY_VIEW) => {
    lightBoxContent = content;

    this.setState({
      showLightBox: showLightBox
    });
  }

  render() {
    return (
      <Container>
        <BoojitHeader
          setAppLoading={this.setLoading}
          canRewind={this.state.canRewind}
          setCanRewind={this.setCanRewind}
          activeScreen={this.state.activeScreen}
          setActiveScreen={this.setActiveScreen}
          fbAuth={this.props.fbAuth}
          setUserID={this.props.setUserID}
        />
        <BoojitBody
          setActiveScreen={this.setActiveScreen}
          setAppLoading={this.setLoading}
          setCanRewind={this.setCanRewind}
          activeScreen={this.state.activeScreen}
          setShowLightBox={this.setShowLightBox}
          fbAuth={this.props.fbAuth}
          fbFirestore={this.props.fbFirestore}
          userID={this.props.userID}
          setUserID={this.props.setUserID}
        />
        {
          this.state.showLightBox ? (
            <LightBox content={lightBoxContent} />
          ) : null
        }
        {
          this.state.loading ? (
            <LoadingSpinner />
          ) : null
        }
      </Container>
    );
  }
}

Boojit.propTypes = {
  successGettingLoginInfo: PropTypes.bool.isRequired,
  fbAuth: PropTypes.any.isRequired,
  fbFirestore: PropTypes.any.isRequired,
  userID: PropTypes.string.isRequired,
  setUserID: PropTypes.func.isRequired
};

export default Boojit;