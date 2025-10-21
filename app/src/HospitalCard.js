/**
 * @description      :
 * @author           : DHANUSH
 * @group            :
 * @created          : 21/10/2025 - 19:15:17
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 21/10/2025
 * - Author          : DHANUSH
 * - Modification    :
 **/
import React, { useState } from "react";

const timings = {
  Morning: ["8:00 AM", "8:45 AM", "10:00 AM", "10:30 AM"],
  Afternoon: [
    "12:30 PM",
    "1:00 PM",
    "2:30 PM",
    "3:00 PM",
    "4:00 PM",
    "4:30 PM",
  ],
  Evening: ["6:30 PM", "7:00 PM", "8:00 PM"],
};

const next7Days = Array.from({ length: 7 }, (_, i) => {
  const d = new Date();
  d.setDate(d.getDate() + i);
  return d;
});

function formatDate(d) {
  return d.toDateString();
}

export default function HospitalCard({ cardDetails }) {
  const [open, setOpen] = useState(false);
  const [chosenDateIndex, setChosenDateIndex] = useState(0);
  const [chosenPeriod, setChosenPeriod] = useState(null);
  const [chosenTime, setChosenTime] = useState(null);
  const [message, setMessage] = useState("");

  function openModal() {
    setOpen(true);
    setChosenDateIndex(0);
    setChosenPeriod(null);
    setChosenTime(null);
    setMessage("");
  }

  function closeModal() {
    setOpen(false);
  }

  function pickTime(period, time) {
    setChosenPeriod(period);
    setChosenTime(time);
  }

  function bookMySlot() {
    if (!chosenPeriod || !chosenTime) {
      setMessage("Please pick your slot");
      return;
    }

    const booking = {
      day: formatDate(next7Days[chosenDateIndex]),
      time: chosenTime,
      details: cardDetails,
    };

    const existing = JSON.parse(localStorage.getItem("bookings")) || [];
    localStorage.setItem("bookings", JSON.stringify([...existing, booking]));

    setMessage("Appointment booked!");

    //
    // if (!chosenDateIndex && chosenDateIndex !== 0) {
    //   setMessage("Please pick a date");
    //   return;
    // }
    // if (!chosenTime || !chosenPeriod) {
    //   setMessage("Please pick a slot");
    //   return;
    // }

    // const booking = {
    //   day: formatDate(next7Days[chosenDateIndex]),
    //   time: chosenTime,
    //   details: cardDetails,
    // };

    // const existed = JSON.parse(localStorage.getItem("bookings")) || [];
    // const updated = [...existed, booking];
    // localStorage.setItem("bookings", JSON.stringify(updated));

    // setMessage(
    //   `Booked ${cardDetails["Hospital Name"]} on ${booking.day} ${booking.time}`
    // );

    // setTimeout(() => {
    //   closeModal();
    // }, 700);
  }

  return (
    <div className="hospitalCard" onClick={openModal}>
      <div className="cardHeader">
        <h3>{cardDetails["Hospital Name"]}</h3>
        <div className="rating">
          Rating: {cardDetails["Hospital overall rating"]}
        </div>
      </div>

      <div className="cardBody">
        <p>
          <strong>Address:</strong> {cardDetails["Address"]},{" "}
          {cardDetails["City"]}, {cardDetails["State"]} -{" "}
          {cardDetails["ZIP Code"]}
        </p>
        <p>
          <strong>Phone:</strong> {cardDetails["Phone Number"]}
        </p>
        <p>
          <strong>County:</strong> {cardDetails["County Name"]}
        </p>
      </div>

      <div className="cardActions" onClick={openModal}>
        <button className="btn">Book FREE Center Visit</button>
      </div>

      {open && (
        <div className="modalOverlay" role="dialog" aria-modal="true">
          <div className="modal">
            <h2>Select your slot</h2>

            <div className="calendarSection">
              <p>Today</p>
              <div className="dateTabs">
                {next7Days.map((d, idx) => (
                  <button
                    key={idx}
                    className={`dateBtn ${
                      idx === chosenDateIndex ? "active" : ""
                    }`}
                    onClick={() => {
                      setChosenDateIndex(idx);
                      setChosenPeriod(null);
                      setChosenTime(null);
                    }}
                  >
                    <div className="dateShort">{d.toLocaleDateString()}</div>
                    <div className="dateLabel">
                      {d.toDateString().split(" ").slice(0, 3).join(" ")}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="slotsSection">
              <p>Morning</p>
              <div className="slotRow">
                {timings.Morning.map((t, i) => (
                  <button
                    key={i}
                    className={`slotBtn ${
                      chosenTime === t && chosenPeriod === "Morning"
                        ? "selected"
                        : ""
                    }`}
                    onClick={() => pickTime("Morning", t)}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <p>Afternoon</p>
              <div className="slotRow">
                {timings.Afternoon.map((t, i) => (
                  <button
                    key={i}
                    className={`slotBtn ${
                      chosenTime === t && chosenPeriod === "Afternoon"
                        ? "selected"
                        : ""
                    }`}
                    onClick={() => pickTime("Afternoon", t)}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <p>Evening</p>
              <div className="slotRow">
                {timings.Evening.map((t, i) => (
                  <button
                    key={i}
                    className={`slotBtn ${
                      chosenTime === t && chosenPeriod === "Evening"
                        ? "selected"
                        : ""
                    }`}
                    onClick={() => pickTime("Evening", t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {message && <div className="msg">{message}</div>}

            <div className="modalActions">
              <button
                type="button"
                className="btn primary"
                onClick={bookMySlot}
              >
                Book
              </button>

              <button className="btn danger" onClick={closeModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
