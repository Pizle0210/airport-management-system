import { useState, useEffect } from "react";
import { addFlight, getFlights } from "../../db/database";
import { Flight } from "../types";
import { v4 as uuidv4 } from "uuid";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { toast } from "sonner";

interface DateRange {
  startDate: Date;
  endDate: Date;
  key: string;
}

export default function FlightManagement() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [filteredFlights, setFilteredFlights] = useState<Flight[]>([]);
  const [newFlight, setNewFlight] = useState<Omit<Flight, "id">>({
    planeName: "",
    companyName: "",
    price: 0,
    date: "",
    hasTakenOff: false,
  });
  const [dateRange, setDateRange] = useState<DateRange[]>([
    { startDate: new Date(), endDate: new Date(), key: "selection" },
  ]);

  useEffect(() => {
    const fetchFlights = async () => {
      const flightData = await getFlights();
      setFlights(flightData);
    };
    fetchFlights();
  }, []);

  // date picker useEffect
  useEffect(() => {
    const { startDate, endDate } = dateRange[0];
    const filtered = flights.filter((flight) => {
      const flightDate = new Date(flight.date);
      return flightDate >= startDate && flightDate <= endDate;
    });
    setFilteredFlights(filtered);
  }, [dateRange, flights]);

  // handle
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewFlight((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleAddFlight = async (e: React.FormEvent) => {
    e.preventDefault();
    // const formattedDate = new Date(newFlight.date).toISOString().split("T")[0];

    const flightWithId: Flight = {
      ...newFlight,
      id: uuidv4(),
      date: new Date(newFlight.date).toISOString(),
    };

    await addFlight(flightWithId);
    const updatedFlights = await getFlights();
    setFlights(updatedFlights);
    toast("Flight added successfully",{duration:30});

    // Reset form
    setNewFlight({
      planeName: "",
      companyName: "",
      price: 0,
      date: "",
      hasTakenOff: false,
    });
  };

  const handleDateRangeChange = (ranges: { selection: DateRange }) => {
    setDateRange([ranges.selection]);
  };

  return (
    <div
      className={cn(
        `w-[min(100%,80rem)] antialiased py-14 lg:py-24 px-5 lg:px-10 flex flex-col mx-auto `
      )}
    >
      <div className="flex flex-col gap-3 items-center">
        <h2 className="text-grey-800 font-bold text-xl">Available Flights</h2>
        {/* form */}
        <form
          onSubmit={handleAddFlight}
          className="flex flex-col gap-3 w-full max-w-lg"
        >
          <input
            type="text"
            name="planeName"
            value={newFlight.planeName}
            onChange={handleInputChange}
            placeholder="Plane Name"
            required
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="companyName"
            value={newFlight.companyName}
            onChange={handleInputChange}
            placeholder="Company Name"
            required
            className="border p-2 rounded"
          />
          <input
            type="number"
            name="price"
            value={newFlight.price || ""}
            min={300}
            onChange={handleInputChange}
            placeholder="Price"
            required
            className="border p-2 rounded"
          />
          <input
            type="date"
            name="date"
            value={newFlight.date || ""}
            onChange={handleInputChange}
            placeholder="Flight Date"
            required
            className="border p-2 rounded"
          />
          <select
            name="hasTakenOff"
            value={newFlight.hasTakenOff ? "true" : "false"}
            onChange={(e) =>
              setNewFlight((prev) => ({
                ...prev,
                hasTakenOff: e.target.value === "true",
              }))
            }
            className="border p-2 rounded"
          >
            <option value="false">Scheduled</option>
            <option value="true">Taken Off</option>
          </select>
          <Button
            type="submit"
            className="py-2 px-8 hover:font-black ease-out rounded w-max hover:bg-teal-700 transition-colors duration-150 bg-teal-500 text-white"
          >
            Add Flight
          </Button>
        </form>
      </div>

      <div className="my-20 flex mx-auto">
        <DateRangePicker
          ranges={dateRange}
          onChange={(ranges) =>
            handleDateRangeChange(ranges as { selection: DateRange })
          }
          moveRangeOnFirstSelection={false}
        />
      </div>
      <div className="mt-24 flex flex-wrap justify-center gap-3">
        {filteredFlights.map((flight) => (
          <div
            key={flight.id}
            className="flex flex-col max-[640px]:w-full p-2 border rounded shadow-sm"
          >
            <div className="flex justify-between mb-2">
              <p className="">{flight.planeName}</p>
              <p className="text-right">{flight.companyName}</p>
            </div>
            <p className="text-lg font-semibold">${flight.price}</p>
            <p
              className={cn(
                `text-sm text-gray-600 ${
                  flight.hasTakenOff
                    ? "bg-red-600 font-semibold text-white rounded pl-2"
                    : "bg-teal-700/80 font-bold text-white rounded pl-2"
                }`
              )}
            >
              {flight.hasTakenOff ? "Taken Off" : "Scheduled"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
