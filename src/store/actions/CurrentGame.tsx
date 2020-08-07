import { Game } from "../../Types";

export function removePlayer(teamNumber: number, playerNumber: number) {
  return (dispatch) => {
    dispatch({
      type: 'REMOVE_PLAYER',
      data: { teamNumber, playerNumber }
    });
  }
}

export function removeTeam(teamNumber: number) {
  return (dispatch) => {
    dispatch({
      type: 'REMOVE_TEAM',
      data: { teamNumber }
    });
  }
}

export function addTeam() {
  return (dispatch) => {
    dispatch({
      type: 'ADD_TEAM',
    });
  }
}



export function updateGame(data) {
  return (dispatch) => {
    dispatch({
      type: 'UPDATE_GAME',
      data
    });
  }
}
