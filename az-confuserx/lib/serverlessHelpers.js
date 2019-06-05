const yaml = require('js-yaml');
const fs = require('fs');
const config = yaml.safeLoad(fs.readFileSync(__dirname + '/../serverless.yml', 'utf8'));

exports.getBucketNameFromLocal = function () {
  const configFile = __dirname + '/../' + '/.serverless/cloudformation-template-update-stack.json';
  try {
    let cloudFormConfig = require(configFile);
    return cloudFormConfig.Outputs.AttachmentsBucketName.Value;;
  } catch (err) {
    console.log(`A problem occurred trying to read ${configFile}`);
  }
}

exports.getServiceName = function () {
  return config['service'];
}

exports.getFunctionProps = function () {
  return config['functions']
}
exports.getRegions = function () {
  return config['slskit-regions'];
}