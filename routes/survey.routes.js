import express from 'express';
import surveyCtrl from '../controllers/survey.controller.js';
import authCtrl from '../controllers/auth.controller.js';

const router = express.Router();

router.route('/')
  .get(surveyCtrl.list)
  // .post(authCtrl.requireSignin, surveyCtrl.create);

  .post(surveyCtrl.create);
  // .post(authCtrl.requireSignin, surveyCtrl.create);

  router.route('/:surveyId')
  .get(surveyCtrl.read)
  // .put(authCtrl.requireSignin, surveyCtrl.hasAuthorization, surveyCtrl.update)
  .put(surveyCtrl.update)


  // .delete(authCtrl.requireSignin, surveyCtrl.hasAuthorization, surveyCtrl.remove);
  .delete(surveyCtrl.remove);


router.param('surveyId', surveyCtrl.surveyByID);

export default router;
