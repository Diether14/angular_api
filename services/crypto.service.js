// const crypto = require('crypto');
import crypto from 'crypto'
const algorithm = 'aes-256-cbc';
const ENCRYPTION_KEY =Buffer.from('FoCKvdLslUuB4y3EZlKate7XGottHski1LmyqJHvUhs=', 'base64')//'nodaqencryptionkey' // or generate sample key Buffer.from('FoCKvdLslUuB4y3EZlKate7XGottHski1LmyqJHvUhs=', 'base64')
const IV_LENGTH = 16;

export default class cryptoService{buff

    encrypt(text) {
        let iv = crypto.randomBytes(IV_LENGTH);
        let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
        let encrypted = cipher.update(text.toString());
       
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        // console.log("encrypted "+iv.toString('hex') + ':' + encrypted.toString('hex'))
        return iv.toString('hex') + ':' + encrypted.toString('hex');
       }
       
    decrypt(text) {
        let textParts = text.split('%3A');
        let iv = Buffer.from(textParts.shift(), 'hex');
        let encryptedText = Buffer.from(textParts.join(':'), 'hex');
        let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
        let decrypted = decipher.update(encryptedText);
       
        decrypted = Buffer.concat([decrypted, decipher.final()]);
       
        return decrypted.toString();
       }
}

