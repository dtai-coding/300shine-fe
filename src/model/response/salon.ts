export type SalonItemProps = {
  id: string;
  address: string;
  phone: number;
  district: string;
};

export type SalonViewProps = {
  id: number;
  imageUrl: string | null;
  address: string | null;
  phone: number | null;
  district: string | null;
};

export type SalonCreateProps = {
  id?: number;
  imageUrl: string | null;
  address: string | null;
  phone: number | null;
  district: string | null;
};
