import { PasswordBcrypt } from "../../../../infra/shared/crypto/password.bcrypt";
import { UserPrismaRepository } from "../../repositories/implementations/user.prisma.repository";
import { CreateUserController } from "./createUserController";

const userPrismaRepository = new UserPrismaRepository();
const passwordBcrypt = new PasswordBcrypt();

const createUserController = new CreateUserController(userPrismaRepository, passwordBcrypt);

export { createUserController };
