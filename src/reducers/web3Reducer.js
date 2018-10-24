import Web3 from 'web3';
import { GET_WEB3, GET_RANKING, SET_TRX, SET_SUBMITTING } from "../actions/web3Actions";

const initialState = {
  submitting: false,
  bcTrx: null,
  top10List: [],
  web3: null
};

export const web3Reducer = (state = initialState, action) => {

  // Evaluar la acción despachada
  switch (action.type) {

    // Obtener la conexión con WEB3
    case GET_WEB3:
      const provider = new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/bdaca37a988e4283864a60e0bb1fa2eb")
      const web3Instance = new Web3(provider);
      return {
        ...state,
        web3: web3Instance,
      };

    case GET_RANKING:
      return {
        ...state,
        top10List: action.payload
      }

    case SET_TRX:
      return {
        ...state,
        bcTrx: action.payload
      }

    case SET_SUBMITTING:
      return {
        ...state,
        submitting: action.payload
      }
    // Si no es ninguna de las acciones anteriores
    default:
      return state;
  }
}