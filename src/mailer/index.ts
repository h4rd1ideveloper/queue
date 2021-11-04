import nodemailer from 'nodemailer';

export default nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'maia.sawayn88@ethereal.email',
        pass: 'WSJAHkvd7ajwqS7aVf'
    }
});