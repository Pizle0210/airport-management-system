import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";
import { getFlights, addBooking } from "../../db/database";
import { Flight, Booking } from "../types";
import { cn } from "@/lib/utils";
import QRCode from "qrcode";
import Receipt from "@/components/receipt";
import { toast } from "sonner";

export default function BookingPage() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [customerName, setCustomerName] = useState("");
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [qrCode, setQrCode] = useState<string>("");

  useEffect(() => {
    const fetchFlights = async () => {
      const flightData = await getFlights();
      const availableFlights = flightData.filter(
        (flight) => !flight.hasTakenOff && new Date(flight.date) > new Date()
      );
      setFlights(availableFlights);
    };
    fetchFlights();
  }, []);

  const handleBookFlight = async (flight: Flight) => {
    if (
      !customerName ||
      typeof customerName !== "string" ||
      customerName.trim() === ""
    ) {
      return;
    }
    if (!flight || typeof flight.id !== "string") return;

    try {
      // Generate QR Code
      const qrData = `Booking ID: ${uuidv4()}\nFlight ID: ${
        flight.id
      }\nCustomer Name: ${customerName}`;
      const qrCodeUrl = await QRCode.toDataURL(qrData);

      const newBooking: Booking = {
        id: uuidv4(),
        flightId: flight.id,
        customerName,
        planeName: flight?.planeName,
        bookingDate: new Date().toISOString(),
        receiptQrCode: qrCodeUrl,
      };

      await addBooking(newBooking);
      setSelectedFlight(flight);
      setQrCode(qrCodeUrl);
      toast("Flight booked successfully");
    } catch (error) {
      const errMsg =
        error instanceof Error ? error.message : "Unknown error occurred";
      toast.error(`Error booking flight: ${errMsg}`);
    }
  };

  return (
    <div
      className={cn(
        `w-[min(100%,80rem)] py-14 lg:py-24 px-5 lg:px-10 flex flex-col min-h-screen mx-auto `
      )}
    >
      <div className="flex flex-col space-y-3 justify-center items-center">
        <h2>Book a Flight</h2>
        <input
          type="text"
          placeholder="Enter your name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
      </div>
      <div className="grid mt-5 md:mt-10 grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {flights.map((flight) => (
          <div key={flight.id} className="border p-4 flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <p>{flight?.planeName}</p>
              <p>{flight?.companyName}</p>
            </div>
            <p>{flight.date}</p>
            <p>Flight Price - ${flight.price}</p>

            <button
              onClick={() => {
                handleBookFlight(flight);
              }}
              type="submit"
              className={cn(
                `rounded-sm max-sm:w-full ${
                  flight.hasTakenOff ? "bg-gray-500" : "bg-teal-500"
                } text-white p-2 font-bold hover:bg-teal-700 transition-all duration-150 ease-in-out`
              )}
            >
              Book Flight
            </button>
          </div>
        ))}
      </div>
      <div
        className={cn(
          `flex mx-auto py-14 mt-20 ${
            selectedFlight && "border rounded-md "
          } px-14`
        )}
      >
        {selectedFlight && qrCode && (
          <div className="space-y-1 font-semibold">
            <Receipt
              booking={{
                id: uuidv4(),
                flightId: selectedFlight.id,
                customerName,
                planeName: selectedFlight.planeName,
                bookingDate: new Date().toISOString(),
                receiptQrCode: qrCode,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
