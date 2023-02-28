import { PasswordBcrypt } from "../../../../infra/shared/crypto/password.bcrypt";
import { JwtToken } from "../../../../infra/shared/token/jwt.token";
import { UserPrismaRepository } from "../../repositories/implementations/user.prisma.repository";
import { AuthenticateUserController } from "./authenticate-user.controller";

const userPrismaRepository = new UserPrismaRepository();

const passwordBcrypt = new PasswordBcrypt();

const token = new JwtToken();

const authenticateUserController = new AuthenticateUserController(
  userPrismaRepository,
  passwordBcrypt,
  token
);

export { authenticateUserController };
