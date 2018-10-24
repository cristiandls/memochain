import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { shuffleCards } from './actions/gameActions';
import { initWeb3 } from './actions/web3Actions';
import App from './pages/App';

console.log('ENVAR_CONTRACT_ADDRESS', ENVAR_CONTRACT_ADDRESS);
console.log('ENVAR_API_URL', ENVAR_API_URL);
console.log('ENVAR_BLOCKCHAIN_NETWORK', ENVAR_BLOCKCHAIN_NETWORK);
console.log('ENVAR_INFURA_NETWORK', ENVAR_INFURA_NETWORK);
console.log('ENVAR_INFURA_API_KEY', ENVAR_INFURA_API_KEY);
console.log('ENVAR_RANKING_REFRESH_TIME', ENVAR_RANKING_REFRESH_TIME);

// Crear store
const store = createStore(reducers, applyMiddleware(thunk, logger));

// Mezclar fichas por primera vez
store.dispatch(shuffleCards());

// Inicializar web3 y obtener el contrato
store.dispatch(initWeb3());

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
