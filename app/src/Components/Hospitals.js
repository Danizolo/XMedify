/**
 * @description      :
 * @author           : DHANUSH
 * @group            :
 * @created          : 31/10/2025 - 20:41:01
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 31/10/2025
 * - Author          : DHANUSH
 * - Modification    :
 **/
import { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import HospitalCards from "./HospitalCards";
import "../App.css";

function Hospitals() {
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [medicalCenters, setMedicalCenters] = useState([]);
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const [showCityDropdown, setShowCityDropdown] = useState(false);

  useEffect(() => {
    getAllStates();
  }, []);

  useEffect(() => {
    if (selectedState) {
      getCitiesByState(selectedState);
      setSelectedCity(null);
      setMedicalCenters([]);
    }
  }, [selectedState]);

  const getAllStates = async () => {
    try {
      const response = await fetch(
        "https://meddata-backend.onrender.com/states"
      );
      const data = await response.json();
      setStates(data);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const getCitiesByState = async (stateName) => {
    try {
      if (!stateName) return;

      const response = await fetch(
        `https://meddata-backend.onrender.com/cities/${stateName}`
      );
      const data = await response.json();
      setCities(data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const getMedicalCenters = async (stateName, cityName) => {
    try {
      if (!stateName || !cityName) return;
      const response = await fetch(
        `https://meddata-backend.onrender.com/data?state=${stateName}&city=${cityName}`
      );
      const data = await response.json();
      setMedicalCenters(data);
    } catch (error) {
      console.error("Error fetching medical centers:", error);
    }
  };

  const handleSubmit = () => {
    if (selectedState && selectedCity) {
      getMedicalCenters(selectedState, selectedCity);
    } else {
      alert("Please select both State and City.");
    }
  };

  const handleStateSelect = (state) => {
    setSelectedState(state);
    setSelectedCity("");
    setShowStateDropdown(false);
    getCitiesByState(state);
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setShowCityDropdown(false);
  };

  return (
    <div>
      <div className="searchHeaderParent">
        <div className="searchFieldsHeader">
          <div className="searchFields">
            {/* <Dropdown
              id="state"
              style={{ width: "250px" }}
              value={selectedState}
              onChange={(e) => setSelectedState(e.value)}
              options={states}
              placeholder="Select a City"
            />

            <Dropdown
              id="city"
              style={{ width: "250px" }}
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.value)}
              options={cities}
              placeholder="Select a City"
              disabled={!selectedState}
            /> */}

            <div id="state" className="dropdown-wrapper">
              <button
                type="button"
                className="dropdown-btn"
                onClick={() => setShowStateDropdown(!showStateDropdown)}
              >
                {selectedState || "Select State"}
              </button>
              {showStateDropdown && (
                <ul className="dropdown-list">
                  {states.map((s, i) => (
                    <li key={i} onClick={() => handleStateSelect(s)}>
                      {s}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div id="city" className="dropdown-wrapper">
              <button
                type="button"
                className="dropdown-btn"
                disabled={!selectedState}
                onClick={() => setShowCityDropdown(!showCityDropdown)}
              >
                {selectedCity || "Select City"}
              </button>
              {showCityDropdown && (
                <ul className="dropdown-list">
                  {cities.map((c, i) => (
                    <li key={i} onClick={() => handleCitySelect(c)}>
                      {c}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              id="searchBtn"
              onClick={handleSubmit}
              style={{ padding: "10px", backgroundColor: "#db09cd" }}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {medicalCenters && medicalCenters.length > 0 && (
        <div>
          <h1>
            {medicalCenters.length} medical center
            {medicalCenters.length > 1 ? "s" : ""} available in {selectedCity}
          </h1>
        </div>
      )}

      <div className="centerSection">
        {medicalCenters.map((ele, index) => {
          return <HospitalCards key={index} data={ele} />;
        })}
      </div>
    </div>
  );
}

export default Hospitals;
