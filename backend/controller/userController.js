// this client variable lets us connect to the database and realize the queries we need
const client = require('../config/database');
// package used to hash the information needed with the sha256 algorithm
const crypto = require('crypto');

function saltCreator(){
    String.fromCharCode(66,67)
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

/**
 * @param {*} email of the user that wants to register
 * @param {*} username of the user that wants to register
 * @param {*} password of the user that wants to register
 * 1) we hash the password the sha256 algorithm
 * 2) check if the user exists in the database
 * 3) if he doesn't exist exists, we insert the information we got from the user to the database
 * 4) return the email, username and userId so that the user can log in after that
 */
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
/**
 * 
 * @param {*} email  of the user
 * @param {*} password  of the user
 * 1) if we have a user that the same name and password as the one passed in parameters
 * 2) if a user has been found, we return 1 if not return 0
 */
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
// we export the function that we want to use in another file
module.exports = {
    insertUser: insertUser,
    getSingleUser: getSingleUser
}