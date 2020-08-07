


import AsyncStorage from '@react-native-community/async-storage';
import _ from 'lodash';
import intl from 'react-intl-universal';
import { DispatchLocale } from '../../Types'

export const getLocales = () => {
  return [
    {
      name: 'English',
      value: 'en-US'
    },
    {
      name: 'Français',
      value: 'fr-FR'
    }
  ]
}

export const getDefaultLocale = () => {
  return getLocales()[0].value;
}

const updateIntlLocale = (locale: string) => {
  intl.init({
    currentLocale: locale,
    locales: {
      'en-US': require('../../translations/en-compiled.json'),
      'fr-FR': require('../../translations/fr-compiled.json')
    }
  });
}

export function updateLocale(locale: string) {
  return (dispatch: DispatchLocale) => {
    updateIntlLocale(locale);

    return AsyncStorage.setItem('@configuration.locale', locale)
      .then(function () {
        dispatch({
          type: 'UPDATE_LOCALE',
          data: {locale}
        });
      })
  }
}


export function initConfiguration() {
  return (dispatch: DispatchLocale) => {
    return AsyncStorage.getItem('@configuration.locale')
      .then((locale: string | null) => {
        if (locale !== null) {
          updateIntlLocale(locale);
          dispatch({
            type: 'UPDATE_LOCALE',
            data: {locale}
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
                if (!_.find(getLocales(), { value: locale })) {
                  locale = getDefaultLocale();
                }
              }
              updateLocale(locale);
            })
        }
      })
  }
}
