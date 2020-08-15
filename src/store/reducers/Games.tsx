import { Game } from '../../types'

const gamesReducer = (state: Game[] = [], action: any): Game[] => {
  switch (action.type) {
    case 'REMOVE_GAME':
      return [...state.filter((game: Game) => game.id !== action.data.id)]
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
        '[{"name":"","mission":"vital-intelligence","format":"strike-force","date":"2020-08-14T15:44:25.563Z","teams":[{"players":[{"primaryObjectives":[{"id":"take-and-hold","scores":[null,null,null,null,null]}],"secondaryObjectives":[{"id":"assassinate","scores":[null,null,null,null,null]},{"id":"line-breaker","scores":[null,null,null,null,null]},{"id":"assassinate","scores":[null,null,null,null,null]}],"army":"space-wolves"},{"primaryObjectives":[{"id":"take-and-hold","scores":[null,null,null,null,null]}],"secondaryObjectives":[{"id":"bring-it-down","scores":[null,null,null,null,null]},{"id":"psychic-ritual","scores":[null,null,null,null,null]},{"id":"abhor-the-witch","scores":[null,null,null,null,null]}],"army":"ultramarine"}]},{"players":[{"primaryObjectives":[{"id":"take-and-hold","scores":[null,null,null,null,null]}],"secondaryObjectives":[{"id":"bring-it-down","scores":[null,null,null,null,null]},{"id":"titan-slayers","scores":[null,null,null,null,null]},{"id":"slay-the-warlord","scores":[null,null,null,null,null]}],"army":"tyranides"}]},{"players":[{"primaryObjectives":[{"id":"take-and-hold","scores":[null,null,null,null,null]}],"secondaryObjectives":[{"id":"titan-slayers","scores":[null,null,null,null,null]},{"id":"custom-1","scores":[null,null,null,null,null]},{"id":"engage-on-all-fronts","scores":[null,null,null,null,null]}],"army":"spaces-marines"}]}],"id":"b2243776-689b-4848-a674-47dcb7cea0fa"}]'
      )

    default:
      return state
  }
}

export default gamesReducer
