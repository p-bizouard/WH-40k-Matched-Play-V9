
const configuration = (state: any = [], action: any) => {
    console.log('sate: ', state)

    switch (action.type) {
        case 'UPDATE_LOCALE':
            return (state.locale === action.locale)
                ? state
                : { ...state, locale: action.locale }
        default:
            return state
    }
}

export default configuration