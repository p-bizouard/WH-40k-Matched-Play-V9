import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

export interface UpdateLocale {
  type: string
  data: {
    locale: string
  }
}

export interface DispatchLocale {
  (arg0: UpdateLocale): void
}

export interface GameFormat {
  id: string
}

export interface GameType {
  id: string
}

export interface Objective {
  id: string
  typesRestriction?: string[]
}

export interface ObjectiveCategory {
  id: string
  secondary: Objective[]
}

export interface PlayerObjective {
  id: string
  type: string
  category: string
  scores: number[] | null[]
}

export interface Player {
  army: string
  faction: string
  primaryObjectives: PlayerObjective[]
  secondaryObjectives: PlayerObjective[]
  commandPoints: number[] | null[]
}

export interface Team {
  players: Player[]
}

export interface Game {
  id?: string
  type: string
  format: string
  mission: string
  name: string
  date: Date
  teams: Team[]
}

export interface Army {
  id: string
}

export interface Faction {
  id: string
  armies: Army[]
}

export interface Mission {
  id: string
  type: string
  format: string
  number: number
  primary: Objective[]
  secondary: Objective[]
}

type RootStackParamList = {
  Homepage: undefined
  EditGame: { game?: Game }
  ViewGame: { game: Game }
  About: undefined
}
export type EditGameRouteProp = RouteProp<RootStackParamList, 'EditGame'>
export type ViewGameRouteProp = RouteProp<RootStackParamList, 'ViewGame'>
export type AboutRouteProp = RouteProp<RootStackParamList, 'About'>

export type HomepageScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Homepage'
>
export type EditGameScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'EditGame'
>

export type ViewGameScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ViewGame'
>

export type AboutScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'About'
>
