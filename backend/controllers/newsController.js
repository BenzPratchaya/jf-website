// backend/controllers/newsController.js
import asyncHandler from 'express-async-handler';
import News from '../models/News.js';

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
        const newNewsItem = new News(req.body); 
        const savedNewsItem = await newNewsItem.save();
        res.status(201).json(savedNewsItem);
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ message: messages.join(', ') });
        }
        if (error.code === 11000) { // Duplicate key error
            return res.status(400).json({ message: 'News item with this ID already exists.' });
        }
        throw error; 
    }
});

// @desc    Get single news item by ID (nit_id)
// @route   GET /api/news/:id
const getNewsById = asyncHandler(async (req, res) => {
  // ค้นหาด้วย nit_id (req.params.id)
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
  // ค้นหาด้วย nit_id (req.params.id)
  const newsItem = await News.findOne({ nit_id: req.params.id });

  if (newsItem) {
    newsItem.nit_image = req.body.nit_image || newsItem.nit_image;
    newsItem.nit_category = req.body.nit_category || newsItem.nit_category;
    newsItem.nit_date = req.body.nit_date || newsItem.nit_date;
    newsItem.nit_title = req.body.nit_title || newsItem.nit_title;
    newsItem.nit_description = req.body.nit_description || newsItem.nit_description;
    newsItem.nit_link = req.body.nit_link || newsItem.nit_link;

    if (req.body.nit_details) {
        newsItem.nit_details.nid_author = req.body.nit_details.nid_author || newsItem.nit_details.nid_author;
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
  // ค้นหาด้วย nit_id (req.params.id)
  const newsItem = await News.findOne({ nit_id: req.params.id });

  if (newsItem) {
    await News.deleteOne({ _id: newsItem._id }); // ลบด้วย _id
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