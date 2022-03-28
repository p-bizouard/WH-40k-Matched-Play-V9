import { combineReducers } from 'redux'
import configurationReducer from './configuration'
import currentGameReducer from './currentGame'
import gamesReducer from './games'

export default combineReducers({
  currentGame: currentGameReducer,
  configuration: configurationReducer,
  games: gamesReducer,
})
