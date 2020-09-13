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
import About from './src/About'

import { theme } from './src/styles'
import MenuDrawer from './src/components/MenuDrawer'
import SideMenu from 'react-native-side-menu'
import { Dimensions } from 'react-native'

const Stack = createStackNavigator()

export default class Entrypoint extends React.Component {
  constructor(props: any) {
    super(props)
    this.navigationRef = React.createRef()
    this.changeView = this.changeView.bind(this)
    this.openDrawer = this.openDrawer.bind(this)
    this.state = { isOpen: false }
  }

  changeView(navigationName: string, params: object = {}) {
    this.navigationRef.current?.navigate(navigationName, params)
    this.setState({
      isOpen: false,
    })
  }

  openDrawer() {
    this.setState({
      isOpen: true,
    })
  }

  render(): React.ReactNode {
    const menu = <MenuDrawer changeView={this.changeView} />
    return (
      <StoreProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer ref={this.navigationRef} theme={DarkTheme}>
            <PaperProvider theme={theme}>
              <SideMenu
                isOpen={this.state.isOpen}
                openMenuOffset={
                  Dimensions.get('window').width > 1000
                    ? 300
                    : (Dimensions.get('window').width * 3) / 4
                }
                menu={menu}
              >
                <Stack.Navigator initialRouteName="Homepage">
                  <Stack.Screen name="Homepage">
                    {(props) => (
                      <Homepage {...props} openDrawer={this.openDrawer} />
                    )}
                  </Stack.Screen>
                  <Stack.Screen name="EditGame">
                    {(props) => (
                      <EditGame {...props} openDrawer={this.openDrawer} />
                    )}
                  </Stack.Screen>
                  <Stack.Screen name="ViewGame">
                    {(props) => (
                      <ViewGame {...props} openDrawer={this.openDrawer} />
                    )}
                  </Stack.Screen>
                  <Stack.Screen name="About">
                    {(props) => (
                      <About {...props} openDrawer={this.openDrawer} />
                    )}
                  </Stack.Screen>
                </Stack.Navigator>
              </SideMenu>
            </PaperProvider>
          </NavigationContainer>
        </PersistGate>
      </StoreProvider>
    )
  }
}
