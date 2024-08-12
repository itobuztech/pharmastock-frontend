import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function MenuLink({
  text,
  activeMenuPaths,
  link,
}: {
  text: string;
  activeMenuPaths?: string;
  link: string;
}) {
  const [isActive, setIsActive] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (activeMenuPaths && location.pathname) {
      setIsActive(location.pathname.includes(activeMenuPaths));
    }
  }, [location.pathname, activeMenuPaths]);

  return (
    <Link
      className={`hover:text-blue-800  hover:bg-blue-100 flex items-center p-2 py-3 mb-1 transition-colors  duration-200  text-black rounded-lg no-underline ${
        isActive ? "bg-blue-300" : ""
      }`}
      to={link}
    >
      <span className="mx-4 text-lg font-normal">{text}</span>
    </Link>
  );
}
