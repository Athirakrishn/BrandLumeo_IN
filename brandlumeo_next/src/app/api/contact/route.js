import nodemailer from 'nodemailer';

const TARGET_EMAIL = 'info@brandlumeo.com';

function envBool(name, fallback) {
  const value = process.env[name];
  if (value === undefined) return fallback;
  return ['1', 'true', 'yes', 'on'].includes(value.trim().toLowerCase());
}

function getTransport() {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'premium293-4.web-hosting.com',
    port: Number(process.env.EMAIL_PORT || 465),
    // Port 465 uses implicit SSL; 587 upgrades with STARTTLS (EMAIL_USE_TLS).
    secure: envBool('EMAIL_USE_SSL', true),
    requireTLS: envBool('EMAIL_USE_TLS', false),
    auth: {
      user: process.env.EMAIL_HOST_USER || TARGET_EMAIL,
      pass: process.env.EMAIL_HOST_PASSWORD,
    },
    connectionTimeout: Number(process.env.EMAIL_TIMEOUT || 20) * 1000,
  });
}

export async function POST(req) {
  let data;
  try {
    data = await req.json();
  } catch {
    return Response.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const name = String(data.name || '').trim();
  const email = String(data.email || '').trim();
  const company = String(data.company || '').trim();
  const message = String(data.message || '').trim();

  if (!name || !email || !message) {
    return Response.json({ error: 'Please fill out your name, email, and message.' }, { status: 400 });
  }

  let body = `Name: ${name}\nEmail: ${email}\n`;
  if (company) body += `Company: ${company}\n`;
  body += `\nMessage:\n${message}`;

  const from = process.env.DEFAULT_FROM_EMAIL || process.env.EMAIL_HOST_USER || TARGET_EMAIL;

  try {
    await getTransport().sendMail({
      from,
      to: TARGET_EMAIL,
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      text: body,
    });
  } catch (err) {
    console.error('Contact form email send failed', err);
    return Response.json(
      { error: 'We could not send your message right now. Please try again in a few minutes.' },
      { status: 502 }
    );
  }

  return Response.json({ success: true });
}
