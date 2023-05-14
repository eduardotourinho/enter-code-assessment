import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {FormEntity} from '@src/adapters/out/storage/entity/Form';
import {IsNotEmpty} from 'class-validator';

@Entity()
export class AnswerEntity {

  @PrimaryGeneratedColumn()
  public id: number;

  @Column({type: 'uuid'})
  public userId: string;
  
  @Column()
  @IsNotEmpty()
  public fieldName: string;

  @Column()
  public value: string;

  @ManyToOne(() => FormEntity, (form) => form.answers)
  public form: FormEntity;
}
