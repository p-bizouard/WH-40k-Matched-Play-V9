import { Game, Team, Player } from '../../types'
import clonedeep from 'lodash.clonedeep'

export interface CurrentGameAction {
  type: string
  data: {
    teamNumber?: number
    playerNumber?: number
    playerData?: any
  }
}

const defaultObjective = {
  id: '',
  scores: [null, null, null, null, null],
}
const defaultPlayer = {
  primaryObjectives: [clonedeep(defaultObjective)],
  secondaryObjectives: [
    clonedeep(defaultObjective),
    clonedeep(defaultObjective),
    clonedeep(defaultObjective),
  ],
}
const defaultTeam = {
  players: [clonedeep(defaultPlayer)],
}
const defaultGame = {
  name: '',
  scenario: '',
  date: new Date(),
  teams: [clonedeep(defaultTeam), clonedeep(defaultTeam)],
}

const currentGameReducer = (
  state: Game = clonedeep(defaultGame),
  action: CurrentGameAction
): Game => {
  switch (action.type) {
    case 'RESET_CURRENT_GAME':
      return clonedeep(defaultGame)
    case 'UPDATE_CURRENT_GAME':
      return {
        ...state,
        ...action.data,
      }
    case 'REMOVE_PLAYER':
      if (state.teams[action.data.teamNumber!].players.length === 1) {
        return currentGameReducer(state, {
          type: 'REMOVE_TEAM',
          data: {
            teamNumber: action.data.teamNumber,
          },
        })
      } else {
        return {
          ...state,
          teams: state.teams.map((team: Team, teamIndex: number) => {
            if (teamIndex === action.data.teamNumber) {
              team.players.splice(action.data.playerNumber!, 1)
            }
            return team
          }),
        }
      }
    case 'ADD_PLAYER':
      return {
        ...state,
        teams: state.teams.map((team: Team, teamIndex: number) => {
          if (teamIndex === action.data.teamNumber) {
            team.players = team.players.concat({
              ...defaultGame.teams[0].players[0],
            })
          }
          return team
        }),
      }
    case 'UPDATE_PLAYER':
      return {
        ...state,
        teams: state.teams.map((team: Team, teamIndex: number) => {
          if (teamIndex === action.data.teamNumber) {
            team.players = team.players.map(
              (player: Player, playerIndex: number) => {
                if (playerIndex === action.data.playerNumber) {
                  player = {
                    ...player,
                    ...action.data.playerData,
                  }
                }
                return player
              }
            )
          }
          return team
        }),
      }
    case 'REMOVE_TEAM':
      return {
        ...state,
        teams: [
          ...state.teams.slice(0, action.data.teamNumber!),
          ...state.teams.slice(action.data.teamNumber! + 1),
        ],
      }
    case 'ADD_TEAM':
      return {
        ...state,
        teams: state.teams.concat(clonedeep(defaultTeam)),
      }
    default:
      return state
  }
}

export default currentGameReducer
