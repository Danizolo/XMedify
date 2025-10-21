/**
 * @description      :
 * @author           : DHANUSH
 * @group            :
 * @created          : 21/10/2025 - 19:07:14
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 21/10/2025
 * - Author          : DHANUSH
 * - Modification    :
 **/
import React, { useEffect, useState } from "react";
import HospitalCard from "./HospitalCard";

function FindDoctors() {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedState && selectedCity) {
      fetchHospitals(selectedState, selectedCity);
    }
  }, [selectedState, selectedCity]);

  const fetchHospitals = async (state, city) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://meddata-backend.onrender.com/data?state=${state}&city=${city}`
      );
      const data = await res.json();
      setCenters(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setCenters([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchStates = async () => {
    try {
      const res = await fetch("https://meddata-backend.onrender.com/states");
      const data = await res.json();
      setStates(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching states", err);
      setStates([]);
    }
  };

  const onStateChange = async (e) => {
    const st = e.target.value;
    setSelectedState(st);
    setSelectedCity("");
    setCities([]);

    if (!st) return;

    try {
      const res = await fetch(
        `https://meddata-backend.onrender.com/cities/${st}`
      );

      const data = await res.json();
      setCities(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching cities", error);
      setCities([]);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!selectedState || !selectedCity) {
      alert("Please select both state and city");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        `https://meddata-backend.onrender.com/data?state=${encodeURIComponent(
          selectedState
        )}&city=${encodeURIComponent(selectedCity)}`
      );
      const data = await res.json();
      setCenters(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching centers", err);
      setCenters([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section className="searchSection">
        <form onSubmit={handleSearch} className="searchForm">
          <div id="state" className="field">
            <label htmlFor="stateSelect">State</label>
            <select
              id="stateSelect"
              value={selectedState}
              onChange={onStateChange}
            >
              <option value="">Select state</option>
              {states.map((s, i) => (
                <option key={i} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div id="city" className="field">
            <label htmlFor="citySelect">City</label>
            <select
              id="citySelect"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              disabled={!selectedState}
            >
              <option value="">Select city</option>
              {cities.map((c, i) => (
                <option key={i} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <button type="submit" id="searchBtn" className="btn">
              Search
            </button>
          </div>
        </form>
      </section>

      <section className="resultsSection">
        {loading && <div>Loading...</div>}
        {!loading && centers.length > 0 && (
          <div className="availableCenters">
            <div className="centersHeader">
              <h1>
                {centers.length} medical centers available in {selectedCity}
              </h1>
            </div>

            <div className="hospitalCards">
              {centers.map((c, idx) => (
                <HospitalCard key={idx} cardDetails={c} />
              ))}
            </div>
          </div>
        )}

        {!loading && centers.length === 0 && (
          <div className="noResults">
            <p>No centers found. Try a different city or state.</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default FindDoctors;
