const express = require('express');
const cors = require('cors');
const multer = require('multer');
require('./connection');
const Student = require('./Models/Students');
const app = express();
app.use(express.json());
app.use(cors());

// MULTER CONFIGURATION
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Uploads folder ko publicly accessible banana
app.use('/uploads', express.static('uploads'));

// GET
app.get('/show_data', async (req, res) => {
    try {
        const data = await Student.find();
        res.send(data);
    } catch (error) {
        res.status(500).send("Error fetching data");
    }
});

// POST
app.post('/add_data', upload.single('image'), async (req, res) => {
    try {
        const student = await Student.create({
            name: req.body.name,
            age: req.body.age,
            email: req.body.email,
            image: req.file ? `/uploads/${req.file.filename}` : null
        });
        res.status(201).json(student);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error adding student");
    }
});

// DELETE
app.delete('/delete/:id', async (req, res) => {
    try {
        const data = await Student.findByIdAndDelete(req.params.id);
        if (!data) {
            return res.status(404).send("Student not found");
        }
        res.send("Data deleted successfully");
    } catch (error) {
        res.status(500).send("Error deleting data");
    }
});

// PUT
app.put('/update/:id', async (req, res) => {
    try {
        const data = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!data) {
            return res.status(404).send("Student not found");
        }
        res.send("Data updated successfully");
    } catch (error) {
        res.status(500).send("Error updating data");
    }
});

// SERVER
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});