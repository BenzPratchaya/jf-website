// backend/controllers/newsController.js

import asyncHandler from 'express-async-handler';
import News from '../models/News.js';
import fs from 'fs';   // *** เพิ่ม: Import fs module สำหรับจัดการไฟล์ ***
import path from 'path'; // *** เพิ่ม: Import path module สำหรับจัดการ Path ***
import { fileURLToPath } from 'url'; // *** เพิ่ม: สำหรับ __dirname ใน ES Modules ***
import { dirname } from 'path';      // *** เพิ่ม: สำหรับ __dirname ใน ES Modules ***

// สำหรับ __dirname ใน ES Modules (newsController.js อยู่ใน backend/controllers/)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Helper function to delete image file from server
const deleteImageFile = (filePath) => {
    if (filePath) {
        // Path รูปภาพที่บันทึกใน DB คือ /uploads/news/filename.ext
        const fullPath = path.join(__dirname, '..', '..', filePath); 

        fs.unlink(fullPath, (err) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    console.log(`Old image file not found: ${fullPath}`);
                } else {
                    console.error(`Error deleting old image file: ${fullPath}`, err);
                }
            } else {
                console.log(`Old image file deleted successfully: ${fullPath}`);
            }
        });
    }
};


// @desc    Get all news items
// @route   GET /api/news
// @access  Public
const getNews = asyncHandler(async (req, res) => {
    const news = await News.find({});
    res.json(news);
});

// @desc    Create a news item
// @route   POST /api/news
// @access  Private/Admin
const createNews = asyncHandler(async (req, res) => {
    try {
        // ข้อมูล Text Fields จาก FormData จะอยู่ใน req.body
        // ข้อมูลไฟล์ที่อัปโหลดจะอยู่ใน req.file
        
        // nit_details จะถูกส่งมาเป็น JSON String จาก Frontend (ต้อง Parse)
        const nit_details = JSON.parse(req.body.nit_details); 

        // Path ของรูปภาพที่อัปโหลด (ถ้ามี)
        const imageUrl = req.file ? `/uploads/new/${req.file.filename}` : ''; 

        const newNewsItem = new News({
            nit_id: req.body.nit_id,
            nit_image: imageUrl, // ใช้ Path รูปภาพที่ได้จากการอัปโหลด
            nit_category: req.body.nit_category,
            nit_date: req.body.nit_date,
            nit_title: req.body.nit_title,
            nit_description: req.body.nit_description,
            nit_link: req.body.nit_link,
            nit_details: nit_details,
        }); 
        const savedNewsItem = await newNewsItem.save();
        res.status(201).json(savedNewsItem);
    } catch (error) {
        console.error('Error in createNews:', error);
        // หากเกิด Error ระหว่างการบันทึกข้อมูลลง DB แต่ไฟล์ถูกอัปโหลดไปแล้ว ควรลบไฟล์นั้นทิ้ง
        if (req.file) {
            deleteImageFile(`/uploads/new/${req.file.filename}`);
        }

        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ message: messages.join(', ') });
        }
        if (error.code === 11000) {
            return res.status(400).json({ message: 'News item with this ID already exists.' });
        }
        throw error; 
    }
});

// @desc    Get single news item by ID (nit_id)
// @route   GET /api/news/:id
const getNewsById = asyncHandler(async (req, res) => {
  const newsItem = await News.findOne({ nit_id: req.params.id }); 

  if (newsItem) {
    res.json(newsItem);
  } else {
    res.status(404);
    throw new Error('News item not found');
  }
});

// @desc    Update a news item by ID (nit_id)
// @route   PUT /api/news/:id
const updateNews = asyncHandler(async (req, res) => {
  // *** เพิ่ม console.log สามบรรทัดนี้ที่ต้นฟังก์ชัน updateNews ***
  console.log('DEBUG: News update request received.');
  console.log('DEBUG: req.body:', req.body); // ข้อมูล Text Fields
  console.log('DEBUG: req.file:', req.file); // ข้อมูลไฟล์ (ถ้ามี) - นี่คือสิ่งสำคัญ!
  // *** สิ้นสุดการเพิ่ม console.log ***
  const newsItem = await News.findOne({ nit_id: req.params.id }); 

  if (newsItem) {
    // ถ้ามีไฟล์ใหม่ถูกอัปโหลดมา และมีรูปภาพเก่าอยู่
    if (req.file && newsItem.nit_image) {
        deleteImageFile(newsItem.nit_image); // ลบรูปภาพเก่าทิ้ง
    }

    newsItem.nit_id = req.body.nit_id || newsItem.nit_id;
    // อัปเดต nit_image ด้วย Path ของไฟล์ใหม่ หรือถ้า frontend ส่งค่าว่างมา (ต้องการลบรูป)
    if (req.file) { // ถ้ามีไฟล์ใหม่
        newsItem.nit_image = `/uploads/new/${req.file.filename}`;
    } else if (req.body.nit_image !== undefined) { // ถ้า Frontend ส่ง nit_image (ซึ่งอาจเป็นค่าว่าง) มา
        newsItem.nit_image = req.body.nit_image;
    }
    // หาก req.file ไม่มี และ req.body.nit_image มีค่าอยู่ (คือไม่ได้เปลี่ยนรูปหรือลบรูป)
    // nit_image ใน DB ก็จะยังคงเป็นค่าเดิมของ newsItem.nit_image

    newsItem.nit_category = req.body.nit_category || newsItem.nit_category;
    newsItem.nit_date = req.body.nit_date || newsItem.nit_date;
    newsItem.nit_title = req.body.nit_title || newsItem.nit_title;
    newsItem.nit_description = req.body.nit_description || newsItem.nit_description;
    newsItem.nit_link = req.body.nit_link || newsItem.nit_link;

    if (req.body.nit_details) {
        const nid_details_parsed = typeof req.body.nit_details === 'string' ? JSON.parse(req.body.nit_details) : req.body.nit_details;
        newsItem.nit_details.nid_author = nid_details_parsed.nid_author || newsItem.nit_details.nid_author;
    }

    const updatedNewsItem = await newsItem.save();
    res.json(updatedNewsItem);
  } else {
    res.status(404);
    throw new Error('News item not found');
  }
});

// @desc    Delete a news item by ID (nit_id)
// @route   DELETE /api/news/:id
const deleteNews = asyncHandler(async (req, res) => {
  const newsItem = await News.findOne({ nit_id: req.params.id }); 

  if (newsItem) {
    // ถ้ามีรูปภาพเก่าอยู่ ให้ลบรูปภาพนั้นทิ้ง
    if (newsItem.nit_image) {
        deleteImageFile(newsItem.nit_image);
    } else {
        console.log(`DEBUG: No image path found in DB for news item: ${newsItem.nit_id}, skipping file deletion.`);
    }
    await News.deleteOne({ _id: newsItem._id });
    res.json({ message: 'News item removed' });
  } else {
    res.status(404);
    throw new Error('News item not found');
  }
});

export { 
  getNews, 
  getNewsById, 
  createNews, 
  updateNews, 
  deleteNews 
};