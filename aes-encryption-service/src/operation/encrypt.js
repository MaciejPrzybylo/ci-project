const aes = 'aes-256-cbc'
const config = require("../config.json")
const crypto = require("crypto")


module.exports = function(data, callback) {
    const key = crypto.scryptSync(config.secret, 'salt', 32);
    const iv = Buffer.alloc(16, 0);
    const cipher = crypto.createCipheriv(aes, config.secret, iv);
    let encrypted = '';
    cipher.on('readable', () => {
        let chunk;
        while (null !== (chunk = cipher.read())) {
            encrypted += chunk.toString('hex');
        }
    });
    cipher.on('end', () => {
        console.log("encrypted data:");
        console.log(encrypted);
        callback(encrypted, 200)
    });
    if (typeof data == 'string') {
        cipher.write(data, 'utf8');
    } else {
        cipher.write(JSON.stringify(data), 'utf8')
    }
    cipher.end();
}

