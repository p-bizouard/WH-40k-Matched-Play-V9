import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import { StyleSheet, Text, View, Picker } from 'react-native';
import intl from 'react-intl-universal';
import _, { concat } from 'lodash';
import { connect } from 'react-redux'
import { updateGame, addTeam, removeTeam, removePlayer } from '../store/actions'
import { Appbar, Modal, Portal, Provider, Button, TextInput, IconButton } from 'react-native-paper';
import { Game, Team, Player } from '../Types'
import PropTypes from 'prop-types';


class GameModal extends React.Component {
  constructor(props: any) {
    super(props);
  }

  render() {
    let currentPlayerNumber = 0;

    return (
      <View style={styles.container}>
        <TextInput label="Nom" value={this.props.currentGame.name} onChangeText={(text) => {
          this.props.updateGame({ name: text });
        }} />

        {this.props.currentGame.teams.length > 2 ? <h1>T :</h1> : <h1>1 1 :</h1>}

        {this.props.currentGame.teams.map((team: Team, teamNumber: number) => {
          return <View key={'team' + teamNumber}>
            <View style={styles.flexView}>
              {this.props.currentGame.teams.length > 2 ? [<h2 key={'teamNumber' + teamNumber}>T {teamNumber + 1}</h2>,
              <IconButton key={'teamDeleteIcon' + teamNumber} icon="delete-forever" onPress={() => this.props.removeTeam(teamNumber)} />
              ] : null}
            </View>

            {team.players && team.players.map((player: Player, playerNumber: number) => {
              currentPlayerNumber++;
              return <View style={styles.flexView} key={'player' + teamNumber + '-' + playerNumber}>
                <h3>J {currentPlayerNumber}</h3>
                <IconButton icon="delete-forever" onPress={() => this.props.removePlayer(teamNumber, playerNumber)} />
              </View>;
            })}

          </View>;
        })}

        <Button icon="plus" onPress={this.props.addTeam}>Ajouter</Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    margin: 'auto',
    maxWidth: '500px',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
});

const mapStateToProps = (state: any) => ({
  currentGame: state.currentGame
})

const mapDispatchToProps = (dispatch: Function) => ({
  updateGame: (data: any) => dispatch(updateGame(data)),
  addTeam: () => dispatch(addTeam()),
  removeTeam: (teamNumber: number) => dispatch(removeTeam(teamNumber)),
  removePlayer: (teamNumber: number, playerNumber: number) => dispatch(removePlayer(teamNumber, playerNumber)),
})

export default connect(mapStateToProps, mapDispatchToProps)(GameModal)