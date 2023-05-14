import {ManageFormsUseCase} from '@src/domain/ports/in';
import {inject, singleton} from 'tsyringe';
import {Form, UserAnswer} from '@src/domain/models/Form';
import {FormFinderPort, SaveFormPort} from '@src/domain/ports/out';

@singleton()
export class FormsService implements ManageFormsUseCase {

  public constructor(@inject('SaveFormPort') private formSaver: SaveFormPort,
    @inject('FormFinderPort') private formFinder: FormFinderPort) {
  }

  public async getAll(): Promise<Form[]> {
    return await this.formFinder.getAll();
  }

  public async getForm(id: number): Promise<Form | null> {
    return await this.formFinder.getForm(id);
  }

  public async save(form: Form): Promise<Form> {
    return await this.formSaver.save(form);
  }

  public async saveAnswer(formId: number, userAnswer: UserAnswer): Promise<void> {
    const form = await this.getForm(formId);

    if (form === null) {
      throw new Error(`Form ${formId} doesn't exist.`);
    }

    for (const answer of userAnswer.answers ?? []) {
      const validFields = form.fields?.map(f => f.name) ?? [];

      if (!validFields.includes(answer.field)) {
        // eslint-disable-next-line max-len
        throw new Error(`Form '${formId}' doesn't contain field '${answer.field}'. Valid fields: ${validFields.toString()}`);
      }
    }

    await this.formSaver.saveAnswer(formId, userAnswer);

    return Promise.resolve(undefined);
  }
}
