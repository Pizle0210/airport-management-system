import { Flight, ParkingFee, Booking, type Gate } from "@/types";
export async function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("AirportManagement", 1);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains("flights")) {
        db.createObjectStore("flights", { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains("parkingFees")) {
        db.createObjectStore("parkingFees", { keyPath: "planeId" });
      }
      if (!db.objectStoreNames.contains("bookings")) {
        db.createObjectStore("bookings", { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains("gates")) {
        db.createObjectStore("gates", { keyPath: "id" });
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      console.error("Error opening IndexedDB:", request.error);
      reject(request.error);
    };
  });
}

export async function getTransaction(
  storeName: string,
  mode: IDBTransactionMode
): Promise<IDBObjectStore> {
  const db = await openDatabase();
  const transaction = db.transaction(storeName, mode);
  return transaction.objectStore(storeName);
}

// Flights
export async function addFlight(flight: Flight): Promise<void> {
  const store = await getTransaction("flights", "readwrite");
  const request = store.add(flight);
  request.onerror = () => console.error("Failed to add flight:", request.error);
}

export async function getFlights(): Promise<Flight[]> {
  const store = await getTransaction("flights", "readonly");
  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result as Flight[]);
    request.onerror = () => {
      console.error("Failed to fetch flights:", request.error);
      reject(request.error);
    };
  });
}

// Parking Fees
export async function addParkingFee(parkingFee: ParkingFee): Promise<void> {
  const store = await getTransaction("parkingFees", "readwrite");
  const request = store.add(parkingFee);
  request.onerror = () =>
    console.error("Failed to add parking fee:", request.error);
}

export async function getParkingFees(): Promise<ParkingFee[]> {
  const store = await getTransaction("parkingFees", "readonly");
  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result as ParkingFee[]);
    request.onerror = () => {
      console.error("Failed to fetch parking fees:", request.error);
      reject(request.error);
    };
  });
}

// update payment
export async function updateParkingFee(parkingFee: ParkingFee): Promise<void> {
  const store = getTransaction("parkingFees", "readwrite");
  const request = (await store).put(parkingFee);
  request.onerror = () =>
    console.error("Failed to update parking fee:", request.error);
}

export async function getParkingFeeByPlaneId(
  planeId: string
): Promise<ParkingFee | undefined> {
  const store = await getTransaction("parkingFees", "readonly");
  return new Promise((resolve, reject) => {
    const request = store.get(planeId);
    request.onsuccess = () => resolve(request.result as ParkingFee);
    request.onerror = () => {
      console.error(
        `Failed to fetch parking fee for planeId ${planeId}:`,
        request.error
      );
      reject(request.error);
    };
  });
}

// Bookings
export async function addBooking(booking: Booking): Promise<void> {
  const store = await getTransaction("bookings", "readwrite");
  const request = store.add(booking);
  request.onerror = () =>
    console.error("Failed to add booking:", request.error);
}

export async function getBookings(): Promise<Booking[]> {
  const store = await getTransaction("bookings", "readonly");
  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result as Booking[]);
    request.onerror = () => {
      console.error("Failed to fetch bookings:", request.error);
      reject(request.error);
    };
  });
}

export async function getBookingById(
  bookingId: string
): Promise<Booking | undefined> {
  const store = await getTransaction("bookings", "readonly");
  return new Promise((resolve, reject) => {
    const request = store.get(bookingId);
    request.onsuccess = () => resolve(request.result as Booking);
    request.onerror = () => {
      console.error(
        `Failed to fetch booking for ID ${bookingId}:`,
        request.error
      );
      reject(request.error);
    };
  });
}


// gates
export async function addGate(gate: Gate): Promise<void> {
  const store = getTransaction("gates", "readwrite");
  const request = (await store).add(gate);
  request.onerror = () => console.error("Failed to add gate:", request.error);
}

export async function getGates(): Promise<Gate[]> {
  const store = await getTransaction("gates", "readonly");
  return new Promise((resolve) => {
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result as Gate[]);
    request.onerror = () =>
      console.error("Failed to fetch gates:", request.error);
  });
}

export async function updateGate(gate: Gate): Promise<void> {
  const store = getTransaction("gates", "readwrite");
  const request = (await store).put(gate);
  request.onerror = () =>
    console.error("Failed to update gate:", request.error);
}
