export type UserProps = {
  id: number;
  fullName: string | null;
  dateOfBirth: string | null;
  gender: boolean | null;
  phone: string | null;
  address: string | null;
  isVerified: boolean | null;
  status: string | null;
  salonId: number | null;
  roleName: string | null;
  imageUrl: string | null;
  commission: number | null;
  salary: number | null;
  salaryPerDay: number | null;
};

export type UserCreateProps = {
  phone: string | null;
  password: string | null;
  fullName: string | null;
  dateOfBirth: string | null;
  gender: boolean | null;
  address: string | null;
  isVerified: boolean | null;
  status: string | null;
  salonId: number | null;
  imageUrl: string | null;
  commission: number | null;
  salary: number | null;
  salaryPerDay: number | null;
};
