const client = require('../config/database');
const crypto = require('crypto');

function getSingleUser(email, password) {
    return new Promise(async (resolve) => {
        password = crypto.createHash('sha256').update(password).digest('base64');
        const check = await checkUserExistance(email, password);
        if (check === 1) {
            client.query('SELECT userId, username, email FROM users WHERE email = ? AND password = ?',[email, password], function (error, results, fields) {
                if (error) throw error;
                console.log('The solution is: ', results[0] );           
                resolve(results[0]);
              });
        }
    });
}

async function insertUser(email, username, password) {
    return new Promise(async resolve => {
        password = crypto.createHash('sha256').update(password).digest('base64');
        const check = await checkUserExistance(email, password);
        if (check == 0) {
            client.query('INSERT INTO USERS(email,password,username) VALUES(?,?,?)',[email, password, username], function (error, results, fields) {
                if (error) throw error;
                console.log('The solution is: ', results);
                const result = {email: email, username: username, userId: results.insertId}           
                resolve(result);
              });
        }
        else {
            return "element exists already";
        }
    })
}

async function checkUserExistance(email, password) {
    return new Promise(async (resolve, reject) => {
        try {
            client.query('SELECT EXISTS (SELECT 1 FROM users WHERE email = ? AND password = ?) AS solution',[email, password], function (error, results, fields) {
                if (error) throw error;
                console.log('The solution is: ', results[0].solution );           
                resolve(results[0].solution);
              });
        } catch (err) {
            console.log(err.stack)
        }
    });
}

module.exports = {
    insertUser: insertUser,
    getSingleUser: getSingleUser
}