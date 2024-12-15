import dotenv from 'dotenv';
dotenv.config();

export default {
  port: process.env.PORT ,
  mongodbUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
};