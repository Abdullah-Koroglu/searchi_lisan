const elasticClient = require('./elasticClient');
const elasticIndex = require('./index');
const elasticMap = require('./mapping');
const elasticDocument = require('./document');
const elasticSearch = require('./search');

elasticClient.ping({
    requestTimeout: 1000
}, async function (error) {
    if (error) {
        console.trace('Elasticsearch\'e erişilmiyor!');
    } else {
        console.log('Elasticsearch ayakta :)');
        try {
            // //CreateIndex
            // const resp = await elasticIndex('games');
            // console.log("Index:" + resp);

            // //Create GameMap
            // const mapping = {
            //     properties: {
            //         title: {
            //             type: "text"
            //         },
            //         tags: {
            //             type: "keyword"
            //         },
            //         body: {
            //             type: "text"
            //         },
            //         age: {
            //             type: "integer"
            //         }
            //     }
            // }
            // const resmap = await elasticMap('games', 'categorystore', mapping);
            // //-----------
            // //Elastic Searc'e Data Atma
            // var data = [
            //     {
            //         title: "Call Of Duty",
            //         tags: ['War', 'Shooter'],
            //         body: "It is about 2.Word War",
            //         age: 13
            //     },
            //     {
            //         title: "Mortal Kombat 11",
            //         tags: ['Fight', 'Violance'],
            //         body: "It is about killing each other",
            //         age: 20
            //     },
            //     {
            //         title: "Death Stranding",
            //         tags: ['Delivery', 'Beach'],
            //         body: "It is about deleviring package to it's owner.",
            //         age: 18
            //     }
            // ];
            //  for (i = 0; i < data.length; i++) {
            //     const resdocumnet = await elasticDocument('games', i+1, 'categorystore', data[i]);
            // }

            const body = {
              // query: {
              //     match_phrase_prefix: {
              //         "title": "Death"
              //     }
              // }
              "query" : {
                "match_phrase_prefix": {
                  "attachment.content": `V7. #EW`
                }
              }
          }
          const resSearch = await elasticSearch('my_index', 'my_type', body);
          resSearch.hits.hits[0] ? console.log(`Adı: ${resSearch.hits.hits[0]._source.attachment.content}`):
          console.log('sonuc bulunamadi');
          ;

        } catch (e) {
            console.log(e);
        }
    }
});