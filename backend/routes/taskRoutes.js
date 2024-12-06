const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

router.post('/tasks', async (req, res) => {
    const { infoMessage, tagValue, userId, fileName, imageName,file,image } = req.body;
    const task = new Task({
        infoMessage,
        tagValue,
        userId,
        fileName,
        imageName,
        file,
        image
    });

    try {
        const savedTask = await task.save();
        res.status(201).json({
            success: true,
            data: savedTask,
        });
    } catch (err) {
        res.status(500).json({ message: 'Görev oluşturulurken hata oluştu', error: err.message, success:false });
    }
});

router.get('/tasks', async (req, res) => {
    try {
        const { infoMessage, tagValue } = req.query;

        const filter = {};

        if (infoMessage) {
            filter.infoMessage = { $regex: infoMessage, $options: 'i' };
        }

        if (tagValue) {
            filter.tagValue = tagValue;
        }

        const tasks = await Task.find(filter);

        res.status(200).json({
            success: true,
            message: 'Görevler başarıyla getirildi.',
            data: tasks,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Görevler alınırken hata oluştu.',
            error: err.message,
        });
    }
});


module.exports = router;
