import React from 'react'
import { View, ScrollView } from 'react-native'
import scenarios from '../data/scenarios.json'
import { connect } from 'react-redux'
import { updateCurrentGame } from '../store/actions'
import { Button, Portal, Dialog, RadioButton } from 'react-native-paper'
import { Game } from '../Types'

interface ScenarioSelectorProps {
  currentGame: Game
  updateCurrentGame: Function
}

interface ScenarioSelectorStates {
  dialog: boolean
}

class ScenarioSelector extends React.Component<
  ScenarioSelectorProps,
  ScenarioSelectorStates
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

    return (
      <View>
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
                    this.props.updateCurrentGame({
                      scenario: itemValue,
                    })
                    hideDialog()
                  }}
                  value={this.props.currentGame.scenario}
                >
                  {scenarios.map((scenario) => {
                    return (
                      <RadioButton.Item
                        label={scenario.id}
                        value={scenario.id}
                        key={scenario.id}
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
        <Button
          mode="outlined"
          onPress={() => showDialog()}
          style={{
            marginBottom: 10,
            borderColor: this.props.currentGame.scenario
              ? 'transparent'
              : 'red',
          }}
        >
          {this.props.currentGame.scenario
            ? this.props.currentGame.scenario
            : 'Click to set scenario'}
        </Button>
      </View>
    )
  }
}

const mapStateToProps = (state: any) => ({
  currentGame: state.currentGame,
})

const mapDispatchToProps = (dispatch: Function) => ({
  updateCurrentGame: (data: any) => dispatch(updateCurrentGame(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ScenarioSelector)
