import mongoose from "mongoose";
const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    title: String,
    content: String,
    status: String,
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);
export default Task;
