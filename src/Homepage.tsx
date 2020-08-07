import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import { StyleSheet, Text, View, Picker, TextInput } from 'react-native';
import intl from 'react-intl-universal';
import _ from 'lodash';
import { connect } from 'react-redux'
import { getLocales, updateLocale, initConfiguration } from './store/actions'
import { Appbar, Modal, Portal, Provider, Button } from 'react-native-paper';
import { Dispatch, Game } from './Types'
import PropTypes from 'prop-types';
import GameModal from './components/GameModal';


type NavigationProps = {
  initConfiguration: Function;
  updateLocale: Function;
  configuration: {
    locale: String;
  };
  addModal: Boolean;
  Game: Game;
}

class Navigation extends React.Component<NavigationProps> {


  constructor(props: any) {
    super(props);

    this.props.initConfiguration();

    this.state = {
      addModal: false
    }
  }


  render() {
    const hideModal = () => this.setState({ addModal: false });
    const showModal = () => {
      this.setState({ addModal: true });
    }

    const title = intl.formatMessage({ id: 'hak27d', defaultMessage: 'Test' });


    return (
      <Provider>
        <Portal>
          <Appbar.Header>
            <Appbar.Content title={intl.formatMessage({ id: 'homepage.title', defaultMessage: 'Game points' })} subtitle={intl.formatMessage({ id: 'homepage.subtitle', defaultMessage: 'Saved plays' })} />
            <Picker
              selectedValue={this.props.configuration.locale}
              style={{ height: 50, width: 150 }}
              onValueChange={(itemValue) => this.props.updateLocale(itemValue)}
            >
              {getLocales().map((value) => {
                return <Picker.Item label={value.name} value={value.value} key={value.value} />
              })}
            </Picker>
          </Appbar.Header>
          <View style={styles.container}>

            <Text>Open up App.tsx to start working on your app! ({title})</Text>
            <StatusBar style="auto" />
            <Button icon="plus" mode="contained" onPress={showModal}>Test</Button>
          </View>
          <View style={styles.container}>
            <Text>Open up App.tsx to start working on your app! ({title})</Text>
            <StatusBar style="auto" />
          </View>

          <Modal visible={this.state.addModal} onDismiss={hideModal}>
            <GameModal />
          </Modal>
        </Portal>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = (state: any) => ({
  configuration: state.configuration
})

const mapDispatchToProps = (dispatch: Function) => ({
  updateLocale: (locale: any) => dispatch(updateLocale(locale)),
  initConfiguration: () => dispatch(initConfiguration())
})

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)