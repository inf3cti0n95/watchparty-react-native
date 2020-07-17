import React from 'react';
import {
  GoogleSignin as RNGoogleSignIn,
  statusCodes,
} from '@react-native-community/google-signin';
import {GoogleSignInButton} from '../../../ui/SignInButton';
import {
  Provider,
  SignInError,
  SignInSuccessListener,
  SignInFailureListener,
  SignInProps,
} from '../SignIn.interface';

RNGoogleSignIn.configure({
  webClientId:
    '882182957251-hqs2tvmqn8d059hjidjv6a307t855tlt.apps.googleusercontent.com',
});

const GoogleSignIn = ({onSignInSuccess, onSignInFailure}: SignInProps) => {
  const handlePressEvent = async (
    onSignInSuccessCallback: SignInSuccessListener,
    onSignInFailureCallback: SignInFailureListener,
  ) => {
    try {
      await RNGoogleSignIn.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
    } catch (error) {
      onSignInFailureCallback({
        errorMessage: {
          debug: 'Play Services on Available!',
          client: 'You do not have Google Play Services required by this app.',
        },
        provider: Provider.GOOGLE,
        type: SignInError.AUTH_ERROR,
      });
      return;
    }
    try {
      const userInfo = await RNGoogleSignIn.signIn();
      if (!userInfo.idToken) {
        onSignInFailureCallback({
          errorMessage: {
            debug: 'Server Authentication code not found!',
            client: 'Error Authenticating...',
          },
          provider: Provider.GOOGLE,
          type: SignInError.AUTH_ERROR,
        });
        return;
      }
      onSignInSuccessCallback({
        token: userInfo.idToken,
        provider: Provider.GOOGLE,
      });
      return;
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        onSignInFailureCallback({
          errorMessage: {
            debug: 'Authentication cancelled by User.',
          },
          provider: Provider.GOOGLE,
          type: SignInError.CANCELLED,
          error,
        });
        return;
      } else if (error.code === statusCodes.IN_PROGRESS) {
        onSignInFailureCallback({
          errorMessage: {
            debug: 'User Sign In already in Progress',
            client: 'Signing In',
          },
          provider: Provider.GOOGLE,
          type: SignInError.AUTH_ERROR,
          error,
        });
        return;
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        onSignInFailureCallback({
          errorMessage: {
            debug: 'Play Services on Available!',
            client:
              'You do not have Google Play Services required by this app.',
          },
          provider: Provider.GOOGLE,
          type: SignInError.AUTH_ERROR,
          error,
        });
        return;
      } else {
        onSignInFailureCallback({
          errorMessage: {
            debug: 'Error while signing in.',
            client: 'Error! Unable to sign in with Google at the moment.',
          },
          provider: Provider.GOOGLE,
          type: SignInError.AUTH_ERROR,
          error,
        });
        return;
      }
    }
  };

  return (
    <GoogleSignInButton
      onPress={() => handlePressEvent(onSignInSuccess, onSignInFailure)}
    />
  );
};

export default GoogleSignIn;
