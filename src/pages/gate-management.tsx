import { useState, useEffect } from "react";
import { addGate, getGates, updateGate } from "../../db/database";
import { Gate } from "../types";
import { v4 as uuidv4 } from "uuid";
import { cn } from "@/lib/utils";

export default function GateManagement() {
  const [gates, setGates] = useState<Gate[]>([]);
  const [flightId, setFlightId] = useState("");
  const [gateNumber, setGateNumber] = useState("");
  const [status, setStatus] = useState<"Open" | "Closed" | "Under Maintenance">(
    "Open"
  );

  useEffect(() => {
    const fetchGates = async () => {
      const gateData = await getGates();
      setGates(gateData);
    };
    fetchGates();
  }, []);

  const handleAddGate = async () => {
    if (!flightId || !gateNumber) {
      alert("Please enter both Flight ID and Gate Number.");
      return;
    }
    const newGate: Gate = {
      id: uuidv4(),
      flightId,
      gateNumber,
      status,
    };
    await addGate(newGate);
    setGates([...gates, newGate]);
    setFlightId("");
    setGateNumber("");
    setStatus("Open");
  };

  const handleUpdateStatus = async (
    gate: Gate,
    newStatus: "Open" | "Closed" | "Under Maintenance"
  ) => {
    const updatedGate = { ...gate, status: newStatus };
    await updateGate(updatedGate);
    setGates(gates.map((g) => (g.id === gate.id ? updatedGate : g)));
  };

  return (
    <div
      className={cn(
        `w-[min(100%,80rem)] h-screen py-14 lg:py-24 px-5 lg:px-10 flex flex-col  mx-auto `
      )}
    >
      <h2>Gate Management</h2>
      <div>
        <input
          type="text"
          placeholder="Flight ID"
          value={flightId}
          onChange={(e) => setFlightId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Gate Number"
          value={gateNumber}
          onChange={(e) => setGateNumber(e.target.value)}
        />
        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value as "Open" | "Closed" | "Under Maintenance")
          }
        >
          <option value="Open">Open</option>
          <option value="Closed">Closed</option>
          <option value="Under Maintenance">Under Maintenance</option>
        </select>
        <button onClick={handleAddGate}>Add Gate</button>
      </div>
      <ul>
        {gates.map((gate) => (
          <li key={gate.id}>
            Flight ID: {gate.flightId} - Gate: {gate.gateNumber} - Status:{" "}
            {gate.status}
            <button onClick={() => handleUpdateStatus(gate, "Open")}>
              Open
            </button>
            <button onClick={() => handleUpdateStatus(gate, "Closed")}>
              Close
            </button>
            <button
              onClick={() => handleUpdateStatus(gate, "Under Maintenance")}
            >
              Maintenance
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
