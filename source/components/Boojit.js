import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Spinner, Header, Container, Left, Body, Right, Title } from 'native-base';
import PropTypes from 'prop-types';
import BoojitHeader from './Layout/BoojitHeader';
import BoojitBody from './Layout/BoojitBody';
import { Screens } from '../constants/ScreenTypes';
import { LoadingSpinner, LightBox, Button } from './Controls';

const EMPTY_VIEW = <View />;
let lightBoxContent = EMPTY_VIEW;

class Boojit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      canRewind: false,
      activeScreen: Screens.Home,
      showLightBox: false
    };
  }

  setLoading = (isLoading) => {
    this.setState({
      loading: isLoading
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
        />
        <BoojitBody
          setAppLoading={this.setLoading}
          setCanRewind={this.setCanRewind}
          activeScreen={this.state.activeScreen}
          setShowLightBox={this.setShowLightBox}
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

export default Boojit;