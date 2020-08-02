import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import { StyleSheet, Text, View, Picker, TabBarIOS } from 'react-native';
import intl from 'react-intl-universal';
import _ from 'lodash';
import { connect } from 'react-redux'
import { updateLocale } from './store/actions'
import { Appbar, Modal, Portal, Provider } from 'react-native-paper';


class Navigation extends React.Component {
  constructor(props) {
    super(props);
  }

  _localeSwitcherModal() {

  }

  componentDidMount() {
  }

  render() {
    const title = intl.formatMessage({ id: 'hak27d' });

    return (
      <Provider>
        <Appbar.Header>
          <Appbar.Content title={intl.formatMessage({ id: 'homepage-title', defaultMessage: 'Match points' })} subtitle={intl.formatMessage({ id: 'homepage-subtitle', defaultMessage: 'Saved plays'})}  />
        </Appbar.Header>
        <View style={styles.container}>

          <Picker
            selectedValue={this.props.configuration.locale}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue) => this.props.updateLocale(itemValue)}
          >
            <Picker.Item label="en" value="en-US" />
            <Picker.Item label="fr" value="fr-FR" />
          </Picker>

          <Text>{this.props.configuration.locale} Open up App.tsx to start working on your app! ({title})</Text>
          <StatusBar style="auto" />
        </View>
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

const mapStateToProps = state => ({
  configuration: state.configuration
})

const mapDispatchToProps = dispatch => ({
  updateLocale: (locale: any) => dispatch(updateLocale(locale))
})

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)