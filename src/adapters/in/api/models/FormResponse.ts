import {Answer, FormField} from '@src/adapters/in/api/models/common';


export interface FormResponse {

  id: number;
  formName: string;
  fields?: FormField[] | null;
  userAnswers?: UserAnswer[] | null;
}

export interface UserAnswer {
  userId: string;
  answers: Answer[] | null;
}