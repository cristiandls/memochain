import Tx from 'ethereumjs-tx';
import { myAddress, contractAddress, privateKey, buildRanking } from '../utils/ContractUtils';
export const INIT_WEB3 = 'INIT_WEB3';
export const GET_WEB3 = 'GET_WEB3';
export const GET_CONTRACT = 'GET_CONTRACT';
export const SEND_TRX = 'SEND_TRX';
export const SET_TRX = 'SET_TRX';
export const GET_RANKING = 'GET_RANKING';

export const getRanking = () => async (dispatch, getState) => {

  // Obtener el web3
  const web3 = getState().web3Reducer.web3;

  // Obtener el contrato
  const contract = getState().web3Reducer.contract;

  try {

    // Obtener todas las jugadas
    const result = await contract.methods.fetchJugadas().call();

    // Ranking
    const top10List = buildRanking(web3, result);
    console.log("juanaaaaaaaaa", top10List);

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

  // Obtener el contrato
  dispatch(getContract());

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

export const sendTrx = (name, email, time, attemps) => async (dispatch, getState) => {

  // Obtener el web3
  const web3 = getState().web3Reducer.web3;

  // Obtener el contrato
  const contract = getState().web3Reducer.contract;

  try {

    // Contar las transacciones
    const trxCount = await web3.eth.getTransactionCount(myAddress)

    // Crear transacción
    const rawTransaction = {
      "from": myAddress,
      "gasPrice": web3.utils.toHex(20 * 1e9),
      "gasLimit": web3.utils.toHex(420000),
      "to": contractAddress,
      "value": "0x00",
      "data":
        // En el payload de la transacción enviar la ejeucion del método addJugada
        contract.methods.addJugada(
          Date.now(),
          name,
          email,
          attemps,
          parseInt(time / 1000)).encodeABI(),
      "nonce": web3.utils.toHex(trxCount)
    }

    // Crear una instancia con la transacción
    const transaction = new Tx(rawTransaction);

    // Firmar la transacción con mi clave privada
    transaction.sign(privateKey);

    //Enviarla
    await web3.eth.sendSignedTransaction('0x' + transaction.serialize().toString('hex'))
      .on('transactionHash', (txHash) => {
        console.log("Hash de la transacción:", txHash);
        dispatch(setTrx(txHash));
      })
      .on('receipt', (receipt) => {
        console.log("Receipt de trx:", receipt)
      });

  } catch (err) {
    console.log("Error creando trx.:", err)
  }

};