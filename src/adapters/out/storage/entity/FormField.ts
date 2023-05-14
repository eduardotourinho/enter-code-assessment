import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {FormEntity} from '@src/adapters/out/storage/entity/Form';
import {IsNotEmpty} from 'class-validator';

@Entity()
export class FormFieldEntity {

  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  @IsNotEmpty()
  public name: string;

  @Column()
  @IsNotEmpty()
  public type: string;

  @ManyToOne(() => FormEntity, (form) => form.fields)
  public form: FormEntity;
}
