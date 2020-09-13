import React from 'react'
import { View, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import {
  initConfiguration,
  resetGames,
  resetConfiguration,
} from './store/actions'
import { Button, IconButton } from 'react-native-paper'
import { Game, HomepageScreenNavigationProp } from './types'
import Games from './components/Games'
import styles, { theme } from './styles'
import { ScrollView } from 'react-native'
import { useHeaderHeight } from '@react-navigation/stack'
import LocaleSelector from './components/LocaleSelector'
import intl from 'react-intl-universal'
import MenuDrawer from './components/MenuDrawer'
import MenuDrawerButton from './components/MenuDrawerButton'

interface HomepageProps {
  initConfiguration: typeof initConfiguration
  resetConfiguration: typeof resetConfiguration
  resetGames: typeof resetGames
  configuration: {
    locale: String
  }
  currentGame: Game
  navigation: HomepageScreenNavigationProp
  openDrawer: Function
}

function Homepage({ navigation, ...props }: HomepageProps) {
  const [initialized, setInitialized] = React.useState(false)

  React.useLayoutEffect(() => {
    props.initConfiguration()
    setHeader()
    setInitialized(true)
  }, [])

  React.useEffect(() => {
    setHeader()
  })

  const setHeader = () => {
    navigation.setOptions({
      title: intl.get('display.homepage').d('Games list'),
      // eslint-disable-next-line react/display-name
      headerRight: () => <LocaleSelector />,
      // eslint-disable-next-line react/display-name
      headerLeft: () => <MenuDrawerButton openDrawer={props.openDrawer} />,
    })
  }

  return (
    <ScrollView
      style={{
        height: Dimensions.get('window').height - useHeaderHeight(),
      }}
      contentContainerStyle={styles.body}
    >
      {initialized ? (
        <View style={styles.container}>
          <Games />

          <Button
            mode="contained"
            icon="plus"
            onPress={() => navigation.navigate('EditGame')}
            color={theme.colors.add}
          >
            {intl.get('game.add').d('Add a new game')}
          </Button>

          {/* <Button
            mode="contained"
            icon="delete"
            onPress={() => {
              props.resetGames()
              props.resetConfiguration()
            }}
            color="red"
          >
            RESET
          </Button> */}
        </View>
      ) : (
        <View></View>
      )}
    </ScrollView>
  )
}

const mapStateToProps = (state: any) => ({
  configuration: state.configuration,
  currentGame: state.currentGame,
})

const mapDispatchToProps = (dispatch: Function) => ({
  resetGames: () => dispatch(resetGames()),
  resetConfiguration: () => dispatch(resetConfiguration()),
  initConfiguration: () => dispatch(initConfiguration()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Homepage)
