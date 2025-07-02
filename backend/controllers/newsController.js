// backend/controllers/newsController.js

// **KEY FIX: เปลี่ยนชื่อตัวแปร import ให้เป็น News**
import News from '../models/News.js'; 

// Get all news items (with pagination if needed)
export const getAllNews = async (req, res) => {
    try {
        const news = await News.find({}); // **KEY FIX: ใช้ News.find**
        res.json(news);
    } catch (error) {
        console.error('Error in getAllNews:', error);
        res.status(500).json({ message: 'Error fetching news', error: error.message });
    }
};

// @desc    Get single news item by ID (slug)
// @route   GET /api/news/:id
// @access  Public
export const getNewsById = async (req, res) => {
    try {
        const newsItem = await News.findOne({ nit_id: req.params.id }); // **KEY FIX: ใช้ News.findOne**
        if (!newsItem) {
            return res.status(404).json({ message: 'News item not found' });
        }
        res.json(newsItem);
    } catch (error) {
        console.error('Error in getNewsById:', error);
        res.status(500).json({ message: 'Error fetching news item', error: error.message });
    }
};