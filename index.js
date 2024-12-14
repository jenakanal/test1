const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
const PORT = 3000;

// Middleware لتفسير البيانات القادمة من الـ form
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname)); // لخدمة ملفات HTML من نفس المجلد

// مسار لمعالجة النموذج
app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  // إعداد Nodemailer
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "genacanal@gmail.com", // بريدك الإلكتروني
      pass: "ge#123456#na", // كلمة المرور أو كلمة مرور التطبيق
    },
  });

  const mailOptions = {
    from: email,
    to: "genacanal@gmail.com", // البريد الإلكتروني المستهدف
    subject: `New message from ${name}`,
    text: `You received a new message:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.send("Message sent successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to send the message.");
  }
});

// تشغيل السيرفر
app.listen(PORT, () => {
  console.log(`Server is running on:${PORT}`);
});
