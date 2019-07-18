const saltArray = []
console.log(Math.seedrandom('hello'));

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