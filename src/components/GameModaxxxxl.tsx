import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import {
  updateGame,
  addTeam,
  removeTeam,
  addPlayer,
  updatePlayer,
} from '../store/actions'
import { Button, IconButton, Title } from 'react-native-paper'
import { Game, Team, Player } from '../Types'
import ObjectiveSelector from './ObjectiveSelector'
import PlayerArmySelector from './PlayerArmySelector'
import ScenarioSelector from './ScenarioSelector'

interface GameModalProps {
  addPlayer: Function
  removeTeam: Function
  addTeam: Function
  updateGame: Function
  currentGame: Game
  updatePlayer: Function
}

class GameModal extends React.Component<GameModalProps> {
  constructor(props: any) {
    super(props)

    this.state = {
      scenarioDialog: false,
    }
  }

  countPlayers() {
    return this.props.currentGame.teams.reduce(
      (countPlayers: number, team: Team) => {
        return team.players.length + countPlayers
      },
      0
    )
  }

  render() {
    let currentPlayerNumber = 0
    return (
      <View style={styles.container}>
        <ScenarioSelector />

        {this.props.currentGame.teams.map((team: Team, teamNumber: number) => {
          return (
            <View key={'team' + teamNumber} style={styles.team}>
              <View style={styles.flexView}>
                {this.countPlayers() > 2
                  ? [
                      <Title key={'teamNumber' + teamNumber}>
                        Team {teamNumber + 1}
                      </Title>,
                      this.props.currentGame.teams.length > 2 ? (
                        <IconButton
                          key={'teamDeleteIcon' + teamNumber}
                          icon="delete-forever"
                          onPress={() => this.props.removeTeam(teamNumber)}
                          color="red"
                        />
                      ) : null,
                    ]
                  : null}
              </View>

              {team.players.map((player: Player, playerNumber: number) => {
                currentPlayerNumber++
                return (
                  <View
                    key={'player' + teamNumber + '-' + playerNumber}
                    style={styles.player}
                  >
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
                      style={{
                        marginTop: 10,
                        alignSelf: 'flex-end',
                      }}
                      onPress={() => this.props.addPlayer(teamNumber)}
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
        <Button
          mode="contained"
          icon="plus"
          onPress={() => this.props.addTeam()}
          color="green"
        >
          Ajouter une équipe
        </Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  team: {
    borderTopColor: '#555',
    borderTopWidth: 3,
    marginBottom: 10,
    paddingTop: 10,
    width: '100%',
  },
  player: {
    marginBottom: 10,
  },
  container: {
    width: '90%',
    margin: 'auto',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
  },
})

const mapStateToProps = (state: any) => ({
  currentGame: state.currentGame,
})

const mapDispatchToProps = (dispatch: Function) => ({
  updateGame: (data: any) => dispatch(updateGame(data)),
  addTeam: () => dispatch(addTeam()),
  removeTeam: (teamNumber: number) => dispatch(removeTeam(teamNumber)),
  addPlayer: (teamNumber: number) => dispatch(addPlayer(teamNumber)),
  updatePlayer: (teamNumber: number, playerNumber: number, playerData: any) =>
    dispatch(updatePlayer(teamNumber, playerNumber, playerData)),
})

export default connect(mapStateToProps, mapDispatchToProps)(GameModal)
