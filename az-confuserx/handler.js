'use strict';

const os = require('os');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');
const azure = require('azure-storage');
const connStr = process.env['WEBSITE_CONTENTAZUREFILECONNECTIONSTRING'];
const blobService = azure.createBlobService(connStr);
const APPROOT = 'D:\\local\\VirtualDirectory0\\';

module.exports.confuserex = (context, req) => {
  const res = {};
  if (req.body.auth != connStr.split(';')[2]) {
    res.body = "Authentication Failed";
    context.done(null, res);
  } else {
    let localSrcPath = `${APPROOT}payload.cs`;
    // Retrieve the uploaded source code from blob storage, and store it locally on the function's file storage
    blobService.getBlobToLocalFile(req.body.container, 'payload.cs', localSrcPath, function (error, serverBlob) {
      // Compile with csc, store it in the confuserex folder
      let compileCmd = `D:\\Windows\\Microsoft.NET\\Framework64\\v4.0.30319\\csc.exe /unsafe /out:${APPROOT}\\confuserex\\payload.exe ${APPROOT}payload.cs`
      exec(compileCmd, (err, stdout, stderr) => {
        if (!err) {
          // If compilation went fine, obfuscate the binary with ConfuserEX
          let confuserCli = `${APPROOT}confuserex\\Confuser.CLI.exe -n ${APPROOT}confuserex\\serverless.crproj`
          exec(confuserCli, (err, stdout, stderr) => {
            // Upload the obfuscated binary back to the blob storage so that it can be retrieved
            blobService.createBlockBlobFromLocalFile(req.body.container, 'payload.exe', `${APPROOT}\\payload.exe`, function (err, result, response) {
              if (!err) {
                res.body = "Success";
              } else {
                res.body = "An error occurred";
              }

              // Cleanup the function's temporary files 
              exec(`cmd.exe /c del ${APPROOT}\\payload.exe`, () => { })
              exec(`cmd.exe /c del ${APPROOT}\\payload.cs`, () => { })

              context.done(null, res);
            });
          })
        } else {
          res.body = "An error occurred while trying to compile payload.cs"
          context.done(null, res);
        }
      });
    })
  }
};