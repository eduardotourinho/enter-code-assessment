import {FormFieldType} from '@src/domain/models/Form';

export interface FormField {
  name: string,
  type: FormFieldType,
}

export interface Answer {
  fieldName: string,
  value: string
}
