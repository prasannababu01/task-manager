// routes/taskRoutes.js

const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const authMiddleware = require('../middleware/authMiddleware');


router.use(authMiddleware)

// Create task
router.post('/', async (req, res, next) => {
  try {
    const task = await Task.create({ ...req.body });
    res.json(task);
  } catch (err) {
    next(err);
  }
});

// Update task
router.put('/:id', async (req, res, next) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
  } catch (err) {
    next(err);
  }
});

// Delete task
router.delete('/:id', async (req, res, next) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Task deleted successfully' });
  } catch (err) {
    next(err);
  }
});

// Get all tasks
router.get('/:user', async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.params.user });
    res.json(tasks);
  } catch (err) {
    next(err);
  }
});

router.get("/update/:id",async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    res.json(task);
  } catch (err) {
    next(err);
  }
})


module.exports = router;
