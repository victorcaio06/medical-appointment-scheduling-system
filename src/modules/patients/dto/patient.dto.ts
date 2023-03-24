export type PatientWithUserDTO = {
  id: string;
  userId: string;
  document: string;
  email: string;
  user: {
    name: string;
  };
};
