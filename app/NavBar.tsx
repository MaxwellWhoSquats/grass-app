"use client";
import React, { useEffect, useState } from "react";
import HomeIcon from "./public/svg/HomeIcon";
import OrdersIcon from "./public/svg/OrdersIcon";
import InventoryIcon from "./public/svg/InventoryIcon";
import CustomersIcon from "./public/svg/CustomersIcon";
import MessagingIcon from "./public/svg/MessagingIcon";
import Link from "next/link";
import classNames from "classnames";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import GrassIcon from "./public/svg/GrassIcon";
import DateDisplay from "./components/DateDisplay";

interface Icon {
  component: React.ReactElement;
  name: string;
}

const icons: Icon[] = [
  { component: <HomeIcon />, name: "Home" },
  { component: <OrdersIcon />, name: "Orders" },
  { component: <InventoryIcon />, name: "Inventory" },
  { component: <CustomersIcon />, name: "Customers" },
  { component: <MessagingIcon />, name: "Messaging" },
];

const NavBar = () => {
  const pathname = usePathname();
  const [selectedPage, setSelectedPage] = useState<string>(pathname);

  useEffect(() => {
    setSelectedPage(pathname === "/" ? "/" : pathname);
  }, [pathname]);

  const linkBaseClasses =
    "hover:bg-green-950 hover:bg-opacity-50 transition hover:ease-linear flex w-10 h-5/6 mx-2 my-1 items-center justify-center rounded tooltip tooltip-bottom";

  return (
    <nav className="flex mx-5 py-2 items-center justify-between border-b border-gray-300">
      <section id="navLeft" className="flex space-x-8">
        <GrassIcon />
        <div className="flex w-96 h-8 items-center justify-between bg-gradient-to-r from-green-900 to-green-600 rounded-md shadow-xl">
          {icons.map((icon, index) => (
            <Link
              href={icon.name === "Home" ? "/" : `/${icon.name.toLowerCase()}`}
              key={index}
              className={classNames(linkBaseClasses, {
                "bg-green-950 bg-opacity-50":
                  selectedPage === `/${icon.name.toLowerCase()}` ||
                  (icon.name === "Home" && selectedPage === "/"),
              })}
              data-tip={icon.name}
            >
              <div className="w-5 h-5">{icon.component}</div>
            </Link>
          ))}
        </div>
      </section>
      <section id="navRight" className="flex space-x-4 items-center">
        <DateDisplay />
        <div className="divider divider-horizontal divider-success"></div>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => signOut({ callbackUrl: "/login" })}
        >
          Log Out
        </button>
      </section>
    </nav>
  );
};

export default NavBar;
