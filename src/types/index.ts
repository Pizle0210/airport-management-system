// src/types/index.ts
export type Flight = {
  id: string;
  planeName: string;
  companyName: string;
  price: number;
  date: string;
  hasTakenOff: boolean;
};

export type ParkingFee = {
  planeId: string;
  monthlyFee: number;
};

export type Booking = {
  id: string;
  flightId: string;
  customerName: string;
  planeName?: string;
  bookingDate: string;
  receiptQrCode: string;
};

export type Gate = {
  id: string;
  flightId: string;
  gateNumber: string;
  status: "Open" | "Closed" | "Under Maintenance";
};
