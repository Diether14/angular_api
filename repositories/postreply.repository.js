 import Repository from "./repository.js";
import  PostReplyModel from "../models/postreply.js"
import db from "../services/database.service.js";

export default class PostReplyRepository extends Repository {
    constructor() {
        super();
        this.model= new PostReplyModel();
    }

    async newReply(data){
        const q = `INSERT INTO ${this.model.table}(user_id,post_id,comment_id,comment) 
                VALUES (:user_id, :post_id,:comment_id ,:comment)`;
        const params = {
            binds: {
                user_id: data.body.user_id,
                post_id: data.body.post_id,    
                comment_id: data.body.comment_id,            
                comment: data.body.comment,
            }
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
                        data: response.data,
                        code: 200,
                        message: "new reply created successfully",
                    });
                })
                .catch((err) => {
                    console.log("caught", err.message);
                    reject({
                        data: err,
                        code: 500,
                        message: err.message,
                    });
                })
                .finally(() => {
                    database.close();
                });
        });
    }

    async getReplyByID(data){
        const q = `SELECT * FROM ${this.model.table} WHERE id = :id`;
        const params = {
            binds: {
                id: data.id
            }
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
                        data: response.data,
                        code: 200,
                        message: "replies fetched successfuly.",
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

    async getReplyByComID(data){
        const q = `SELECT * FROM ${this.model.table} WHERE comment_id = :comment_id`;
        const params = {
            binds: {
                comment_id: data.comment_id
            }
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
                        data: response.data,
                        code: 200,
                        message: "replies fetched successfuly.",
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

    async getReplyByUserID(data){
        const q = `SELECT * FROM ${this.model.table} WHERE user_id = :user_id`;
        const params = {
            binds: {
                user_id: data.user_id
            }
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
                        data: response.data,
                        code: 200,
                        message: "replies fetched successfuly.",
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

    async updateReplyById(id,data){
        const q = `UPDATE ${this.model.table} 
                SET user_id = :user_id, post_id = :post_id, comment_id = :comment_id , comment = :comment
                WHERE id = :id`;
        const params = {
            binds: {
                id: id.id,
                user_id: data.body.user_id,
                post_id: data.body.post_id,
                comment_id: data.body.comment_id,
                comment: data.body.comment
            }
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
                        data: response.data,
                        code: 200,
                        message: "relpy updated successfuly.",
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

    async deleteReplyById(data){
        const q = `DELETE FROM ${this.model.table} WHERE id = :id`;
        const params = {
            binds: {
                id: data.id
            }
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
                        data: response.data,
                        code: 200,
                        message: "reply deleted successfuly.",
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
