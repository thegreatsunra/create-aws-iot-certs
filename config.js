const config = {
  certificateFile: 'certificate.pem.crt',
  certPath: './cert',
  policyName: 'policy',
  privateKeyFile: 'private.pem.key',
  publicKeyFile: 'public.pem.key',
  region: 'us-west-2',
  rootCAFile: 'root-CA.pem',
  rootCAUrl: 'https://www.symantec.com/content/en/us/enterprise/verisign/roots/VeriSign-Class%203-Public-Primary-Certification-Authority-G5.pem',
  setNewCertAsActive: true,
  thingTypeName: 'gateway'
}

module.exports = config
