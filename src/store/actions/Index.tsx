


import AsyncStorage from '@react-native-community/async-storage';
import _ from 'lodash';
import intl from 'react-intl-universal';
import { Dispatch } from '../../Types'

const SUPPOER_LOCALES = [
  {
    name: 'English',
    value: 'en-US'
  },
  {
    name: 'Français',
    value: 'fr-FR'
  }
];

const updateIntlLocale = (locale: string) => {
  console.log('locale', locale)
  intl.init({
    currentLocale: locale,
    locales: {
      'en-US': require('../../translations/en-compiled.json'),
      'fr-FR': require('../../translations/fr-compiled.json')
    }
  });
}

export function updateLocale(locale: string) {
  console.log('updateLocale');
  return (dispatch: Dispatch) => {
    updateIntlLocale(locale);

    return AsyncStorage.setItem('@configuration.locale', locale)
      .then(function () {
        dispatch({
          type: 'UPDATE_LOCALE',
          locale
        });
      })
  }
}


export function initConfiguration() {
  return (dispatch: Dispatch) => {
    return AsyncStorage.getItem('@configuration.locale')
      .then((locale: string | null) => {
        if (locale !== null) {
          updateIntlLocale(locale);
          dispatch({
            type: 'UPDATE_LOCALE',
            locale
          });
        } else {
          AsyncStorage.getItem('@configuration.locale')
            .then(function (locale) {
              if (locale === null) {
                locale = intl.determineLocale({
                  urlLocaleKey: 'lang',
                  cookieLocaleKey: 'lang'
                });
                if (locale.length == 2) {
                  locale = locale + '-' + locale.toUpperCase();
                }
                if (!_.find(SUPPOER_LOCALES, { value: locale })) {
                  locale = 'fr-FR';
                }
              }
              updateIntlLocale(locale);
              dispatch({ type: 'UPDATE_LOCALE', locale: locale });
            })
        }
      })
  }
}
