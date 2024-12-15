import User from '../models/user.model.js';

const create = async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    return res.status(201).json({
      message: 'User successfully created',
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      error: err.message || 'An error occurred while creating the user',
    });
  }
};

const list = async (req, res) => {
  try {
    let users = await User.find().select('name email created');
    res.json(users);
  } catch (err) {
    return res.status(400).json({
      error: 'Could not retrieve users',
    });
  }
};

const userByID = async (req, res, next, id) => {
  try {
    let user = await User.findById(id);
    if (!user)
      return res.status(404).json({
        error: 'User not found',
      });
    req.profile = user;
    next();
  } catch (err) {
    return res.status(400).json({
      error: 'Could not retrieve user',
    });
  }
};

const read = (req, res) => {
  req.profile.password = undefined;
  req.profile.__v = undefined;
  return res.json(req.profile);
};

const update = async (req, res) => {
  try {
    let user = req.profile;
    Object.assign(user, req.body);
    user.updated = Date.now();
    await user.save();
    user.password = undefined;
    res.json(user);
  } catch (err) {
    return res.status(400).json({
      error: 'Could not update user',
    });
  }
};

const remove = async (req, res) => {
  try {
    let user = req.profile;
    await user.deleteOne();
    res.json({
      message: 'User deleted successfully',
    });
  } catch (err) {
    return res.status(400).json({
      error: 'Could not delete user',
    });
  }
};

const hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id.toString() === req.auth._id;
  if (!authorized) {
    return res.status(403).json({ error: 'User is not authorized' });
  }
  next();
};

export default { create, list, userByID, read, update, remove, hasAuthorization };


