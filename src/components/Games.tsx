import React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { IconButton, Card } from 'react-native-paper'
import { Game, Team, Player } from '../Types'
import { useNavigation } from '@react-navigation/native'
import styles from '../styles'
import intl from 'react-intl-universal'

interface GamesProps {
  updateCurrentGame: Function
  games: Game[]
}

function Games(props: GamesProps) {
  const navigation = useNavigation()

  return (
    <View style={styles.mb10}>
      {props.games
        .filter((game: Game) => game.id)
        .map((game: Game) => (
          <Card
            style={{ width: '100%' }}
            onPress={() => {
              navigation.navigate('ViewGame', { game })
            }}
            key={`game-${game.id}`}
          >
            <Card.Title
              title={intl
                .get(`mission.${game.format}.${game.mission}`)
                .d(game.mission)}
              subtitle={game.teams
                .map((team: Team) =>
                  team.players
                    .map((player: Player) =>
                      intl.get(`army.${player.army}`).d(player.army!)
                    )
                    .join(', ')
                )
                .join(' vs ')}
              right={() => (
                <IconButton
                  icon={'dots-vertical'}
                  onPress={() => {
                    navigation.navigate('EditGame', { game })
                  }}
                />
              )}
            />
          </Card>
        ))}
    </View>
  )
}
const mapStateToProps = (state: any) => ({
  games: state.games,
  configuration: state.configuration,
})

const mapDispatchToProps = (dispatch: Function) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Games)
