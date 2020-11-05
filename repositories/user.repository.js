import Repository from "./repository.js";
import UserModel from "../models/user.js";
import db from "../services/database.service.js";
import PasswordService from "../services/password.service.js";

export default class UserRepository extends Repository {
    constructor() {
        super();
        this.model = new UserModel();
        this.password_service = new PasswordService();
    }

    async login(req) {
        const q = `SELECT * FROM ${this.model.table} where email = :username`;
        const params = {
            binds: {
                username: req.username,
            },
        };
        return new Promise(async (resolve, reject) => {
            const database = new db();
            await database.connect().catch((err) => {
                console.log("caught", err.message);
                reject({
                    data: {},
                    code: 500,
                    message: err.message,
                });
            });
            database
                .execute(q, params)
                .then((response) => {
                    if(!this.password_service.comparePassword(req.password, response.data.password)){
                        reject({
                            data: {},
                            code: 401,
                            message: 'Incorrect Password',
                            response,
                        pw: req.password,
                    });
                    }
                    resolve({
                        data: response.data.password,
                        pw: req.password,
                        code: 200,
                        message: "Sucessfuly Logged in",
                        password: this.password_service.setPassword(req.password)
                    });
                })
                .catch((err) => {
                    console.log("caught", err.message);
                    reject({
                        data: {},
                        code: 500,
                        message: err.message,
                    });
                })
                .finally(() => {
                    this.database.close();
                });
        });
    }
}
