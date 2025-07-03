import jwt from 'jsonwebtoken'; // Import jsonwebtoken

const generateToken = (res, userId) => {
  const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '1h', // Access Token หมดอายุใน 1 ชั่วโมง
  });

  const refreshToken = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: '7d', // Refresh Token หมดอายุใน 7 วัน
  });

  res.cookie('accessToken', accessToken, {
    httpOnly: true, // ป้องกันการเข้าถึงจาก client-side script
    secure: process.env.NODE_ENV !== 'development', // ใช้ secure cookie ใน production
    sameSite: 'strict', // ป้องกัน CSRF attacks
    maxAge: 60 * 60 * 1000, // 1 ชั่วโมง (สำหรับ Access Token)
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 วัน (สำหรับ Refresh Token)
  });
};

export default generateToken;