


import AsyncStorage from '@react-native-community/async-storage';
import _ from 'lodash';
import intl from 'react-intl-universal';

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

  intl.init({
    currentLocale: locale,
    locales: {
      'en-US': require('../../translations/en-compiled.json'),
      'fr-FR': require('../../translations/fr-compiled.json')
    }
  });
}

export const updateLocale = async function (locale: string) {
  updateIntlLocale(locale);

  await AsyncStorage.setItem('@configuration.locale', locale)

  return {
    type: 'UPDATE_LOCALE',
    locale
  };
} 