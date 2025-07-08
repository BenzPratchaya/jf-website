// backend/utils/generateToken.js
import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
  const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '1h', // Access Token หมดอายุใน 1 ชั่วโมง
  });

  const refreshToken = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: '7d', // Refresh Token หมดอายุใน 7 วัน
  });

  // *** เพิ่ม Log เพื่อ Debug Cookie Settings ***
  console.log('DEBUG-COOKIE: NODE_ENV for secure flag:', process.env.NODE_ENV);
  const isSecure = process.env.NODE_ENV !== 'development';
  console.log('DEBUG-COOKIE: Secure flag value for cookies:', isSecure);
  console.log('DEBUG-COOKIE: Setting accessToken cookie...');

  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: isSecure, // ใช้ค่าที่คำนวณแล้ว
    sameSite: 'strict', 
    maxAge: 60 * 60 * 1000, 
  });

  console.log('DEBUG-COOKIE: Setting refreshToken cookie...');
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: isSecure, // ใช้ค่าที่คำนวณแล้ว
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, 
  });
  console.log('DEBUG-COOKIE: Cookie set attempts complete.');
};

export default generateToken;