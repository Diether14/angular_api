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

    async getUsers(){
        const q = `SELECT id_number,name FROM ${this.model.table}`;
        const params = {};
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
                    resolve({
                        
                        data: response.data,
                        code: 200,
                        message: "userlist fetched successfuly.",
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
                    database.close();
                });
        });
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
                    if(!this.password_service.comparePassword(req.password, response.data[0].password)){
                        reject({
                            data: {},
                            code: 401,
                            message: 'Incorrect Password',
                            response,
                        // pw: req.password,
                    });
                    }
                    resolve({

                        // data: response.data[0].password,
                        // pw: req.password,
                        code: 200,
                        id:response.data[0].id_number,
                        name:response.data[0].name,
                        message: "Sucessfuly Logged in",
                        // password: this.password_service.setPassword(req.password)
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
                    database.close();
                });
        });
    }

    async register(req) {
        console.log(req.body)
        const q = `INSERT INTO ${this.model.table}(name,email,password) values (:name,:email,:password)`;
        const params = {
            binds: {
                name: req.body.name,
                password: this.password_service.setPassword(req.body.password),
                email: req.body.email
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
                    resolve({
                        data: response.data.password,
                        pw: req.password,
                        code: 200,
                        message: "Sucessfuly Registered",
                        // password: this.password_service.setPassword(req.password)
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
                    database.close();
                });
        });
    }
}
