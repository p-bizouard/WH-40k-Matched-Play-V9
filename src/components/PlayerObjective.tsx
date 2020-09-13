import React, { useState } from 'react'
import { View, ScrollView } from 'react-native'

import { connect } from 'react-redux'
import { updatePlayerObjective } from '../store/actions'
import {
  Text,
  TextInput,
  Portal,
  Dialog,
  Button,
  Title,
  IconButton,
} from 'react-native-paper'
import { Game, Player, PlayerObjective as PlayerObjectiveType } from '../Types'
import styles from '../styles'
import { isNumber } from 'lodash'
import humanizeString from 'humanize-string'
import intl from 'react-intl-universal'

interface PlayerObjectiveProps {
  updatePlayerObjective: typeof updatePlayerObjective
  currentGame: Game
  teamNumber: number
  playerNumber: number
  objectiveNumber: number
  primaryOrSecondary: string
}

function PlayerObjective({ ...props }: PlayerObjectiveProps) {
  const [dialog, setDialog] = useState(false)

  const updateScore = (score: number | null, round: number) => {
    if (score !== null && isNaN(score)) score = null

    if (isNumber(score) && score > 15) {
      score = 15
    }

    props.updatePlayerObjective(
      props.teamNumber,
      props.playerNumber,
      props.objectiveNumber,
      getObjective().type,
      getObjective().category,
      getObjective().id,
      props.primaryOrSecondary,
      getObjective().scores.map((currentScore: any, currentRound: any) => {
        if (currentRound !== round) return currentScore
        return score
      }),
      true
    )
  }

  const getPlayer = (): Player => {
    return props.currentGame.teams[props.teamNumber].players[props.playerNumber]
  }

  const getObjective = (): PlayerObjectiveType => {
    return getPlayer()[
      props.primaryOrSecondary === 'primary'
        ? 'primaryObjectives'
        : 'secondaryObjectives'
    ][props.objectiveNumber]
  }

  const objectiveDescription = intl.get(
    `objective.description.${getObjective().id}`
  )
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
              <Title>
                {intl
                  .get(`objective.${getObjective().id}`)
                  .d(humanizeString(getObjective().id))}
              </Title>
              <Text>{objectiveDescription}</Text>
            </ScrollView>
          </Dialog.ScrollArea>
          <Dialog.Actions>
            <Button onPress={() => setDialog(false)}>
              {intl.get('display.close').d('Close')}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <View
        style={{
          marginBottom: 10,
          marginTop: objectiveDescription ? 0 : 10,
          width: '100%',
        }}
      >
        <View style={[styles.flexView]}>
          <Text
            onPress={() => {
              if (objectiveDescription) setDialog(true)
            }}
          >
            {intl
              .get(`objective.${getObjective().id}`)
              .d(humanizeString(getObjective().id))}{' '}
            (
            {intl
              .get(`objective.${props.primaryOrSecondary}`)
              .d(humanizeString(props.primaryOrSecondary))}
            )
          </Text>
          {objectiveDescription ? (
            <IconButton
              style={{ margin: 0 }}
              size={20}
              icon="help-circle"
              onPress={() => {
                if (objectiveDescription) setDialog(true)
              }}
            />
          ) : null}
          <Text style={{ marginLeft: 'auto' }}>
            {getObjective().scores.reduce(
              (a: number, b: number) =>
                Math.min(
                  a + b,
                  props.primaryOrSecondary === 'primary' ? 45 : 15
                ),
              0
            )}{' '}
            pts
          </Text>
        </View>
        <View style={[styles.flexView]}>
          {getObjective().scores.map((score: number, round: number) => (
            <TextInput
              style={{ width: 48, marginLeft: 10 }}
              key={`round-${round}`}
              value={Number.isInteger(score) ? score.toString() : ''}
              onChangeText={(text) => updateScore(parseInt(text), round)}
              mode="outlined"
              label={`T${round + 1}`}
              dense={true}
            />
          ))}
        </View>
      </View>
    </View>
  )
}

const mapStateToProps = (state: any) => ({
  currentGame: state.currentGame,
  configuration: state.configuration,
})

const mapDispatchToProps = (dispatch: Function) => ({
  updatePlayerObjective: (...args: any) =>
    dispatch(updatePlayerObjective(...args)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PlayerObjective)
