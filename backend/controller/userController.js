// this client variable lets us connect to the database and realize the queries we need
const client = require('../config/database');
// package used to hash the information needed with the sha256 algorithm
const crypto = require('crypto');

function saltCreator() {
    String.fromCharCode(66, 67)
}

/**
 * @param {*} email of the user that wants to connect to the application
 * @param {*} password password of the user that wants to connect to the application
 * 
 * 1) we hash the password the sha256 algorithm
 * 2) check if the user exists in the database
 * 3) if he exists, we retrieve the information we need from the user (userID, username and email)
 * 4) return these information
 */
function getSingleUser(email, password) {
    return new Promise(async (resolve) => {
        password = crypto.createHash('sha256').update(password).digest('base64');
        console.log(password);
        let salt = await getSalt(email, password);
        if (typeof salt == 'undefined')
            salt = "";
        console.log(salt);
        const check = await checkUserExistance(email, password, salt);
        if (check === 1) {
            client.query('SELECT userId, username, email FROM Users WHERE email = ? AND password = ?', [email, password], function (error, results, fields) {
                if (error) throw error;
                console.log('The solution is: ', results[0]);
                resolve(results[0]);
            });
        }
    });
}

async function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

async function saltCreatorFunction(password) {
    let i = 0;
    let salt = "";
    while (i < 5) {
        const pos = await getRandomInt(password.length - 1);
        salt += password[pos];
        i++;
    }
    return salt;
}

/**
 * @param {*} email of the user that wants to register
 * @param {*} username of the user that wants to register
 * @param {*} password of the user that wants to register
 * 1) we hash the password the sha256 algorithm
 * 2) check if the user exists in the database
 * 3) if he doesn't exist exists, we insert the information we got from the user to the database
 * 4) return the email, username and userId so that the user can log in after that
 */

function getSalt(email, password) {
    return new Promise(async (resolve) => {
        client.query('SELECT salt FROM Users WHERE email = ? AND password = ?', [email, password], function (error, results, fields) {
            if (error) throw error;
            console.log('The solution is: ', results[0]);
            if (results.length > 0)
                resolve(results[0].salt);
            else
                resolve("");
        });
    });
}

async function insertUser(email, username, password) {
    return new Promise(async resolve => {
        password = crypto.createHash('sha256').update(password).digest('base64');
        let salt = await getSalt(email, password);
        const check = await checkUserExistance(email, password, salt);
        if (check == 0) {
            salt = await saltCreatorFunction(password);
            client.query('INSERT INTO Users(email,password,username, salt) VALUES(?,?,?,?)', [email, password, username, salt], function (error, results, fields) {
                if (error) throw error;
                console.log('The solution is: ', results);
                const result = { email: email, username: username, userId: results.insertId }
                resolve(result);
            });
        }
        else {
            return "element exists already";
        }
    })
}
/**
 * 
 * @param {*} email  of the user
 * @param {*} password  of the user
 * 1) if we have a user that the same name and password as the one passed in parameters
 * 2) if a user has been found, we return 1 if not return 0
 */
async function checkUserExistance(email, password, salt) {
    return new Promise(async (resolve, reject) => {
        try {
            client.query('SELECT EXISTS (SELECT 1 FROM Users WHERE email = ? AND password = ? AND salt = ?) AS solution', [email, password, salt], function (error, results, fields) {
                if (error) throw error;
                console.log('The solution is: ', results[0].solution);
                resolve(results[0].solution);
            });
        } catch (err) {
            console.log(err.stack)
        }
    });
}
// we export the function that we want to use in another file
module.exports = {
    insertUser: insertUser,
    getSingleUser: getSingleUser
}