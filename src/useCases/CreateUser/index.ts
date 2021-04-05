import { MailtrapMailProvider } from '../../providers/Imprementations/MailtrapMailProvider';
import { PostgresUsersRepository } from '../../repositories/Imprementations/PostrgresUsersRepositorio';
import { CreateUserController } from './CreateUserController';
import { CreateUserUseCase } from './CreateUserUseCase';

const mailtrapMailProvider = new MailtrapMailProvider();
const postgresUsersRepository = new PostgresUsersRepository();
const createUserUseCase = new CreateUserUseCase(
  postgresUsersRepository,
  mailtrapMailProvider,
);

const createUserController = new CreateUserController(
  createUserUseCase
);

export { createUserUseCase, createUserController }