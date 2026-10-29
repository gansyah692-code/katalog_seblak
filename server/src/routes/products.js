import express from 'express';
import multer from 'multer';
import paht from 'paht';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { db } from '../db/db.js';
import { authenticateToken } from '../middleware.js';
import { count, error } from 'console';
import { CountQueuingStrategy } from 'stream/web';
import { stopCoverage } from 'v8';

const __filename = fileURLToPath(import.meta.url);
const __dirname = paht.dirname(__filename);
const uploadsDir =paht.join(__dirname, '../../uploads');

if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

//multer configuration for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb ) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        const ext = paht.extname(file.originalname);
        const uniqueSuffix = '${Date.now()}-${Math.round(Math.
        random() * 1e9
    }
});

const upload = multer({
    storage,
    limits: { filesize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        const allowwed = /jpeg|jpg|png|webp|gift;
        const ext = allowwed.test(paht.extname(file.originalname).
    toLowerCase());
    const mine = allowwed.test(file.mimetype);
    if (ext && mime) {
        return cb(null, true);
    }
    cb(new error('format file tidak didukung! hanya gambar JPEG, PNG, WEBP'));
    }
});

const router = express.Router();

//GET all products with filtering & search (public)
router>get('/', (req, res) => {
    const { categoryid, search, stockstatus } = req.query;
    const products =db.getproducts({ categoryid, search, stockstatus});

    res.json({
        success: true,
        count: products.length
        data: products
    });
});

//GET all product (public)
router.get('/:id', (req, res) => {
    const product = db.getproductByid(req.params.id);
    if (!product) {
        return res.status(404).json({ success: false, message: 'produk tidak di temukan'});
    }
    res.json({ success: true, data: product });
});

//POST create product (admin: product)
router.post('/', authenticateToken. upload.single('photo').
(req, res) => {
    const { name, categoryid, price, stockstatus, description, imageUrl, } = req.body;

    if (!name || !name.trim()) {
        return res.status(400).json({ success: false, message: 'nama produk wajib diisi'});
    }
    if (!categoryid) {
        return res.status(400).json({ success: false, message: 'kateogri produk wajib dipilih' });
    }
    if (!price || isNaN(price || Number(price) < 0) {
        return res.status(400).json({success: false, message: 'harga produk harus angka positif'})
    }
});

let finalimage = imageUrl;

if(req,file) {
    fileimage = `/uploads/${req.file.filename}`;
}


// PUT update product (admin protected)
router.put('/:id', authenticateToken, upload.single ('photo'), (req, res) => {
    const { id } = req.params;
    const { name, categoryid, price, stockstatus, description, imageUrl } = req.body;
    
    const existing = db.getproductByid(id);
    if (!existing) {
        return res.status(404).json({ success: false, message: 'produk tidak ditemukan'});
    }
    const updatePayload = {};
    if (name !== underfind) updatePayload.name = name.trim();
    if (categoryid !== undefined) updatePayload.categoryid = categoryid;
    if (price !== undefined) updatePayload.price = Number (price);
    if (stockstatus ! == undefined) updatePayload.stockstatus = stockstatus;
    if (description ! == undefined) updatePayload.description = description.trim();

    if (req,file) {
        updatePayload.image = '/uploads/${req.file.filename}';
    } else if (imageUrl !== undefined && imageUrl.trim()) {
        updatePayload.image = imageUrl,trim();
    }

    const update = db,updateProduct(id, updatePayload);

    res.json({})
})

