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

export type UserUpdateProps = {
  phone: string | null;
  fullName: string | null;
  dateOfBirth: string | null;
  gender: boolean | null;
  address: string | null;
  role: string | null;
  isStylist?: boolean | null;
  isVerified: boolean | null;
  status: string | null;
  salonId: number | null;
  imageUrl: string | null;
  commission: number | null;
  salary: number | null;
  salaryPerDay: number | null;
};
