// backend/controllers/newsController.js

import NewsItem from '../models/News.js'; 

// Get all news items (with pagination if needed)
export const getAllNews = async (req, res) => {
    try {
        const news = await NewsItem.find({});
        // ถ้าจะเพิ่ม pagination ให้ทำ logic ตรงนี้ (เช่น req.query.page, req.query.limit)
        res.json(news);
    } catch (error) {
        console.error('Error in getAllNews:', error);
        res.status(500).json({ message: 'Error fetching news', error: error.message });
    }
};

// Get single news item by ID (slug)
export const getNewsById = async (req, res) => {
    try {
        const newsItem = await NewsItem.findOne({ id: req.params.id });
        if (!newsItem) {
            return res.status(404).json({ message: 'News item not found' });
        }
        res.json(newsItem);
    } catch (error) {
        console.error('Error in getNewsById:', error);
        res.status(500).json({ message: 'Error fetching news item', error: error.message });
    }
};