type UserRequest = {
  name: string;
  username: string;
  password: string;
};

export class CreateUserUseCase {
  async execute(data: UserRequest) {}
}
