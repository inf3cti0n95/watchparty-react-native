import React from 'react';

import {
  StyleProp,
  ViewStyle,
  View,
  Text,
  GestureResponderEvent,
  TouchableNativeFeedback,
} from 'react-native';
import GoogleIcon from './../../../assets/social/google.svg';
import styles from '../SignInButton.styles';

interface Props {
  onPress?: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
}

const GoogleSignInButton = ({onPress, style}: Props) => (
  <TouchableNativeFeedback onPress={onPress}>
    <View style={[style, styles.view, styles.google]}>
      <GoogleIcon height={24} width={24} />
      <Text style={[styles.text]}>Google Sign In</Text>
    </View>
  </TouchableNativeFeedback>
);

export default GoogleSignInButton;
