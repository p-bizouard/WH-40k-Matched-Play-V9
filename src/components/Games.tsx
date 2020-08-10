import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { mdiDotsHorizontal } from '@mdi/js'
import { connect } from 'react-redux'
import {
  updateGame,
  addTeam,
  removeTeam,
  addPlayer,
  updatePlayer,
  updateCurrentGame,
} from '../store/actions'
import {
  Button,
  IconButton,
  Title,
  Card,
  Provider,
  Menu,
  Divider,
} from 'react-native-paper'
import { Game, Team, Player } from '../Types'
import { useNavigation } from '@react-navigation/native'
import styles from '../styles'

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
              title={`${game.scenario}`}
              subtitle={game.teams
                .map((team: Team) =>
                  team.players.map((player: Player) => player.army).join(', ')
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
})

const mapDispatchToProps = (dispatch: Function) => ({
  updateCurrentGame: (data: any) => dispatch(updateCurrentGame(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Games)
