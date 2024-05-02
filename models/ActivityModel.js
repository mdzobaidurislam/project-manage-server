const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate-v2");

const ActivitySchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    taskId: {
      type: Schema.Types.ObjectId,
      ref: "Task",
    },
    projectId: {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },
    text: {
      type: String,
    }
  },
  {
    collection: "Activity",
    timestamps: true,
  }
);
ActivitySchema.plugin(mongoosePaginate);
const Activity = mongoose.model("Activity", ActivitySchema);

module.exports = Activity;
