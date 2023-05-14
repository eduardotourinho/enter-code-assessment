import {container} from 'tsyringe';
import {FormsService} from '@src/domain/service/FormsService';
import {
  FormRepository,
} from '@src/adapters/out/storage/repositories/FormRepository';


// Register IoC interfaces
container.register('ManageFormsUseCase', {useClass: FormsService});
container.register('SaveFormPort', {useClass: FormRepository});
container.register('FormFinderPort', {useClass: FormRepository});
