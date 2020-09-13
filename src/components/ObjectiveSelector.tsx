import React from 'react'
import { View, ScrollView } from 'react-native'
import objectives from '../data/objectives.json'
import missions from '../data/missions.json'
import gameTypes from '../data/gameTypes.json'
import gameFormats from '../data/gameFormats.json'
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
  Switch,
} from 'react-native-paper'
import {
  Game,
  ObjectiveCategory,
  Objective,
  Mission,
  GameFormat,
  GameType,
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
  notes: boolean
}

class ObjectiveSelector extends React.Component<
  ObjectiveSelectorProps,
  ObjectiveSelectorStates
> {
  constructor(props: any) {
    super(props)

    this.state = {
      dialog: false,
      notes: true,
    }
  }

  render() {
    const hideDialog = () => this.setState({ dialog: false })
    const showDialog = () => this.setState({ dialog: true })

    const updateObjective = (
      objectiveTypeId: string,
      objectiveCategoryId: string,
      objectiveId: string
    ) => {
      this.props.updatePlayerObjective(
        this.props.teamNumber,
        this.props.playerNumber,
        this.props.objectiveNumber,
        objectiveTypeId,
        objectiveCategoryId,
        objectiveId,
        'secondary'
      )
      hideDialog()
    }

    const player = this.props.currentGame.teams[this.props.teamNumber].players[
      this.props.playerNumber
    ]

    const gameFormat: GameFormat | undefined = gameFormats.find(
      (gameFormat) => this.props.currentGame.format === gameFormat.id
    )
    const gameType: GameType | undefined = gameTypes.find(
      (gameType) => this.props.currentGame.type === gameType.id
    )
    const mission = gameFormat
      ? missions.find(
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
                  {gameFormat && gameType && mission ? (
                    <View key={`objective-mission-${mission.id}`}>
                      {mission.secondary.map((objective: Objective) => {
                        const description = intl.get(
                          `objective.description.${objective.id}`
                        )

                        return (
                          <TouchableRipple
                            key={`objective-${objective.id}`}
                            onPress={() => {
                              updateObjective(
                                gameType.id,
                                gameFormat.id,
                                objective.id
                              )
                            }}
                            rippleColor="rgba(0, 0, 0, .32)"
                          >
                            <View>
                              <RadioButton.Item
                                style={{ paddingLeft: 0 }}
                                label={intl
                                  .get(`objective.${objective.id}`)
                                  .d(humanizeString(objective.id))}
                                value={objective.id}
                                key={`objective-${objective.id}`}
                                onPress={() => {
                                  updateObjective(
                                    gameType.id,
                                    gameFormat.id,
                                    objective.id
                                  )
                                }}
                              />
                              {description && !this.state.notes ? (
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

                        <Title
                          style={{
                            color: player.secondaryObjectives.find(
                              (playerObjective, playerObjectiveIndex) =>
                                playerObjective.category ===
                                  objectiveCategory.id &&
                                playerObjectiveIndex !==
                                  this.props.objectiveNumber
                            )
                              ? 'lightgrey'
                              : 'black',
                          }}
                        >
                          {intl
                            .get(`objective.${objectiveCategory.id}`)
                            .d(humanizeString(objectiveCategory.id))}
                        </Title>
                        {objectiveCategory.secondary.map(
                          (objective: Objective) => {
                            const description = intl.get(
                              `objective.description.${objective.id}`
                            )
                            return (
                              <TouchableRipple
                                key={`objective-${objective.id}`}
                                onPress={() => {
                                  updateObjective(
                                    'base',
                                    objectiveCategory.id,
                                    objective.id
                                  )
                                }}
                                rippleColor="rgba(0, 0, 0, .32)"
                              >
                                <View>
                                  <RadioButton.Item
                                    labelStyle={{
                                      color:
                                        (objective.typesRestriction &&
                                          gameType &&
                                          objective.typesRestriction.includes(
                                            gameType.id
                                          )) ||
                                        player.secondaryObjectives.find(
                                          (
                                            playerObjective,
                                            playerObjectiveIndex
                                          ) =>
                                            playerObjective.category ===
                                              objectiveCategory.id &&
                                            playerObjectiveIndex !==
                                              this.props.objectiveNumber
                                        )
                                          ? 'lightgrey'
                                          : 'black',
                                    }}
                                    style={{ paddingLeft: 0 }}
                                    label={intl
                                      .get(`objective.${objective.id}`)
                                      .d(humanizeString(objective.id))}
                                    value={objective.id}
                                    key={`objective-${objective.id}`}
                                    onPress={() => {
                                      updateObjective(
                                        'base',
                                        objectiveCategory.id,
                                        objective.id
                                      )
                                    }}
                                  />
                                  {description && !this.state.notes ? (
                                    <Text
                                      style={{
                                        color:
                                          (objective.typesRestriction &&
                                            gameType &&
                                            objective.typesRestriction.includes(
                                              gameType.id
                                            )) ||
                                          player.secondaryObjectives.find(
                                            (
                                              playerObjective,
                                              playerObjectiveIndex
                                            ) =>
                                              playerObjective.category ===
                                                objectiveCategory.id &&
                                              playerObjectiveIndex !==
                                                this.props.objectiveNumber
                                          )
                                            ? 'lightgrey'
                                            : 'black',
                                      }}
                                    >
                                      {description}
                                    </Text>
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
              <View style={styles.flexView}>
                <View>
                  <Text>{intl.get('game.compact').d('Compact')}</Text>
                  <Switch
                    value={this.state.notes}
                    onValueChange={() =>
                      this.setState({ notes: !this.state.notes })
                    }
                  />
                </View>
                <Button onPress={hideDialog}>
                  {intl.get('display.close').d('Close')}
                </Button>
              </View>
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
                    player.secondaryObjectives[this.props.objectiveNumber].id
                  }`
                )
                .d(player.secondaryObjectives[this.props.objectiveNumber].id)
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
    objectiveTypeId: string,
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
        objectiveTypeId,
        objectiveCategoryId,
        objectiveId,
        primaryOrSecondary,
        scores,
        callUpdateGame
      )
    ),
})

export default connect(mapStateToProps, mapDispatchToProps)(ObjectiveSelector)
