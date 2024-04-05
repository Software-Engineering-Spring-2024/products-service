
const constants = require('../constants/constants');
const nodemailer = require('nodemailer');
const {send} = require("express/lib/response");
const {getUserDetailsById} = require("./getUserDetailsById");
const {getProductById} = require("./getProductById");

let transporter = nodemailer.createTransport({
    service: constants.GMAIL,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASSWORD,
    },
});

function setMailContext(email, otp) {
    return {
        from: process.env.EMAIL,
        to: email,
        subject: 'Booking Successful!!!',
        text: `Your Booking is Successful for `,
    }
}

const sendBookingMail = async (product_id,user_id) => {
    let user;
    let product;
    try {
        user = await getUserDetailsById(user_id);
        product = await getProductById(product_id);
        if(product.code===200){
            let title = product.data[0].title
        }
        // title = product.
    } catch (e) {
        console.log(e);
    }
    const message = `Booking Successful for ${title}`
    const mailContext = setMailContext(user.email,message);
    console.log(mailContext);
    console.log(process.env.EMAIL,process.env.APP_PASSWORD);
    try {
        const {error, info} = await sendMail(mailContext);
        if (error) {
            // return res.status(500).send({message: "Some Error, Please Try Again!!!"});
        }
        // If no error, send success response
        return true;
    } catch (err) {
        // Handle unexpected errors
        return false;
    }
}

function generateOtp(){
    return otpGenerator.generate(5,{digits:true,lowerCaseAlphabets:false,upperCaseAlphabets:false,specialChars : false});
}
async function sendMail (mailOptions)  {
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            console.log(error);
            console.log(info);
            if (error) {
                return resolve({error});
            }
            resolve({info});
        });
    });
}

module.exports = sendBookingMail;