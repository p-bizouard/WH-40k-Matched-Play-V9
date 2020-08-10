import React, { useState } from 'react'
import { View, ScrollView } from 'react-native'

import { connect } from 'react-redux'
import { updateLocale } from '../store/actions'
import styles from '../styles'
import { Portal, Dialog, Button, RadioButton } from 'react-native-paper'
import Flag from 'react-native-flags'
import { getCountryFromIso, getLocales } from '../store/actions/translation'

interface LocaleSelectorProps {
  updateLocale: typeof updateLocale
  configuration: {
    locale: string
  }
}

function LocaleSelector({ ...props }: LocaleSelectorProps) {
  const [modal, setModal] = useState(false)

  return (
    <View>
      <Portal>
        <Dialog
          visible={modal}
          onDismiss={() => setModal(false)}
          style={{
            maxWidth: 600,
            maxHeight: '85%',
          }}
        >
          <Dialog.ScrollArea>
            <ScrollView
              contentContainerStyle={{
                paddingVertical: 20,
              }}
            >
              <RadioButton.Group
                onValueChange={(itemValue) => {
                  props.updateLocale(itemValue)
                  setModal(false)
                }}
                value={props.configuration.locale}
              >
                {getLocales().map((value) => {
                  return (
                    <View style={styles.flexView} key={`flag-${value.iso}`}>
                      <Flag code={getCountryFromIso(value.iso)} size={24} />
                      <RadioButton.Item label={value.name} value={value.iso} />
                    </View>
                  )
                })}
              </RadioButton.Group>
            </ScrollView>
          </Dialog.ScrollArea>
          <Dialog.Actions>
            <Button onPress={() => setModal(false)}>Close</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <Button
        style={styles.mr10}
        mode="contained"
        onPress={() => setModal(true)}
        icon={() => (
          <Flag
            code={getCountryFromIso(props.configuration.locale)}
            size={24}
          />
        )}
      >
        {
          getLocales().filter(
            (locale) => locale.iso === props.configuration.locale
          )[0].name
        }
      </Button>
    </View>
  )
}

const mapStateToProps = (state: any) => ({
  configuration: state.configuration,
})

const mapDispatchToProps = (dispatch: Function) => ({
  updateLocale: (locale: any) => dispatch(updateLocale(locale)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LocaleSelector)
