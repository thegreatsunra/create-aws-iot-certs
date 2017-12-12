const aws = require('aws-sdk')
const config = require('./config')
const download = require('./download')
const fs = require('fs')
const path = require('path')
const random = require('./random')

aws.config.update({ region: config.region })
const iot = new aws.Iot()


iot.createKeysAndCertificate(params, (err, data) => {
  if (err) {
    console.log(err, err.stack)
  } else {
    console.log(data)
    privateKeyStream.write(data.keyPair.PrivateKey)
    privateKeyStream.end()

    publicKeyStream.write(data.keyPair.PublicKey)
    publicKeyStream.end()

    certificateStream.write(data.certificatePem)
    certificateStream.end()
  }
})

const privateKeyStream = fs.createWriteStream(path.resolve(__dirname, `${certPath}/private.pem.key`))
const publicKeyStream = fs.createWriteStream(path.resolve(__dirname, `${certPath}/public.pem.key`))
const certificateStream = fs.createWriteStream(path.resolve(__dirname, `${certPath}/certificate.pem.crt`))

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

download(config.rootCAUrl, `${config.certPath}/${config.rootCAFile}`)
