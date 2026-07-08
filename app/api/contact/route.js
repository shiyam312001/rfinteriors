import nodemailer from "nodemailer";
import { siteInfo } from "@/lib/content";

function getTransport() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const secure = process.env.SMTP_SECURE === "true";

  if (!host || !user || !pass) {
    throw new Error("SMTP configuration is missing.");
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const name = body?.name?.toString().trim();
    const phone = body?.phone?.toString().trim();
    const service = body?.service?.toString().trim();
    const message = body?.message?.toString().trim();

    if (!name || !phone || !service || !message) {
      return Response.json(
        { error: "Please fill out all fields before sending your enquiry." },
        { status: 400 },
      );
    }

    const transporter = getTransport();
    const toEmail = process.env.CONTACT_TO_EMAIL || siteInfo.email;

    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: toEmail,
      replyTo: `${name} <${process.env.CONTACT_REPLY_TO || siteInfo.email}>`,
      subject: `New enquiry from ${name} - ${service}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1f2937;">
          <h2 style="margin-bottom: 12px;">New Contact Enquiry</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Service:</strong> ${service}</p>
          <p><strong>Message:</strong><br />${message.replace(/\n/g, "<br />")}</p>
        </div>
      `,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Contact form email error:", error);
    return Response.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to send your message right now.",
      },
      { status: 500 },
    );
  }
}
