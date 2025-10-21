/**
 * @description      :
 * @author           : DHANUSH
 * @group            :
 * @created          : 21/10/2025 - 18:59:52
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 21/10/2025
 * - Author          : DHANUSH
 * - Modification    :
 **/
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import FindDoctors from "./FindDoctors"
import MyBookings from "./MyBookings"

function App() {
  return (
    <div className="App">
      <div>
        <nav className="topnav">
          <div className="navlinks">
            <Link to="/">Find Doctors</Link>
            <Link to="/hospitals">Hospitals</Link>
            <Link to="/medicines">Medicines</Link>
            <Link to="/my-bookings">My Bookings</Link>
          </div>
        </nav>

        <main className="container">
          <Routes>
            <Route path="/" element={<FindDoctors />}></Route>
            <Route
              path="/hospitals"
              element={
                <div>
                  <h1>Hospitals</h1>
                </div>
              }
            />
            <Route
              path="/medicines"
              element={
                <div>
                  <h1>Medicines</h1>
                </div>
              }
            />
            <Route path="/my-bookings" element={<MyBookings />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
