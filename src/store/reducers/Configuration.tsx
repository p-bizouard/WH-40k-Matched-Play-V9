import { getDefaultLocale } from '../actions/translation'

const defaultConfiguration = {
  locale: getDefaultLocale(),
}

const configurationReducer = (
  state: any = defaultConfiguration,
  action: any
) => {
  switch (action.type) {
    case 'UPDATE_LOCALE':
      return state.locale === action.data.locale
        ? state
        : { ...state, locale: action.data.locale }
    case 'RESET_CONFIGURATION':
      console.log('RESET')
      return {}
    default:
      return state
  }
}

export default configurationReducer
