import { PlayerObjective } from '../../types'
import { updateGame } from './games'
import { Platform } from 'react-native'

export function removePlayer(teamNumber: number, playerNumber: number) {
  return (dispatch: Function) => {
    dispatch({
      type: 'REMOVE_PLAYER',
      data: { teamNumber, playerNumber },
    })
  }
}

export function addPlayer(teamNumber: number) {
  return (dispatch: Function, getState: Function) => {
    dispatch({
      type: 'ADD_PLAYER',
      data: { teamNumber },
    })
    dispatch(resetPrimaryObjectives())
  }
}

export function removeTeam(teamNumber: number) {
  return (dispatch: Function) => {
    dispatch({
      type: 'REMOVE_TEAM',
      data: { teamNumber },
    })
  }
}

export function addTeam() {
  return (dispatch: Function, getState: Function) => {
    dispatch({
      type: 'ADD_TEAM',
    })
    dispatch(resetPrimaryObjectives())
  }
}

export function resetCurrentGame() {
  return (dispatch: Function) => {
    dispatch({
      type: 'RESET_CURRENT_GAME',
    })
  }
}

export function setMission(
  missionType: string,
  missionFormatId: string,
  missionId: string
) {
  return (dispatch: Function) => {
    dispatch({
      type: 'UPDATE_CURRENT_GAME',
      data: { type: missionType, format: missionFormatId, mission: missionId },
    })
    dispatch(resetPrimaryObjectives())
  }
}

export function resetPrimaryObjectives() {
  return (dispatch: Function) => {
    dispatch({
      type: 'RESET_PRIMARY_OBJECTIVES',
    })
  }
}

export function updateCurrentGame(data: any, callUpdateGame: Boolean = false) {
  return (dispatch: Function, getState: Function) => {
    dispatch({
      type: 'UPDATE_CURRENT_GAME',
      data: data,
    })
    if (callUpdateGame) dispatch(updateGame(getState().currentGame))
  }
}

export function updatePlayer(
  teamNumber: number,
  playerNumber: number,
  playerData: any,
  callUpdateGame: Boolean = false
) {
  return (dispatch: Function, getState: Function) => {
    dispatch({
      type: 'UPDATE_PLAYER',
      data: { teamNumber, playerNumber, playerData },
    })
    if (callUpdateGame) dispatch(updateGame(getState().currentGame))
  }
}

export function updatePlayerObjective(
  teamNumber: number,
  playerNumber: number,
  objectiveNumber: number,
  objectiveTypeId: string,
  objectiveCategoryId: string,
  objectiveId: string,
  primaryOrSecondary: string,
  scores?: number[] | null,
  callUpdateGame: Boolean = false
) {
  return (dispatch: Function, getState: Function) => {
    const primaryOrSecondaryKey =
      primaryOrSecondary === 'primary'
        ? 'primaryObjectives'
        : 'secondaryObjectives'

    dispatch({
      type: 'UPDATE_PLAYER',
      data: {
        teamNumber,
        playerNumber,
        playerData: {
          [primaryOrSecondaryKey]: getState().currentGame.teams[
            teamNumber
          ].players[playerNumber][primaryOrSecondaryKey].map(
            (
              currentObjective: PlayerObjective,
              currentObjectiveNumber: number
            ) => {
              if (currentObjectiveNumber === objectiveNumber) {
                return {
                  ...currentObjective,
                  id: objectiveId,
                  type: objectiveTypeId,
                  category: objectiveCategoryId,
                  scores: scores ? scores : currentObjective.scores,
                }
              }
              return currentObjective
            }
          ),
        },
      },
    })

    if (callUpdateGame) dispatch(updateGame(getState().currentGame))
  }
}
