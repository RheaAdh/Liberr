const NodeGeocoder = require('node-geocoder');

const options = {
    provider: 'mapquest',

    // Optional depending on the providers
    //   fetch: customFetchImplementation,
    httpAdapter: 'https',
    apiKey: 'cSxudj5PgwfoNswGryj9zQGBJjzkNwJn', // for Mapquest, OpenCage, Google Premier
    formatter: null, // 'gpx', 'string', ...
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;
