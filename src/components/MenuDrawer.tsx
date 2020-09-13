import React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { Title, Button } from 'react-native-paper'
import styles from '../styles'
import intl from 'react-intl-universal'
import { initConfiguration } from '../store/actions'

interface MenuDrawerProps {
  initConfiguration: typeof initConfiguration
  changeView: Function
}

function MenuDrawer(props: MenuDrawerProps) {
  const [initialized, setInitialized] = React.useState(false)

  React.useLayoutEffect(() => {
    props.initConfiguration()
    setInitialized(true)
  }, [])

  return (
    <View style={styles.flexVertical}>
      <View style={styles.flexVerticalTop}>
        <Title style={[styles.menuTitle, { marginTop: 20 }]}>
          {intl.get('display.title').d('WH40K - Matched Play V9')}
        </Title>
        <Button
          style={styles.mt10}
          onPress={() => props.changeView('Homepage')}
        >
          {intl.get('display.homepage').d('Games list')}
        </Button>
        <Button
          style={styles.mt10}
          onPress={() => props.changeView('EditGame')}
        >
          {intl.get('game.add').d('Add a new game')}
        </Button>
      </View>
      <View style={styles.flexVerticalBottom}>
        <Button onPress={() => props.changeView('About')}>
          {intl.get('display.about').d('About')}
        </Button>
      </View>
    </View>
  )
}
const mapStateToProps = (state: any) => ({
  configuration: state.configuration,
})

const mapDispatchToProps = (dispatch: Function) => ({
  initConfiguration: () => dispatch(initConfiguration()),
})

export default connect(mapStateToProps, mapDispatchToProps)(MenuDrawer)
