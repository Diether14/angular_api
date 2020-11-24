 import Repository from "./repository.js";
import PostsModel from "../models/posts.js";
import db from "../services/database.service.js";

export default class PostsRepository extends Repository {
    constructor() {
        super();
        this.model = new PostsModel();
    }
    
    async index(){
        const q = `SELECT * FROM ${this.model.table}`;
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
                        message: "posts fetched successfuly.",
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

    async newPost(data){
        const q = `INSERT INTO ${this.model.table}(user_id,community_id,title,content,status,reason,tags,category_id,subclass_id) 
                VALUES (:user_id, :community_id, :title,:content,:status, :reason, :tags, :category_id, :subclass_id )`;
        const params = {
            binds: {
                user_id: data.body.user_id,
                community_id: data.body.community_id,
                title: data.body.title,
                content: data.body.content,
                status: data.body.status,
                reason: data.body.reason,
                tags: data.body.tags,
                category_id: data.body.category_id,
                subclass_id: data.body.subclass_id
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
                        message: "new post created successfully",
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

    async getPostById(data){
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
                        message: "posts fetched successfuly.",
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

    async getPostByComID(data){
        const q = `SELECT * FROM ${this.model.table} WHERE community_id = :com_id`;
        const params = {
            binds: {
                com_id: data.com_id
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
                        message: "posts fetched successfuly.",
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

    async getPostByUserID(data){
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
                        message: "posts fetched successfuly.",
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

    async updatePostById(id,data){
        const q = `UPDATE ${this.model.table} 
                SET user_id = :user_id, community_id = :community_id, title = :title, content = :content, status = :status, reason = :reason, tags = :tags, category_id = :category_id,  subclass_id = :subclass_id
                WHERE id = :id`;
        const params = {
            binds: {
                id: id.id,
                user_id: data.body.user_id,
                community_id: data.body.community_id,
                title: data.body.title,
                content: data.body.content,
                status: data.body.status,
                reason: data.body.reason,
                tags: data.body.tags,
                category_id: data.body.category_id,
                subclass_id: data.body.subclass_id
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
                        message: "post updated successfuly.",
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

    async deletePostById(data){
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
                        message: "post deleted successfuly.",
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
