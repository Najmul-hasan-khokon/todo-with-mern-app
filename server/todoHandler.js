const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const todoSchema = require("./todoSchema");
const Todo = new mongoose.model("Todo", todoSchema);

// get single todo
router.get("/:id", async (req, res) => {
  Todo.find({ _id: req.params.id }).exec((err, data) => {
    if (err) {
      res.status(500).json({
        message: "there was a server side error",
      });
    } else {
      res.status(200).json({
        message: "todo were getted successfully!",
        data,
      });
    }
  });
});

// get multiple todos
router.get("/", async (req, res) => {
  Todo.find().exec((err, data) => {
    if (err) {
      res.status(500).json({
        message: "there was a server side error",
      });
    } else {
      res.status(200).json({
        message: "todo were getted successfully!",
        data,
      });
    }
  });
});

// post a todo
// ekhane ami todo create korar somoy user er Id todo te save korci
// r todo er id user e save korci . jate both way relation thake.
router.post("/", async (req, res) => {
  try {
    const newTodo = new Todo({
      ...req.body,
    });
    const todo = await newTodo.save();
    res.status(200).json({
      message: "todo was inserted successfully!",
      data: todo,
    });
  } catch (err) {
    res.status(500).json({
      message: "there was a server side error",
    });
  }
});

// delete todo
router.delete("/:id", async (req, res) => {
  try {
    const todo = await Todo.deleteOne({ _id: req.params.id });

    res.status(200).json({
      message: "todo was deleted successfully!",
      data: todo,
    });
  } catch (err) {
    res.status(500).json({
      message: "there was a server side error",
    });
  }
});

// update todo
router.put("/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          ...req.body,
        },
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      message: "todo was updated successfully!",
      data: todo,
    });
  } catch (err) {
    res.status(500).json({
      message: "there was a server side error",
    });
  }
});

module.exports = router;
