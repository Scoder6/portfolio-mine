import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Email validation function
function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Validate name (at least 2 characters)
    if (name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Name must be at least 2 characters long' },
        { status: 400 }
      );
    }

    // Validate message (at least 10 characters)
    if (message.trim().length < 10) {
      return NextResponse.json(
        { error: 'Message must be at least 10 characters long' },
        { status: 400 }
      );
    }

    // Create email transporter using environment variables
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email content
    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 10px; margin-bottom: 20px;">
          <h1 style="color: white; margin: 0; font-size: 24px;">New Message from Portfolio</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 5px 0 0 0;">From Saptash's Portfolio Chat Bot</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
          <h2 style="color: #333; margin: 0 0 15px 0; font-size: 18px;">Contact Information</h2>
          <p style="margin: 5px 0;"><strong>Name:</strong> ${name}</p>
          <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
          <p style="margin: 5px 0;"><strong>Sent:</strong> ${new Date().toLocaleString()}</p>
        </div>
        
        <div style="background: #ffffff; padding: 20px; border-radius: 10px; border: 1px solid #e9ecef;">
          <h2 style="color: #333; margin: 0 0 15px 0; font-size: 18px;">Message</h2>
          <p style="color: #555; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding: 20px; background: #f8f9fa; border-radius: 10px;">
          <p style="color: #666; margin: 0; font-size: 14px;">
            This message was sent via the chat bot on Saptash's portfolio website.
          </p>
          <p style="color: #666; margin: 5px 0 0 0; font-size: 14px;">
            Please respond within 24 hours for best user experience.
          </p>
        </div>
      </div>
    `;

    // Send to both email addresses
    const emailAddresses = [
      'saptashprivateprofile@gmail.com', // Primary - preferred
      'matulchaubey669@gmail.com'        // Secondary
    ];

    const sendPromises = emailAddresses.map(emailAddress => 
      transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: emailAddress,
        subject: `Portfolio Message from ${name}`,
        html: emailContent,
        replyTo: email, // Reply to the user's email
      })
    );

    // Send emails to both addresses
    await Promise.all(sendPromises);

    return NextResponse.json(
      { 
        success: true,
        message: 'Message sent successfully! Saptash will get back to you within 24 hours.',
        note: 'Your message has been sent to both saptashprivateprofile@gmail.com (preferred) and matulchaubey669@gmail.com'
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Email sending error:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    return NextResponse.json(
      { 
        error: 'Failed to send message. Please try again later.',
        details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
      },
      { status: 500 }
    );
  }
}
