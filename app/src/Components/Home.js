/**
 * @description      :
 * @author           : DHANUSH
 * @group            :
 * @created          : 31/10/2025 - 23:04:36
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 31/10/2025
 * - Author          : DHANUSH
 * - Modification    :
 **/
import "../App.css";
import HeroImage from "../Images/NicePng_doctor-png_336282.png";
import { Dropdown } from "primereact/dropdown";
import "primeicons/primeicons.css";
import { Button } from "primereact/button";

function Home() {
  const doctorsLinks = [
    {
      name: "Doctors",
      icon: <i className="pi pi-user-plus" style={{ color: "slateblue" }}></i>,
    },
    {
      name: "Labs",
      icon: (
        <i className="pi pi-search-plus" style={{ color: "slateblue" }}></i>
      ),
    },
    {
      name: "Hospitals",
      icon: (
        <i
          className="pi pi-building-columns"
          style={{ color: "slateblue" }}
        ></i>
      ),
    },
    {
      name: "Medical Store",
      icon: <i className="pi pi-shop" style={{ color: "slateblue" }}></i>,
    },
    {
      name: "Ambulance",
      icon: <i className="pi pi-truck" style={{ color: "slateblue" }}></i>,
    },
  ];

  const findBySpecialization = [
    {
      name: "Dentistry",
      icon: <i className="pi pi-user-plus" style={{ color: "slateblue" }}></i>,
    },
    {
      name: "Primary Care",
      icon: <i className="pi pi-user-plus" style={{ color: "slateblue" }}></i>,
    },
    {
      name: "Cardiology",
      icon: <i className="pi pi-user-plus" style={{ color: "slateblue" }}></i>,
    },
    {
      name: "MRI Resonance",
      icon: <i className="pi pi-user-plus" style={{ color: "slateblue" }}></i>,
    },
    {
      name: "Blood Test",
      icon: <i className="pi pi-user-plus" style={{ color: "slateblue" }}></i>,
    },
    {
      name: "Piscologist",
      icon: <i className="pi pi-user-plus" style={{ color: "slateblue" }}></i>,
    },
    {
      name: "Laboratory",
      icon: <i className="pi pi-user-plus" style={{ color: "slateblue" }}></i>,
    },
    {
      name: "X-Ray",
      icon: <i className="pi pi-user-plus" style={{ color: "slateblue" }}></i>,
    },
  ];
  return (
    <div style={{ backgroundColor: "#ebf7fc" }}>
      <div className="parent">
        <div className="introContent">
          <div className="introSection">
            <p className="introTagline">Skip the travel! Find Online</p>

            <h1 className="introHeading">
              <span>Medical</span> Centers
            </h1>

            <p className="introDescription">
              Connect instantly with 24x7 specialists or choose to video visit a
              particular doctor.
            </p>

            <Button label="Search" severity="info" />
          </div>
        </div>

        <div className="introImage">
          <img src={HeroImage} alt="Doctors" />
        </div>

        <div className="doctorsSection">
          <div className="inputFields">
            <Dropdown
              placeholder="Select a State"
              className="w-full md:w-14rem"
            />
            <Dropdown
              placeholder="Select a City"
              className="w-full md:w-14rem"
            />
            <Button label="Search" severity="help" />
          </div>

          <div className="doctorsCardsContent">
            <h2>You may be looking for</h2>
          </div>

          <div className="doctorsCards">
            {doctorsLinks.map((ele) => {
              return (
                <div className="doctorsCardsLinkCards">
                  <div>{ele.icon}</div>
                  <div>{ele.name}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="findBySpecialization">
        <div>
          <p>
            <h3>Find by specialisation</h3>
          </p>
        </div>

        <div className="specializationGrid">
          {findBySpecialization.map((ele, index) => (
            <div key={index} className="specializationCard">
              <div>{ele.icon}</div>
              <div>{ele.name}</div>
            </div>
          ))}
        </div>
        <div style={{marginTop: "40px"}}>
          <Button label="View All" severity="info" />
        </div>
      </div>
    </div>
  );
}

export default Home;
