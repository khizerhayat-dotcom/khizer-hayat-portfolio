const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TO_EMAIL = "khizer8743@gmail.com";

function sanitize(value) {
  return String(value ?? "").trim();
}

function validatePayload(payload) {
  const name = sanitize(payload.name);
  const email = sanitize(payload.email);
  const subject = sanitize(payload.subject);
  const message = sanitize(payload.message);

  if (!name || !email || !subject || !message) {
    return { error: "Please fill in all fields before sending." };
  }
  if (!EMAIL_PATTERN.test(email)) {
    return { error: "Please enter a valid email address." };
  }
  if (message.length < 20) {
    return { error: "Please add a little more detail to your message." };
  }

  return { data: { name, email, subject, message } };
}

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed." });
  }

  const validation = validatePayload(request.body ?? {});
  if (validation.error) {
    return response.status(400).json({ error: validation.error });
  }

  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_FROM_EMAIL) {
    return response.status(500).json({ error: "Email service is not configured." });
  }

  const { name, email, subject, message } = validation.data;

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL,
      to: TO_EMAIL,
      reply_to: email,
      subject: `Portfolio contact: ${subject}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Project or role: ${subject}`,
        "",
        "Message:",
        message,
      ].join("\n"),
    }),
  });

  if (!resendResponse.ok) {
    return response.status(502).json({ error: "Message could not be sent. Please email me directly." });
  }

  return response.status(200).json({ ok: true });
}
