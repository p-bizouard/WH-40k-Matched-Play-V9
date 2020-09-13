import React, { useState } from 'react'
import { View, ScrollView } from 'react-native'
import missions from '../data/missions.json'
import gameTypes from '../data/gameTypes.json'
import gameFormats from '../data/gameFormats.json'
import { connect } from 'react-redux'
import { setMission } from '../store/actions'
import {
  Button,
  Portal,
  Dialog,
  RadioButton,
  Title,
  Text,
} from 'react-native-paper'
import { Game } from '../Types'
import styles, { theme } from '../styles'
import intl from 'react-intl-universal'
import humanizeString from 'humanize-string'

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
                {gameTypes.map((gameType) => {
                  return (
                    <View key={`mission-${gameType.id}`}>
                      <Title>
                        {intl
                          .get(`mission.${gameType.id}`)
                          .d(humanizeString(gameType.id))}
                      </Title>
                      {gameFormats
                        .filter(
                          (gameFormat) =>
                            missions.filter(
                              (mission) =>
                                mission.type === gameType.id &&
                                mission.format === gameFormat.id
                            ).length
                        )
                        .map((gameFormat) => {
                          return (
                            <View key={`mission-format-${gameFormat.id}`}>
                              <Text style={[styles.bold, styles.mt10]}>
                                {intl
                                  .get(`mission-format.${gameFormat.id}`)
                                  .d(humanizeString(gameFormat.id))}
                              </Text>
                              {missions
                                .filter(
                                  (mission) =>
                                    mission.type === gameType.id &&
                                    mission.format === gameFormat.id
                                )
                                .map((mission) => {
                                  return (
                                    <RadioButton.Item
                                      label={intl
                                        .get(`mission.${mission.id}`)
                                        .d(humanizeString(mission.id))}
                                      onPress={() => {
                                        props.setMission(
                                          gameType.id,
                                          gameFormat.id,
                                          mission.id
                                        )
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
        mode="contained"
        onPress={() => setDialog(true)}
        style={{
          marginBottom: 10,
          backgroundColor: props.currentGame.mission
            ? theme.colors.primary
            : 'red',
        }}
      >
        {props.currentGame.mission
          ? intl
              .get(`mission.${props.currentGame.mission}`)
              .d(humanizeString(props.currentGame.mission))
          : intl.get(`game.set-mission`).d('Click to set mission')}
      </Button>
    </View>
  )
}

const mapStateToProps = (state: any) => ({
  currentGame: state.currentGame,
})

const mapDispatchToProps = (dispatch: Function) => ({
  setMission: (gameType: string, gameFormatId: string, missionId: string) =>
    dispatch(setMission(gameType, gameFormatId, missionId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MissionSelector)
