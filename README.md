( https://multilingual-video-calling-platform.vercel.app/  )



# Clarity Connect - Multilingual Video Calling Platform

A full-stack application that provides multilingual video calling capabilities with user authentication.

## Features

- User authentication with JWT
- Email verification with OTP
- User profile management
- Profile picture uploads
- Secure authentication flows
- Responsive UI

## Overview:
<img width="809" height="882" alt="Screenshot 2026-04-20 at 1 56 53 AM" src="https://github.com/user-attachments/assets/df948fde-9e28-43e1-9bee-e9c9139d7541" />


## Tech Stack

### Frontend

- Next.js
- React
- Tailwind CSS
- TypeScript

### Backend

- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Nodemailer

## Setup Instructions

### Prerequisites

- Node.js
- MongoDB
- Gmail account for sending OTPs

### MongoDB Setup

1. Install MongoDB (if not already installed):

   - **Windows**: Download and install MongoDB Community Server from the [official website](https://www.mongodb.com/try/download/community)
   - **macOS**: `brew tap mongodb/brew && brew install mongodb-community`
   - **Linux**: Follow the [MongoDB installation guide](https://docs.mongodb.com/manual/administration/install-on-linux/)

2. Start MongoDB:

   - **Windows**: MongoDB should start as a service automatically
   - **macOS/Linux**: `brew services start mongodb-community` or `sudo systemctl start mongod`

3. Verify MongoDB is running:
   - Open a terminal and run `mongo` or `mongosh` to connect to the database

### Gmail Setup for OTP

1. Create or use an existing Gmail account
2. Enable 2-Step Verification:

   - Go to your Google Account settings
   - Select Security
   - Under "Signing in to Google," select 2-Step Verification and turn it on

3. Create an App Password:

   - After enabling 2-Step Verification, go back to the Security page
   - Under "Signing in to Google," select App passwords
   - Select "Mail" as the app and "Other" as the device (give it a name like "Clarity Connect")
   - Click "Generate"
   - Copy the 16-character password that appears

4. Update the .env file in the server directory:
   ```
   EMAIL_SERVICE=gmail
   EMAIL_USERNAME=your_gmail_address@gmail.com
   EMAIL_PASSWORD=your_16_character_app_password
   EMAIL_FROM=your_gmail_address@gmail.com
   ```

### Backend Setup

1. Navigate to the server directory:

   ```
   cd Multilingual-Video-calling-platform-/server
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Configure environment variables:

   - Edit the `.env` file with your MongoDB URI, JWT secret, and email credentials from Gmail setup above

4. Start the server:
   ```
   npm run dev
   ```

### Frontend Setup

1. Navigate to the client directory:

   ```
   cd Multilingual-Video-calling-platform-/client
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Configure environment variables:

   - Create/edit `.env.local` with: `NEXT_PUBLIC_API_URL=http://localhost:5000`

4. Start the development server:

   ```
   npm run dev
   ```

5. Access the application at `http://localhost:3000`

## Troubleshooting

### MongoDB Connection Issues

- Ensure MongoDB is running on your system
- Check if the MongoDB connection string in `.env` is correct
- If using MongoDB Atlas, ensure your IP is whitelisted

### Email OTP Issues

- **If OTPs are not being received:**

  - Check server console for email error messages
  - Verify your Gmail account settings (2FA and App Password are properly set up)
  - Ensure the EMAIL_PASSWORD in `.env` is the App Password, not your regular Gmail password
  - Check your spam/junk folder for the OTP emails
  - The application will display the OTP on-screen if email sending fails in development mode

- **Gmail App Password tips:**

  - App passwords are 16 characters long with no spaces
  - If you're getting authentication errors, regenerate a new App Password
  - Make sure 2-Step Verification is still enabled on your Google account

- **To test Gmail configuration:**
  - Set NODE_ENV=development in your .env file to see detailed logs
  - The OTP will be visible in the server console logs
  - The OTP will also be displayed in the UI if email delivery fails

## Usage

1. Register a new account
2. Verify your email with the OTP sent to your inbox
3. Login with your credentials
4. Update your profile from the user menu
5. Use the application's video calling features (under development)

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/verify-otp` - Verify email OTP
- `POST /api/auth/login` - Login user
- `POST /api/auth/send-login-otp` - Send login OTP
- `GET /api/auth/me` - Get user profile
- `PUT /api/auth/update-profile` - Update user profile
- `GET /api/auth/logout` - Logout user

## License

This project is licensed under the MIT License.
