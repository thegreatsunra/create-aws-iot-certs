const aws = require('aws-sdk')
const config = require('./config')
const download = require('./download')
const fs = require('fs')
const path = require('path')
const random = require('./random')

aws.config.update({ region: config.region })
const iot = new aws.Iot()

async function createAndAssignCerts () {
  let certData = {}
  try {
    const createCertParams = {
      setAsActive: config.setNewCertAsActive
    }
    certData = await iot.createKeysAndCertificate(createCertParams).promise()
    const privateKeyStream = fs.createWriteStream(path.resolve(__dirname, `${config.certPath}/${config.privateKeyFile}`))
    const publicKeyStream = fs.createWriteStream(path.resolve(__dirname, `${config.certPath}/${config.publicKeyFile}`))
    const certificateStream = fs.createWriteStream(path.resolve(__dirname, `${config.certPath}/${config.certificateKeyFile}`))
    privateKeyStream.write(certData.keyPair.PrivateKey)
    privateKeyStream.end()
    publicKeyStream.write(certData.keyPair.PublicKey)
    publicKeyStream.end()
    certificateStream.write(certData.certificatePem)
    certificateStream.end()
  } catch (err) {
    console.log('error', err)
  }
  }

const download = (url, dest, cb) => {
  const file = fs.createWriteStream(dest)
  const request = https.get(url, (response) => { // eslint-disable-line no-unused-vars
    response.pipe(file)
    file.on('finish', () => {
      file.close(cb) // close() is async, call cb after close completes.
    })
  }).on('error', (err) => { // Handle errors
    fs.unlink(dest) // Delete the file async. (But we don't check the result)
    if (cb) cb(err.message)
  })
}

createAndAssignCerts()

download(config.rootCAUrl, `${config.certPath}/${config.rootCAFile}`)
