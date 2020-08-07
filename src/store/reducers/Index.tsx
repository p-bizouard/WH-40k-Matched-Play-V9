import { combineReducers } from 'redux'
import configurationReducer from './Configuration'
import currentGameReducer from './CurrentGame'

export default combineReducers({
    currentGame: currentGameReducer,
    configuration: configurationReducer,
})