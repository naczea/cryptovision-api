const express = require('express');
const bodyParser = require('body-parser');
var arr = require('./data').arr;

const PORT = process.env.PORT || 3050;

const app = express();

app.use(bodyParser.json());


//cors config
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to crypto');
});

app.get('/crypto/get', (req, res) => {
  res.json(arr);
});

app.post('/crypto/post', (req, res) => {

  const customerObj = {
    name: req.body.name,
    usd: req.body.usd,
    image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579"
  };

  try {
    arr.push(customerObj);
    res.send('Coin created!');
  }catch(er){
    console.error(er);
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
