import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import config from '../config.js';

const signin = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    console.log(user)

    if (!user)
      return res.status(401).json({ error: 'User not found' });

    const validPassword = await user.comparePassword(req.body.password);
    if (!validPassword)
      return res.status(401).json({ error: 'Invalid password' });

    const token = jwt.sign({ _id: user._id }, config.jwtSecret);
    res.cookie('t', token, { expire: new Date() + 4*60*60*1000 });
    return res.json({
      token,
      user: { _id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    return res.status(401).json({ error: 'Could not sign in' });
  }
};

const signout = (req, res) => {
  res.clearCookie('t');
  return res.status(200).json({ message: 'Signed out' });
};

const requireSignin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(403).json({ error: 'Access denied' });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);

    req.auth = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

export default { signin, signout, requireSignin };
