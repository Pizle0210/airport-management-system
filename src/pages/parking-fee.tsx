import { useState, useEffect } from "react";
import { addParkingFee, getParkingFees } from "../../db/database";
import { type ParkingFee } from "@/types";
import { cn } from "@/lib/utils";

export default function ParkingFee() {
  const [parkingFees, setParkingFees] = useState<ParkingFee[]>([]);
  const [planeId, setPlaneId] = useState("");
  const [monthlyFee, setMonthlyFee] = useState<number>(0);

  useEffect(() => {
    const fetchParkingFees = async () => {
      const fees = await getParkingFees();
      setParkingFees(fees);
    };
    fetchParkingFees();
  }, []);

  const handleAddParkingFee = async () => {
    if (!planeId || monthlyFee <= 0) {
      alert("Please enter valid Plane ID and Monthly Fee.");
      return;
    }

    const newFee: ParkingFee = {
      planeId,
      monthlyFee,
    };

    await addParkingFee(newFee);
    setParkingFees([...parkingFees, newFee]);
    setPlaneId("");
    setMonthlyFee(0);
  };

  return (
    <div
      className={cn(
        `w-[min(100%,80rem)] py-14 lg:py-24 px-5 lg:px-10 flex flex-col h-screen mx-auto `
      )}
    >
      <form className="flex flex-col justify-center mx-auto">
        <h2 className="mb-10 mx-auto font-bold tracking-wider text-3xl">
          Parking Fee Management
        </h2>
        <div className="flex flex-col gap-3">
          <label className="mb-0">
            <span>Plane ID </span>
            <input
              type="text"
              placeholder="Plane ID"
              value={planeId}
              className="max-w-3xl"
              onChange={(e) => setPlaneId(e.target.value)}
            />
          </label>
          <label>
            <span>Amount </span>
            <input
              type="number"
              placeholder="Monthly Fee"
              value={monthlyFee}
              className="max-w-3xl"
              onChange={(e) => setMonthlyFee(parseFloat(e.target.value))}
            />
          </label>
        </div>
        <button
          onClick={handleAddParkingFee}
          className="p-3 mt-5 mx-auto text-white font-bold bg-teal-400 rounded"
        >
          Add Parking Fee
        </button>
      </form>
      <div className="my-28 gap-4 flex justify-center flex-col mx-auto">
        {parkingFees.map((fee) => (
          <div
            key={fee.planeId}
            className=" border py-5 px-7 rounded border-teal-300"
          >
            <p className="">
              <span className="font-semibold">Plane ID:</span>
              <span className="italic font-normal">{fee.planeId}</span>
            </p>
            <p>
              <span className="font-normal">Monthly Fee:</span>{" "}
              <span className="italic bold">${fee.monthlyFee}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
