export const abiArray =
  [
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "name": "direcciones",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "jugadas",
      "outputs": [
        {
          "name": "idjugada",
          "type": "uint256"
        },
        {
          "name": "fecha",
          "type": "uint256"
        },
        {
          "name": "nombre",
          "type": "string"
        },
        {
          "name": "mail",
          "type": "string"
        },
        {
          "name": "intentos",
          "type": "uint256"
        },
        {
          "name": "tiempo",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "jugadanro",
          "type": "uint256"
        }
      ],
      "name": "addedJugada",
      "type": "event"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_direccion",
          "type": "address"
        },
        {
          "name": "_estado",
          "type": "bool"
        }
      ],
      "name": "updateDireccion",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_fecha",
          "type": "uint256"
        },
        {
          "name": "_nombre",
          "type": "string"
        },
        {
          "name": "_mail",
          "type": "string"
        },
        {
          "name": "_intentos",
          "type": "uint256"
        },
        {
          "name": "_tiempo",
          "type": "uint256"
        }
      ],
      "name": "addJugada",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "fetchJugadas",
      "outputs": [
        {
          "name": "",
          "type": "uint256[]"
        },
        {
          "name": "",
          "type": "uint256[]"
        },
        {
          "name": "",
          "type": "bytes32[]"
        },
        {
          "name": "",
          "type": "bytes32[]"
        },
        {
          "name": "",
          "type": "uint256[]"
        },
        {
          "name": "",
          "type": "uint256[]"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "source",
          "type": "string"
        }
      ],
      "name": "stringToBytes32",
      "outputs": [
        {
          "name": "result",
          "type": "bytes32"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];

export const contractAddress = '0xfd8a9874c2926b8f48096fbe736cefe935189fc0';

export const myAddress = '0x3CB0A8Af4289384696Dd2E576d54149c4b2f599F';

export const privateKey = Buffer.from('F7D0417D509D00CC54E77C7023C16B1F750F8FE6C9B5581436FA4191BE50C9BB', 'hex');

export const buildRanking = (web3, result) => {

  const allPlays = [];

  // Recorrer los resultados y pasarlos a un array
  for (let i = 0; i < result[0].length; i++) {

    const name = web3.utils.toUtf8(result[2][i]);
    const mail = web3.utils.toUtf8(result[3][i]);
    const attemps = parseInt(result[4][i]);
    const time = parseInt(result[5][i]);
    const date = result[1][i];

    allPlays.push({
      name,
      mail,
      attemps,
      time,
      date
    });
  }

  // Ordenar el array
  allPlays.sort((firstValue, secondValue) => {
    // Comparar el primer término los intentos
    if (firstValue.attemps > secondValue.attemps) return 1;
    if (firstValue.attemps < secondValue.attemps) return -1;

    // Comparar segundo el tiempo
    if (firstValue.time > secondValue.time) return 1;
    if (firstValue.time < secondValue.time) return -1;

    // Último comprar quien lo hizo antes
    if (firstValue.date > secondValue.date) return 1;
    if (firstValue.date < secondValue.date) return -1;
  });

  const top10List = allPlays.slice(0, 10);

  return top10List;

}