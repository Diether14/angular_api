// const crypto = require('crypto');
import crypto from 'crypto'
const algorithm = 'aes-256-ctr';
const ENCRYPTION_KEY =crypto.randomBytes(32)//'nodaqencryptionkey' // or generate sample key Buffer.from('FoCKvdLslUuB4y3EZlKate7XGottHski1LmyqJHvUhs=', 'base64')
const IV_LENGTH = 16;

export default class cryptoService{buff
    encrypt(text) {
        let iv = crypto.randomBytes(IV_LENGTH);
        let cipher = crypto.createCipheriv(algorithm, Buffer.from(ENCRYPTION_KEY, 'hex'), iv);
        let encrypted = cipher.update( "testing");
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return iv.toString('hex') + ':' + encrypted.toString('hex');
    }
    
    decrypt(text) {
        console.log(text)
        let textParts = text.split('%');
        let iv = Buffer.from(textParts.shift(), 'hex');
        let encryptedText = Buffer.from(textParts.join('%'), 'hex');
        let decipher = crypto.createDecipheriv(algorithm, Buffer.from(ENCRYPTION_KEY), iv);
        let decrypted = decipher.update(encryptedText);
       
        decrypted = Buffer.concat([decrypted, decipher.final()]);
       
        return decrypted.toString();
    }
}

