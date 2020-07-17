import React from 'react';
import {
  StyleProp,
  ViewStyle,
  TouchableNativeFeedback,
  View,
  Text,
  GestureResponderEvent,
} from 'react-native';

import FacebookIcon from './../../../assets/social/facebook.svg';
import styles from '../SignInButton.styles';

interface Props {
  onPress?: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
}

const FacebookSignInButton = ({onPress, style}: Props) => (
  <TouchableNativeFeedback onPress={onPress}>
    <View style={[style, styles.view, styles.facebookbutton]}>
      <FacebookIcon height={24} width={24} />
      <Text style={[styles.text, styles.facebooktext]}>Facebook Sign In</Text>
    </View>
  </TouchableNativeFeedback>
);

export default FacebookSignInButton;
