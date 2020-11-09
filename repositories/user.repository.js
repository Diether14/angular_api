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

    getAll() {
        const q = `SELECT * FROM ${this.model.table}`;
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
                .execute(q, {}, true)
                .then((response) => {
                    resolve({
                        data: response.data,
                        code: 200,
                        message: "",
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

    getByID(id) {
        const q = `SELECT * FROM ${this.model.table} where id = :id`;
        const params = {
            binds: {
                id,
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
                    if (!response.data) {
                        reject({
                            data: {},
                            code: 404,
                            message: "User does not exist.",
                        });
                    }
                    resolve({
                        data: response.data,
                        code: 200,
                        message: "",
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
                .then(async (response) => {
                    if (!response.data) {
                        reject({
                            data: {},
                            code: 404,
                            message: "Username not found.",
                        });
                    }
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
                        ${this.model.table} (id, name, password, email)
                        VALUES(:id, :name, :password, :email)
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
                .simpleExecute(q, { binds })
                .then(async (response) => {
                    resolve({
                        data: response,
                        code: 201,
                        message: "User Registered",
                    });
                })
                .catch((err) => {
                    console.log("caught", err.message);
                    reject({
                        data: {},
                        code: 500,
                        message: err.message,
                        params,
                    });
                })
                .finally(() => {
                    database.close();
                });
        });
    }

    update(req) {
        const q = `UPDATE users
            SET id = :id,
            name = :name,
            email = :email,
            password = :password
            WHERE id_number = :id_number
                    `;
        const binds = req;
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
                .simpleExecute(q, { binds })
                .then(async (response) => {
                    resolve({
                        data: response,
                        code: 201,
                        message: "User profile updated",
                    });
                })
                .catch((err) => {
                    console.log("caught", err.message);
                    reject({
                        data: {},
                        code: 500,
                        message: err.message,
                        params,
                    });
                })
                .finally(() => {
                    database.close();
                });
        });
    }

    delete(req) {
        const q = `DELETE FROM users WHERE id_number = :id_number`;
        const binds = req;
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
                .simpleExecute(q, { binds })
                .then(async (response) => {
                    resolve({
                        data: response,
                        code: 201,
                        message: "User Deleted",
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
