import { User } from "../../entities/User";
import { MailProvider } from "../../providers/MailProvider";
import { UsersRepository } from "../../repositories/UsersRepository";
import { CreateUserRequestDTO } from "./CreateUserDTO";

export class CreateUserUseCase {
  constructor (
    private usersRepository: UsersRepository,
    private mailProvider: MailProvider
  ) {}
  
  async excute(data: CreateUserRequestDTO) {
    const userAlreadyExists = await this.usersRepository.findByEmail(data.email);

    if (userAlreadyExists) {
      throw new Error('User already exists.');
    }

    const user = new User(data);
    
    await this.usersRepository.save(user);

    await this.mailProvider.sendMail({
      to: {
        name: data.name,
        email: data.email
      },
      from: {
        name: 'Gevs',
        email: 'Gevs@meuapp.com'
      },
      subject: 'seja Bem-Vindo á Plataform',
      body: '<p>Você já pode fazer login em nossa plataforma. </p>'
    })
  }
}