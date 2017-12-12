const aws = require('aws-sdk')
const https = require('https')
const fs = require('fs')
const path = require('path')

aws.config.update({ region: 'us-west-2' })
const iot = new aws.Iot()

const certPath = './cert'
const rootCAUrl = 'https://www.symantec.com/content/en/us/enterprise/verisign/roots/VeriSign-Class%203-Public-Primary-Certification-Authority-G5.pem'
const params = {
  setAsActive: true
}

iot.createKeysAndCertificate(params, (err, data) => {
  if (err) {
    console.log(err, err.stack)
  } else {
    console.log(data)
    certificateStream.write(data.certificatePem)
    certificateStream.end()
  }
})

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

download(rootCAUrl, `${certPath}/root-CA.pem`)
