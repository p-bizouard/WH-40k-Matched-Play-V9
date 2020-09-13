import React, { useState } from 'react'
import { View, ScrollView } from 'react-native'

import { connect } from 'react-redux'
import { updatePlayer } from '../store/actions'
import {
  Text,
  TextInput,
  Portal,
  Dialog,
  Button,
  Title,
  IconButton,
} from 'react-native-paper'
import {
  Game,
  Player,
  PlayerCommandPoints as PlayerCommandPointsType,
} from '../Types'
import styles from '../styles'
import { isNumber } from 'lodash'
import humanizeString from 'humanize-string'
import intl from 'react-intl-universal'

interface PlayerCommandPointsProps {
  updatePlayer: typeof updatePlayer
  currentGame: Game
  teamNumber: number
  playerNumber: number
}

function PlayerCommandPoints({ ...props }: PlayerCommandPointsProps) {
  const updateCp = (cp: number | null, round: number) => {
    if (cp !== null && isNaN(cp)) cp = null

    if (isNumber(cp) && cp < 0) {
      cp = 0
    }

    props.updatePlayer(
      props.teamNumber,
      props.playerNumber,
      {
        commandPoints: getPlayer().commandPoints.map(
          (currentCp: any, currentRound: any) => {
            if (currentRound !== round) return currentCp
            return cp
          }
        ),
      },
      true
    )
  }

  const getPlayer = (): Player => {
    return props.currentGame.teams[props.teamNumber].players[props.playerNumber]
  }

  if (getPlayer().commandPoints === undefined) {
    getPlayer().commandPoints = [null, null, null, null, null]
  }

  return (
    <View
      style={{
        marginBottom: 10,
        marginTop: 10,
        width: '100%',
      }}
    >
      <View style={[styles.flexView]}>
        <Text>{intl.get(`game.command-points`).d('Command points')} :</Text>
        <Text style={{ marginLeft: 'auto' }}>
          {getPlayer().commandPoints.reduce(
            (a: number, b: number) => (b > 0 ? b : a),
            0
          )}{' '}
          CP
        </Text>
      </View>
      <View style={[styles.flexView]}>
        {getPlayer().commandPoints.map((cp: number, round: number) => (
          <TextInput
            style={{ width: 48, marginLeft: 10 }}
            key={`round-${round}`}
            value={Number.isInteger(cp) ? cp.toString() : ''}
            onChangeText={(text) => updateCp(parseInt(text), round)}
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
  configuration: state.configuration,
})

const mapDispatchToProps = (dispatch: Function) => ({
  updatePlayer: (...args: any) => dispatch(updatePlayer(...args)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PlayerCommandPoints)
