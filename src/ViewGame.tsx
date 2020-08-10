import React, { useEffect } from 'react'
import { View, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { updatePlayer, updateGame, updateCurrentGame } from './store/actions'
import { Button, Title, IconButton, Divider } from 'react-native-paper'
import {
  Game,
  Team,
  Player,
  ViewGameRouteProp,
  PlayerObjective as PlayerObjectiveType,
} from './types'

import ScenarioSelector from './components/ScenarioSelector'
import PlayerArmySelector from './components/PlayerArmySelector'
import ObjectiveSelector from './components/ObjectiveSelector'
import { NavigationContainerRef } from '@react-navigation/native'
import { v4 as uuidv4 } from 'uuid'
import styles from './styles'
import { ScrollView } from 'react-native-gesture-handler'
import { useHeaderHeight } from '@react-navigation/stack'
import PlayerObjective from './components/PlayerObjective'

interface ViewGameProps {
  updateGame: Function
  updateCurrentGame: Function
  currentGame: Game
  updatePlayer: Function
  navigation: NavigationContainerRef
  route: ViewGameRouteProp
}

function ViewGame({ navigation, route, ...props }: ViewGameProps) {
  useEffect(() => {
    props.updateCurrentGame(route.params.game)
  }, [])

  const countPlayers = () => {
    return props.currentGame.teams.reduce(
      (countPlayers: number, team: Team) => {
        return team.players.length + countPlayers
      },
      0
    )
  }

  const totalPlayerScore = (player: Player) => {
    return (
      player.primaryObjectives.reduce(
        (reduced: number, objective: PlayerObjectiveType) => {
          return (
            reduced +
            objective.scores.reduce((reduced2: number, score: number) => {
              return reduced2 + score
            }, 0)
          )
        },
        0
      ) +
      player.secondaryObjectives.reduce(
        (reduced: number, objective: PlayerObjectiveType) => {
          return (
            reduced +
            objective.scores.reduce((reduced2: number, score: number) => {
              return reduced2 + score
            }, 0)
          )
        },
        0
      )
    )
  }

  const totalTeamScore = (team: Team) => {
    return team.players.reduce((reduced: number, player: Player) => {
      return reduced + totalPlayerScore(player)
    }, 0)
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
        {props.currentGame.teams.map((team: Team, teamNumber: number) => {
          return (
            <View key={'team' + teamNumber} style={styles.team}>
              {teamNumber !== 0 ? <Divider style={styles.divider} /> : null}

              <View style={styles.flexView}>
                {countPlayers() > 2 ? (
                  <View style={styles.flexView}>
                    <Title key={'teamNumber' + teamNumber}>
                      Team {teamNumber + 1}
                    </Title>
                    <Title style={styles.bold}>{totalTeamScore(team)}</Title>
                  </View>
                ) : null}
              </View>

              {team.players.map((player: Player, playerNumber: number) => {
                currentPlayerNumber++
                return (
                  <View key={'player' + teamNumber + '-' + playerNumber}>
                    <View style={styles.flexView}>
                      <Title>{player.army}</Title>
                      <Title>{totalPlayerScore(player)}</Title>
                    </View>
                    {player.secondaryObjectives.map(
                      (
                        objective: PlayerObjectiveType,
                        objectiveNumber: number
                      ) =>
                        objective.id ? (
                          <PlayerObjective
                            key={`player-objective-${teamNumber}-${playerNumber}-secondary-${objectiveNumber}`}
                            teamNumber={teamNumber}
                            playerNumber={playerNumber}
                            objectiveNumber={objectiveNumber}
                            primaryOrSecondary="secondary"
                          />
                        ) : null
                    )}
                  </View>
                )
              })}
            </View>
          )
        })}
      </View>
    </ScrollView>
  )
}

const mapStateToProps = (state: any) => ({
  currentGame: state.currentGame,
})

const mapDispatchToProps = (dispatch: Function) => ({
  updateGame: (data: any) => dispatch(updateGame(data)),
  updatePlayer: (
    teamNumber: number,
    playerNumber: number,
    playerData: any,
    callUpdateGame: Boolean
  ) =>
    dispatch(
      updatePlayer(teamNumber, playerNumber, playerData, callUpdateGame)
    ),
  updateCurrentGame: (data: any, callUpdateGame: Boolean) =>
    dispatch(updateCurrentGame(data, callUpdateGame)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ViewGame)
