exports.abiArray =
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