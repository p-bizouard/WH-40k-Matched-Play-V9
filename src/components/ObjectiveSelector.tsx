import React from 'react'
import { View, ScrollView } from 'react-native'
import objectives from '../data/objectives.json'
import missions from '../data/missions.json'
import intl from 'react-intl-universal'
import { connect } from 'react-redux'
import { updatePlayerObjective } from '../store/actions/index'
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
import {
  Game,
  ObjectiveCategory,
  Objective,
  Mission,
  GameFormat,
} from '../Types'
import styles from '../styles'
import humanizeString from 'humanize-string'

interface ObjectiveSelectorProps {
  updatePlayerObjective: typeof updatePlayerObjective
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

    const updateObjective = (
      objectiveCategoryId: string,
      objectiveId: string
    ) => {
      this.props.updatePlayerObjective(
        this.props.teamNumber,
        this.props.playerNumber,
        this.props.objectiveNumber,
        objectiveCategoryId,
        objectiveId,
        'secondary'
      )
      hideDialog()
    }

    const player = this.props.currentGame.teams[this.props.teamNumber].players[
      this.props.playerNumber
    ]

    const format: GameFormat | undefined = missions.find(
      (format) => this.props.currentGame.format === format.id
    )
    const mission = format
      ? format.missions.find(
          (mission: Mission) => mission.id === this.props.currentGame.mission
        )
      : undefined

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
                <RadioButton.Group
                  value={
                    player.secondaryObjectives[this.props.objectiveNumber].id
                  }
                >
                  <Title>
                    {intl.get('game.mission-secondary').d('Mission secondary')}
                  </Title>
                  {format && mission ? (
                    <View key={`objective-mission-${mission.id}`}>
                      {mission.secondary.map((objective: Objective) => {
                        const description = intl.get(
                          `objective.description.${format.id}.${objective.id}`
                        )

                        return (
                          <TouchableRipple
                            key={`objective-${objective.id}`}
                            onPress={() => {
                              updateObjective(format.id, objective.id)
                            }}
                            rippleColor="rgba(0, 0, 0, .32)"
                          >
                            <View>
                              <RadioButton.Item
                                style={{ paddingLeft: 0 }}
                                label={intl
                                  .get(`objective.${format.id}.${objective.id}`)
                                  .d(humanizeString(objective.id))}
                                value={objective.id}
                                key={`objective-${objective.id}`}
                                onPress={() => {
                                  updateObjective(format.id, objective.id)
                                }}
                              />
                              {description && description != '' ? (
                                <Text>{description}</Text>
                              ) : null}
                            </View>
                          </TouchableRipple>
                        )
                      })}
                    </View>
                  ) : (
                    <Text>{intl.get('display.none').d('None')}</Text>
                  )}

                  {objectives.map((objectiveCategory: ObjectiveCategory) => {
                    return (
                      <View
                        style={{ marginBottom: 20 }}
                        key={`objective-category-${objectiveCategory.id}`}
                      >
                        <Divider style={[styles.divider, { marginTop: 10 }]} />

                        <Title>
                          {intl
                            .get(`objective.${objectiveCategory.id}`)
                            .d(humanizeString(objectiveCategory.id))}
                        </Title>
                        {objectiveCategory.secondary.map(
                          (objective: Objective) => {
                            const description = intl.get(
                              `objective.description.${objectiveCategory.id}.${objective.id}`
                            )
                            return (
                              <TouchableRipple
                                key={`objective-description-${objective.id}`}
                                onPress={() => {
                                  updateObjective(
                                    objectiveCategory.id,
                                    objective.id
                                  )
                                }}
                                rippleColor="rgba(0, 0, 0, .32)"
                              >
                                <View>
                                  <RadioButton.Item
                                    style={{ paddingLeft: 0 }}
                                    label={intl
                                      .get(
                                        `objective.${objectiveCategory.id}.${objective.id}`
                                      )
                                      .d(humanizeString(objective.id))}
                                    value={objective.id}
                                    key={`objective-${objective.id}`}
                                    onPress={() => {
                                      updateObjective(
                                        objectiveCategory.id,
                                        objective.id
                                      )
                                    }}
                                  />
                                  {description ? (
                                    <Text>{description}</Text>
                                  ) : null}
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
              <Button onPress={hideDialog}>
                {intl.get('display.close').d('Close')}
              </Button>
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
            ? intl
                .get('game.objective-x', {
                  objectiveNumber: this.props.objectiveNumber + 1,
                })
                .d(`Obj. ${this.props.objectiveNumber + 1}`) +
              ' : ' +
              intl
                .get(
                  `objective.${
                    player.secondaryObjectives[this.props.objectiveNumber]
                      .category
                  }.${
                    player.secondaryObjectives[this.props.objectiveNumber].id
                  }`
                )
                .d(
                  humanizeString(
                    player.secondaryObjectives[this.props.objectiveNumber].id
                  )
                )
            : intl
                .get('game.objective-x-set', {
                  objectiveNumber: this.props.objectiveNumber + 1,
                })
                .d(`Click to set objective ${this.props.objectiveNumber + 1}`)}
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
    objectiveCategoryId: string,
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
        objectiveCategoryId,
        objectiveId,
        primaryOrSecondary,
        scores,
        callUpdateGame
      )
    ),
})

export default connect(mapStateToProps, mapDispatchToProps)(ObjectiveSelector)
