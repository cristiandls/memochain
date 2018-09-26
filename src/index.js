import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import gameReducer from './redux/gameReducer';
import { shuffleCards } from './redux/gameActions';
import App from './pages/App';

// Crear store
const store = createStore(gameReducer, applyMiddleware(logger));

// Mezclar fichas por primera vez
store.dispatch(shuffleCards());

const render = Component =>
  ReactDOM.render(
    <Provider store={store}>
      <AppContainer>
        <Component />
      </AppContainer>
    </Provider>,
    document.getElementById('root')
  );

render(App);
if (module.hot) module.hot.accept('./pages/App', () => render(App));
