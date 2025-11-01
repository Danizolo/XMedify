/**
    * @description      : 
    * @author           : DHANUSH
    * @group            : 
    * @created          : 01/11/2025 - 11:37:04
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 01/11/2025
    * - Author          : DHANUSH
    * - Modification    : 
**/
/**
 * @description      : Displays all booked hospital appointments
 * @author           : DHANUSH
 * @created          : 31/10/2025
 * @modified         : 31/10/2025 - Assistant
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
              <h3>{booking["Hospital Name"]}</h3>
              <p>
                <strong>City:</strong> {booking["City"]} |{" "}
                <strong>State:</strong> {booking["State"]}
              </p>
              <p>
                <strong>Hospital Type:</strong> {booking["Hospital Type"]}
              </p>
              <p>
                <strong>Overall Rating:</strong> {booking["Hospital overall rating"]}
              </p>
              <p>
                <strong>Booking Date:</strong> {booking.bookingDate}
              </p>
              <p>
                <strong>Booking Time:</strong> {booking.bookingTime}
              </p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyBookings;
