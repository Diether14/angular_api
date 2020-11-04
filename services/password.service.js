import bcrypt from 'bcrypt';
export default class Password {
    salt = 10;
    
    constructor() {

    }

    setPassword(string) {
        const hash = bcrypt.hashSync(string, this.salt);
        return hash;
    }

    comparePassword(string, hash) {
        let response = bcrypt.compareSync(string, hash);
        return response;
    }
}