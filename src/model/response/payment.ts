export type PaymentItemProps = {
    bin: string;
    accountNumber: string;
    amount: number;
    description: string;
    orderCode: number;
    currency: string;
    paymentLinkId: string;
    status: string;
    expiredAt: string | null;
    checkoutUrl: string;
    qrCode: string;
};
  