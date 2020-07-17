import React, {memo, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import {theme} from '../core/theme';
import {TouchableOpacity} from 'react-native-gesture-handler';

import VideoFiles from '../assets/graphics/video-files.svg';

const {height} = Dimensions.get('screen');

const JoinParty = ({navigation}) => {
  const [name, setName] = useState({value: '', error: ''});

  const validator = (value) => {
    // if (value === '') {
    //   return 'Cannot be Empty!';
    // }

    navigation.navigate('Party', {
      partyId: '95165ab8-9ac6-4fe9-883c-29a43fd6529d',
    });
  };

  const onJoinParty = () => {
    const nameError = validator(name.value);

    if (nameError) {
      setName({...name, error: nameError});
      return;
    }
    console.log(name);
  };

  return (
    <View style={{height: height, marginHorizontal: 20, marginTop: 50}}>
      <VideoFiles width={'100%'} height={height / 4} />
      <KeyboardAvoidingView>
        <Header>🥳 Join a party!</Header>
        <TextInput
          label="Party ID 🥳"
          returnKeyType="done"
          placeholder="XXXXX-YYYYY-SSSSS"
          value={name.value}
          onChangeText={(text) => setName({value: text, error: ''})}
          error={!!name.error}
          errorText={name.error}
          autoCapitalize="none"
          autoCompleteType="name"
          textContentType="name"
          keyboardType="twitter"
        />
        <Button mode="contained" onPress={onJoinParty}>
          Let's Party! 🎉
        </Button>
        <View style={styles.row}>
          <Text style={styles.label}>Wanna create your own party? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('CreateParty')}>
            <Text style={styles.link}>Create Party!</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'center',
  },
  label: {
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

export default memo(JoinParty);
