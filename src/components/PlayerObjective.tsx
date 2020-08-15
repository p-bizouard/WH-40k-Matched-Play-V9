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
      getObjective().id,
      props.primaryOrSecondary,
      getObjective().scores.map(
        (currentScore: number | null, currentRound: any) => {
          if (currentRound !== round) return currentScore
          return score
        }
      ),
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
                {getObjective().id} ({props.primaryOrSecondary})
              </Title>
              <Text>fsdf</Text>
            </ScrollView>
          </Dialog.ScrollArea>
          <Dialog.Actions>
            <Button onPress={() => setDialog(false)}>Close</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <View style={{ marginTop: 10, marginBottom: 10, width: '100%' }}>
        <View style={[styles.flexView, styles.mb10]}>
          <Text onPress={() => setDialog(true)}>
            {getObjective().id} ({props.primaryOrSecondary})
          </Text>
          <IconButton icon="help-circle" onPress={() => setDialog(true)} />
          <Text style={{ marginLeft: 'auto' }}>
            {getObjective().scores.reduce((a: number, b: number) => a + b, 0)}
          </Text>
        </View>
        <View style={[styles.flexView, styles.mb10]}>
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
})

const mapDispatchToProps = (dispatch: Function) => ({
  updatePlayerObjective: (...args: any) =>
    dispatch(updatePlayerObjective(...args)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PlayerObjective)
