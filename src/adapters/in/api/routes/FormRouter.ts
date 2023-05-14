import {ManageFormsUseCase} from '@src/domain/ports/in';
import {container} from 'tsyringe';
import {Form, Answer as AnswerModel} from '@src/domain/models/Form';
import {FormRequest} from '@src/adapters/in/api/models/FormRequest';
import {RouteError} from '@src/adapters/in/api/models/RouteError';
import HttpStatusCodes from '@src/adapters/in/api/constants/HttpStatusCodes';
import {IReq} from '@src/types/express';
import {Response} from 'express';
import {Answer, FormField} from '@src/adapters/in/api/models/common';
import { v4 as uuidv4 } from 'uuid';

const formManager: ManageFormsUseCase = container.resolve('ManageFormsUseCase');

const submitAnswer = async (request: IReq<{ answers: Answer[] }>, response: Response): Promise<Response> => {
  const formId = +request.params.id;
  const {answers} = request.body;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const userId = <string>uuidv4();

  const answersModel = answers.map(answer => <AnswerModel>({
    field: answer.fieldName,
    value: answer.value,
  }));

  try {
    await formManager.saveAnswer(formId, {userId, answers: answersModel});
  } catch (error: unknown) {
    let message = 'Unknown error';
    if (error instanceof Error) {
      message = error.message;
    }

    throw new RouteError(HttpStatusCodes.BAD_REQUEST, message);
  }

  return response.status(HttpStatusCodes.CREATED).end();
};

const addForm = async (request: IReq<{ form: FormRequest }>, response: Response) => {
  const {form} = request.body;

  const formModel: Form = {
    name: form.name,
    fields: form.fields?.map((field: FormField) => ({name: field.name, type: field.type})),
  };
  const newForm = await formManager.save(formModel);

  return response.status(HttpStatusCodes.CREATED).json({form: newForm});
};

const getAllForms = async (_: IReq, res: Response): Promise<Response> => {
  const forms = await formManager.getAll();

  const formsResponse = forms.map((form: Form) => ({
    id: form.id,
    formName: form.name,
    fields: form.fields,
  }));

  return res.status(HttpStatusCodes.OK).json({forms: formsResponse});
};

const getForm = async (request: IReq, response: Response): Promise<Response | RouteError> => {
  const formId = +request.params.id;
  const form = await formManager.getForm(formId);

  if (form === null) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, `Form ${formId} not found`);
  }

  const formsResponse = {
    id: form.id,
    formName: form.name,
    fields: form.fields,
    userAnswers: form.usersAnswers,
  };

  return response.status(HttpStatusCodes.OK).json({form: formsResponse});
};

export default {submitAnswer, getAllForms, getForm, addForm};
