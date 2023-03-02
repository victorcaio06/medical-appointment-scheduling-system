import { CustomError } from "../../../../errors/custom.error";
import { ISpecialtyRepository } from "../../../specialties/repositories/specialty.repository";
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
    private doctorRepository: IDoctorRepository,
    private specialtyRepository: ISpecialtyRepository
  ) {}

  async execute({
    name,
    crm,
    email,
    username,
    password,
    specialtyId,
  }: CreateDoctorRequest) {
    const specialtyExists = await this.specialtyRepository.findById(
      specialtyId
    );

    if (!specialtyExists)
      throw new CustomError(
        "Specialty does not exists!",
        400,
        "SPECIALTY_NOT_EXISTS_ERROR"
      );

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

    const user = await User.create({ name, username, password });

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
