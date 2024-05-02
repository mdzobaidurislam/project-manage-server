const Activity = require("../models/ActivityModel");
const User = require("../models/User");

const createActivity = async (req, res) => {
  try {
    const data = req.body;
    const result = await Activity.create(data);
    if (!result) {
      return res.status(401).json({
        code: 401,
        status: "failed",
        msg: "Not created Activity",
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
const detailsActivity = async (req, res) => {
  try {
   
    const result = await Activity.findOne({_id:req.params.id}).populate({
      path:'assign',
      select:"_id name image"
    });
    if (!result) {
      return res.status(401).json({
        code: 401,
        status: "failed",
        msg: "Not  Activity fonud" ,
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
const deleteActivity = async (req, res) => {
  try {
    const doc = await Activity.findOne({_id:req.params.id});
    if (!doc) {
      return res.status(401).json({
        code: 401,
        status: "failed",
        msg: "Not  Activity fonud" ,
        data:null
      });
    }
    await doc.deleteOne();
    return res.status(200).json({
      code: 200,
      status: "success",
      msg: "Activity delete succesfullly!",
    });
  } catch (error) {
    return res.status(400).json({
      code: 400,
      status: "failed",
      msg: error,
    });
  }
};
const updateActivity = async (req, res) => {
  try {
    const doc = await Activity.findOne({_id:req.params.id});
    if (!doc) {
      return res.status(401).json({
        code: 401,
        status: "failed",
        msg: "Not  Activity fonud" ,
        data:null
      });
    }
    const data = await Activity.findOneAndUpdate({_id:req.params.id}, req.body, {
      new: true,
    });
    return res.status(200).json({
      code: 200,
      status: "success",
      msg: "Activity update succesfullly!",
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
const getActivityList = async (req, res) => {
  const {
    page = 1,
    limit = 12,
    pagination = true,
    text = ""
  } = req.query;

  try {
    let filter = {};
    

    if (text) filter.text = { $regex: text, $options: "i" };

    const result = await Activity.paginate(filter, {
      page: page,
      limit: limit,
      pagination: JSON.parse(pagination),
      sort: { createdAt: -1 },
      
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
  createActivity,
  getActivityList,
  detailsActivity,
  updateActivity,
  deleteActivity,
};
