const aes = 'aes-256-cbc'
const config = require("../config.json")
const crypto = require("crypto")

module.exports = function(data, callback) {
    const key = crypto.scryptSync(config.secret, 'salt', 32);
    const iv = Buffer.alloc(16, 0);
    const decipher = crypto.createDecipheriv(aes, config.secret, iv);
    let decrypted = '';
    decipher.on('readable', () => {
        let chunk;
        while (null !== (chunk = decipher.read())) {
            decrypted += chunk.toString('utf8');
        }
    });
    decipher.on('end', () => {
        console.log("decrypted data:");
        console.log(decrypted);
        callback(decrypted, 200)
    });
    decipher.write(data, 'hex')
    decipher.end();
}

