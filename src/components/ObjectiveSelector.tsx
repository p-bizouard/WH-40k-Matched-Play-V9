import React from 'react'
import { View, ScrollView } from 'react-native'
import objectives from '../data/objectives.json'
import scenarios from '../data/scenarios.json'

import { connect } from 'react-redux'
import { updatePlayerObjective } from '../store/actions'
import {
  Button,
  Portal,
  Dialog,
  RadioButton,
  Text,
  Title,
  TouchableRipple,
  Divider,
} from 'react-native-paper'
import { Game, ObjectiveCategory, Scenario, Objective } from '../Types'
import styles from '../styles'

interface ObjectiveSelectorProps {
  updatePlayerObjective: Function
  currentGame: Game
  teamNumber: number
  playerNumber: number
  objectiveNumber: number
}

interface ObjectiveSelectorStates {
  dialog: boolean
}

class ObjectiveSelector extends React.Component<
  ObjectiveSelectorProps,
  ObjectiveSelectorStates
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

    const updateObjective = (id: string) => {
      this.props.updatePlayerObjective(
        this.props.teamNumber,
        this.props.playerNumber,
        this.props.objectiveNumber,
        id,
        'secondary'
      )
      hideDialog()
    }

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
                    updateObjective(itemValue)
                  }}
                  value={
                    player.secondaryObjectives[this.props.objectiveNumber].id
                  }
                >
                  <Title>Mission secondary</Title>
                  {this.props.currentGame.scenario ? (
                    scenarios
                      .filter(
                        (scenario) =>
                          this.props.currentGame.scenario === scenario.id
                      )
                      .map((scenario) => {
                        return (
                          <View
                            style={{ marginBottom: 20 }}
                            key={`objective-scenario-${scenario.id}`}
                          >
                            {scenario.secondary.map((objective: Objective) => {
                              return (
                                <TouchableRipple
                                  key={`objective-description-${objective.id}`}
                                  onPress={() => {
                                    updateObjective(objective.id)
                                  }}
                                  rippleColor="rgba(0, 0, 0, .32)"
                                >
                                  <View>
                                    <RadioButton.Item
                                      style={{ paddingLeft: 0 }}
                                      label={objective.id}
                                      value={objective.id}
                                      key={`objective-${objective.id}`}
                                    />
                                    <Text style={{ marginBottom: 10 }}>
                                      {objective.id}
                                    </Text>
                                  </View>
                                </TouchableRipple>
                              )
                            })}
                          </View>
                        )
                      })
                  ) : (
                    <Text>None</Text>
                  )}

                  {objectives.map((objectiveCategory: ObjectiveCategory) => {
                    return (
                      <View
                        style={{ marginBottom: 20 }}
                        key={`objective-category-${objectiveCategory.id}`}
                      >
                        <Divider style={styles.divider} />

                        <Title>{objectiveCategory.id}</Title>
                        {objectiveCategory.secondary.map(
                          (objective: Objective) => {
                            return (
                              <TouchableRipple
                                key={`objective-description-${objective.id}`}
                                onPress={() => {
                                  updateObjective(objective.id)
                                }}
                                rippleColor="rgba(0, 0, 0, .32)"
                              >
                                <View>
                                  <RadioButton.Item
                                    style={{ paddingLeft: 0 }}
                                    label={objective.id}
                                    value={objective.id}
                                    key={`objective-${objective.id}`}
                                  />
                                  <Text style={{ marginBottom: 10 }}>
                                    {objective.id}
                                  </Text>
                                </View>
                              </TouchableRipple>
                            )
                          }
                        )}
                      </View>
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
          contentStyle={{
            alignSelf: 'flex-start',
          }}
          style={{
            width: '100%',
            borderColor: player.secondaryObjectives[this.props.objectiveNumber]
              .id
              ? 'transparent'
              : 'red',
          }}
        >
          {player.secondaryObjectives[this.props.objectiveNumber].id
            ? `Obj. ${this.props.objectiveNumber + 1} : ${
                player.secondaryObjectives[this.props.objectiveNumber].id
              }`
            : `Click to set objective ${this.props.objectiveNumber + 1}`}
        </Button>
      </View>
    )
  }
}

const mapStateToProps = (state: any) => ({
  currentGame: state.currentGame,
})

const mapDispatchToProps = (dispatch: Function) => ({
  updatePlayerObjective: (
    teamNumber: number,
    playerNumber: number,
    objectiveNumber: number,
    objectiveId: string,
    primaryOrSecondary: string,
    scores?: number[],
    callUpdateGame: Boolean = false
  ) =>
    dispatch(
      updatePlayerObjective(
        teamNumber,
        playerNumber,
        objectiveNumber,
        objectiveId,
        primaryOrSecondary,
        scores,
        callUpdateGame
      )
    ),
})

export default connect(mapStateToProps, mapDispatchToProps)(ObjectiveSelector)
