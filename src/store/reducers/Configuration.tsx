
const configuration = (state: any = [], action: any) => {
    console.log('sate: ', state)
    // if (state.length === 0) {
    //     const jsonValue = await AsyncStorage.getItem('@configuration');
    //     console.log('GET', jsonValue)
    //     if (jsonValue != null) {
    //         state = JSON.parse(jsonValue);
    //         console.log('state', state, state.locale)
    //         updateIntlLocale(state.locale);
    //     } else {
    //         let determinedLocale = intl.determineLocale({
    //             urlLocaleKey: 'lang',
    //             cookieLocaleKey: 'lang'
    //         });
    //         if (determinedLocale.length == 2) {
    //             determinedLocale = determinedLocale + '-' + determinedLocale.toUpperCase();
    //         }
    //         if (!_.find(SUPPOER_LOCALES, { value: determinedLocale })) {
    //             determinedLocale = 'fr-FR';
    //         }
    //         await configuration(state, {type: 'UPDATE_LOCALE', locale: determinedLocale})
    //     }
    // }

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