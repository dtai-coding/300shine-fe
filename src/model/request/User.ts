type BaseUserProps = {
  phone: string | null;
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

export type UserActionProps = BaseUserProps & {
  password?: string | null; // Optional for create operations
  roleId?: number | null; // Optional for update operations
  isStylist?: boolean | null; // Optional for update operations
};
