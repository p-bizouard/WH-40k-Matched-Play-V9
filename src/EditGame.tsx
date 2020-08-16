import React from 'react'
import { View, ScrollView, Dimensions } from 'react-native'
import {
  addTeam,
  removeTeam,
  addPlayer,
  updateCurrentGame,
  addGame,
  resetCurrentGame,
  removeGame,
} from './store/actions/index'
import { Button, Title, IconButton, Divider } from 'react-native-paper'
import {
  Game,
  Team,
  Player,
  EditGameRouteProp,
  EditGameScreenNavigationProp,
} from './types'

import MissionSelector from './components/MissionSelector'
import PlayerArmySelector from './components/PlayerArmySelector'
import ObjectiveSelector from './components/ObjectiveSelector'
import styles, { theme } from './styles'

import { useHeaderHeight } from '@react-navigation/stack'
import SaveCurrentGameButton from './components/SaveCurrentGameButton'
import intl from 'react-intl-universal'
import { connect } from 'react-redux'

interface EditGameProps {
  addPlayer: typeof addPlayer
  removeTeam: typeof removeTeam
  removeGame: typeof removeGame
  addTeam: typeof addTeam
  updateCurrentGame: typeof updateCurrentGame
  resetCurrentGame: typeof resetCurrentGame
  addGame: typeof addGame
  currentGame: Game
  navigation: EditGameScreenNavigationProp
  route: EditGameRouteProp
}

function EditGame({ navigation, route, ...props }: EditGameProps) {
  const [initialized, setInitialized] = React.useState(false)

  React.useLayoutEffect(() => {
    if (route.params && route.params.game) {
      props.updateCurrentGame(route.params.game)
    } else {
      props.resetCurrentGame()
    }
    setHeader()
    setInitialized(true)
  }, [])

  React.useEffect(() => {
    setHeader()
  })

  const setHeader = () => {
    navigation.setOptions({
      title:
        route.params && route.params.game
          ? intl.get('display.edit-game').d(`Edit game`)
          : intl.get('display.add-game').d(`Add game`),
      // eslint-disable-next-line react/display-name
      headerRight: () => (
        <SaveCurrentGameButton navigation={navigation} icon={true} />
      ),
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
      {initialized ? (
        <View style={styles.container}>
          <MissionSelector />

          {props.currentGame.teams.map((team: Team, teamNumber: number) => {
            return (
              <View key={'team' + teamNumber} style={styles.team}>
                {countPlayers() > 2 ? (
                  <View>
                    <Divider style={styles.divider} />
                    <View style={styles.flexView}>
                      <Title>
                        {intl
                          .get('game.team-number-x', {
                            teamNumber: teamNumber + 1,
                          })
                          .d(`Team ${teamNumber + 1}`)}
                      </Title>
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
                        mode="contained"
                        icon="plus"
                        onPress={() => props.addPlayer(teamNumber)}
                        color={theme.colors.add}
                      >
                        {intl.get('game.add-player').d(`Add a player`)}
                      </Button>
                    </View>
                  )
                })}
              </View>
            )
          })}

          <Divider style={styles.divider} />

          <Button
            mode="contained"
            icon="plus"
            onPress={() => props.addTeam()}
            color={theme.colors.add}
          >
            {intl.get('game.add-team').d(`Add a team`)}
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
                {intl.get('game.delete').d(`Delete`)}
              </Button>
            ) : null}

            <SaveCurrentGameButton navigation={navigation} />
          </View>
        </View>
      ) : (
        <View></View>
      )}
    </ScrollView>
  )
}

const mapStateToProps = (state: any) => ({
  currentGame: state.currentGame,
})

const mapDispatchToProps = (dispatch: Function) => ({
  removeGame: (game: Game) => dispatch(removeGame(game)),
  resetCurrentGame: () => dispatch(resetCurrentGame()),
  updateCurrentGame: (data: any, callUpdateGame: Boolean = false) =>
    dispatch(updateCurrentGame(data, callUpdateGame)),
  addTeam: () => dispatch(addTeam()),
  removeTeam: (teamNumber: number) => dispatch(removeTeam(teamNumber)),
  addPlayer: (teamNumber: number) => dispatch(addPlayer(teamNumber)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EditGame)
