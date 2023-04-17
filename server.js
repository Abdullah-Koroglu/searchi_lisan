// Import essential libraries
const express = require('express');
const elasticSearch = require('./search');
const app = express();
const router = express.Router();
// Setup essential routes
app.get('/', async (req, res) => {
  const body = {
    // query: {
    //     match_phrase_prefix: {
    //         "title": "Death"
    //     }
    // }
    "query" : {
      "match_phrase_prefix": {
        "attachment.content": req.query.text
      }
    }
}
const resSearch = await elasticSearch('my_index', 'my_type', body);
resSearch.hits.hits[0] ? res.send(`content is: ${resSearch.hits.hits[0]._source.attachment.content}`):
res.send('sonuc bulunamadi');
;

  // res.send(`anasayfaya GET isteği ${req.query.test}`)
})

app.use('/', router);
app.listen(process.env.port || 3000);
console.log('Running at Port 3000');