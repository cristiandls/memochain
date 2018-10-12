'use strict'

// Agregar las variables de .env a las variables de entorno
require('dotenv').config({ path: require('path').join(__dirname, '.env') });

const
  express = require('express'),
  path = require('path'),
  port = process.env.PORT || 8080,
  app = express(),
  bodyParser = require('body-parser'),
  bcController = require('./controllers/bc');

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('./dist/'));

// Router para la API
const routerBc = express.Router();
routerBc.route('/bc').post(bcController.postBc);
routerBc.route('/bc').get(bcController.getRanking);
app.use('/api', routerBc);

// Router para lo estatico
const router = express.Router();
router.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './dist/index.html'), function (err) {
    if (err) {
      res.status(500).send(err)
    }
  })
});
app.use(router);

app.listen(port);

console.log("Dirección del contrato", process.env.CONTRACT_ADDRESS);
console.log("Key de infura", process.env.INFURA_API_KEY);
console.log("Mi dirección", process.env.MY_ADDRESS);
console.log("Mi clave privada", process.env.PRIVATE_KEY);
console.log("Puerto", process.env.PORT);
console.log("Red blockchain", process.env.BLOCKCHAIN_NETWORK);
console.log('Server started!');