export interface UpdateLocale {
  type: string;
  data: {
    locale: string;
  }
}
export interface DispatchLocale {
  (arg0: UpdateLocale): void
}

export interface Player {
  faction?: string
}

export interface Team {
  players: Player[]
}

export interface Game {
  name: string;
  date: Date;
  teams: Team[]
}