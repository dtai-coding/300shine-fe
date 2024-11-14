export type AppointmentItemProps = {
    appoinmentId: number
    note: string | null;
    date: string;
    status: string;
    amount: number;
    userName: string;
    salonAddress: string;
    orderCode: number;
    appointmentDetails: AppointmentDetail[];
};

export type AppointmentDetail = {
    appointmentId: number;
    serviceName: string;
    stylistName: string;
    returnDate: string;
    price: number;
    type: string;
    status: string;
    appointmentDetailSlots: AppointmentSlot[];
};

export type AppointmentSlot = {
    slotId: number;
    slot: string;
};

