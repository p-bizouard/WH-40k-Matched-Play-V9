
import { Game, Team } from '../../Types'

export interface CurrentGameAction {
    type: string
    data: {
        teamNumber: number
        playerNumber: number
    }
}

const defaultPlayer = {};
const defaultTeam = {
    players: [defaultPlayer]
}
const defaultGame = {
    name: '',
    date: new Date(),
    teams: [defaultTeam, defaultTeam]
};

const currentGameReducer = (state: Game = defaultGame, action: CurrentGameAction): Game => {
    switch (action.type) {
        case 'UPDATE_GAME':
            let data = action.data; 
            return {
                ...state,
                data 
            };
        case 'REMOVE_PLAYER':
            if (state.teams[action.data.teamNumber].players.length === 1) {
                return currentGameReducer(state, {
                    type: 'REMOVE_TEAM',
                    data: {
                        teamNumber: action.data.teamNumber
                    }
                });
            } else {
                return {
                    ...state,
                    teams: state.teams.map((team: Team, teamIndex: number) => {
                        if (teamIndex === action.data.teamNumber) {
                            team.players.splice(action.data.playerNumber, 1)
                        }
                        return team;
                    })
                };
            }
        case 'REMOVE_TEAM':
            let teamsCopy = state.teams.slice()
            teamsCopy.splice(action.data.teamNumber, 1)
            return {
                ...state,
                teams: teamsCopy
            };
        case 'ADD_TEAM':
            console.log('OK')
            return {
                ...state,
                teams: state.teams.concat({ players: [{}] })
            };
        default:
            return state;
    }
}

export default currentGameReducer