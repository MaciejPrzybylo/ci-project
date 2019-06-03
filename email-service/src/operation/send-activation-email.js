const HttpStatus = require("http-status-codes")
const config = require("../config.json")
const axios = require("axios")
const aesEncryptionService = config.service.aesEncryptionService
let nodemailer = require("nodemailer")

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER, pass: process.env.GMAIL_PASS
    }
})

function encryptAccount(account, responseHandle, errorHandle) {
    axios.post(aesEncryptionService.url + aesEncryptionService.encrypt, {
        data: {
            account: account,
            timestamp: new Date()
        }
    }).then((response) => {
       responseHandle(response.data) 
    }, (error) => {
        console.error(error)
        errorHandle(config.error.somethingWentWrong, HttpStatus.INTERNAL_SERVER_ERROR)
    })
}

module.exports = function(account, activationLink, callback) {
    encryptAccount(account, (encryptedAccount) => {
        let text = `Hi ${account.forename},\n\nWelcome to ${process.env.SERVICE_NAME}.\n\nPlease go to the following link to activate your new account: ${activationLink}/${encryptedAccount}\n\nRegards,\n${process.env.SERVICE_NAME} Team`
        let mailOptions = {
            from: process.env.GMAIL_USER,
            to: account.email,
            subject: `Welcome to ${process.env.SERVICE_NAME}`,
            text: text
        }
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error)
                callback(config.error.somethingWentWrong, HttpStatus.INTERNAL_SERVER_ERROR)
            } else {
                console.log(info)
                callback(config.message.emailSent, HttpStatus.OK)
            }
        })
    }, (error, statusCode) => {
        callback(error, statusCode)
    })
}

