import 'intl'
import 'intl/locale-data/jsonp/fr'
import 'intl/locale-data/jsonp/en'
import 'intl/locale-data/jsonp/fr-FR'
import 'intl/locale-data/jsonp/en-US'

import { DispatchLocale } from '../../types'
import { updateIntlLocale, getDefaultLocale } from './translation'

export function initConfiguration() {
  updateIntlLocale(getDefaultLocale())

  return (dispatch: DispatchLocale, getState: Function) => {
    let locale = ''

    if (getState().configuration && getState().configuration.locale) {
      locale = getState().configuration.locale
    } else {
      locale = getDefaultLocale()
    }

    updateIntlLocale(locale)
    return dispatch({
      type: 'UPDATE_LOCALE',
      data: { locale },
    })
  }
}

export function resetConfiguration() {
  return (dispatch: Function) => {
    return dispatch({
      type: 'RESET_CONFIGURATION',
      data: {},
    })
  }
}
