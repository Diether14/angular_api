import Repository from "./repository.js";
import UserModel from "../models/user.js";
import db from "../services/database.service.js";
import PasswordService from "../services/password.service.js";
import bcrypt from "bcrypt";

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
                .then(async (response) => {
                    const isPasswordCorrect = this.password_service.comparePassword(
                        req.password,
                        response.data.password
                    );
                    if (!isPasswordCorrect) {
                        reject({
                            data: {},
                            code: 401,
                            message: "Incorrect Password",
                        });
                    }
                    resolve({
                        data: response.data,
                        code: 200,
                        message: "Sucessfuly Logged in",
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

    register(req) {
        const q = `INSERT INTO 
                        ${this.model.table} (birthdate, gender, nickname, password, email)
                        VALUES(:birthdate, :gender, :nickname, :password, :email)
                    `;
        const binds = req;
        delete binds.confirm_password;
        binds.password = this.password_service.setPassword(req.password);
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
                .simpleExecute(q, {binds})
                .then(async (response) => {
                    resolve({
                        data: response,
                        code: 201,
                        message: 'User Registered',
                    });
                })
                .catch((err) => {
                    console.log("caught", err.message);
                    reject({
                        data: {},
                        code: 500,
                        message: err.message,
                        params
                    });
                })
                .finally(() => {
                    database.close();
                });
        });
    }
}
