import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";

export default function Topbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Booking", href: "/booking" },
    { label: "Tickets", href: "/ticket-bookings" },
    { label: "Parking", href: "/parking-fee" },
    // { label: "Gates", href: "/gates-management" },
  ];

  const handleMenuToggle = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  return (
    <header className="topbar bg-gray-800 text-white">
      <nav
        role="navigation"
        className="container flex mx-auto items-center justify-between p-4"
      >
        {/* Logo Section */}
        <div className="topbar__logo text-3xl font-bold">
          <span className="text-teal-500">Kampala</span> Airport
        </div>

        <button
          className="block p-2 text-black md:hidden"
          onClick={handleMenuToggle}
          aria-label="Toggle menu"
        >
          <Menu size={25} color="grey" />
        </button>

        {/* Navigation Menu */}
        <ul
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } flex-col md:flex-row md:space-x-2 absolute left-0 top-20 w-full shadow-md md:static md:flex md:w-auto md:bg-transparent md:shadow-none`}
        >
          {menuItems.map((menuLink) => (
            <li
              key={menuLink.label}
              className="cursor-pointer list-none px-4 py-2 text-center transition-colors duration-150 hover:text-teal-600"
              onClick={() => setIsMenuOpen(false)}
              style={{
                zIndex: isMenuOpen ? 999 : "auto",
                backgroundColor: isMenuOpen ? "whitesmoke" : "transparent",
              }}
            >
              <Link to={`${menuLink.href}`} className="block max-md:text-black">
                {menuLink.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
