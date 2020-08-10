import * as React from 'react'
import { Provider as PaperProvider } from 'react-native-paper'
import { Provider as StoreProvider } from 'react-redux'
import { store, persistor } from './src/store/configureStore'
import { PersistGate } from 'redux-persist/integration/react'
import 'react-native-gesture-handler'
import { NavigationContainer, DarkTheme } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Homepage from './src/Homepage'
import EditGame from './src/EditGame'
import ViewGame from './src/ViewGame'

const Stack = createStackNavigator()

export default class Entrypoint extends React.Component {
  render(): React.ReactNode {
    return (
      <StoreProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer theme={DarkTheme}>
            <PaperProvider>
              <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Homepage" component={Homepage} />
                <Stack.Screen name="EditGame" component={EditGame} />
                <Stack.Screen name="ViewGame" component={ViewGame} />
              </Stack.Navigator>
            </PaperProvider>
          </NavigationContainer>
        </PersistGate>
      </StoreProvider>
    )
  }
}
