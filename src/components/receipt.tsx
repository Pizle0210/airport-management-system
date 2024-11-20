import type { Booking } from "@/types";

type ReceiptProps = {
  booking: Booking;
};
export default function Receipt({ booking }: ReceiptProps) {

  const downloadReceipt = () => {
    const element = document.createElement("a");
    const file = new Blob(
      [
        `Booking ID: ${booking.id}\nFlight ID: ${
          booking.flightId
        }\nCustomer Name: ${booking.customerName}\nBooking Date: ${new Date(
          booking.bookingDate
        ).toLocaleString()}`,
      ],
      { type: "text/plain" }
    );
    element.href = URL.createObjectURL(file);
    element.download = `receipt_${booking.id}.txt`;
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="space-y-1 flex flex-col text-start font-semibold">
      <h3 className="flex justify-center">Booking Receipt</h3>
      <p>Booking ID: {booking.id}</p>
      <p>Flight ID: {booking.flightId}</p>
      <p>Flight Name: {booking?.planeName}</p>
      <p>Customer Name: {booking?.customerName}</p>
      <p>Booking Date: {new Date(booking.bookingDate).toLocaleString()}</p>
      <div className="items-center flex flex-col justify-center">
        <img src={booking.receiptQrCode} alt="Receipt QR Code" />
        <button
          onClick={downloadReceipt}
          className="hover:underline hover:underline-offset-2"
        >
          Download Receipt
        </button>
      </div>
    </div>
  );
}
