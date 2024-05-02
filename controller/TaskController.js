const Task = require("../models/TaskModel");
const User = require("../models/User");

const createTask = async (req, res) => {
  try {
    const data = req.body;
    const result = await Task.create(data);
    if (!result) {
      return res.status(401).json({
        code: 401,
        status: "failed",
        msg: "Not created task",
      });
    }

    return res.status(200).json({
      code: 200,
      status: "success",
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      code: 400,
      status: "failed",
      msg: error,
    });
  }
};
const getTaskList = async (req, res) => {
  const {
    page = 1,
    limit = 12,
    pagination = true,
    title = "",
    status = "",
    startDate = "",
    endDate = "",
  } = req.query;

  try {
    let filter = {};
    let start;
    let end;
    if (startDate) {
      start = new Date(startDate);
    }
    if (endDate) {
      end = new Date(endDate);
    }
    if (start || endDate) {
      filter.createdAt = { $gte: start, $lte: end };
    }

    if (title) filter.title = { $regex: title, $options: "i" };

    const result = await Task.paginate(filter, {
      page: page,
      limit: limit,
      pagination: JSON.parse(pagination),
      sort: { createdAt: -1 },
      populate: [
        {
          path: "assign",
          select: "_id name image",
        },
      ],
    });

    return res.status(200).json({
      code: 200,
      status: "failed",
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      code: 400,
      status: "failed",
      msg: error,
    });
  }
};

module.exports = {
  createTask,
  getTaskList,
};
