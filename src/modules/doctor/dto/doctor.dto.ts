export type DoctorWithUserDTO = {
  id: string;
  crm: string;
  email: string;
  userId: string;
  specialtyId: string;
  user: {
    name: string;
  }
};
