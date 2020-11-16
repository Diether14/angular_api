import Repository from "./repository.js";
import Community from "../models/community.js";
import db from "../services/database.service.js";

export default class UserSettings extends Repository {
    constructor() {
        super();
        this.model = new Community();
        this.password_service = new PasswordService();
    }

    index(user_id) {
        const q = `SELECT * FROM ${this.model.table}`;
        const params = {
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
                            code: 500,
                            message: "Error fetching communities. please try again later",
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

    update(req) {
        const q =   `UPDATE ${this.model.table}
                        SET user_mode = :user_mode,
                            user_nickname = :user_nickname,
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

    create(req) {
        const q = `INSERT INTO 
                    ${this.model.table} (user_id, user_mode, user_nickname)
                    VALUES(:user_id, :user_mode, :user_nickname)`;
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
                        message: "User setting created.",
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
        const q = `DELETE FROM ${this.model.table} WHERE id = :id`;
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
