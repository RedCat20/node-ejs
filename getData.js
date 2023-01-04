const https = require('https');
const YAML = require('js-yaml');

const getData = async (req, res, next) => {
  let data = '';

  const url = 'https://run.mocky.io/v3/066f2a99-252b-4744-ae58-17382be9c462';

  await https.get(url, (resp) => {

    resp.on('data', (chunk) => {
        data += chunk;
      });

      resp.on('end', () => {
        const raw = YAML.load(data);
        // console.log('raw: ', raw);
        req.data = raw;
        // req.data = JSON.parse(JSON.stringify(raw));
        next();
      });

    }).on("error", (err) => {
      req.data = {};
      console.log("Error: " + err.message);
      next();
    });

}

module.exports = getData;