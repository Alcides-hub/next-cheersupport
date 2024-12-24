import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req) {
  try {
    const body = await req.json(); // Parse the incoming JSON request
    const { name } = body;

    // Cloudinary live stream creation endpoint
    const cloudinaryUrl = `https://api.cloudinary.com/v2/${process.env.CLOUDINARY_CLOUD_NAME}/video/live_streams`;

    // Request body with required parameters
    const payload = {
      name,
      input: {
        type: 'rtmp', // RTMP input for the live stream
      },
      idle_timeout_sec: 120,      // Optional: Idle timeout (seconds)
      max_runtime_sec: 43200,    // Optional: Max runtime (12 hours)
    };

    // Make the request to Cloudinary
    const response = await axios.post(cloudinaryUrl, payload, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${Buffer.from(
          `${process.env.CLOUDINARY_API_KEY}:${process.env.CLOUDINARY_API_SECRET}`
        ).toString('base64')}`,
      },
    });

    // Return the response to the frontend
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error creating live stream:', error.response?.data || error.message);
    return NextResponse.json(
      { error: 'Failed to create live stream.', details: error.response?.data },
      { status: 500 }
    );
  }
}
