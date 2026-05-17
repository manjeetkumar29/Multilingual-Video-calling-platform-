const { google } = require('googleapis');

const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

oAuth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

function makeRawMessage({ from, to, subject, html, text }) {
  const messageLines = [
    `From: ${from}`,
    `To: ${to}`,
    `Subject: =?UTF-8?B?${Buffer.from(subject).toString('base64')}?=`,
    'MIME-Version: 1.0',
  ];

  if (html) {
    messageLines.push('Content-Type: text/html; charset="UTF-8"', '', html);
  } else {
    messageLines.push('Content-Type: text/plain; charset="UTF-8"', '', text || '');
  }

  const message = messageLines.join('\n');
  return Buffer.from(message)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

const sendEmail = async (options) => {
  try {
    const raw = makeRawMessage({
      from: process.env.EMAIL_FROM,
      to: options.to,
      subject: options.subject,
      html: options.text, // your controller sends HTML in `text`
    });

    const res = await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw,
      },
    });

    console.log('Email sent successfully:', res.data.id);
    return res.data;
  } catch (error) {
    console.error('Failed to send email:', error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
};

module.exports = sendEmail;
