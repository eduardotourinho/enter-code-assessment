import {Answer, FormField} from '@src/adapters/in/api/models/common';

export interface FormRequest {
  id?: number,
  name: string,

  fields?: FormField[],
}
