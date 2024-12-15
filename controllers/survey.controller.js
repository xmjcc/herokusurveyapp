import Survey from '../models/survey.model.js';

const create = async (req, res) => {
  const survey = new Survey(req.body);

  // console.log('mytest2',req.auth._id);
  // // console.log("Type of req.auth._id:", typeof req.auth._id);
  // survey.createdBy = req.auth._id;
   
  try {
    

    await survey.save();
    return res.status(201).json({
      message: 'Survey successfully created',
    });
  } catch (err) {
    return res.status(400).json({
      error: 'Could not create survey',
    });
  }
};

const list = async (req, res) => {
  try {
    // let surveys = await Survey.find().populate('createdBy', 'name email');
    let surveys = await Survey.find();
    res.json(surveys);
  } catch (err) {
    return res.status(400).json({
      error: 'Could not retrieve surveys',
    });
  }
};

const surveyByID = async (req, res, next, id) => {
  try {
    let survey = await Survey.findById(id).populate('createdBy', 'name email');
    if (!survey)
      return res.status(404).json({
        error: 'Survey not found',
      });
    req.survey = survey;
    next();
  } catch (err) {
    return res.status(400).json({
      error: 'Could not retrieve survey',
    });
  }
};

const read = (req, res) => {
  return res.json(req.survey);
};

const update = async (req, res) => {
  try {
    let survey = req.survey;
    Object.assign(survey, req.body);
    survey.updatedAt = Date.now();
    await survey.save();
    res.json(survey);
  } catch (err) {
    return res.status(400).json({
      error: 'Could not update survey',
    });
  }
};

const remove = async (req, res) => {
  try {
    let survey = req.survey;
    await survey.deleteOne();
    res.json({
      message: 'Survey deleted successfully',
    });
  } catch (err) {
    return res.status(400).json({
      error: 'Could not delete survey',
    });
  }
};



const hasAuthorization = (req, res, next) => {
  const authorized = req.survey && req.auth && req.survey.createdBy._id.toString() === req.auth._id;
  if (!authorized) {
    return res.status(403).json({ error: 'User is not authorized' });
  }
  next();
};

export default { create, list, surveyByID, read, update, remove, hasAuthorization };
