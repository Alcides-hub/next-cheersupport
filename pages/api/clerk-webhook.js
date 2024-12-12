import { buffer } from 'micro';
import crypto from 'crypto';
import { prisma } from '@/lib/prisma'; // Make sure Prisma is correctly configured

export const config = {
  api: {
    bodyParser: false, // Disable automatic body parsing for raw request handling
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const rawBody = await buffer(req);
  const signature = req.headers['clerk-signature'];

  // Validate webhook signature
  const secret = process.env.CLERK_WEBHOOK_SECRET;
  const hash = crypto
    .createHmac('sha256', secret)
    .update(rawBody)
    .digest('base64');

  if (hash !== signature) {
    return res.status(401).json({ error: 'Invalid signature' });
  }

  const event = JSON.parse(rawBody);

  try {
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

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
