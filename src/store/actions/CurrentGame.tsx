import { PlayerObjective } from '../../types'
import { updateGame } from './games'

export function removePlayer(teamNumber: number, playerNumber: number) {
  return (dispatch: Function) => {
    dispatch({
      type: 'REMOVE_PLAYER',
      data: { teamNumber, playerNumber },
    })
  }
}

export function addPlayer(teamNumber: number) {
  return (dispatch: Function) => {
    dispatch({
      type: 'ADD_PLAYER',
      data: { teamNumber },
    })
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
  return (dispatch: Function) => {
    dispatch({
      type: 'ADD_TEAM',
    })
  }
}

export function resetCurrentGame() {
  return (dispatch: Function) => {
    dispatch({
      type: 'RESET_CURRENT_GAME',
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
  objectiveId: string,
  primaryOrSecondary: string,
  scores?: number[] | null,
  callUpdateGame: Boolean = false
) {
  return (dispatch: Function, getState: Function) => {
    const playerData: any = {}

    playerData[
      primaryOrSecondary === 'primary'
        ? 'primaryObjectives'
        : 'secondaryObjectives'
    ] = getState().currentGame.teams[teamNumber].players[playerNumber][
      primaryOrSecondary === 'primary'
        ? 'primaryObjectives'
        : 'secondaryObjectives'
    ].map(
      (currentObjective: PlayerObjective, currentObjectiveNumber: number) => {
        if (currentObjectiveNumber === objectiveNumber) {
          console.log(scores)
          return {
            ...currentObjective,
            id: objectiveId,
            scores: scores ? scores : currentObjective.scores,
          }
        }
        return currentObjective
      }
    )

    dispatch({
      type: 'UPDATE_PLAYER',
      data: { teamNumber, playerNumber, playerData },
    })

    if (callUpdateGame) dispatch(updateGame(getState().currentGame))
  }
}
