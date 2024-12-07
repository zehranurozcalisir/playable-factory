const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const mongoose = require('mongoose');
const verifyToken = require('../middlewares/authMiddleware');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const userDir = path.join(__dirname, '../public', req.body.userId || 'default');
        const imgDir = path.join(userDir, 'img');
        const filesDir = path.join(userDir, 'files');

        let uploadDir;
        if (file.fieldname === 'file') {
            uploadDir = filesDir;
        } else if (file.fieldname === 'image') {
            uploadDir = imgDir;
        } else {
            uploadDir = userDir;
        }

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, {recursive: true});
        }

        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({storage});

router.post('/tasks', verifyToken, upload.fields([{name: 'file'}, {name: 'image'}]), async (req, res) => {
    try {
        const {infoMessage, tagValue, userId} = req.body;
        //env olarak alınabilir
        const baseUrl = "http://localhost:5000";

        const filePath = req.files['file']
            ? `${baseUrl}/public/${req.body.userId}/files/${req.files['file'][0].filename}`
            : null;

        const imagePath = req.files['image']
            ? `${baseUrl}/public/${req.body.userId}/img/${req.files['image'][0].filename}`
            : null;
        const task = new Task({
            infoMessage,
            tagValue,
            userId,
            file: filePath,
            image: imagePath,
            fileName: req.files['file'] ? req.files['file'][0].originalname : null,
            imageName: req.files['image'] ? req.files['image'][0].originalname : null,
        });

        const savedTask = await task.save();

        res.status(201).json({
            success: true,
            data: savedTask,
        });
    } catch (err) {
        console.error('Hata:', err.message);
        res.status(500).json({
            success: false,
            message: 'Görev oluşturulurken hata oluştu.',
            error: err.message,
        });
    }
});

router.get('/tasks', verifyToken, async (req, res) => {
    try {
        const {userId, infoMessage, tagValue, perPage = 10, page = 1} = req.query;

        const filter = {};

        if (infoMessage) {
            filter.infoMessage = {$regex: infoMessage, $options: 'i'};
        }

        if (tagValue) {
            filter.tagValue = tagValue;
        }
        //User Id Type Control
        if (userId && mongoose.Types.ObjectId.isValid(userId)) {
            filter.userId = userId;
        }

        const limit = parseInt(perPage);
        const skip = (parseInt(page) - 1) * limit;

        const tasks = await Task.find(filter).limit(limit).skip(skip);

        const totalCount = await Task.countDocuments(filter);

        res.status(200).json({
            success: true,
            data: tasks,
            pagination: {
                total: totalCount,
                perPage: limit,
                currentPage: parseInt(page),
                totalPages: Math.ceil(totalCount / limit),
            },
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Görevler alınırken hata oluştu.',
            error: err.message,
        });
    }
});

router.delete('/tasks/:id', verifyToken, async (req, res) => {
    try {
        const {id} = req.params;

        const deletedTask = await Task.findByIdAndDelete(id);

        if (!deletedTask) {
            return res.status(404).json({
                success: false,
                message: 'Görev bulunamadı.',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Görev başarıyla silindi.',
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Görev silinirken hata oluştu.',
            error: err.message,
        });
    }
});
router.put('/tasks/:id', verifyToken, upload.fields([{ name: 'file' }, { name: 'image' }]), async (req, res) => {
    try {
        const { id } = req.params;
        const { infoMessage, tagValue, userId } = req.body;
        const baseUrl = "http://localhost:5000";

        // Yeni dosya yolları
        const filePath = req.files['file']
            ? `${baseUrl}/public/${req.body.userId}/files/${req.files['file'][0].filename}`
            : null;

        const imagePath = req.files['image']
            ? `${baseUrl}/public/${req.body.userId}/img/${req.files['image'][0].filename}`
            : null;

        // Güncelleme nesnesi
        const updates = {
            infoMessage,
            tagValue,
            userId,
            file: filePath || undefined, // Eğer yeni dosya yoksa, eski değer korunur
            image: imagePath || undefined,
            fileName: req.files['file'] ? req.files['file'][0].originalname : undefined,
            imageName: req.files['image'] ? req.files['image'][0].originalname : undefined,
        };

        // Görevi bul ve güncelle
        const updatedTask = await Task.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedTask) {
            return res.status(404).json({
                success: false,
                message: 'Görev bulunamadı.',
            });
        }

        res.status(200).json({
            success: true,
            data: updatedTask,
        });
    } catch (err) {
        console.error('Hata:', err.message);
        res.status(500).json({
            success: false,
            message: 'Görev güncellenirken hata oluştu.',
            error: err.message,
        });
    }
});


module.exports = router;
