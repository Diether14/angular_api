import {validationResult} from 'express-validator';
import db from "../services/database.service.js";

class Validator {

  validate(validations) {
    return async (req, res, next) => {
      await Promise.all(validations.map(validation => validation.run(req)));
  
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        return next();
      }
  
      res.status(400).json({ errors: errors.array() });
    };
  }

  unique(value, column){
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

      const arr = column.split('.');
      if(arr.length !== 2){
        reject('Invalid table/column');
      }

      const table = arr[0];
      const field = arr[1];
      const q = `SELECT * FROM ${table} where ${field} = :value`;
      const params = {
          binds: {
              value: value,
          },
      };
            database
                .execute(q, params, true)
                .then(async (response) => {
                  if(response.data.length){
                    reject(`${field} already exists`);
                  } else {
                    resolve();
                  }
                })
                .catch((err) => {
                    console.log("caught", err.message);
                    reject(err.message);
                })
                .finally(() => {
                    database.close();
                });
    })
  }

  strong(value) {
    return new Promise ((resolve, reject) => {
      const specialChars = new RegExp("[$@$!%*#?&]").test(value);
      const number = new RegExp("[0-9]").test(value);
      if(!specialChars || !number) {
        reject(`Should contain ateast one number and one special character`)
      } else {
        resolve()
      }
    })
  }

  matches(value, base) {
    return new Promise ((resolve, reject) => {
      if(value !== base.value.body[base.field]) {
        reject(`${base.field}'s doesn't match`);
      } else {
        resolve();
      }
    })
  }

  ownedOrUnique(value, column, pk_field = 'id', req) {
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

      const arr = column.split('.');
      if(arr.length !== 2){
        reject('Invalid table/column');
      }
      const table = arr[0];
      const field = arr[1];
      const q = `SELECT * FROM ${table} WHERE ${field} = :value AND ${pk_field} != :pk_value`;
      const params = {
          binds: {
              value: value,
              pk_value: parseInt(req.params[pk_field])
          },
      };
            database
                .execute(q, params, true)
                .then(async (response) => {
                  if(response.data.length){
                    reject(`${field} already exists and is owned by another user.`);
                  } else {
                    resolve();
                  }
                })
                .catch((err) => {
                    console.log("caught", err.message);
                    reject(err.message);
                })
                .finally(() => {
                    database.close();
                });
    })
  }

}

export default Validator;