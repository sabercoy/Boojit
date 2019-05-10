import React from 'react';
import { View, TouchableWithoutFeedback, TextInput } from 'react-native';
import { Input, Icon } from 'native-base';
import PropTypes from 'prop-types';
import Colors from '../../../theme/Colors';

class TextField extends React.Component {
  constructor(props) {
    super(props);
    
    this.textBox = React.createRef();
  }

  render() {
    let borderColor;
    let validityIcon;
  
    if (this.props.error) {
      borderColor = Colors.red;
      validityIcon = <Icon name={'close-circle'} style={{ color: Colors.red, width: '10%' }} />;
    } else if (this.props.success) {
      borderColor = Colors.green;
      validityIcon = <Icon name={'md-checkmark-circle'} style={{ color: Colors.green }} />;
    } else {
      borderColor = Colors.white;
      validityIcon = null;
    }

    return (
      <TouchableWithoutFeedback>
        <View style={{ flex: this.props.flex, width: this.props.width, borderColor: borderColor, borderRadius: 50, borderWidth: 2, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ flexDirection: 'row', width: '90%', alignItems: 'center', justifyContent: 'flex-start', height: '100%' }}>
            <TextInput
              ref={(me) => { this.textBox = me; }}
              onChangeText={this.props.onChangeText}
              defaultValue={this.props.defaultValue}
              maxLength={this.props.maxLength}
              underlineColorAndroid={'transparent'}
              keyboardType={this.props.moneyField ? 'number-pad' : 'default'}
              selectionColor={Colors.black}
              style={{ fontSize: this.props.fontSize, width: '90%', height: '100%' }}
              placeholder={this.props.placeholder ? this.props.placeholder : (this.props.moneyField ? '$' : '')}
              placeholderTextColor={Colors.lightGray}
              autoFocus={this.props.autoFocus}
              onSubmitEditing={(event) => this.props.onSubmitValue(event.nativeEvent.text)}
              onFocus={this.props.onFocus}
              secureTextEntry={this.props.passwordField}
              onBlur={this.props.onBlur}
            />
            {validityIcon}
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

TextField.defaultProps = {
  error: false,
  success: false,
  moneyField: false,
  autoFocus: false,
  placeholder: '',
  maxLength: null,
  defaultValue: '',
  onChangeText: undefined,
  onFocus: () => null,
  passwordField: false,
  onSubmitValue: () => null,
  onBlur: () => null
};

TextField.propTypes = {
  flex: PropTypes.number.isRequired,
  width: PropTypes.string.isRequired,
  fontSize: PropTypes.number.isRequired,
  onSubmitValue: PropTypes.func,
  moneyField: PropTypes.bool,
  autoFocus: PropTypes.bool,
  placeholder: PropTypes.string,
  maxLength: PropTypes.number,
  error: PropTypes.bool,
  success: PropTypes.bool,
  defaultValue: PropTypes.string,
  onChangeText: PropTypes.func,
  onFocus: PropTypes.func,
  passwordField: PropTypes.bool,
  onBlur: PropTypes.func
};

export default TextField;