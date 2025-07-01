// backend/models/Product.js

import mongoose from 'mongoose';

// **KEY FIX:** สร้าง Mongoose Schema ที่ตรงกับ ProductDetailSection Type
const ProductDetailSectionSchema = new mongoose.Schema({ // **เปลี่ยนชื่อจาก NewsContentBlockSchema**
  pds_title: { type: String, required: false },
  pds_type: { type: String, enum: ['paragraph', 'list', 'image', 'grid', 'heading'], required: true }, // **มี 'heading' ด้วย**
  pds_content: { type: String, required: false },
  pds_image: { type: String, required: false },
  pds_alt: { type: String, required: false }, // **มี altText**
  pds_grid: { type: [{ title: String, items: [String] }], required: false },
  pds_level: { type: String, enum: ['h2', 'h3'], required: false },
});

// --- ProductDetails Schema (Nested Schema) ---
const ProductDetailsSchema = new mongoose.Schema({
  pdd_overview: { type: String, required: false },
  pdd_keyFeatures: { type: [String], required: false },
  pdd_applications: { type: [String], required: false },
  pdd_sectionsContent: { type: [ProductDetailSectionSchema], required: false }, // **KEY FIX: ใช้ ProductDetailSectionSchema**
  pdd_category: { type: String, required: true },
  pdd_client: { type: String, required: true },
  pdd_projectDate: { type: String, required: true },
  pdd_projectUrl: { type: String, required: true },
  pdd_longDescription: { type: String, required: true },
});

// --- Product Schema ---
const ProductSchema = new mongoose.Schema({
  pnt_id: { type: String, required: true, unique: true },
  pnt_name: { type: String, required: true },
  pnt_image: { type: String, required: true },
  pnt_description: { type: String, required: true },
  pnt_link: { type: String, required: true },
  pnt_details: { type: ProductDetailsSchema, required: true },
  pnt_partnerId: { type: String, required: true },
  pnt_categoryId: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('Product', ProductSchema);