/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import * as React from 'react';
import {createStackNavigator, TransitionSpecs} from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';

import AuthContext from './src/context/AuthContext';
import SignInScreen from './src/screens/SignInScreen';
import HomeScreen from './src/screens/HomeScreen';
import SplashScreen from './src/screens/SpalshScreen';
import {user as userAPI} from './src/api/api';
import UserContext from './src/context/UserContext';
import Party from './src/screens/Party';

const Stack = createStackNavigator();

function App({navigation}) {
  const userData = React.useContext(UserContext);

  const [user, setUser] = React.useState(userData);

  const [state, dispatch] = React.useReducer(
    (prevState: any, action: any) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            token: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            token: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            token: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      token: null,
    },
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let token;

      try {
        token = await AsyncStorage.getItem('token');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      setTimeout(() => dispatch({type: 'RESTORE_TOKEN', token: token}), 2000);
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data: any) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token
        setUser(data);
        dispatch({type: 'SIGN_IN', token: data.token});
      },
      signOut: async () => {
        let token = await AsyncStorage.getItem('token');
        await userAPI.logout(token);
        dispatch({type: 'SIGN_OUT'});
      },
      signUp: async (data: any) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
      },
    }),
    [],
  );

  if (state.isLoading) {
    // We haven't finished checking for the token yet
    return <SplashScreen />;
  }

  const animationConfig = {
    animation: 'spring',
    config: {
      stiffness: 1000,
      damping: 500,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };

  return (
    <AuthContext.Provider value={authContext}>
      <UserContext.Provider value={user}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            transitionSpec: {
              open: TransitionSpecs.TransitionIOSSpec,
              close: TransitionSpecs.TransitionIOSSpec,
            },
          }}>
          {state.token !== null ? (
            <Stack.Screen name="SignIn" component={SignInScreen} />
          ) : (
            <>
              {/* <Stack.Screen name="CreateParty" component={CreateParty} /> */}
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Party" component={Party} />
            </>
          )}
        </Stack.Navigator>
      </UserContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
