import { Game, Team, Player, Objective, PlayerObjective } from '../../types'
import clonedeep from 'lodash.clonedeep'
import missions from '../../data/missions.json'

export interface CurrentGameAction {
  type: string
  data: {
    teamNumber?: number
    playerNumber?: number
    playerData?: any
    formatId?: string
    missionId?: string
  }
}

const defaultObjective = {
  id: '',
  type: '',
  category: '',
  scores: [null, null, null, null, null],
}
const defaultPlayer = {
  commandPoints: [null, null, null, null, null],
  army: '',
  faction: '',
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
  mission: '',
  format: '',
  type: '',
  date: new Date(),
  teams: [clonedeep(defaultTeam), clonedeep(defaultTeam)],
}

const currentGameReducer = (
  state: Game = clonedeep(defaultGame),
  action: CurrentGameAction
): Game => {
  switch (action.type) {
    case 'RESET_CURRENT_GAME':
      console.log('CLONE', clonedeep(defaultGame))
      return clonedeep(defaultGame)
    case 'UPDATE_CURRENT_GAME':
      return {
        ...state,
        ...action.data,
      } as Game
    case 'SET_MISSION':
      return {
        ...state,
        format: action.data.formatId!,
        mission: action.data.missionId!,
      }
    case 'RESET_PRIMARY_OBJECTIVES':
      return {
        ...state,
        teams: state.teams.map((team: Team, teamIndex: number) => {
          return {
            ...team,
            players: team.players.map((player: Player) => {
              if (!state.type || !state.format) return player

              return {
                ...player,
                primaryObjectives: missions
                  .find(
                    (mission) =>
                      mission.id === state.mission &&
                      mission.type === state.type &&
                      mission.format === state.format
                  )!
                  .primary.map((objective: Objective) => {
                    return {
                      ...clonedeep(defaultObjective),
                      id: objective.id,
                      type: state.type,
                      category: state.format,
                    } as PlayerObjective
                  }),
              } as Player
            }),
          } as Team
        }),
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
              return {
                ...team,
                players: [
                  ...team.players.slice(0, action.data.playerNumber!),
                  ...team.players.slice(action.data.playerNumber! + 1),
                ],
              } as Team
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
            return {
              ...team,
              players: team.players.concat(clonedeep(defaultPlayer)),
            } as Team
          }
          return team
        }),
      }
    case 'UPDATE_PLAYER':
      return {
        ...state,
        teams: state.teams.map((team: Team, teamIndex: number) => {
          if (teamIndex === action.data.teamNumber) {
            return {
              ...team,
              players: team.players = team.players.map(
                (player: Player, playerIndex: number) => {
                  if (playerIndex === action.data.playerNumber) {
                    return {
                      ...player,
                      ...action.data.playerData,
                    } as Player
                  }
                  return player
                }
              ),
            } as Team
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
