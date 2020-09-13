import 'intl'
import 'intl/locale-data/jsonp/fr-FR'
import 'intl/locale-data/jsonp/en-GB'

import intl from 'react-intl-universal'
import { DispatchLocale } from '../../types'

export const getLocales = () => {
  return [
    {
      name: 'English',
      short: 'EN',
      iso: 'en-GB',
    },
    {
      name: 'Français',
      short: 'FR',
      iso: 'fr-FR',
    },
  ]
}

export const getDefaultLocale = () => {
  return getLocales()[0].iso
}

export const getCountryFromIso = (iso: string) => {
  return iso.split('-')[1]
}

export const updateIntlLocale = (locale: string) => {
  intl.init({
    currentLocale: locale,
    locales: {
      'en-GB': require('../../translations/compiled/en.json'),
      'fr-FR': require('../../translations/compiled/fr.json'),
    },
  })
}

export function updateLocale(locale: string) {
  return (dispatch: DispatchLocale) => {
    updateIntlLocale(locale)

    return dispatch({
      type: 'UPDATE_LOCALE',
      data: { locale },
    })
  }
}
