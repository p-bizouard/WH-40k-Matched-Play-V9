import { Game } from '../../types'

export function addGame(game: Game) {
  return (dispatch: Function) => {
    dispatch({
      type: 'ADD_GAME',
      data: game,
    })
  }
}

export function updateGame(game: Game) {
  return (dispatch: Function) => {
    dispatch({
      type: 'UPDATE_GAME',
      data: game,
    })
  }
}

export function removeGame(game: Game) {
  return (dispatch: Function) => {
    dispatch({
      type: 'REMOVE_GAME',
      data: game,
    })
  }
}

export function resetGames() {
  return (dispatch: Function) => {
    dispatch({
      type: 'RESET_GAMES',
    })
  }
}
