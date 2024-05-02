const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate-v2");

const ProjectSchema = new Schema(
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
    create_at: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    assign: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    activity: [
      {
        type: Schema.Types.ObjectId,
        ref: "Activity",
      },
    ],
    task: [
      {
        type: Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
  },
  {
    collection: "Project",
    timestamps: true,
  }
);
ProjectSchema.plugin(mongoosePaginate);
const Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;
