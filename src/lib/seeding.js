// import {
//   generateRandomFlight,
//   generateRandomPassenger,
//   generateRandomBaggage,
//   generateRandomStaff,
// } from "./randomDataGenerator.ts";
// import { db } from "../../db/db.ts";

// // File: seedDatabase.ts
// async function seedDatabase() {
//   try {
//     // Seed Flights
//     for (let i = 0; i < 30; i++) {
//       const flight = generateRandomFlight(i);
//       await db.addFlight(flight);
//     }

//     // Seed Passengers
//     for (let i = 0; i < 30; i++) {
//       const passenger = generateRandomPassenger(i);
//       await db.addPassenger(passenger);
//     }

//     // Seed Baggage
//     for (let i = 0; i < 30; i++) {
//       const baggage = generateRandomBaggage(i);
//       await db.addBaggage(baggage);
//     }

//     // Seed Staff
//     for (let i = 0; i < 30; i++) {
//       const staff = generateRandomStaff(i);
//       await db.addStaff(staff);
//     }

//     console.log("Database seeding completed successfully.");
//   } catch (error) {
//     console.error("Error seeding database:", error);
//   }
// }

// seedDatabase();
