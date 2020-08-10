import React from 'react'
import { View } from 'react-native'

import { connect } from 'react-redux'
import { updatePlayerObjective } from '../store/actions'
import { Text, TextInput } from 'react-native-paper'
import { Game, Player, PlayerObjective as PlayerObjectiveType } from '../Types'
import styles from '../styles'

interface PlayerObjectiveProps {
  updatePlayerObjective: typeof updatePlayerObjective
  currentGame: Game
  teamNumber: number
  playerNumber: number
  objectiveNumber: number
  primaryOrSecondary: string
}

function PlayerObjective({ ...props }: PlayerObjectiveProps) {
  const updateScore = (score: number | null, round: number) => {
    if (score !== null && isNaN(score)) score = null

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
    <View style={{ marginTop: 10, marginBottom: 10, width: '100%' }}>
      <View style={[styles.flexView, styles.mb10]}>
        <Text style={{ marginRight: 'auto' }}>{getObjective().id}</Text>
        <Text>
          {getObjective().scores.reduce((a: number, b: number) => a + b, 0)}
        </Text>
      </View>
      <View style={[styles.flexView, styles.mb10]}>
        {getObjective().scores.map((score: number, round: number) => (
          <TextInput
            style={{ width: 60, marginLeft: 10 }}
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
