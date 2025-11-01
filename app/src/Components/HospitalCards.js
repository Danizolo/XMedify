/**
    * @description      : 
    * @author           : DHANUSH
    * @group            : 
    * @created          : 01/11/2025 - 11:36:53
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 01/11/2025
    * - Author          : DHANUSH
    * - Modification    : 
**/
/**
 * @description      : Hospital card with booking functionality
 * @author           : DHANUSH
 * @created          : 31/10/2025
 * @modified         : 31/10/2025 - Assistant
 **/

import { useState, useEffect } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { Image } from "primereact/image";
import "../App.css";

function HospitalCard({ data }) {
  const [showTimings, setShowTimings] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [bookings, setBookings] = useState([]);

  const morningTiming = [
    "08:00 AM",
    "08:45 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
  ];
  const afternoonTimings = ["12:30 PM", "01:00 PM", "01:45 PM", "02:30 PM"];
  const eveningTimings = ["06:30 PM", "07:15 PM", "08:00 PM"];

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(stored);
  }, []);

  const toggleBookingSection = () => {
    setShowTimings(!showTimings);
    setSelectedTime(null);
  };

  const handleBook = () => {
    if (!selectedTime) {
      alert("Please select a time before booking.");
      return;
    }

    const booking = {
      "Hospital Name": data["Hospital Name"] || "Unknown Hospital",
      City: data["City"] || "Unknown City",
      State: data["State"] || "Unknown State",
      "Hospital Type": data["Hospital Type"] || "General",
      "Hospital overall rating": data["Hospital overall rating"] || "N/A",
      bookingDate: new Date().toISOString().split("T")[0],
      bookingTime: selectedTime,
    };

    const existingBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    const updated = [...existingBookings, booking];
    localStorage.setItem("bookings", JSON.stringify(updated));
    setBookings(updated);

    alert(
      `✅ Appointment booked at ${selectedTime} for ${data["Hospital Name"]}`
    );
    setShowTimings(false);
  };

  const handleCancel = () => {
    setShowTimings(false);
    setSelectedTime(null);
  };

  return (
    <div className="hospital-card">
      <Card>
        <div className="hospital-content">
          <div className="hospital-image">
            <Image
              src="https://cdn-icons-png.flaticon.com/512/2966/2966327.png"
              alt="hospital"
              width="80"
              preview={false}
            />
          </div>

          <div className="hospital-info">
            <h3>{data["Hospital Name"]}</h3>
            <p>{data["Address"] || "Address not available"}</p>
            <Button
              label="Book FREE Center Visit"
              severity="help"
              onClick={toggleBookingSection}
            />
          </div>
        </div>

        {showTimings && (
          <div className="timing-section">
            <Divider />
            <p>
              <strong>Today</strong>
            </p>

            <p>Morning</p>
            <div className="timing-group">
              {morningTiming.map((time) => (
                <Button
                  key={time}
                  label={time}
                  outlined
                  className={`time-btn ${
                    selectedTime === time ? "selected" : ""
                  }`}
                  onClick={() => setSelectedTime(time)}
                />
              ))}
            </div>

            <p>Afternoon</p>
            <div className="timing-group">
              {afternoonTimings.map((time) => (
                <Button
                  key={time}
                  label={time}
                  outlined
                  className={`time-btn ${
                    selectedTime === time ? "selected" : ""
                  }`}
                  onClick={() => setSelectedTime(time)}
                />
              ))}
            </div>

            <p>Evening</p>
            <div className="timing-group">
              {eveningTimings.map((time) => (
                <Button
                  key={time}
                  label={time}
                  outlined
                  className={`time-btn ${
                    selectedTime === time ? "selected" : ""
                  }`}
                  onClick={() => setSelectedTime(time)}
                />
              ))}
            </div>

            <div className="booking-actions">
              <Button
                label="Book"
                severity="success"
                onClick={handleBook}
                disabled={!selectedTime}
              />
              <Button
                label="Cancel"
                severity="secondary"
                onClick={handleCancel}
                outlined
              />
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

export default HospitalCard;
