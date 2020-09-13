import React from 'react'
import { View, Dimensions, Linking } from 'react-native'
import { connect } from 'react-redux'
import { Button, Text, Title } from 'react-native-paper'
import { AboutRouteProp, AboutScreenNavigationProp } from './types'

import styles from './styles'
import { ScrollView } from 'react-native-gesture-handler'
import { useHeaderHeight } from '@react-navigation/stack'
import intl from 'react-intl-universal'
import LocaleSelector from './components/LocaleSelector'
import MenuDrawerButton from './components/MenuDrawerButton'

interface AboutProps {
  navigation: AboutScreenNavigationProp
  route: AboutRouteProp
  configuration: {
    locale: String
  }
  openDrawer: Function
}

function About({ navigation, route, ...props }: AboutProps) {
  const [initialized, setInitialized] = React.useState(false)

  React.useLayoutEffect(() => {
    setHeader()
    setInitialized(true)
  }, [])

  React.useEffect(() => {
    setHeader()
  })

  const setHeader = () => {
    navigation.setOptions({
      title: intl.get('display.about').d(`About`),
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
          <Title style={styles.menuTitle}>
            {intl.get('display.about').d(`About`)}
          </Title>
          <Text style={[styles.mt30]}>{intl.get('display.about-text')}</Text>
          <Button
            icon="email"
            mode="contained"
            style={[styles.mt30]}
            onPress={() =>
              Linking.openURL(
                `mailto:wh.40k.objectives@gmail.com?subject=${intl
                  .get('display.i-have-a-question')
                  .d('I have a question')}`
              )
            }
          >
            {intl.get('display.contact-the-author').d('Contact the author')}
          </Button>

          <Text style={[styles.light, styles.mt30]}>
            {intl.get('display.about-text-copyright')}
          </Text>
        </View>
      ) : (
        <View></View>
      )}
    </ScrollView>
  )
}

const mapStateToProps = (state: any) => ({
  configuration: state.configuration,
})

export default connect(mapStateToProps)(About)
