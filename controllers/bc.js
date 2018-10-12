'use strict';

const
  Web3 = require('web3'),
  Tx = require('ethereumjs-tx'),
  abiArray = require('../contract');

exports.postBc = async (req, res) => {

  try {

    // Setear a infura como proveedor de los servicios de nodo
    const provider = new Web3.providers.HttpProvider(process.env.BLOCKCHAIN_NETWORK + process.env.INFURA_API_KEY)

    // Crear una instancia del WEB3
    const web3Instance = new Web3(provider);

    // Crear una instancia del contrato
    const contract = new web3Instance.eth.Contract(abiArray.abiArray, process.env.CONTRACT_ADDRESS, {
      from: process.env.MY_ADDRESS,
      gasPrice: '20000000000',
      gas: 3000000
    });

    // Contar las transacciones
    const trxCount = await web3Instance.eth.getTransactionCount(process.env.MY_ADDRESS)

    // Crear un objeto con los datos a pasarle a la transacción
    const rawTransaction = {
      "from": process.env.MY_ADDRESS,
      "gasPrice": web3Instance.utils.toHex(20 * 1e9),
      "gasLimit": web3Instance.utils.toHex(420000),
      "to": process.env.CONTRACT_ADDRESS,
      "value": "0x00",
      "data":
        // En el payload de la transacción enviar la ejeucion del método addJugada
        contract.methods.addJugada(
          Date.now(),
          req.body.name,
          req.body.email,
          req.body.attemps,
          parseInt(req.body.time / 1000)).encodeABI(),
      "nonce": web3Instance.utils.toHex(trxCount)
    }

    // Crear una instancia con la transacción
    const transaction = new Tx(rawTransaction);

    // Firmar la transacción con mi clave privada
    transaction.sign(Buffer.from(process.env.PRIVATE_KEY, 'hex'));

    //Enviar la transacción
    await web3Instance.eth.sendSignedTransaction('0x' + transaction.serialize().toString('hex'))
      .on('transactionHash', (txHash) => {
        res.status(201).jsonp({ txHash })
      });

  } catch (err) {
    res.status(500).send(err.message);
  }

}

exports.getRanking = async (req, res) => {

  try {

    // Setear a infura como proveedor de los servicios de nodo
    const provider = new Web3.providers.HttpProvider(process.env.BLOCKCHAIN_NETWORK + process.env.INFURA_API_KEY)

    // Crear una instancia del WEB3
    const web3Instance = new Web3(provider);

    // Crear una instancia del contrato
    const contract = new web3Instance.eth.Contract(abiArray.abiArray, process.env.CONTRACT_ADDRESS, {
      from: process.env.MY_ADDRESS,
      gasPrice: '20000000000',
      gas: 3000000
    });

    // Obtener todas las jugadas
    const result = await contract.methods.fetchJugadas().call();

    res.status(200).jsonp({ result })

  } catch (err) {
    res.status(500).send(err.message);
  }

}