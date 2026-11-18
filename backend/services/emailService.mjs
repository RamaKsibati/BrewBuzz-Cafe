// services/emailService.mjs
import nodemailer from "nodemailer";

export async function sendEmailWithAttachment(to, subject, text, filePath) {
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to,
        subject,
        text,
        attachments: [
            {
                filename: `receipt.pdf`,
                path: filePath,
            },
        ],
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
    } catch (error) {
        console.error("Error sending email:", error.message);
        throw new Error("Failed to send email");
    }
}
