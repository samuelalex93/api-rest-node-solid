import { IMailProvider } from './../../providers/IEmailProvider';
import { ICreateUserRequestDTO } from './CreateUserDTO';
import { IUsersRepository } from './../../repositories/IUserRepository';
import { User } from '../../entities/User';

export class CreateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private mailProvider: IMailProvider,
  ) {}

  async execute(data: ICreateUserRequestDTO) {
    const userAlreadyExists = await this.usersRepository.findByEmail(data.email);

    if(userAlreadyExists) {
      throw new Error('User already exists.');
    }

    const user = new User(data);

    await this.usersRepository.save(user);

    await this.mailProvider.sendMail({
      to: {
        name: data.name,
        email: data.email,
      },
      from: {
        name: `Equipe do App`,
        email: `equipe@meuapp.com.br`,
      },
      subject: `Seja bem vindo`,
      body:`<p>Você já pode fazer login</p>`
    })
  }
}