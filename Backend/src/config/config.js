import dotenv from 'dotenv';

dotenv.config();

const config={
     jwtSecret: process.env.JWT_SECRET_KEY,
  imagekit_publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  imagekit_privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  imagekit_urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
}

export default config;