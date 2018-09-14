import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import gameReducer from './components/redux/gameReducer';
import { shuffleCards } from './components/redux/gameActions';
import App from './components/App';

// Crear store
const store = createStore(gameReducer);

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
if (module.hot) module.hot.accept('./components/App', () => render(App));
