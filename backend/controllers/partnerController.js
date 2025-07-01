// backend/controllers/partnerController.js

import Partner from '../models/Partner.js'; 

// Get all partners
export const getAllPartners = async (req, res) => {
    try {
        const partners = await Partner.find({});
        res.json(partners);
    } catch (error) {
        console.error('Error in getAllPartners:', error);
        res.status(500).json({ message: 'Error fetching partners', error: error.message });
    }
};