// import type { Baggage, Flight, Passenger, Staff } from "@/types/index";

// // Function to generate a random Flight
// export function generateRandomFlight(id: number): Flight {
//   const flightNumbers = ["AA", "BA", "CA", "DA", "EA"];
//   const statuses = ["On Time", "Delayed", "Cancelled"];
//   const gates = ["A1", "B2", "C3", "D4", "E5"];

//   return {
//     id: id.toString(),
//     number: `${
//       flightNumbers[Math.floor(Math.random() * flightNumbers.length)]
//     }${Math.floor(Math.random() * 900) + 100}`,
//     status: statuses[Math.floor(Math.random() * statuses.length)],
//     gate: gates[Math.floor(Math.random() * gates.length)],
//     departureTime: new Date(),
//   };
// }

// // Function to generate a random Passenger
// export function generateRandomPassenger(id: number): Passenger {
//   const names = ["John Doe", "Jane Smith", "Alice Johnson", "Bob Brown"];

//   return {
//     id: id.toString(),
//     name: names[Math.floor(Math.random() * names.length)],
//     flightId: Math.floor(Math.random() * 50).toString(),
//     checkedIn: Math.random() > 0.5,
//   };
// }

// // Function to generate a random Baggage
// export function generateRandomBaggage(id: number): Baggage {
//   const statuses = ["Checked In", "In Transit", "Delivered"];

//   return {
//     id: id.toString(),
//     passengerId: Math.floor(Math.random() * 50).toString(),
//     status: statuses[Math.floor(Math.random() * statuses.length)],
//     weight: Math.floor(Math.random() * 30) + 10,
//   };
// }

// // Function to generate a random Staff
// export function generateRandomStaff(id: number): Staff {
//   const names = ["Alice Johnson", "Bob Brown", "Charlie Davis", "Dana Evans"];
//   const roles = ["Pilot", "Flight Attendant", "Ground Crew"];
//   const shifts = ["Morning", "Afternoon", "Night"];

//   return {
//     id: id.toString(),
//     name: names[Math.floor(Math.random() * names.length)],
//     role: roles[Math.floor(Math.random() * roles.length)],
//     shift: shifts[Math.floor(Math.random() * shifts.length)],
//   };
// }
