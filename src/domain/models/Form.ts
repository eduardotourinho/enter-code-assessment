
export enum FormFieldType {
  TEXT = 'text',
  PASSWORD = 'password',
  EMAIL = 'email',
  DATE = 'date'
}

export interface FormField {
  id?: number,
  name: string,
  type: FormFieldType
}

export interface Form {
  id?: number;
  name: string;
  fields?: FormField[],
  usersAnswers?: UserAnswer[]
}

export interface UserAnswer {
  userId: string,
  answers? : Answer[];
}

export interface Answer {
  field: string,
  value: string,
}
