import { RouteProp } from '@react-navigation/native'

export interface UpdateLocale {
  type: string
  data: {
    locale: string
  }
}

export interface DispatchLocale {
  (arg0: UpdateLocale): void
}

export interface Objective {
  id: string
}

export interface ObjectiveCategory {
  id: string
  secondary: Objective[]
}

export interface PlayerObjective {
  id: string
  scores: number[] | null[]
}

export interface Player {
  army?: string
  primaryObjectives: PlayerObjective[]
  secondaryObjectives: PlayerObjective[]
}

export interface Team {
  players: Player[]
}

export interface Game {
  id?: string
  scenario: string
  name: string
  date: Date
  teams: Team[]
}

export interface Army {
  id: string
}

export interface Scenario {
  id: string
  primary: Objective[]
  secondary: Objective[]
}

type RootStackParamList = {
  Homepage: undefined
  EditGame: { game?: Game }
  ViewGame: { game: Game }
}
export type EditGameRouteProp = RouteProp<RootStackParamList, 'EditGame'>
export type ViewGameRouteProp = RouteProp<RootStackParamList, 'ViewGame'>
