// import { Button } from "@/components/ui/button";

// export default function FlightForm({newFlight,handleInputChange,handleAddFlight}:{
//     newFlight:any,
// }) {
//   return (
//     <form
//       onSubmit={handleAddFlight}
//       className="flex flex-col gap-3 w-full max-w-lg"
//     >
//       <input
//         type="text"
//         name="planeName"
//         value={newFlight.planeName}
//         onChange={handleInputChange}
//         placeholder="Plane Name"
//         required
//         className="border p-2 rounded"
//       />
//       <input
//         type="text"
//         name="companyName"
//         value={newFlight.companyName}
//         onChange={handleInputChange}
//         placeholder="Company Name"
//         required
//         className="border p-2 rounded"
//       />
//       <input
//         type="number"
//         name="price"
//         value={newFlight.price || ""}
//         onChange={handleInputChange}
//         placeholder="Price"
//         required
//         className="border p-2 rounded"
//       />
//       <input
//         type="date"
//         name="date"
//         value={newFlight.date}
//         onChange={handleInputChange}
//         placeholder="Flight Date"
//         required
//         className="border p-2 rounded"
//       />
//       <select
//         name="hasTakenOff"
//         value={newFlight.hasTakenOff ? "true" : "false"}
//         onChange={(e) =>
//           setNewFlight((prev) => ({
//             ...prev,
//             hasTakenOff: e.target.value === "true",
//           }))
//         }
//         className="border p-2 rounded"
//       >
//         <option value="false">Scheduled</option>
//         <option value="true">Taken Off</option>
//       </select>
//       <Button
//         type="submit"
//         className="py-2 px-8 hover:font-black ease-out rounded w-max hover:bg-teal-700 transition-colors duration-150 bg-teal-500 text-white"
//       >
//         Add Flight
//       </Button>
//     </form>
//   );
// }
