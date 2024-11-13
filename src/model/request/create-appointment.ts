export type AppointmentProps = {
    salonId: number;
    dateToGo: string;
    items: ItemProps[];
  };
  
  export type ItemProps = {
    serviceId: number;
    stylistId: number;
    slots: SlotProps[];
  };
  
  export type SlotProps = {
    id: number;
  };
  