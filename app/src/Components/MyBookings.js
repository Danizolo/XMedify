/**
    * @description      : 
    * @author           : DHANUSH
    * @group            : 
    * @created          : 31/10/2025 - 22:45:37
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 31/10/2025
    * - Author          : DHANUSH
    * - Modification    : 
**/
/**
 * @description      : Displays all booked hospital appointments
 * @author           : DHANUSH
 * @created          : 31/10/2025 - 21:04:15
 * @modified         : 31/10/2025
 **/

import { useEffect, useState } from "react";
import { Card } from "primereact/card";
import "../App.css";

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(stored);
  }, []);

  return (
    <div className="bookings-page">
      <h1>My Bookings</h1>

      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <div className="bookings-list">
          {bookings.map((booking, index) => (
            <Card key={index} className="booking-card">
              <h3>{booking.hospitalName}</h3>
              <p><strong>Address:</strong> {booking.address}</p>
              <p>
                <strong>City:</strong> {booking.city} |{" "}
                <strong>State:</strong> {booking.state}
              </p>
              <p>
                <strong>Appointment Time:</strong> {booking.time}
              </p>
              <p>
                <strong>Booked On:</strong>{" "}
                {new Date().toLocaleString()}
              </p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyBookings;
