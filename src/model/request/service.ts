export type ServiceActionProps = {
  id?: number;
  imageUrl: string | null;
  price: number | null;
  name: string | null;
  description: string | null;
  salonId: number | null;
  isDeleted?: boolean | null;
  serviceStyles: { styleId: number | null }[];
};
