import React from 'react';

import {LoginManager, AccessToken} from 'react-native-fbsdk';
import {FacebookSignInButton} from '../../../ui/SignInButton';
import GraphAPI from '../../../utils/facebook/GraphAPI';
import {
  SignInProps,
  SignInSuccessListener,
  SignInFailureListener,
  Provider,
  SignInError,
} from '../SignIn.interface';

const readPermissions = ['public_profile', 'email'];

interface FacebookGraphMeResponse {
  name: string;
  picture: {
    data: {
      height: number;
      is_silhouette: boolean;
      url: string;
      width: number;
    };
  };
  id: string;
  email: string;
}

const FacebookSignIn = ({onSignInSuccess, onSignInFailure}: SignInProps) => {
  const handlePressEvent = async (
    onSignInSuccessCallback: SignInSuccessListener,
    onSignInFailureCallback: SignInFailureListener,
  ) => {
    try {
      const {isCancelled, error} = await LoginManager.logInWithPermissions(
        readPermissions,
      );

      if (isCancelled) {
        onSignInFailureCallback({
          errorMessage: {
            debug: 'Authentication cancelled by User.',
          },
          provider: Provider.FACEBOOK,
          type: SignInError.CANCELLED,
          error,
        });
        return;
      }

      if (error) {
        onSignInFailureCallback({
          errorMessage: {
            debug: 'Error while signing in.',
            client: 'Error! Unable to sign in with Facebook at the moment.',
          },
          provider: Provider.FACEBOOK,
          type: SignInError.AUTH_ERROR,
          error,
        });
        return;
      }

      const accessTokenResponse = await AccessToken.getCurrentAccessToken();

      if (!accessTokenResponse) {
        onSignInFailureCallback({
          errorMessage: {
            debug: 'Got Null in Access Token.',
            client: 'Error! Unable to sign in with Facebook at the moment.',
          },
          provider: Provider.FACEBOOK,
          type: SignInError.AUTH_ERROR,
          error,
        });
        return;
      }

      const {accessToken} = accessTokenResponse;

      try {
        const userInfo = await GraphAPI<FacebookGraphMeResponse>('/me', {
          accessToken,
          parameters: {
            fields: {string: 'id'},
          },
        });

        if (!userInfo) {
          onSignInFailureCallback({
            errorMessage: {
              debug: 'Unable to fetch user profile!',
              client:
                'Unable to fetch user profile from Facebook at the moment.',
            },
            provider: Provider.FACEBOOK,
            type: SignInError.PROFILE_FETCH_FAILED,
            error,
          });
          return;
        }

        onSignInSuccessCallback({
          token: accessToken,
          provider: Provider.FACEBOOK,
        });
        return;
      // eslint-disable-next-line no-catch-shadow
      } catch (error) {
        onSignInFailureCallback({
          errorMessage: {
            debug: 'Unable to fetch user profile!',
            client: 'Unable to fetch user profile from Facebook at the moment.',
          },
          provider: Provider.FACEBOOK,
          type: SignInError.PROFILE_FETCH_FAILED,
          error,
        });
        return;
      }
    } catch (error) {
      onSignInFailureCallback({
        errorMessage: {
          debug: 'Error while signing in.',
          client: 'Error! Unable to sign in with Facebook at the moment.',
        },
        provider: Provider.FACEBOOK,
        type: SignInError.AUTH_ERROR,
        error,
      });
      return;
    }
  };

  return (
    <FacebookSignInButton
      onPress={() => handlePressEvent(onSignInSuccess, onSignInFailure)}
    />
  );
};

export default FacebookSignIn;
