import * as React from 'react';
import {View, Text, Dimensions, ActivityIndicator} from 'react-native';
import MovieParty from '../assets/graphics/movie-party.svg';
import Header from '../components/Header';

const {height} = Dimensions.get('screen');

function SplashScreen() {
  return (
    <View
      style={{height: height, justifyContent: 'center', alignItems: 'center'}}>
      <MovieParty width={'100%'} height={height / 4} />
      <Text
        style={{
          textAlign: 'center',
          fontSize: 35,
          marginBottom: 15,
          marginTop: 15,
        }}>
        <Header>Watchparty!!🎉</Header>
      </Text>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
}

export default React.memo(SplashScreen);
