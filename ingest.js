const elasticClient = require('./elasticClient');
const ingest = async function (indexName, mappingType, searchQuery) {
    return await elasticClient.index({
        index: indexName,
        type: mappingType,
        body: searchQuery
    });
}

module.exports = ingest;