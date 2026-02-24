import { Resend } from 'resend';
import { NextResponse } from 'next/server';

// Use a fallback to prevent Next.js build crash during static analysis if env var is missing
const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key_for_build');

const ERROR_MESSAGES = {
  MISSING_FIELDS: 'Molimo popunite sva obavezna polja',
  SEND_FAIL: 'Greška pri slanju emaila',
  SERVER_ERROR: 'Greška na serveru',
};

export async function POST(request: Request) {
  try {
    const { name, email, phone, message, cartItems } = await request.json();

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.MISSING_FIELDS },
        { status: 400 }
      );
    }

    console.log(`Sending contact email from: ${email} (${name})`);

    // Send email
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: ['lvidor@gmail.com'], // Sending ONLY to registered email for testing
      replyTo: email,
      subject: `Nova poruka sa sajta - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #22c55e;">Nova kontakt poruka</h2>
          
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Ime:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${phone ? `<p><strong>Telefon:</strong> ${phone}</p>` : ''}
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #374151;">Poruka:</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>

          ${cartItems && cartItems.length > 0 ? `
          <div style="margin: 30px 0; padding: 20px; background: #eff6ff; border-radius: 8px; border: 1px solid #bfdbfe;">
            <h3 style="color: #1e40af; margin-top: 0;">Izabrani proizvodi:</h3>
            <table style="width: 100%; border-collapse: collapse;">
              ${cartItems.map((item: any) => `
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #dbeafe;">
                    <strong>${item.quantity}x</strong> ${item.title}
                  </td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #dbeafe; text-align: right; color: #6b7280;">
                    ${item.price || ''}
                  </td>
                </tr>
              `).join('')}
            </table>
          </div>
          ` : ''}
          
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
          
          <p style="color: #6b7280; font-size: 14px;">
            Ova poruka je poslata sa kontakt forme na biosag-energy.rs
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: ERROR_MESSAGES.SEND_FAIL, detail: error },
        { status: 500 }
      );
    }

    console.log('Contact email sent successfully');
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Server error in contact API:', error);
    return NextResponse.json(
      { error: ERROR_MESSAGES.SERVER_ERROR },
      { status: 500 }
    );
  }
}
