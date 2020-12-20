const fs = require('fs');
const jwt = require('jsonwebtoken');

const privateKey = fs.readFileSync('./myprivate.pem','utf8');
const publicKey = fs.readFileSync('./mypublic.pem','utf8');

//==================================================================================
//                      mock matched user
//==================================================================================
let payload = {};
payload.userName = "Saleumsack";
payload.userId = "11223344"
payload.role = "Admin";

console.log("\n Payload: " + JSON.stringify(payload));

//==================================================================================
//                      sign token
//==================================================================================
var iss = "saleumsack";
var sub = "";
var aud = "";
var exp = "24h";

var signOptions = {
    issuer : iss,
//     subject: sub,
//     audience: aud,
    expiresIn: exp,
    algorithm: "RS256"
};

// Create the JWT Token
var token = jwt.sign(payload, {key: privateKey, passphrase: 'top secret'}, signOptions);

// Send this token to the client so that it can be used in subsecuent request
console.log("\n Token: " + token);


//==================================================================================
//                      token verification
//==================================================================================
// var verifyOptions = { 
//     issuer : iss,
//     subject: sub,
//     audience: aud,
//     maxAge: exp,
//     algorithms: ["RS256"]
// };
// var verified = jwt.verify(token, publicKey, verifyOptions);
var verified = jwt.verify(token, publicKey);
console.log("\n Verified: " + JSON.stringify(verified));

var decoded = jwt.decode(token, {complete: true});
console.log("\n Docoded Header: " + JSON.stringify( decoded.header));
console.log("\n Docoded Payload: " +  JSON.stringify(decoded.payload));
console.log("\n Details for the user " + payload.userId + " is sent back to client")