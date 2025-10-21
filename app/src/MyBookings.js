/**
    * @description      : 
    * @author           : DHANUSH
    * @group            : 
    * @created          : 21/10/2025 - 19:16:23
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 21/10/2025
    * - Author          : DHANUSH
    * - Modification    : 
**/
import React, { useEffect, useState } from "react";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const b = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(b);
  }, []);

  function clearAll() {
    localStorage.removeItem("bookings");
    setBookings([]);
  }

  return (
    <div className="myBookingsPage">
      <h1>My Bookings</h1>

      {bookings.length === 0 && (
        <div>
          <p>No bookings yet.</p>
        </div>
      )}

      {bookings.length > 0 && (
        <div>
          <button className="btn danger" onClick={clearAll}>
            Clear all
          </button>
          <div className="bookingsList">
            {bookings.map((b, idx) => (
              <div key={idx} className="bookingCard">
                <h3>{b.details["Hospital Name"]}</h3>
                <p>
                  <strong>Date:</strong> {b.day}
                </p>
                <p>
                  <strong>Time:</strong> {b.time}
                </p>
                <p>
                  <strong>Address:</strong>{" "}
                  {b.details["Address"]}, {b.details["City"]}, {b.details["State"]}
                </p>
                <p>
                  <strong>Phone:</strong> {b.details["Phone Number"]}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
