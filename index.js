/**
 * @format
 */
import * as React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';
import {theme} from './src/core/theme';

function Routes() {
  return (
    <NavigationContainer>
      <PaperProvider theme={theme}>
        <App />
      </PaperProvider>
    </NavigationContainer>
  );
}

AppRegistry.registerComponent(appName, () => Routes);
