
const constants = require('../constants/constants');
const nodemailer = require('nodemailer');
const {send} = require("express/lib/response");
const {getUserDetailsById} = require("./getUserDetailsById");
const {getProductById} = require("./getProductById");

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASSWORD,
    },
});

function setMailContext(email, subject, message) {
    return {
        from: process.env.EMAIL,
        to: email,
        subject: subject,
        text: message,
    };
}


const sendBookingMail = async (product_id, user_id) => {
    let user, product, owner;
    let renterEmail, ownerEmail;

    try {
        user = await getUserDetailsById(user_id);
        product = await getProductById(product_id);
        owner = await getUserDetailsById(product.data[0].owner_id);
        renterEmail = user[0].email;
        ownerEmail = owner[0].email;
    } catch (e) {
        console.error('Error fetching user or product details:', e);
        return false; // Early return on error
    }

    const title = product.data[0].title;
    const renterMessage = `Your booking is successful for ${title}`;
    const ownerMessage = `Your product ${title} is rented out by ${user[0].username}`;

    // Send email to the renter
    const renterMailContext = setMailContext(renterEmail, 'Booking Successful!!!', renterMessage);
    const ownerMailContext = setMailContext(ownerEmail, 'Product Rented Out!!!', ownerMessage);

    try {
        const renterResponse = await sendMail(renterMailContext);
        const ownerResponse = await sendMail(ownerMailContext);
        if (renterResponse.error || ownerResponse.error) {
            console.error('Failed to send mail:', renterResponse.error, ownerResponse.error);
            return false;
        }
        console.log('Mail sent successfully:', renterResponse.info, ownerResponse.info);
        return true; // Success
    } catch (err) {
        console.error('Failed to send mail:', err);
        return false;
    }
};

async function sendMail(mailOptions) {
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Mail sending error:', error);
                resolve({ error });
            } else {
                console.log('Mail sent:', info);
                resolve({ info });
            }
        });
    });
}

module.exports = sendBookingMail;
