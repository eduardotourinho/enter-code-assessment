import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {FormFieldEntity} from '@src/adapters/out/storage/entity/FormField';
import {AnswerEntity} from '@src/adapters/out/storage/entity/Answer';
import {IsNotEmpty} from 'class-validator';

@Entity()
export class FormEntity {

  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  @IsNotEmpty()
  public name: string;

  @OneToMany(() => FormFieldEntity, (fields) => fields.form)
  public fields: Promise<FormFieldEntity[]>;

  @OneToMany(() => AnswerEntity, (answer) => answer.form)
  public answers?: Promise<AnswerEntity[]>;
}
