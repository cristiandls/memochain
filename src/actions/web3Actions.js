import axios from 'axios';
import { buildRanking } from '../utils/ContractUtils';
export const INIT_WEB3 = 'INIT_WEB3';
export const GET_WEB3 = 'GET_WEB3';
export const GET_CONTRACT = 'GET_CONTRACT';
export const SEND_TRX = 'SEND_TRX';
export const SET_TRX = 'SET_TRX';
export const GET_RANKING = 'GET_RANKING';

export const getRanking = () => async (dispatch, getState) => {

  // Obtener el web3
  const web3 = getState().web3Reducer.web3;

  try {

    // Obtener lista de la api
    const res = await axios.get('http://localhost:8080/api/bc');

    // Ranking
    const top10List = buildRanking(web3, res.data.result);

    // Setear el ranking 
    dispatch(setRankingtop10List(top10List));

  } catch (err) {
    console.log("Error obteniendo jugadas: ", err)
  }

}

export function setRankingtop10List(top10List) {
  return {
    type: GET_RANKING,
    payload: top10List
  };
}

export const initWeb3 = () => async (dispatch) => {

  // Obtener web3
  dispatch(getWeb3());

}

export function getWeb3() {
  return {
    type: GET_WEB3
  };
}

export function getContract() {
  return {
    type: GET_CONTRACT
  };
}

export function setTrx(trx) {
  return {
    type: SET_TRX,
    payload: trx
  }
}

export const sendTrx = (name, email, time, attemps) => async (dispatch) => {

  try {

    const res = await axios.post('http://localhost:8080/api/bc', {
      name,
      email,
      time,
      attemps
    });

    // Setear la transacción
    dispatch(setTrx(res.data.txHash));

  } catch (err) {
    console.log("Error obteniendo jugadas: ", err)
  }

};