const aws = require('aws-sdk')
aws.config.update({ region: 'us-west-2' })
const iot = new aws.Iot()
const params = {
  setAsActive: true
}

iot.createKeysAndCertificate(params, (err, data) => {
  if (err) {
    console.log(err, err.stack)
  } else {
    console.log(data)
  }
})
