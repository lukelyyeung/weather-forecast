const zlib = require('zlib');
const path = require('path');
const { writeFile } = require('async-file');
const request = require('request');

function download(url) {
  return new Promise(function (resolve, reject) {
    request({
      url: url,
      method: 'GET',
      encoding: null,
    }, function (err, _, body) {
      if (err) {
        reject(err);
      } else {
        resolve(body);
      }
    });
  });
};

async function downloadAndUnzip(url) {
  console.log('Downloading country data...');
  const data = await download(url);
  console.log('Finish download country data.');
  console.log('Unzipping data json');

  zlib.gunzip(data, async function (err, unzipped) {
    console.log('Finish to unzip data json');

    const data = JSON.parse(unzipped.toString());

    const countries = Object.keys(data.reduce((result, current) => {
      result[current.country] = result[current.country] || true;
      return result;
    }, {}));

    console.log(`Fetched codes of ${countries.length} countries.`);
    console.log('Writing data to public folder');
    await writeFile(
      path.resolve('src', 'countries.json'),
      JSON.stringify(countries),
    );
    console.log('Done!');
  })

}

downloadAndUnzip('http://bulk.openweathermap.org/sample/city.list.min.json.gz');
