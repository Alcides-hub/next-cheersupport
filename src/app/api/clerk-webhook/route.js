import { createHmac } from 'crypto';
import { prisma } from '../../../lib/prisma'

// Named export for GET requests
export async function GET() {
  return Response.json({ message: "Webhook endpoint ready" }, { status: 200 });
}

// Named export for POST requests
export async function POST(request) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get('clerk-signature');

    // Validate webhook signature
    const secret = process.env.CLERK_WEBHOOK_SECRET;
    const hash = createHmac('sha256', secret).update(rawBody).digest('base64');

    if (hash !== signature) {
      console.error('Signature mismatch');
      return Response.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const event = JSON.parse(rawBody);

    console.log('Webhook Event:', event);

    // Handle specific webhook events
    if (event.type === 'user.created' || event.type === 'user.updated') {
      const { id, email_addresses, first_name, last_name, profile_image_url } = event.data;

      // Upsert user data into your database
      await prisma.user.upsert({
        where: { id },
        update: {
          email_address: email_addresses[0]?.email_address,
          first_name,
          last_name,
          image_url: profile_image_url,
        },
        create: {
          id,
          email_address: email_addresses[0]?.email_address,
          first_name,
          last_name,
          image_url: profile_image_url,
          createdAt: new Date(),
        },
      });
    }

    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Internal Server Error:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
