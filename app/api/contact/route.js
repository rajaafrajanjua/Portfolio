import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.GMAIL_PASSKEY,
  },
});

const generateEmailTemplate = (name, email, userMessage) => `
  <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; background-color: #f4f4f4;">
    <div style="max-width: 600px; margin: auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
      <h2 style="color: #007BFF;">New Message Received</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <blockquote style="border-left: 4px solid #007BFF; padding-left: 10px; margin-left: 0;">
        ${userMessage}
      </blockquote>
      <p style="font-size: 12px; color: #888;">Click reply to respond to the sender.</p>
    </div>
  </div>
`;

async function sendEmail(payload) {
  const { name, email, message: userMessage } = payload;

  const mailOptions = {
    from: "Portfolio Website",
    to: process.env.EMAIL_ADDRESS,
    subject: `New Message From ${name}`,
    text: userMessage,
    html: generateEmailTemplate(name, email, userMessage),
    replyTo: email,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Error while sending email:", error.message);
    return false;
  }
}

// ✅ Handle CORS
export async function OPTIONS() {
  return NextResponse.json({}, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",   // allow any domain
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function POST(request) {
  try {
    const payload = await request.json();

    const emailSuccess = await sendEmail(payload);

    return NextResponse.json(
      {
        success: emailSuccess,
        message: emailSuccess ? "Email sent successfully!" : "Failed to send email.",
      },
      {
        status: emailSuccess ? 200 : 500,
        headers: {
          "Access-Control-Allow-Origin": "*", // allow cross-origin
        },
      }
    );
  } catch (error) {
    console.error("API Error:", error.message);
    return NextResponse.json(
      { success: false, message: "Server error occurred." },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*", // allow cross-origin
        },
      }
    );
  }
}
