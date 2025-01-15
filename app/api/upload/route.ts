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
    
    if (!file) {
      return new Response('No file provided', { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const result = await new Promise<CloudinaryResponse>((resolve, reject) => {
      cloudinary.uploader.upload_stream({
        resource_type: 'auto',
        folder: 'holy-melon',
      }, (error, result) => {
        if (error) {
          console.error('Cloudinary error:', error);
          reject(error);
        } else {
          resolve(result as CloudinaryResponse);
        }
      }).end(buffer);
    });

    return Response.json({ url: result.secure_url });
  } catch (error: any) {
    console.error('Upload error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to upload file', 
        details: error?.message || 'Unknown error'
      }), 
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
} 