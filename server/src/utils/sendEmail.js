const sendEmail = async (options) => {
  try {
    console.log(`Attempting to send email to: ${options.to}`);

    const response = await fetch('https://api.postmarkapp.com/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Postmark-Server-Token': process.env.POSTMARK_SERVER_TOKEN,
      },
      body: JSON.stringify({
        From: process.env.EMAIL_FROM,
        To: options.to,
        Subject: options.subject,
        HtmlBody: options.text,
      }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.Message || `Email API error (${response.status})`);
    }

    console.log('Email sent successfully:', data.MessageID || 'sent');
    return data;
  } catch (error) {
    console.error('Failed to send email:', error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
};

module.exports = sendEmail;
