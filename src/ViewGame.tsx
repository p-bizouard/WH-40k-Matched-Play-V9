import React from 'react'
import { View, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { updatePlayer, updateGame, updateCurrentGame } from './store/actions'
import { Title, Divider } from 'react-native-paper'
import {
  Game,
  Team,
  Player,
  ViewGameRouteProp,
  PlayerObjective as PlayerObjectiveType,
  ViewGameScreenNavigationProp,
} from './Types'

import styles from './styles'
import { ScrollView } from 'react-native-gesture-handler'
import { useHeaderHeight } from '@react-navigation/stack'
import PlayerObjective from './components/PlayerObjective'
import intl from 'react-intl-universal'
import humanizeString from 'humanize-string'
import LocaleSelector from './components/LocaleSelector'
import PlayerCommandPoints from './components/PlayerCommandPoints'
import MenuDrawerButton from './components/MenuDrawerButton'

interface ViewGameProps {
  updateGame: Function
  updateCurrentGame: Function
  currentGame: Game
  updatePlayer: Function
  navigation: ViewGameScreenNavigationProp
  route: ViewGameRouteProp
  configuration: {
    locale: String
  }
  openDrawer: Function
}

function ViewGame({ navigation, route, ...props }: ViewGameProps) {
  const [initialized, setInitialized] = React.useState(false)

  React.useLayoutEffect(() => {
    props.updateCurrentGame(route.params.game)
    setHeader()
    setInitialized(true)
  }, [])

  React.useEffect(() => {
    setHeader()
  })

  const setHeader = () => {
    navigation.setOptions({
      title: intl.get('display.view-game').d(`View game`),
      // eslint-disable-next-line react/display-name
      headerRight: () => <LocaleSelector />,
      // eslint-disable-next-line react/display-name
      headerLeft: () => <MenuDrawerButton openDrawer={props.openDrawer} />,
    })
  }

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
              return Math.min(reduced2 + score, 45)
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
              return Math.min(reduced2 + score, 15)
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

  return (
    <ScrollView
      style={{
        height: Dimensions.get('window').height - useHeaderHeight(),
      }}
      contentContainerStyle={styles.body}
    >
      {initialized ? (
        <View style={styles.container}>
          <Title style={styles.alignRight}>
            {intl
              .get(`mission.${props.currentGame.type}`)
              .d(humanizeString(props.currentGame.type))}
          </Title>
          <Title style={styles.alignRight}>
            {intl
              .get(`mission.${props.currentGame.format}`)
              .d(humanizeString(props.currentGame.format))}
          </Title>
          <Title style={styles.alignRight}>
            {intl
              .get(`mission.${props.currentGame.mission}`)
              .d(humanizeString(props.currentGame.mission))}
          </Title>
          {props.currentGame.teams.map((team: Team, teamNumber: number) => {
            return (
              <View key={'team' + teamNumber} style={styles.team}>
                {teamNumber !== 0 ? <Divider style={styles.divider} /> : null}

                <View style={styles.flexView}>
                  {countPlayers() > 2 ? (
                    <View style={styles.flexView}>
                      <Title key={'teamNumber' + teamNumber}>
                        {intl
                          .get('game.team-number-x', {
                            teamNumber: teamNumber + 1,
                          })
                          .d(`Team ${teamNumber + 1}`)}
                      </Title>
                      <Title style={styles.bold}>
                        {totalTeamScore(team)} pts
                      </Title>
                    </View>
                  ) : null}
                </View>

                {team.players.map((player: Player, playerNumber: number) => {
                  return (
                    <View key={'player' + teamNumber + '-' + playerNumber}>
                      <View style={styles.flexView}>
                        <Title style={styles.bold}>
                          {intl
                            .get(`army.${player.army}`)
                            .d(humanizeString(player.army))}
                        </Title>
                        <Title>{totalPlayerScore(player)} pts</Title>
                      </View>
                      <PlayerCommandPoints
                        key={`player-command-points-${teamNumber}-${playerNumber}`}
                        teamNumber={teamNumber}
                        playerNumber={playerNumber}
                      />
                      {player.primaryObjectives.map(
                        (
                          objective: PlayerObjectiveType,
                          objectiveNumber: number
                        ) =>
                          objective.id ? (
                            <PlayerObjective
                              key={`player-objective-${teamNumber}-${playerNumber}-primary-${objectiveNumber}`}
                              teamNumber={teamNumber}
                              playerNumber={playerNumber}
                              objectiveNumber={objectiveNumber}
                              primaryOrSecondary="primary"
                            />
                          ) : null
                      )}
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
      ) : (
        <View></View>
      )}
    </ScrollView>
  )
}

const mapStateToProps = (state: any) => ({
  currentGame: state.currentGame,
  configuration: state.configuration,
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
