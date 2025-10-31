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
      command: () => navigate("/"),
    },
    {
      label: "Hospitals",
      icon: "pi pi-building",
      command: () => navigate("/hospitals"),
    },
    {
      label: "My Bookings",
      icon: "pi pi-calendar",
      command: () => navigate("/my-bookings"),
    },
    {
      label: "Contact",
      icon: "pi pi-envelope",
      command: () => alert("Contact support at support@example.com"),
    },
  ];

  return (
    <div className="card">
      <Menubar model={items} />
    </div>
  );
}

export default Navbar;
