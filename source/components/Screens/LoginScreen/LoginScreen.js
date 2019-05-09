import React from 'react';
import { View, Dimensions } from 'react-native';
import { Text, Icon } from 'native-base';
import PropTypes from 'prop-types';
import Colors from '../../../theme/Colors';
import { Button, TextField, Spacer } from '../../Controls';
import RF from 'react-native-responsive-fontsize';
import { Screens } from '../../../constants/ScreenTypes';
import RNSecureKeyStore, { ACCESSIBLE } from 'react-native-secure-key-store';

interface IProps {

}

interface IState {
  emailFieldValue: string;
  passwordFieldValue: string;
}

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const pageWidth = screenWidth * 0.95;
const horizontalMargin = screenWidth * 0.04;
const verticalMargin = screenHeight * 0.02;
const BOOJIT_EMAIL = 'boojitEmail';
const BOOJIT_PASSWORD = 'boojitPassword';
const INVALID_EMAIL = 'auth/invalid-email';
const INVALID_PASSWORD = 'auth/wrong-password';
const EMAIL_NOT_FOUND = 'auth/user-not-found';
const EMAIL_IN_USE = 'auth/email-already-in-use';
const PASSWORD_WEAK = 'auth/weak-password';

const responseBoxStyle = {
  width: screenWidth * 0.75,
  height: screenHeight * 0.25,
  backgroundColor: Colors.lightGray
};

class LoginScreen extends React.Component<IState, IProps> {
  constructor(props) {
    super(props);
    this.state = {
      emailFieldValue: '',
      passwordFieldValue: ''
    };
  }

  createResponseBox = (responseCode: string) => {
    let responseMessage = '';

    switch (responseCode) {
      case INVALID_EMAIL:
        responseMessage = 'Email is invalid.';
        break;
      case INVALID_PASSWORD:
        responseMessage = 'Password is invalid.';
        break;
      case EMAIL_NOT_FOUND:
        responseMessage = 'Email not found.';
        break;
      case EMAIL_IN_USE:
        responseMessage = 'Email already in use.';
        break;
      case PASSWORD_WEAK:
        responseMessage = 'Password too weak.';
        break;
      default:
        responseMessage = 'Something went wrong..';
        break;
    }

    return (
      <View style={responseBoxStyle}>
        <View style={{ marginLeft: horizontalMargin, marginRight: horizontalMargin, marginTop: verticalMargin, marginBottom: verticalMargin }}>
          <Text style={{ fontSize: RF(3) }}>{'ERROR:\n'}</Text>        
          <Text style={{ fontSize: RF(3) }}>{responseMessage}</Text>
          <View style={{ width: screenWidth * 0.14, height: screenWidth * 0.14, alignSelf: 'flex-end', marginTop: verticalMargin }}>
            <Button
              onPress={() => this.props.setShowLightBox(false)}
              width={'100%'}
            >
              <Icon name={'md-checkmark-circle-outline'} style={{ fontSize: RF(4) }} />
            </Button>
          </View>
        </View>
      </View>
    );
  }

  onRegister = async () => {
    const emailValue = this.state.emailFieldValue.trim();
    const passwordValue = this.state.passwordFieldValue.trim();

    this.props.setAppLoading(true);
    try {
      const registerAttempt = await this.props.fbAuth.createUserWithEmailAndPassword(emailValue, passwordValue);
      await RNSecureKeyStore.set(BOOJIT_EMAIL, emailValue, { accessible: ACCESSIBLE.WHEN_UNLOCKED });
      await RNSecureKeyStore.set(BOOJIT_PASSWORD, passwordValue, { accessible: ACCESSIBLE.WHEN_UNLOCKED });
      this.props.setUserID(registerAttempt.user._user.uid);
      this.props.setActiveScreen(Screens.Home);
    } catch (error) {
      console.log(error.code);
      this.props.setShowLightBox(true, this.createResponseBox(error.code));
    }
    this.props.setAppLoading(false);
  }

  onLogin = async () => {
    const emailValue = this.state.emailFieldValue.trim();
    const passwordValue = this.state.passwordFieldValue.trim();

    this.props.setAppLoading(true);
    try {
      const loginAttempt = await this.props.fbAuth.signInWithEmailAndPassword(emailValue, passwordValue);
      await RNSecureKeyStore.set(BOOJIT_EMAIL, emailValue, { accessible: ACCESSIBLE.WHEN_UNLOCKED });
      await RNSecureKeyStore.set(BOOJIT_PASSWORD, passwordValue, { accessible: ACCESSIBLE.WHEN_UNLOCKED });
      this.props.setUserID(loginAttempt.user._user.uid);
      this.props.setActiveScreen(Screens.Home);
    } catch (error) {
      console.log(error.code);
      this.props.setShowLightBox(true, this.createResponseBox(error.code));
    }
    this.props.setAppLoading(false);
  }

  onChangeEmailValue = (emailValue: string) => {
    this.setState({
      emailFieldValue: emailValue
    });
  }

  onChangePasswordValue = (passwordValue: string) => {
    this.setState({
      passwordFieldValue: passwordValue
    });
  }

  render() {
    const enableSubmitButtons = this.state.emailFieldValue.length > 0 && this.state.passwordFieldValue.length > 0;

    return (
      <View>
        <View style={{ height: screenHeight * 0.1 }}>
          <TextField
            onChangeText={this.onChangeEmailValue}
            flex={1}
            width={'100%'}
            fontSize={RF(3)}
            placeholder={'Email'}
          />
        </View>
        <Spacer height={screenHeight * 0.02} />
        <View style={{ height: screenHeight * 0.1 }}>        
          <TextField
            onChangeText={this.onChangePasswordValue}
            flex={1}
            width={'100%'}
            fontSize={RF(3)}
            placeholder={'Password'}
            passwordField
          />
        </View>
        <Spacer height={screenHeight * 0.02} />
        <View style={{ height: screenHeight * 0.08, flexDirection: 'row' }}>
          <Button
            flex={1}
            onPress={enableSubmitButtons ? this.onRegister : () => null}
            color={enableSubmitButtons ? Colors.white : Colors.gray}
          >
            <Text style={{ fontSize: RF(3)}}>Register</Text>
          </Button>
          <Spacer width={screenWidth * 0.025} />
          <Button
            flex={1}
            onPress={enableSubmitButtons ? this.onLogin : () => null}
            color={enableSubmitButtons ? Colors.white : Colors.gray}
          >
            <Text style={{ fontSize: RF(3)}}>Login</Text>
          </Button>
        </View>
      </View>
    );
  }
}

LoginScreen.propTypes = {
  setShowLightBox: PropTypes.func.isRequired,
  setActiveScreen: PropTypes.func.isRequired,  
  setAppLoading: PropTypes.func.isRequired,
  fbAuth: PropTypes.any.isRequired,
  setUserID: PropTypes.func.isRequired
};

export default LoginScreen;