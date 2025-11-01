/**
 * @description      :
 * @author           : DHANUSH
 * @group            :
 * @created          : 31/10/2025 - 19:30:07
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 31/10/2025
 * - Author          : DHANUSH
 * - Modification    :
 **/
import "./App.css";
import { PrimeReactProvider } from "primereact/api";
import { Button } from "primereact/button";
import { Routes, Route, Link } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Hospitals from "./Components/Hospitals";
import MyBookings from "./Components/MyBookings";
import Home from "./Components/Home";

function App() {
  return (
    <PrimeReactProvider value={{ ripple: true }}>
      <div className="App">
        <Navbar />

        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Hospitals />} />
          <Route path="/my-bookings" element={<MyBookings />} />
        </Routes>
      </div>
    </PrimeReactProvider>
  );
}

export default App;
