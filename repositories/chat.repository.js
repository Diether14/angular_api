import Repository from "./repository.js";
import ChatModel from '../models/chat.js'
import db from "../services/database.service.js";

export default class ChatRepository extends Repository {
    constructor() {
        super();
        this.model = new ChatModel();
    }
    //websocket
    async newMessage(data){
        // console.log(data)
        if(!data.room_id){
            const q =`INSERT INTO ${this.model.table} (uid1, uid2) 
                    SELECT * FROM (SELECT :uid1 AS id1, :uid2 AS id2) AS tmp
                    WHERE NOT EXISTS (
                        SELECT * FROM ${this.model.table} WHERE uid1 = :uid1 AND uid2 = :uid2 OR uid2 = :uid1 AND uid1 =:uid2
                    );
                    `
            const params = {
                binds: {
                    uid1: data.uid1,
                    uid2: data.uid2
                }
            };
            return new Promise(async (resolve, reject) => {
                const database = new db();
                await database.connect()
                database
                    .execute(q, params)
                        const q2 = `INSERT INTO ${this.model.table2}(room_id,message,sender_id) 
                            VALUES (
                                (SELECT room_id FROM ${this.model.table} WHERE uid1 =:uid1 AND uid2 =:uid2 OR uid2 =:uid1 AND uid2 =:uid1),
                                :message,
                                :sender_id )`;
                        const params2 = {
                            binds: {
                                uid1: data.uid1,
                                uid2: data.uid2,
                                message: data.text,
                                sender_id: data.uid1
                            }
                        };
                        database
                            .execute(q2, params2)
                    .finally(() => {
                        database.close();
                    });
            });
        }
        const q = `INSERT INTO ${this.model.table2}(room_id,message,sender_id) 
            VALUES (:room_id,:message,:sender_id )`;
        const params = {
            binds: {
                room_id: data.room_id,
                message: data.text,
                sender_id: data.uid1
            }
        };
        return new Promise(async (resolve, reject) => {
            const database = new db();
            await database.connect()
            database
                .execute(q, params)
                .finally(() => {
                    database.close();
                });
        });
    }

    async getRoomsByUserID(data){
        console.log(data.body)
        const q = `SELECT * FROM ${this.model.table} WHERE uid1 = :uid1 OR uid2 = :uid1`;
        const params = {
            binds: {
                uid1: data.uid1
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
                        message: "rooms fetched successfuly.",
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
    async getMessageByRoomID(data){
        console.log(data)
        const q = `SELECT * FROM ${this.model.table2} WHERE room_id = :room_id`;
        const params = {
            binds: {
                room_id: data.room_id
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
                        message: "messages fetched successfuly.",
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

    async getMessageByRoomIDLimit(data){
        console.log(data)
        const q = `SELECT * FROM (
            SELECT * FROM ${this.model.table2} WHERE room_id = :room_id ORDER BY created_at DESC LIMIT :limit) AS tb1 
            ORDER BY created_at ASC
            `;
        const params = {
            binds: {
                room_id: data.room_id,
                limit: parseInt(data.limit)
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
                        message: "messages fetched successfuly.",
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

    async updateMessageByMsgID(id,data){
        console.log(data.body)
        const q = `UPDATE ${this.model.table2} 
        SET  message = :message
        WHERE msg_id = :msg_id`;
        const params = {
            binds: {
                msg_id: id.msg_id,
                message : data.body.message
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
                        message: "messages updated successfuly.",
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

    async deleteMessageByMsgID(data){
        console.log(data.body)
        const q = `DELETE FROM ${this.model.table2} 
        WHERE msg_id = :msg_id`;
        const params = {
            binds: {
                msg_id: data.msg_id
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
                        message: "message deleted successfuly.",
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

    async deleteMessageByMsgID(data){
        console.log(data.body)
        const q = `DELETE FROM ${this.model.table2} 
        WHERE room_id = :room_id`;
        const params = {
            binds: {
                room_id: data.room_id
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
                        message: "messages deleted successfuly.",
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
