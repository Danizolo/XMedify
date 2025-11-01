/**
 * @description      :
 * @author           : DHANUSH
 * @group            :
 * @created          : 31/10/2025 - 22:36:28
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 31/10/2025
 * - Author          : DHANUSH
 * - Modification    :
 **/
import { useState } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { Image } from "primereact/image";
import "../App.css";
import { useEffect } from "react";

function HospitalCards({ data }) {
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

  const toggleBookingSection = () => {
    setShowTimings(!showTimings);
    setSelectedTime(null);
  };

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(stored);
  }, []);

  const handleBook = () => {
    if (!selectedTime) {
      alert("Please select a time before booking.");
      return;
    }

    const booking = {
      hospitalName: data["Hospital Name"],
      state: data["State"],
      city: data["City"],
      address: data["Address"],
      time: selectedTime,
    };

    const existingBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    existingBookings.push(booking);
    localStorage.setItem("bookings", JSON.stringify(existingBookings));

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
            <p>{data["Address"]}</p>
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

export default HospitalCards;
