import React from 'react'

import { connect } from 'react-redux'
import { Button } from 'react-native-paper'
import { Game } from '../types'
import uuid from 'react-native-uuid'
import { updateCurrentGame, addGame } from '../store/actions'
import { NavigationProp } from '@react-navigation/native'

interface SaveCurrentGameButtonProps {
  updateCurrentGame: typeof updateCurrentGame
  addGame: typeof addGame
  currentGame: Game
  navigation: NavigationProp
}

function SaveCurrentGameButton({
  navigation,
  ...props
}: SaveCurrentGameButtonProps) {
  const isValid = () => {
    return (
      props.currentGame.format &&
      props.currentGame.mission &&
      !props.currentGame.teams.reduce((teamCounter, team) => {
        return team.players.reduce((playerCounter, player) => {
          return playerCounter + (player.army ? 0 : 1)
        }, teamCounter)
      }, 0)
    )
  }

  const saveGame = () => {
    if (props.currentGame.id) {
      navigation.navigate('Homepage')
      props.updateCurrentGame({ ...props.currentGame }, true)
    } else {
      navigation.navigate('Homepage')
      const id = uuid.v4()
      props.updateCurrentGame({ ...props.currentGame, id })
      props.addGame({ ...props.currentGame, id })
    }
  }

  if (isValid())
    return (
      <Button icon="content-save-outline" onPress={saveGame} mode="contained">
        Save
      </Button>
    )
  else return null
}

const mapStateToProps = (state: any) => ({
  currentGame: state.currentGame,
})

const mapDispatchToProps = (dispatch: Function) => ({
  updateCurrentGame: (data: any, callUpdateGame: Boolean = false) =>
    dispatch(updateCurrentGame(data, callUpdateGame)),
  addGame: (game: Game) => dispatch(addGame(game)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SaveCurrentGameButton)
