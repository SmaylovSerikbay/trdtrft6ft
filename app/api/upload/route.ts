import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

interface CloudinaryResponse {
  secure_url: string;
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const result = await new Promise<CloudinaryResponse>((resolve, reject) => {
      cloudinary.uploader.upload_stream({
        resource_type: 'auto',
      }, (error, result) => {
        if (error) reject(error);
        else resolve(result as CloudinaryResponse);
      }).end(buffer);
    });

    return Response.json({ url: result.secure_url });
  } catch (error) {
    return new Response('Failed to upload file', { status: 500 });
  }
} 