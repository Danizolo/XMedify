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

  useEffect(() => {
    getAllStates();
  }, []);

  useEffect(() => {
    if (selectedState && selectedCity) {
      getMedicalCenters(selectedState, selectedCity);
    }
  }, [selectedState, selectedCity]);

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

  return (
    <div>
      <div className="searchHeaderParent">
        <div className="searchFieldsHeader">
          <div className="searchFields">
            <Dropdown
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
            />
          </div>

          <div className="searchBtn">
            <Button
              label="Search"
              type="submit"
              id="searchBtn"
              style={{ backgroundColor: "#db09cd" }}
              onClick={handleSubmit}
            />
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
