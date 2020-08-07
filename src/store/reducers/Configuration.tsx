import { getDefaultLocale } from '../actions/Translation'

const defaultConfiguration = {
    locale: getDefaultLocale()
}

const configurationReducer = (state: any = defaultConfiguration, action: any) => {
    switch (action.type) {
        case 'UPDATE_LOCALE':
            return (state.locale === action.data.locale)
                ? state
                : { ...state, locale: action.data.locale }
        default:
            return state
    }
}

export default configurationReducer