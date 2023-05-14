import { Form, UserAnswer} from '@src/domain/models/Form';

export interface SaveFormPort {
  save(form: Form): Promise<Form>;
  saveAnswer(formId: number, userAnswer: UserAnswer): Promise<boolean>;
}

export interface FormFinderPort {
  getForm(id: number): Promise<Form | null>;
  getAll(): Promise<Form[]>;
}