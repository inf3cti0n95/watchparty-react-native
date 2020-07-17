import * as React from 'react';
import AuthContext from '../context/AuthContext';
import {View, Dimensions, ActivityIndicator, StyleSheet} from 'react-native';
import {GoogleSignIn, FacebookSignIn} from '../components/SignIn';
import {SignInSuccessResponse} from '../components/SignIn/SignIn.interface';
import {social} from '../api/api';
import HomeCinema from '../assets/graphics/home-cinema.svg';

const {height} = Dimensions.get('screen');

export default function SignInScreen() {
  const [isLoading, setLoading] = React.useState(false);
  const {signIn} = React.useContext(AuthContext);

  const handleSignInSuccess = async (tokens: SignInSuccessResponse) => {
    setLoading(true);
    const response = await social.login(tokens);
    await signIn(response);
    setLoading(false);
  };

  return (
    <View
      style={{height: height, justifyContent: 'center', alignItems: 'center'}}>
      <HomeCinema width={'100%'} height={height / 4} />
      <View style={{marginTop: 35}}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            <GoogleSignIn
              onSignInFailure={console.log}
              onSignInSuccess={(tokens) => handleSignInSuccess(tokens)}
            />
            <FacebookSignIn
              onSignInFailure={console.log}
              onSignInSuccess={(tokens) => handleSignInSuccess(tokens)}
            />
          </>
        )}
      </View>
    </View>
  );
}
