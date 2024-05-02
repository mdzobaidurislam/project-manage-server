const Project = require("../models/ProjectModel");
const User = require("../models/User");

const createProject = async (req, res) => {
  try {
    const data = req.body;
    const result = await Project.create(data);
    if (!result) {
      return res.status(401).json({
        code: 401,
        status: "failed",
        msg: "Not created Project",
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
const detailsProject = async (req, res) => {
  try {
   
    const result = await Project.findOne({_id:req.params.id}).populate({
      path:'assign',
      select:"_id name image"
    }).populate({
      path:'activity',
      populate: [
        {
          path: "userId",
          select: "_id name image",
        }
      ]
    }).populate({
      path:'task',
      populate:[
        {
          path: "assign",
          select:"_id name image"
        },
        {
          path:'activity',
          populate: [
            {
              path: "userId",
              select: "_id name image",
            }
          ]
        }
      ]
    });
    if (!result) {
      return res.status(401).json({
        code: 401,
        status: "failed",
        msg: "Not  Project fonud" ,
        data:null
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
const deleteProject = async (req, res) => {
  try {
    const doc = await Project.findOne({_id:req.params.id});
    if (!doc) {
      return res.status(401).json({
        code: 401,
        status: "failed",
        msg: "Not  Project fonud" ,
        data:null
      });
    }
    await doc.deleteOne();
    return res.status(200).json({
      code: 200,
      status: "success",
      msg: "Project delete succesfullly!",
    });
  } catch (error) {
    return res.status(400).json({
      code: 400,
      status: "failed",
      msg: error,
    });
  }
};
const updateProject = async (req, res) => {
  try {
    const doc = await Project.findOne({_id:req.params.id});
    if (!doc) {
      return res.status(401).json({
        code: 401,
        status: "failed",
        msg: "Not  Project fonud" ,
        data:null
      });
    }
    const data = await Project.findOneAndUpdate({_id:req.params.id}, req.body, {
      new: true,
    });
    return res.status(200).json({
      code: 200,
      status: "success",
      msg: "Project update succesfullly!",
      data:data
    });
  } catch (error) {
    return res.status(400).json({
      code: 400,
      status: "failed",
      msg: error,
    });
  }
};
const getProjectList = async (req, res) => {
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
    if (status) filter.status = status;
    const result = await Project.paginate(filter, {
      page: page,
      limit: limit,
      pagination: JSON.parse(pagination),
      sort: { createdAt: -1 },
      populate: [
        {
          path: "assign",
          select: "_id name image",
        },
        {
          path: "activity",
          populate: [
            {
              path: "userId",
              select: "_id name image",
            }
          ]
        },
        {
          path: "task",
          populate:[
            {
              path: "assign",
              select:"_id name image"
            },
            {
              path:'activity',
              populate: [
                {
                  path: "userId",
                  select: "_id name image",
                }
              ]
            }
          ]
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
  createProject,
  getProjectList,
  detailsProject,
  updateProject,
  deleteProject,
};
