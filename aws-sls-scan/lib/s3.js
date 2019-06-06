const bluebird = require('bluebird');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

exports.download = function (params, outfile) {
  let async = bluebird.Promise.defer();
  let file;

  if (outfile) {
    file = require('fs').createWriteStream(outfile);
  } else {
    file = require('fs').createWriteStream('/tmp/' + params.Key);
  }

  let stream = s3.getObject(params).createReadStream();

  stream.pipe(file);
  stream.on('error', (e) => async.reject(e));
  stream.on('end', () => async.resolve());

  return async.promise;


}

exports.delete = function (params) {
  let async = bluebird.Promise.defer();
  s3.deleteObject(params, function (err, data) {
    if (err) {
      console.log(err, err.stack);  // error
      async.reject(e);
    } else {
      async.resolve();
      return async.promise;
    }
  });
}

exports.put = async function (params) {
  return s3.putObject(params).promise();
}
exports.stat = async function (params) {
  return s3.headObject(params).promise();
}

exports.listBuckets = async function (params) {
  return s3.listBuckets().promise();
}

// exports.listBuckets().then(function (data) {

//   let bc = 0;
//   let goBucketFound = false;
//   let goBucket;
//   while (!goBucketFound || bc < data.Buckets[1].length) {
//     try {

//       if (data.Buckets[bc].Name.includes("gobuster")){
//         console.log(data.Buckets[bc].Name);
//       }
//     } catch (err) {

//     }
//     goBucketFound = true;
//     bc++;
//   }
// })