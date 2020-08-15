import React, { useState } from 'react'
import { View, ScrollView } from 'react-native'
import missions from '../data/missions.json'
import { connect } from 'react-redux'
import { setMission } from '../store/actions'
import { Button, Portal, Dialog, RadioButton, Title } from 'react-native-paper'
import { Game } from '../Types'
import styles from '../styles'
import intl from 'react-intl-universal'

interface MissionSelectorProps {
  currentGame: Game
  setMission: typeof setMission
}

function MissionSelector({ ...props }: MissionSelectorProps) {
  const [dialog, setDialog] = useState(false)

  return (
    <View>
      <Portal>
        <Dialog
          visible={dialog}
          onDismiss={() => setDialog(false)}
          style={styles.dialog}
        >
          <Dialog.ScrollArea>
            <ScrollView
              contentContainerStyle={{
                paddingVertical: 20,
              }}
            >
              <RadioButton.Group value={props.currentGame.mission}>
                {missions
                  .filter((format) => format.missions.length)
                  .map((format) => {
                    return (
                      <View key={`format-${format.id}`}>
                        <Title>
                          {intl.formatMessage({
                            id: `mission.${format.id}`,
                            defaultMessage: format.id,
                          })}
                        </Title>
                        {format.missions.map((mission) => {
                          return (
                            <RadioButton.Item
                              label={intl.formatMessage({
                                id: `mission.${format.id}.${mission.id}`,
                                defaultMessage: mission.id,
                              })}
                              onPress={() => {
                                props.setMission(format.id, mission.id)
                                setDialog(false)
                              }}
                              value={mission.id}
                              key={mission.id}
                            />
                          )
                        })}
                      </View>
                    )
                  })}
              </RadioButton.Group>
            </ScrollView>
          </Dialog.ScrollArea>
          <Dialog.Actions>
            <Button onPress={() => setDialog(false)}>
              {intl.get('display.close').d('Close')}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <Button
        mode="outlined"
        onPress={() => setDialog(true)}
        style={{
          marginBottom: 10,
          borderColor: props.currentGame.mission ? 'transparent' : 'red',
        }}
      >
        {props.currentGame.mission
          ? intl.formatMessage({
              id: `mission.${props.currentGame.format}.${props.currentGame.mission}`,
              defaultMessage: props.currentGame.mission,
            })
          : 'Click to set mission'}
      </Button>
    </View>
  )
}

const mapStateToProps = (state: any) => ({
  currentGame: state.currentGame,
})

const mapDispatchToProps = (dispatch: Function) => ({
  setMission: (formatId: string, missionId: string) =>
    dispatch(setMission(formatId, missionId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MissionSelector)
