import React, { useEffect } from 'react'
import { View, ScrollView, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import {
  addTeam,
  removeTeam,
  addPlayer,
  updatePlayer,
  updateCurrentGame,
  addGame,
  updateGame,
  resetCurrentGame,
  removeGame,
} from './store/actions'
import { Button, Title, IconButton, Divider } from 'react-native-paper'
import { Game, Team, Player, EditGameRouteProp } from './types'

import ScenarioSelector from './components/ScenarioSelector'
import PlayerArmySelector from './components/PlayerArmySelector'
import ObjectiveSelector from './components/ObjectiveSelector'
import { NavigationContainerRef } from '@react-navigation/native'
import styles from './styles'
import uuid from 'react-native-uuid'

import { useHeaderHeight } from '@react-navigation/stack'
import LocaleSelector from './components/LocaleSelector'

interface EditGameProps {
  addPlayer: Function
  removeTeam: Function
  updateGame: Function
  removeGame: Function
  addTeam: Function
  updateCurrentGame: Function
  resetCurrentGame: Function
  addGame: Function
  currentGame: Game
  updatePlayer: Function
  navigation: NavigationContainerRef
  route: EditGameRouteProp
}

function EditGame({ navigation, route, ...props }: EditGameProps) {
  useEffect(() => {
    if (route.params && route.params.game) {
      props.updateCurrentGame(route.params.game)
    } else {
      props.resetCurrentGame()
    }
  }, [])

  navigation.setOptions({
    // eslint-disable-next-line react/display-name
    headerRight: () => <LocaleSelector />,
  })

  const countPlayers = () => {
    return props.currentGame.teams.reduce(
      (countPlayers: number, team: Team) => {
        return team.players.length + countPlayers
      },
      0
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

  const removeGame = () => {
    props.removeGame({ ...props.currentGame })
    props.resetCurrentGame()
    navigation.navigate('Homepage')
  }

  let currentPlayerNumber = 0

  return (
    <ScrollView
      style={{
        height: Dimensions.get('window').height - useHeaderHeight(),
      }}
      contentContainerStyle={styles.body}
    >
      <View style={styles.container}>
        <ScenarioSelector />

        {props.currentGame.teams.map((team: Team, teamNumber: number) => {
          return (
            <View key={'team' + teamNumber} style={styles.team}>
              {countPlayers() > 2 ? (
                <View>
                  <Divider style={styles.divider} />
                  <View style={styles.flexView}>
                    <Title>Team {teamNumber + 1}</Title>
                    {props.currentGame.teams.length > 2 ? (
                      <IconButton
                        key={'teamDeleteIcon' + teamNumber}
                        icon="delete-forever"
                        onPress={() => props.removeTeam(teamNumber)}
                        color="red"
                      />
                    ) : null}
                  </View>
                </View>
              ) : null}

              {team.players.map((player: Player, playerNumber: number) => {
                currentPlayerNumber++
                return (
                  <View key={'player' + teamNumber + '-' + playerNumber}>
                    <Divider style={styles.divider} />

                    <PlayerArmySelector
                      key={'player-army-' + teamNumber + '-' + playerNumber}
                      teamNumber={teamNumber}
                      playerNumber={playerNumber}
                      currentPlayerNumber={currentPlayerNumber}
                    />

                    <ObjectiveSelector
                      key={
                        'objective-' + teamNumber + '-' + playerNumber + '-1'
                      }
                      teamNumber={teamNumber}
                      playerNumber={playerNumber}
                      objectiveNumber={0}
                    />

                    <ObjectiveSelector
                      key={
                        'objective-' + teamNumber + '-' + playerNumber + '-2'
                      }
                      teamNumber={teamNumber}
                      playerNumber={playerNumber}
                      objectiveNumber={1}
                    />

                    <ObjectiveSelector
                      key={
                        'objective-' + teamNumber + '-' + playerNumber + '-3'
                      }
                      teamNumber={teamNumber}
                      playerNumber={playerNumber}
                      objectiveNumber={2}
                    />

                    <Button
                      key={'playerAddIcon' + teamNumber}
                      mode="outlined"
                      icon="plus"
                      onPress={() => props.addPlayer(teamNumber)}
                      color="green"
                    >
                      Ajouter un joueur
                    </Button>
                  </View>
                )
              })}
            </View>
          )
        })}

        <Divider style={styles.divider} />

        <Button
          mode="outlined"
          icon="plus"
          onPress={() => props.addTeam()}
          color="green"
        >
          Ajouter une équipe
        </Button>

        <Divider style={styles.divider} />

        <View style={styles.flexView}>
          {props.currentGame.id ? (
            <Button
              icon="delete"
              color="red"
              onPress={removeGame}
              mode="outlined"
            >
              Delete
            </Button>
          ) : null}

          <Button
            icon="content-save-outline"
            onPress={saveGame}
            mode="outlined"
          >
            Save
          </Button>
        </View>
      </View>
    </ScrollView>
  )
}

const mapStateToProps = (state: any) => ({
  currentGame: state.currentGame,
})

const mapDispatchToProps = (dispatch: Function) => ({
  removeGame: (game: Game) => dispatch(removeGame(game)),
  addGame: (game: Game) => dispatch(addGame(game)),
  resetCurrentGame: () => dispatch(resetCurrentGame()),
  updateCurrentGame: (data: any, callUpdateGame: Boolean) =>
    dispatch(updateCurrentGame(data, callUpdateGame)),
  updateGame: (data: any) => dispatch(updateGame(data)),
  addTeam: () => dispatch(addTeam()),
  removeTeam: (teamNumber: number) => dispatch(removeTeam(teamNumber)),
  addPlayer: (teamNumber: number) => dispatch(addPlayer(teamNumber)),
  updatePlayer: (teamNumber: number, playerNumber: number, playerData: any) =>
    dispatch(updatePlayer(teamNumber, playerNumber, playerData)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EditGame)
