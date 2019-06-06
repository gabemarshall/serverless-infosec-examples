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

exports.getFunctionProps = function () {
  return config['functions']
}

exports.getFunctionFQN = function (name) {
  let stage;
  if (!config.provider.stage) {
    stage = 'dev';
  } else {
    stage = config.provider.stage;
  }

  let functions = Object.entries(exports.getFunctionProps())
  for (i = 0; i < functions.length; i++) {
    if (functions[i][0].includes(name)) {
      return `${config.service}-${stage}-${functions[i][0]}`
    }
  }

}

exports.loggingIsEnabled = function () {
  return config['slskit-logging'];
}
exports.getRegions = function () {
  return config['slskit-regions'];
}