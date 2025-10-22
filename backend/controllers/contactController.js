import nodemailer from "nodemailer";
import Contact from "../models/Contact.js";

const submitContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        status: "error",
        message: "All fields are required",
        statusCode: 400,
      });
    }

    const contact = new Contact({
      name,
      email,
      message,
    });

    await contact.save();

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `Resume Builder <${process.env.EMAIL_USER}>`,
      to: "resumebuilder@nexelix.tech",
      replyTo: email,
      subject: "New Contact Form Submission",
      html: `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f6f8; padding: 30px;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
        
        <div style="background: linear-gradient(135deg, #2563eb, #10b981); color: #ffffff; padding: 20px 30px; text-align: center;">
          <h2 style="margin: 0; font-size: 22px; font-weight: 600;">New Contact Form Submission</h2>
        </div>

        <div style="padding: 25px 30px; color: #333333; line-height: 1.6;">
          <p style="font-size: 16px; margin-bottom: 8px;"><strong>Name:</strong> ${name}</p>
          <p style="font-size: 16px; margin-bottom: 8px;"><strong>Email:</strong> ${email}</p>
          <p style="font-size: 16px; margin-bottom: 15px;"><strong>Message:</strong><br/>
          <span style="white-space: pre-line; background-color: #f9fafb; padding: 10px; border-radius: 6px; display: block; margin-top: 6px;">${message}</span></p>
        </div>

        <div style="background-color: #f9fafb; padding: 15px 30px; text-align: center; border-top: 1px solid #e5e7eb;">
          <p style="font-size: 14px; color: #6b7280; margin: 0;">📨 Sent from <strong>Resume Builder Contact Form</strong></p>
        </div>
      </div>
    </div>
  `,
    };

    await transporter.sendMail(mailOptions);

    const userMailOptions = {
      from: `Resume Builder <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Thank You for Contacting Resume Builder",
      html: `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f6f8; padding: 30px;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
        
        <div style="background: linear-gradient(135deg, #10b981, #2563eb); color: #ffffff; padding: 25px 30px; text-align: center;">
          <h2 style="margin: 0; font-size: 22px; font-weight: 600;">Thank You, ${name}!</h2>
        </div>

        <div style="padding: 25px 30px; color: #333333; line-height: 1.6;">
          <p style="font-size: 16px;">We’ve received your message and our team will get back to you within <strong>24 hours</strong>.</p>

          <p style="margin-top: 20px; font-size: 16px;">
            <strong>Your Message:</strong><br/>
            <span style="white-space: pre-line; background-color: #f9fafb; padding: 10px; border-radius: 6px; display: block; margin-top: 6px;">${message}</span>
          </p>

          <p style="margin-top: 25px; font-size: 16px;">In the meantime, feel free to explore our latest tools and templates to make your resume stand out!</p>
        </div>

        <div style="background-color: #f9fafb; padding: 15px 30px; text-align: center; border-top: 1px solid #e5e7eb;">
          <p style="font-size: 14px; color: #6b7280; margin: 0;">
            💼 Best regards,<br/>
            <strong>Resume Builder Team</strong><br/>
            <a href="https://resume-builder.nexelix.tech/" style="color: #2563eb; text-decoration: none;">www.Resume-Builder.com</a>
          </p>
        </div>
      </div>
    </div>
  `,
    };

    await transporter.sendMail(userMailOptions);
    res.status(200).json({
      status: "success",
      message: "Message sent successfully! We'll get back to you soon.",
      statusCode: 200,
    });
  } catch (error) {
    console.error("Error submitting contact form:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
      statusCode: 500,
    });
  }
};

export default {
  submitContactForm,
};
