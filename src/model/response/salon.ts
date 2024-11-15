export type SalonItemProps = {
  id: number;
  address: string;
  phone: number;
  district: string;
  imageUrl: string | null;
};

export type SalonNameProps = {
  id: number;
  address: string | null;
};

export type SalonViewProps = {
  id: number;
  imageUrl: string | null;
  address: string | null;
  phone: number | null;
  district: string | null;
};
