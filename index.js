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
  let thingData = {}
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
  try {
    const createThingParams = {
      thingName: `${random.createString(8, 'lowercasenumbers')}`,
      thingTypeName: config.thingTypeName
    }
    thingData = await iot.createThing(createThingParams).promise()
  } catch (err) {
    console.log('error', err)
  }
  }
}

createAndAssignCerts()

download(config.rootCAUrl, `${config.certPath}/${config.rootCAFile}`)
