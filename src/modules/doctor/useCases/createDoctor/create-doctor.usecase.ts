import { CustomError } from "../../../../errors/custom.error";
import { User } from "../../../users/entities/user.entity";
import { IUserRepository } from "../../../users/repositories/user.repository";
import { Doctor } from "../../entities/doctor.entity";
import { IDoctorRepository } from "../../repositories/doctor.repository";

export type CreateDoctorRequest = {
  name: string;
  username: string;
  password: string;
  crm: string;
  email: string;
  specialtyId: string;
};

export class CreateDoctorUseCase {
  constructor(
    private userRepository: IUserRepository,
    private doctorRepository: IDoctorRepository
  ) {}

  async execute({
    name,
    crm,
    email,
    username,
    password,
    specialtyId,
  }: CreateDoctorRequest) {
    const user = User.create({ name, username, password });

    const usernameExists = await this.userRepository.findByUsername(username);

    if (usernameExists)
      throw new CustomError(
        "Username already exists!",
        409,
        "USERNAME_EXISTS_ERROR"
      );

    const crmExits = await this.doctorRepository.findByCrm(crm);

    if (crmExits)
      throw new CustomError("CRM already exits!", 409, "CRM_EXISTS_ERROR");

    await this.userRepository.save(user);

    const doctor = Doctor.create({
      crm,
      email,
      specialtyId,
      userId: user.id,
    });

    const doctorCreated = await this.doctorRepository.save(doctor);

    return doctorCreated;
  }
}
