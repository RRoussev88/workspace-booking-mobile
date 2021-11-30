import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Card, Divider, Input, Text, TopNavigation } from '@ui-kitten/components';
import React, { FC, useContext, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { AuthContext } from '../authContext';
import { AuthToken, CoworkerPayload, RootStackParamList } from '../models';
import { styleConstants } from '../utils';

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 320,
    marginVertical: 30,
    backgroundColor: styleConstants.backgroundColor,
    borderRadius: 15,
    elevation: 3,
  },
  heading: { color: styleConstants.textColor, fontWeight: 'bold', textAlign: 'center' },
  textInput: { backgroundColor: '#FFF', borderRadius: 15, height: 45, marginTop: 20 },
  button: { borderRadius: 15, marginTop: 40 },
});

type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

export const Login: FC<LoginProps> = ({ navigation }) => {
  const auth = useContext(AuthContext);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = () => {
    auth.onLogout();
    fetch('https://2831-87-246-31-148.ngrok.io/auth/signin', {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
      .then<{ token?: AuthToken; payload?: CoworkerPayload; errors?: string[] }>((raw) => raw.json())
      .then((data) => {
        if (data.token && data.payload) {
          setUsername('');
          setPassword('');
        }
        if (data.errors?.length) {
          setLoginError('Incorrect credentials');
        }
        return data;
      })
      // Call to `auth.onLogin` is extracted in separate promise in order to avoid unmounted component state change
      .then((data) => {
        if (data.token && data.payload) {
          auth.onLogin(
            { ...data.token, ExpiresIn: new Date().valueOf() + data.token.ExpiresIn * 1000 },
            data.payload,
          );
          navigation.navigate('Organizations');
        }
      })
      .catch((error: Error) => {
        setLoginError(error?.message ?? 'Something went wrong');
      });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation />
      <Divider />
      <Card style={styles.container}>
        <Text style={styles.heading} category="h2">
          Sign In
        </Text>
        <Input
          style={styles.textInput}
          label="Username"
          placeholder="Enter Username"
          onChangeText={setUsername}
          value={username}
        />
        <Input
          style={styles.textInput}
          label="Password"
          placeholder="Enter Password"
          secureTextEntry={true}
          onChangeText={setPassword}
          value={password}
        />
        <Button
          status="primary"
          appearance="filled"
          disabled={!username || !password}
          style={styles.button}
          onPress={handleSubmit}
        >
          Sign In
        </Button>
      </Card>
    </SafeAreaView>
  );
};
