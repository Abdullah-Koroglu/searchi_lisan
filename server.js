// Import essential libraries
const express = require('express');
const elasticSearch = require('./search');
const elasticIngest = require('./ingest')
const bodyParser = require ('body-parser')
var cors = require('cors')

const app = express();
app.use (bodyParser.json ())
app.use(cors())

const router = express.Router();
// Setup essential routes
app.get('/', async (req, res) => {
  const body = {
    "query": {
      "match_phrase_prefix": {
        "attachment.content": req.query.text
      }
    }
  }
  const resSearch = await elasticSearch(req.query.index, req.query.type, body);
  resSearch.hits.hits[0] ? res.send(resSearch) :
    res.send('sonuc bulunamadi');
})

app.post('/', async (req, res) => {
  const body = {
    data: req.body.data
  }

  try {
    const response = await elasticIngest(req.body.index, req.body.type, body)
      res.send(response);
    } catch (error) {
      res.send(error);
  }
})

app.use('/', router);
app.listen(process.env.port || 3000);
console.log('Running at Port 3000');