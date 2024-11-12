export type ServiceItemProps = {
    id: number;
    imageUrl: string;
    price: number;
    name: string;
    description: string;
    salonId: number;
    duration : number
    isDeleted: boolean;
    serviceStyles: { styleId: number }[];
};