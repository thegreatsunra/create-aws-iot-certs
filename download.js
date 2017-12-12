const fs = require('fs')
const https = require('https')

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

module.exports = download
