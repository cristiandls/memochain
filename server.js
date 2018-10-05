const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();

app.use(express.static('./dist/'));
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, './dist/index.html'), function (err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})


app.listen(port);
console.log("Dirección del contrato", process.env.CONTRACT_ADDRESS);
console.log("Key de infura", process.env.INFURA_API_KEY);
console.log("Mi dirección", process.env.MY_ADDRESS);
console.log("Mi clave privada", process.env.PRIVATE_KEY);
console.log('Server started!');