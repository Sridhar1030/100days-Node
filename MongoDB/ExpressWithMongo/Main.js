//from using mongoose we can impose schema to improve overall security of application

import mongoose from "mongoose";
import express from "express";
import { Todo } from "./models/Todo.js";
let conn = await mongoose.connect("mongodb://localhost:27017/todo");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
	const todo = new Todo({
		title: "First Todo",
		desc: "This is a todo",
		isDone: false,
		dueDate: Date.now(),
	});
	todo.save();
	res.send("Hello World!");
});

app.get("/todo", async (req, res) => {
	let todo = await Todo.find({});
	console.log(todo);
	res.json(todo);
	
});
app.get("/title",async(req,res)=>{
    let todo = await Todo.find({})
    const formattedTodos = todo.map((todo) => ({
		title: todo.title,
		desc: todo.desc,
	}));
    res.json(formattedTodos);
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
