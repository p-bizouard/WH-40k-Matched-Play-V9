/* eslint-disable @typescript-eslint/no-var-requires */
'use strict'

const fs = require('fs')

const compileTranslation = function (locale) {
  const base = require(`./src/translations/${locale}.json`)
  const army = require(`./src/translations/${locale}.army.json`)
  const objective = require(`./src/translations/${locale}.objective.json`)
  const mission = require(`./src/translations/${locale}.mission.json`)

  let all = JSON.stringify({
    ...base,
    ...army,
    ...objective,
    ...mission,
  })

  fs.writeFileSync(`./src/translations/${locale}.all.json`, all)
}

compileTranslation('fr')
compileTranslation('en')
