import express from 'express';
import userCtrl from '../controllers/user.controller.js';
import authCtrl from '../controllers/auth.controller.js';

const router = express.Router();

router.route('/')
  .get(userCtrl.list)
  .post(userCtrl.create);

router.route('/:userId')
  // .get(authCtrl.requireSignin, userCtrl.hasAuthorization, userCtrl.read)
  // .put(authCtrl.requireSignin, userCtrl.hasAuthorization, userCtrl.update)
  // .delete(authCtrl.requireSignin, userCtrl.hasAuthorization, userCtrl.remove);
  .get(userCtrl.read)
  .put(userCtrl.update)
  .delete(userCtrl.remove);





router.param('userId', userCtrl.userByID);

export default router;