import React from 'react'
import { View, ScrollView } from 'react-native'
import armies from '../data/armies.json'
import { connect } from 'react-redux'
import { updatePlayer, removePlayer } from '../store/actions'
import {
  Button,
  Portal,
  Dialog,
  RadioButton,
  IconButton,
  DefaultTheme,
  Title,
} from 'react-native-paper'
import { Game, Army, Faction } from '../Types'
import styles, { theme } from '../styles'
import intl from 'react-intl-universal'
import humanizeString from 'humanize-string'

interface PlayerArmySelectorProps {
  updatePlayer: Function
  removePlayer: Function
  currentGame: Game
  teamNumber: number
  playerNumber: number
  currentPlayerNumber: number
}

interface PlayerArmySelectorStates {
  dialog: boolean
}

class PlayerArmySelector extends React.Component<
  PlayerArmySelectorProps,
  PlayerArmySelectorStates
> {
  constructor(props: any) {
    super(props)

    this.state = {
      dialog: false,
    }
  }

  render() {
    const hideDialog = () => this.setState({ dialog: false })
    const showDialog = () => this.setState({ dialog: true })

    const player = this.props.currentGame.teams[this.props.teamNumber].players[
      this.props.playerNumber
    ]
    return (
      <View style={{ marginBottom: 10, width: '100%' }}>
        <Portal>
          <Dialog
            visible={this.state.dialog}
            onDismiss={hideDialog}
            style={styles.dialog}
          >
            <Dialog.ScrollArea>
              <ScrollView
                contentContainerStyle={{
                  paddingVertical: 20,
                }}
              >
                <RadioButton.Group value={player.army ? player.army : ''}>
                  {armies.map((faction: Faction) => {
                    return (
                      <View key={`faction-${faction.id}`}>
                        <Title>{humanizeString(faction.id)}</Title>
                        {faction.armies.map((army: Army) => {
                          return (
                            <RadioButton.Item
                              onPress={() => {
                                console.log(faction)

                                this.props.updatePlayer(
                                  this.props.teamNumber,
                                  this.props.playerNumber,
                                  {
                                    faction: faction.id,
                                    army: army.id,
                                  }
                                )
                                hideDialog()
                              }}
                              label={intl
                                .get(`army.${army.id}`)
                                .d(humanizeString(army.id))}
                              value={army.id}
                              key={army.id}
                            />
                          )
                        })}
                      </View>
                    )
                  })}
                </RadioButton.Group>
              </ScrollView>
            </Dialog.ScrollArea>
            <Dialog.Actions>
              <Button onPress={hideDialog}>
                {intl.get('display.close').d('Close')}
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <View style={styles.flexView}>
          <Button
            compact={true}
            mode="contained"
            onPress={() => showDialog()}
            contentStyle={{
              alignSelf: 'flex-start',
            }}
            style={{
              flex: 1,
              backgroundColor: player.army ? theme.colors.primary : 'red',
            }}
          >
            {intl
              .get('game.player-number-x', {
                playerNumber: this.props.currentPlayerNumber,
              })
              .d(`Player ${this.props.currentPlayerNumber}`) + ' : '}
            {player.army
              ? intl.get(`army.${player.army}`).d(humanizeString(player.army))
              : intl.get('game.select-army').d('Select an army')}
          </Button>
          {this.props.currentGame.teams[this.props.teamNumber].players.length >
          1 ? (
            <IconButton
              icon="delete-forever"
              onPress={() =>
                this.props.removePlayer(
                  this.props.teamNumber,
                  this.props.playerNumber
                )
              }
              color="red"
            />
          ) : null}
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state: any) => ({
  currentGame: state.currentGame,
})

const mapDispatchToProps = (dispatch: Function) => ({
  updatePlayer: (teamNumber: number, playerNumber: number, playerData: any) =>
    dispatch(updatePlayer(teamNumber, playerNumber, playerData)),
  removePlayer: (teamNumber: number, playerNumber: number) =>
    dispatch(removePlayer(teamNumber, playerNumber)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PlayerArmySelector)
