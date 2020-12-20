const fs = require('fs');
const { generateKeyPair } = require('crypto');
generateKeyPair('rsa', {
  modulusLength: 4096,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem'
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
    cipher: 'aes-256-cbc',
    passphrase: 'top secret'
  }
}, (err, publicKey, privateKey) => {
  // Handle errors and use the generated key pair.
  fs.writeFile('mypublic.pem', publicKey, (err) => {
      console.log(err);
  });
  fs.writeFile('myprivate.pem', privateKey, (err) => {
      console.log(err);
  });
});