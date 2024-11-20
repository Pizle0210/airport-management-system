import type { Booking } from "@/types";
import { getBookings } from "../../db/database";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function TicketBookings() {
  const [tickets, setTickets] = useState<Booking[]>([]);

  useEffect(() => {
    const fetchTickets = async () => {
      const ticketData = await getBookings();
      setTickets(ticketData);
    };

    fetchTickets();
  }, []);

  return (
    <div
      className={cn(
        `w-[min(100%,80rem)] min-h-screen py-14 lg:py-24 px-5 lg:px-10 flex flex-col  mx-auto `
      )}
    >
      <div className="justify-center flex flex-col">
        <h1 className="flex justify-center mb-10 text-2xl font-bold">
          Booked Tickets
        </h1>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="border p-3 rounded-md bg-emerald-900/80 text-white/90 "
            >
              <h3 className="mb-3 font-bold tracking-wide text-lg">
                Booking Receipt
              </h3>
              <p>
                <strong>Name: </strong>
                {ticket.customerName}
              </p>
              <p>
                <strong>Booking Date: </strong>
                {new Date(ticket.bookingDate).toLocaleDateString()}
              </p>
              <p className="">{ticket.planeName}</p>
              <p>
                <strong>Flight Id: </strong> {ticket.flightId}
              </p>
              <img src={ticket.receiptQrCode} />
            </div>
          ))}
        </div>
        <div className="">
          <Link to={"/booking"}>back</Link>
        </div>
      </div>
    </div>
  );
}
