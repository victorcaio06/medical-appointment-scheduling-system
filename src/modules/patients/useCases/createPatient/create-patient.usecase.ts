import { CustomError } from "../../../../errors/custom.error";
import { User } from "../../../users/entities/user.entity";
import { IUserRepository } from "../../../users/repositories/user.repository";
import { Patient } from "../../entities/patient.entity";
import { IPatientRepository } from "../../repositories/patient.repository";

export type CreatePatientRequest = {
  name: string;
  username: string;
  password: string;
  email: string;
  document: string;
};

export class CreatePatientUseCase {
  constructor(
    private userRepository: IUserRepository,
    private patientRepository: IPatientRepository
  ) {}

  async execute(
    { name, username, password, email, document }: CreatePatientRequest,
    avatar?: string
  ) {
    const usernameExists = await this.userRepository.findByUsername(username);

    if (usernameExists)
      throw new CustomError(
        "Username already exists!",
        409,
        "USERNAME_EXISTS_ERROR"
      );

    const user = await User.create({ name, username, password, avatar });

    const patient = Patient.create({ document, email, userId: user.id });

    const existsPatient = await this.patientRepository.findByDocumentOrEmail(
      document,
      email
    );

    if (existsPatient)
      throw new CustomError(
        "Patient already exists!",
        409,
        "PATIENT_EXISTS_ERROR"
      );

    await this.userRepository.save({
      id: user.id,
      name,
      username,
      password: user.password,
      isAdmin: user.isAdmin,
      avatar: user.avatar,
    });

    const patientCrated = await this.patientRepository.save(patient);

    return patientCrated;
  }
}
