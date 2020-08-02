import * as React from 'react';
import { Provider as PaperProvider, Appbar, Modal, Portal } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'
import reducers from './src/store/reducers'
import Homepage from './src/Homepage';
import thunk from 'redux-thunk';

const store = createStore(
  reducers,
  applyMiddleware(thunk)
)

export default class Entrypoint extends React.Component {
  render() {
    return (
      <StoreProvider store={store}>
        <PaperProvider>
          <Homepage />
        </PaperProvider>
      </StoreProvider>
    );
  }
}