import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { RootStackParamList } from './models';
import { Login, Organizations } from './screens';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: FC = () => (
  // <View style={styles.container}>
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Organizations" component={Organizations} />
    </Stack.Navigator>
  </NavigationContainer>
  // </View>
);

export default App;
