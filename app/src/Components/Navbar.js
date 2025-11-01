/**
 * @description      :
 * @author           : DHANUSH
 * @group            :
 * @created          : 31/10/2025 - 22:47:14
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 31/10/2025
 * - Author          : DHANUSH
 * - Modification    :
 **/
/**
 * @description      : Application Navigation Bar
 * @author           : DHANUSH
 * @created          : 31/10/2025 - 20:38:50
 * @modified         : 31/10/2025
 **/

import React from "react";
import { Menubar } from "primereact/menubar";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const items = [
    {
      label: "Home",
      icon: "pi pi-home",
      command: () => navigate("/home"),
    },
    {
      label: "Hospitals",
      icon: "pi pi-building",
      command: () => navigate("/"),
    },
    {
      label: "My Bookings",
      icon: "pi pi-calendar",
      command: () => navigate("/my-bookings"),
    },
  ];

  return (
    <div className="card">
      <Menubar model={items} style={{ backgroundColor: "#db09cd", color: "white" }} />
    </div>
  );
}

export default Navbar;
