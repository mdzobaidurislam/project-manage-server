const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate-v2");

const TaskSchema = new Schema(
  {
    title: {
      type: String,
      default: null,
    },

    description: {
      type: String,
    },
    status: {
      type: String,
    },
    priority: {
      type: String,
    },
    start_date: {
      type: Date,
    },
    end_date: {
      type: Date,
    },
    assign: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    collection: "Task",
    timestamps: true,
  }
);
TaskSchema.plugin(mongoosePaginate);
const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
