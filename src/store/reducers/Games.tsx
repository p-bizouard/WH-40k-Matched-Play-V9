
import { Game } from '../../Types'

const gamees = (state: any = [], action: any) => {
    switch (action.type) {
        case 'ADD_MATCH':
            return state.concat([action.game])
        case 'DELETE_MATCH':
            return state.filter((game: Game) => game.id !== action.id)
        case 'UPDATE_MATCH':
            return state.map((game: Game) => {
                if (game.id === action.id) {
                    return {
                        ...game,
                        date: action.data.date,
                    }
                } else return game;
            })
        default:
            return state;
    }
}

export default gamees