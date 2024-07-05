const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/send-email', (req, res) => {
    const { from, to, subject, text } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'khushmeetsaini72@gmail.com',
            pass: 'nmvs nznb lhat ogby'
        }
    });

    const mailOptions = {
        from: from,
        to: to,
        subject: subject,
        text: text
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send({ success: false, message: error.toString() });
        }
        res.status(200).send({ success: true, message: 'Email sent successfully' });
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});