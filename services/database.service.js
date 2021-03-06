import mysql from 'mysql';

export default class db {
    constructor() {
        this.dbcon ={
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'weendi'
        }
        this.connection = mysql.createConnection(this.dbcon);
    }
    getCon(){
        return this.dbcon;
    }

    connect() {
        return new Promise((resolve, reject) => {
            this.connection.connect((err) => {
                if (err) {
                    reject();
                }
                this.connection.config.queryFormat = function (query, values) {
                    if (!values) return query;
                    return query.replace(/\:(\w+)/g, function (txt, key) {
                      if (values.hasOwnProperty(key)) {
                        return this.escape(values[key]);
                      }
                      return txt;
                    }.bind(this));
                  };                
                resolve();
            });
        })
    }

    close() {
        this.connection.end();
    }

    execute(q, params = {}, collection = false) {
        return new Promise((resolve, reject) => {
            this.connection.query(q, params.binds || {}, (err, res, fields) => {
                if(err) {
                    reject(err);
                }
                resolve({
                    data: collection ? res[0] : res,
                });
            });

        });
    }
}
