import Web3 from 'web3';
import { GET_WEB3, GET_CONTRACT } from "../actions/web3Actions";
import { contractAddress, abiArray, myAddress } from '../utils/ContractUtils';

const initialState = {
  plays: [],
  web3: null,
  contract: null
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

    // Obtener instancia del contrato
    case GET_CONTRACT:
      const web3 = state.web3;
      const contract = new web3.eth.Contract(abiArray, contractAddress, {
        from: myAddress,
        gasPrice: '20000000000',
        gas: 3000000
      });
      return {
        ...state,
        contract: contract
      };
    // Si no es ninguna de las acciones anteriores
    default:
      return state;
  }
}