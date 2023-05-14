import {Form, UserAnswer} from '@src/domain/models/Form';


export interface ManageFormsUseCase {

  save(form: Form): Promise<Form>;
  saveAnswer(formId: number, userAnswer: UserAnswer): Promise<void>;
  getForm(id: number): Promise<Form | null>;
  getAll(): Promise<Form[]>;
}
