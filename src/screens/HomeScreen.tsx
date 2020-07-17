import React, {memo, useState} from 'react';
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CreateParty from './CreateParty';
import JoinParty from './JoinParty';

const Tab = createBottomTabNavigator();

const HomeScreen = ({navigation}) => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{
          tabBarIcon: () => <Text>🎉</Text>,
        }}
        name="CreateParty"
        component={CreateParty}
      />
      <Tab.Screen
        options={{
          tabBarIcon: () => <Text>🥳</Text>,
        }}
        name="JoinParty"
        component={JoinParty}
      />
    </Tab.Navigator>
  );
};

export default memo(HomeScreen);
