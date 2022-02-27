import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

import {Headlines} from './src/screens/Headlines';
import {Headline} from './src/screens/Headline';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Headlines" component={Headlines} />
        <Stack.Screen name="Headline" component={Headline} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
