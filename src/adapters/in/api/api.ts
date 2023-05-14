import { Router } from 'express';
import jetValidator from 'jet-validator';
import Paths from './constants/Paths';
import FormRouter from './routes/FormRouter';


const apiRouter = Router(),
  validate = jetValidator();


const formRouter = Router();

formRouter.get(
  Paths.Forms.Get,
  FormRouter.getAllForms,
);

formRouter.get(
  Paths.Forms.GetForm,
  validate(['id', 'number', 'params']),
  FormRouter.getForm,
);

formRouter.post(
  Paths.Forms.Add,
  FormRouter.addForm,
);

formRouter.post(
  Paths.Forms.Answer,
  validate(['id', 'number', 'params']),
  FormRouter.submitAnswer,
);

apiRouter.use(Paths.Forms.Base, formRouter);

export default apiRouter;
