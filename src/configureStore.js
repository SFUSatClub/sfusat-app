/* eslint global-require: 0 */

import Immutable from 'immutable';
import { Platform } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import * as actionCreators from './actions/counter';

import { composeWithDevTools } from 'remote-redux-devtools';

const middlewares = [thunk];

let enhancer;
let updateStore = f => f;
if (__DEV__) {
  const Reactotron = require('reactotron-react-native').default
  Reactotron
    .configure()
    .connect()

  /* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
  const installDevTools = require('immutable-devtools');
  installDevTools(Immutable);

  enhancer = composeWithDevTools(
    applyMiddleware(...middlewares),
  );
} else {
  enhancer = applyMiddleware(...middlewares);
}

export default function configureStore(initialState) {
  const store = createStore(reducer, initialState, enhancer);
  updateStore(store);
  if (module.hot) {
    module.hot.accept(() => {
      store.replaceReducer(require('./reducers').default);
    });
  }
  return store;
}
