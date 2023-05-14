import {FormFinderPort, SaveFormPort} from '@src/domain/ports/out';
import {Form, FormField, UserAnswer} from '@src/domain/models/Form';
import {AppDataSource} from '@src/config/data-source-config';
import {FormEntity} from '@src/adapters/out/storage/entity/Form';
import {singleton} from 'tsyringe';
import {FormFieldEntity} from '@src/adapters/out/storage/entity/FormField';
import {AnswerEntity} from '@src/adapters/out/storage/entity/Answer';


@singleton()
export class FormRepository implements SaveFormPort, FormFinderPort {

  private formRepository = AppDataSource.getRepository(FormEntity);
  private fieldsRepository = AppDataSource.getRepository(FormFieldEntity);
  private answerRepository = AppDataSource.getRepository(AnswerEntity);

  public async save(form: Form): Promise<Form> {
    const formEntity = new FormEntity();
    formEntity.name = form.name;

    const newForm = await this.formRepository.save(formEntity);

    for (const field of form.fields ?? []) {
      const fieldEntity = new FormFieldEntity();
      fieldEntity.name = field.name;
      fieldEntity.type = field.type;
      fieldEntity.form = newForm;

      await this.fieldsRepository.save(fieldEntity);
    }

    return {
      id: newForm.id,
      ...form,
    };
  }


  public async getAll(): Promise<Form[]> {
    const entities = await this.formRepository.find();

    const forms = [];
    for (const formEntity of entities) {
      const formFields = (await formEntity.fields).map(field => <FormField>({
        name: field.name,
        type: field.type,
      }));

      forms.push({
        id: formEntity.id,
        name: formEntity.name,
        fields: formFields,
      });
    }

    return forms;
  }

  public async getForm(id: number): Promise<Form | null> {
    const form = await this.formRepository.findOneBy({id});

    if (form === null) {
      return null;
    }

    const formFields = (await form.fields).map(field => <FormField>({
      name: field.name,
      type: field.type,
    }));

    const userAnswers = this.mapUserAnswers(await form.answers ?? []);

    return {
      id: form.id,
      name: form.name,
      fields: formFields,
      usersAnswers: userAnswers,
    };
  }

  public async saveAnswer(formId: number, userAnswer: UserAnswer): Promise<boolean> {
    const formEntity = await this.formRepository.findOneBy({id: formId});
    if (formEntity === null) {
      throw new Error(`Form ${formId} doesn't exist.`);
    }

    for (const answer of userAnswer.answers ?? []) {
      const answerEntity = new AnswerEntity();
      answerEntity.userId = userAnswer.userId;
      answerEntity.fieldName = answer.field;
      answerEntity.value = answer.value.toString();
      answerEntity.form = formEntity;

      await this.answerRepository.save(answerEntity);
    }

    return Promise.resolve(true);
  }

  private mapUserAnswers(answerEntities: AnswerEntity[]): UserAnswer[] {
    // Build the Answers grouping
    const answers: UserAnswer[] = [];
    for (const answerEntity of answerEntities) {
      const answer = {
        field: answerEntity.fieldName,
        value: answerEntity.value,
      };

      let userAnswer = answers.find(a => a.userId == answerEntity.userId);
      if (userAnswer === undefined) {
        userAnswer = {userId: answerEntity.userId, answers: [answer]};
        answers.push(userAnswer);
      } else {
        userAnswer.answers?.push(answer);
      }
    }

    return answers;
  }
}
