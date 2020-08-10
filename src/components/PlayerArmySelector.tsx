import React from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'
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
} from 'react-native-paper'
import { Game, Army } from '../Types'

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
            style={{
              maxWidth: 600,
              alignSelf: 'center',
              maxHeight: '95%',
            }}
          >
            <Dialog.ScrollArea>
              <ScrollView
                contentContainerStyle={{
                  paddingVertical: 20,
                }}
              >
                <RadioButton.Group
                  onValueChange={(itemValue) => {
                    this.props.updatePlayer(
                      this.props.teamNumber,
                      this.props.playerNumber,
                      {
                        army: itemValue,
                      }
                    )
                    hideDialog()
                  }}
                  value={player.army ? player.army : ''}
                >
                  {armies.map((army: Army) => {
                    return (
                      <RadioButton.Item
                        label={army.id}
                        value={army.id}
                        key={army.id}
                      />
                    )
                  })}
                </RadioButton.Group>
              </ScrollView>
            </Dialog.ScrollArea>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Close</Button>
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
              backgroundColor: player.army
                ? DefaultTheme.colors.primary
                : 'red',
            }}
          >
            {player.army
              ? `Player ${this.props.currentPlayerNumber} : ${player.army}`
              : `Player ${this.props.currentPlayerNumber} : select an army`}
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

const styles = StyleSheet.create({
  flexView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})

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
