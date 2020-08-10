import { Game } from '../../types'

const gamesReducer = (state: Game[] = [], action: any): Game[] => {
  switch (action.type) {
    case 'REMOVE_GAME':
      const newState = state.filter((game: Game) => game.id !== action.data.id)
      return newState
    case 'UPDATE_GAME':
      return state.map((game: Game) => {
        if (game.id === action.data.id) {
          game = {
            ...game,
            ...action.data,
          }
        }
        return game
      })
    case 'ADD_GAME':
      return state.concat(action.data)
    case 'RESET_GAMES':
      return JSON.parse(
        '[{"name":"","scenario":"retrieval-mission","date":"2020-08-09T22:38:45.942Z","teams":[{"players":[{"primaryObjectives":[{"id":"","scores":[]}],"secondaryObjectives":[{"id":"raze","scores":[]},{"id":"assassinate","scores":[]},{"id":"bring-it-down","scores":[]}],"army":"tyranides"}]},{"players":[{"primaryObjectives":[{"id":"","scores":[]}],"secondaryObjectives":[{"id":"data-intercept","scores":[]},{"id":"engage-on-all-fronts","scores":[]},{"id":"custom-1","scores":[]}],"army":"white-scars"},{"primaryObjectives":[{"id":"","scores":[]}],"secondaryObjectives":[{"id":"domination","scores":[]},{"id":"","scores":[]},{"id":"","scores":[]}],"army":"space-wolves"}]},{"players":[{"primaryObjectives":[{"id":"","scores":[]}],"secondaryObjectives":[{"id":"raze","scores":[]},{"id":"assassinate","scores":[]},{"id":"domination","scores":[]}],"army":"tyranides"}]}],"id":"978f99ff-f1cb-476e-bc3c-0eb473c9674b"},{"name":"","scenario":"retrieval-mission","date":"2020-08-09T23:30:56.320Z","teams":[{"players":[{"primaryObjectives":[{"id":"","scores":[null,null,null,null,null]}],"secondaryObjectives":[{"id":"titan-slayers","scores":[4,1,1,null,null]},{"id":"","scores":[null,null,null,null,null]},{"id":"","scores":[null,null,null,null,null]}],"army":"ultramarine"}]},{"players":[{"primaryObjectives":[{"id":"","scores":[null,null,null,null,null]}],"secondaryObjectives":[{"id":"thin-their-ranks","scores":[null,null,null,null,null]},{"id":"","scores":[null,null,null,null,null]},{"id":"repair-teleport-homer","scores":[null,null,null,null,null]}],"army":"tyranides"}]}],"id":"0136fb09-0fbd-4df3-8cc4-fc9c9f09a74e"}]'
      )

    default:
      return state
  }
}

export default gamesReducer
