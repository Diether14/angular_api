import Repository from "./repository.js";
import ChatModel from '../models/chat.js'
import UserModel from '../models/user.js'
import db from "../services/database.service.js";

export default class ChatRepository extends Repository {
    constructor() {
        super();
        this.model = new ChatModel();
        this.model2 = new UserModel();
    }
    //websocket
    async newMessage(data){
        // console.log(data)
        if(!data.room_id){
            const q = `INSERT INTO ${this.model.table} (creator_id,type,user_id2)
                VALUES (:creator_id,:type,:uid2);`;
            const params = {
                binds: {
                    creator_id:  data.uid1,
                    type: "rm",
                    uid2: data.uid2
                }
            };
            return new Promise(async (resolve, reject) => {
                const database = new db();
                await database.connect().catch((err) => {
                    console.log("caught", err.message);
                });
                database
                    .execute(q, params)
                    .then((response) => {
                        console.log(response.data)
                        const newgroupid = response.data.insertId;
                        
                        const u1 = `INSERT INTO ${this.model.table2} (room_id,user_id) VALUES (:room_id,:uid)`
                        const p1 ={
                            binds:{
                                room_id: newgroupid,
                                uid: data.uid1
                            }
                        }
                        const u2 = `INSERT INTO ${this.model.table2} (room_id,user_id) VALUES (:room_id,:uid)`
                        const p2 ={
                            binds:{
                                room_id: newgroupid,
                                uid: data.uid2
                            }
                        }
                        database.execute(u1,p1)
                        database.execute(u2,p2)

                        const q = `INSERT INTO ${this.model.table3}(room_id,message,sender_id) 
                            VALUES (:room_id,:message,:sender_id )`;
                        const params = {
                            binds: {
                                room_id: newgroupid,
                                message: data.text,
                                sender_id: data.uid1
                            }
                        };
                        return new Promise(async (resolve, reject) => {
                            const database = new db();
                            await database.connect()
                            database
                                .execute(q, params)
                        });
                    })
                    .catch((err) => {
                        console.log("caught", err.message);
                    })
                    .finally(() => {
                        database.close();
                    });
            });
        }
        const q = `INSERT INTO ${this.model.table3}(room_id,message,sender_id) 
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

    async createNewGroup(data){
        // console.log(data[0].group_name)
        const q = `INSERT INTO ${this.model.table} (room_name, creator_id,type)
            VALUES (:group_name, :creator_id, :type);`;
        const params = {
            binds: {
                group_name: data[0].group_name,
                creator_id:  data[0].creator_id,
                type: "grp"
            }
        };
        return new Promise(async (resolve, reject) => {
            const database = new db();
            await database.connect().catch((err) => {
                console.log("caught", err.message);
            });
            database
                .execute(q, params)
                .then((response) => {
                    console.log(response.data)
                    const newgroupid = response.data.insertId;
                    
                    data[1].forEach(uid => {
                        console.log(uid)
                        const q2 =`INSERT INTO ${this.model.table2} (room_id,user_id) VALUES (:room_id, :uid)`
                        const params2 = {
                            binds:{
                                room_id: newgroupid,
                                uid: uid.id
                            }
                        }
                        database.execute(q2,params2)
                    });
                })
                .catch((err) => {
                    console.log("caught", err.message);
                })
                .finally(() => {
                    database.close();
                });
        });
    }
    async updateTime(data){
        console.log(data)
        const q = `UPDATE  ${this.model.table} SET updated_at  =:curtime
            WHERE room_id =:room_id`;
        const params = {
            binds: {
                curtime: data.curtime,
                room_id: data.room_id
            }
        };
        return new Promise(async (resolve, reject) => {
            const database = new db();
            await database.connect().catch((err) => {
                console.log("caught", err.message);
            });
            database
                .execute(q, params)
                .catch((err) => {
                    console.log("caught", err.message);
                })
                .finally(() => {
                    database.close();
                });
        });
    }

    async getRoomsByUserID(data){

         const q =
        `SELECT DISTINCT *  FROM (
        SELECT tb1.user_id,tb2.*,tb3.name FROM ${this.model.table2} AS tb1
        JOIN  ${this.model.table} AS tb2 ON (tb1.room_id = tb2.room_id)
        LEFT JOIN ${this.model2.table} AS tb3 ON (tb2.user_id2 = tb3.id_number)
        ) AS table1
        WHERE user_id = :uid
        ORDER BY updated_at DESC
        
     `
        const params = {
            binds: {
                uid: data.currentUser
            }
        };
        return new Promise(async (resolve) => {
            const database = new db();
            await database.connect().catch((err) => {
                console.log("caught", err.message);
            });
            database
                .execute(q, params)
                .then((response) => {
                    // console.log(response)
                    resolve (response)
                })
                .catch((err) => {
                    console.log("caught", err.message);
                })
                .finally(() => {
                    database.close();
                });
        });
    }
   
    async getMessageByRoomID(data){
        // console.log(data)
        const q = `SELECT * FROM ${this.model.table3} WHERE room_id = :room_id`;
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
        // console.log(data)
        const q = `SELECT * FROM (
            SELECT * FROM ${this.model.table3} WHERE room_id = :room_id ORDER BY created_at DESC LIMIT :limit) AS tb1 
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
        // console.log(data.body)
        const q = `UPDATE ${this.model.table3} 
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
        // console.log(data.body)
        const q = `DELETE FROM ${this.model.table3} 
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

    async deleteMessageByRoomID(data){
        // console.log(data.body)
        const q = `DELETE FROM ${this.model.table3} 
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
