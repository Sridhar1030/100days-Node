import mongoose from "mongoose";
const TodoSchema = new mongoose.Schema({
	title: {type:String, required:true , default: "this says that schema can be an object as well"},
    desc: String,
    isDone: Boolean,
    dueDate: Number
});

export const Todo = mongoose.model("Todo", TodoSchema);   