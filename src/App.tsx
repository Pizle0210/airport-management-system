import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home";
import ParkingFee from "./pages/parking-fee";
import TicketBookings from "./pages/ticket-bookings";
import Layout from "./shared/layout";
import GateManagement from "./pages/gate-management";
import BookingPage from "./pages/booking";

export const App = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/booking",
        element: <BookingPage />,
      },
      {
        path: "/ticket-bookings",
        element: <TicketBookings />,
      },
      {
        path: "/parking-fee",
        element: <ParkingFee />,
      },
      {
        path: "/gates-management",
        element: <GateManagement />,
      },
    ],
  },
]);
