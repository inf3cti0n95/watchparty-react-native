import React, {memo, useState} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import {theme} from '../core/theme';
import MovieNight from '../assets/graphics/movie-night.svg';

const {height} = Dimensions.get('screen');

const CreateParty = ({navigation}) => {
  const [name, setName] = useState({value: '', error: ''});
  const [url, setURL] = useState({value: '', error: ''});

  const validator = (value) => {
    if (value === '') {
      return 'Cannot be Empty!';
    }
  };

  const onCreateParty = () => {
    const nameError = validator(name.value);
    const urlError = validator(url.value);

    if (nameError || urlError) {
      setName({...name, error: nameError});
      setURL({...url, error: urlError});
      return;
    }
    console.log(name, url);
  };

  return (
    <View style={{height: height, marginHorizontal: 20, marginTop: 50}}>
      <MovieNight width={'100%'} height={height / 4} />
      <KeyboardAvoidingView>
        <Header>🎉 Create a party</Header>
        <TextInput
          label="Party Name 🎉"
          placeholder="Binge HIMYM! 🎉"
          returnKeyType="next"
          value={name.value}
          onChangeText={(text) => setName({value: text, error: ''})}
          error={!!name.error}
          errorText={name.error}
          autoCapitalize="none"
          autoCompleteType="name"
          textContentType="name"
          keyboardType="twitter"
        />
        <TextInput
          label="Stream URL 🔗"
          placeholder="http://"
          returnKeyType="done"
          value={url.value}
          onChangeText={(text) => setURL({value: text, error: ''})}
          error={!!url.error}
          errorText={url.error}
          autoCapitalize="none"
          textContentType="URL"
          keyboardType="url"
          onSubmitEditing={onCreateParty}
        />
        <Button mode="contained" onPress={onCreateParty}>
          Let's Party! 🎉
        </Button>
        <View style={styles.row}>
          <Text style={styles.label}>Wanna join a friend's party? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('JoinParty')}>
            <Text style={styles.link}>Join Party!</Text>
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
    textAlign: 'center',
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
    textAlign: 'center',
  },
});

export default memo(CreateParty);
