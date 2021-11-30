import * as eva from '@eva-design/eva';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import React, { FC, useEffect, useState } from 'react';
import { AuthContext } from './authContext';
import { AuthToken, CoworkerPayload, RootStackParamList } from './models';
import { Login, Organizations } from './screens';

const { Group, Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

const App: FC = () => {
  const [token, setToken] = useState<AuthToken | null>(null);
  const [coworker, setCoworker] = useState<CoworkerPayload | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!token && new Date().valueOf() < token.ExpiresIn);

  const onLogin = async (onLoginToken: AuthToken | null, onLoginCoworker: CoworkerPayload | null) => {
    setToken(onLoginToken);
    setCoworker(onLoginCoworker);
  };

  const onLogout = async () => {
    setToken(null);
    setCoworker(null);
  };

  useEffect(() => {
    setIsLoggedIn(!!token && new Date().valueOf() < token.ExpiresIn);

    const timeout = token
      ? setTimeout(() => {
          setIsLoggedIn(!!token && new Date().valueOf() < token.ExpiresIn);
        }, new Date().valueOf() - token.ExpiresIn)
      : null;

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, isLoggedIn, onLogin, onLogout, coworker }}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <NavigationContainer>
          <Navigator screenOptions={{ headerShown: false }}>
            {isLoggedIn ? (
              <Group>
                <Screen name="Organizations" component={Organizations} />
              </Group>
            ) : (
              <Screen name="Login" component={Login} />
            )}
          </Navigator>
        </NavigationContainer>
      </ApplicationProvider>
    </AuthContext.Provider>
  );
};

export default App;
