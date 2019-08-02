// this client variable lets us connect to the database and realize the queries we need
const client = require('../config/database');
// package used to hash the information needed with the sha256 algorithm
const crypto = require('crypto');
const UserModel = require('../model/UserModel.js');
const nodemailer = require("nodemailer");

const mailer = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    port: 25,
    auth: {
        user: 'swelloteam7@gmail.com',
        pass: 'DjQgS3yG09@7'
    },
    tls: {
        rejectUnauthorized: false
    }
});


const listOfUsers = [];

function getListofUsers(userId) {
    return new Promise((resolve, reject) => {
        client.query('SELECT userId, username, email FROM Users WHERE userId != ?', [userId], function (error, results, fields) {
            if (error) throw error;
            results.forEach(result => {
                if (!listOfUsers.some(user => user.getUserId == result.userId)) {
                    const user = new UserModel(result.userId, result.username, result.email);
                    listOfUsers.push(user);
                }
            })
            resolve(results);
        });
    })
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
        let salt = await getSalt(email, password);
        if (typeof salt == 'undefined')
            salt = "";
        const check = await checkUserExistance(email, password, salt);
        if (check === 1) {
            client.query('SELECT userId, username, email FROM Users WHERE email = ? AND password = ?', [email, password], function (error, results, fields) {
                if (error) throw error;
                if (!listOfUsers.some(user => user.getUserId == results[0].userId)) {
                    const user = new UserModel(results[0].userId, results[0].username, results[0].email);
                    listOfUsers.push(user);
                }
                let logintest = userinfo(results[0].userId);
                resolve(results[0]);
            });

            
        }
        else
            resolve("wrong email or wrong password");
    });
}


async function userinfo(userId) {
    return new Promise(async (resolve) => {
        client.query('SELECT username FROM Users where UserID =?', [userId], function (error, result, fields) {
            if (error) throw error;
            let username = result[0].username;
            client.query('INSERT INTO UserLog(UserID, UserName) Values(?,?)', [userId, username], function (error, results, fields) {
                if (error) throw error;
                resolve(results);
            });
            resolve(result);
        })
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
            client.query('INSERT INTO Users(AccountStatusID,email,password,username, salt) VALUES(1,?,?,?,?)', [email, password, username, salt], function (error, results, fields) {
                if (error) throw error;
                const result = { email: email, username: username, userId: results.insertId }
                const user = new UserModel(results.insertId, username, email, 1);
                listOfUsers.push(user);
                resolve(result);
            });
        }
        else {
            resolve("user exists already");
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
                resolve(results[0].solution);
            });
        } catch (err) {
        }
    });
}


function passwordForgotten(email) {
    client.query('SELECT userId, username, email FROM Users WHERE email = ?', [email], async (error, results, fields) => {
        await sendMailUpdatePwd(email, results[0].username);
    });
}


async function sendMailUpdatePwd(email, username) {
    await mailer.sendMail({
        from: 'swelloteam7@gmail.com', // sender address
        to: email, // list of receivers
        subject: "Hello ✔", // Subject line
        text: `Hello ${username}, please click on this link to update your password http://swellodesk.com:3000/password` // plain text body
    });
}

function updatePassword(email, password) {
    return new Promise(async (resolve, reject) => {
        const hashedPassword = crypto.createHash('sha256').update(password).digest('base64');
        let salt = await saltCreatorFunction(password);
        client.query('UPDATE Users SET password = ?, salt = ? WHERE email = ?', [hashedPassword, salt, email], async (error, results, fields) => {
            if (error) throw error;
            let res = await getSingleUser(email, password);
            resolve(res);
        });
    });
}

// we export the function that we want to use in another file
module.exports = {
    insertUser: insertUser,
    getSingleUser: getSingleUser,
    getListofUsers: getListofUsers,
    listOfUsers: listOfUsers,
    passwordForgotten: passwordForgotten,
    updatePassword: updatePassword
}