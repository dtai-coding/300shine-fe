export type ServiceItemProps = {
  id: number;
  imageUrl: string;
  price: number;
  name: string;
  description: string;
  salonId: number;
  duration: number;
  isDeleted: boolean;
  serviceStyles: { styleId: number }[];
};

export type ServiceViewProps = {
  id: number;
  imageUrl: string;
  price: number;
  name: string;
  description: string;
  salonId: number;
  salonName?: string;
  isDeleted: boolean;
  serviceStyles: { styleId: number }[];
};
