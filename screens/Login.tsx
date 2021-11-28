import React, { FC, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../models';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 320,
    marginHorizontal: 'auto',
    marginVertical: 15,
    padding: 15,
    backgroundColor: 'rgba(243, 244, 246, 1)',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 15,
    elevation: 3,
  },
  inputView: { backgroundColor: '#FFF', borderRadius: 15, height: 45, marginTop: 20, elevation: 3 },
  TextInput: { height: 50, flex: 1, padding: 10, marginLeft: 10 },
  heading: { color: 'rgba(75, 85, 99, 1)', fontSize: 24, fontWeight: 'bold', alignSelf: 'center' },
  button: {
    alignItems: 'center',
    padding: 12,
    borderRadius: 15,
    elevation: 3,
    backgroundColor: '#3182CE',
    marginTop: 20,
    opacity: 0.5,
  },
  buttonText: { color: '#FFF' },
});

type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

export const Login: FC<LoginProps> = ({ navigation }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const submitDisabled = !username || !password;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Sign In</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Username"
          placeholderTextColor="rgba(75, 85, 99, 1)"
          onChangeText={setUsername}
          value={username}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="rgba(75, 85, 99, 1)"
          secureTextEntry={true}
          onChangeText={setPassword}
          value={password}
        />
      </View>
      <Pressable
        disabled={submitDisabled}
        style={{ ...styles.button, opacity: submitDisabled ? 0.4 : 1 }}
        onPress={() => {
          console.log(username, password);
          navigation.navigate('Organizations');
        }}
      >
        <Text style={styles.buttonText}>Sign In</Text>
      </Pressable>
    </View>
  );
};
