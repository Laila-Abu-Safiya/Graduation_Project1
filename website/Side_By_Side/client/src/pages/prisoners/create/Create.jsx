import React, { useState } from "react";
import "./create.css";
import axios from "axios";
import Sidebar from "../../../components/sidebar/Sidebar";
import Topbar from "../../../components/topbar/Topbar";
import { FaMapMarkerAlt, FaUserAlt } from "react-icons/fa";
import DialpadIcon from "@mui/icons-material/Dialpad";
import EventIcon from "@mui/icons-material/Event";
import DateRangeIcon from "@mui/icons-material/DateRange";
import CalendarViewWeekIcon from "@mui/icons-material/CalendarViewWeek";
import { FaSave } from "react-icons/fa";

export default function Create() {
  const [values, setValues] = useState({
    id: "",
    name: "",
    location: "",
    prisoneDate: "",
    EndDate: "",
    Prison: "",
  });

  const [success, setSuccess] = useState(false); // State variable for success status

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/api/prisoners/register", values)
      .then((res) => {
        console.log(res);
        setSuccess(true); // Set success to true after successful submission
        resetForm(); // Reset the form fields
      })
      .catch((err) => console.log(err));
  };

  const resetForm = () => {
    setValues({
      id: "",
      name: "",
      location: "",
      prisoneDate: "",
      EndDate: "",
      Prison: "",
    });
  };

  const styles = {
    borderRadius: "10px",
    padding: "20px",
    width: "100%",
    height: "600px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    marginTop: "5px",
  };

  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <div className="vcontainer">
          <form onSubmit={handleSubmit} style={styles}>
            <h2 style={{ marginBottom: "0px" }}>Add Prisoner</h2>
            <div className="filde" style={{ marginTop: "0px" }}>
              <label className="fildelable" htmlFor="">
                ID
              </label>
              <div className="input-field">
                <i className="fas fa-envelope">
                  {" "}
                  <DialpadIcon />
                </i>
                <input
                  type="text"
                  placeholder="ID"
                  value={values.id}
                  onChange={(e) =>
                    setValues({ ...values, id: e.target.value })
                  }
                />
              </div>
              <label className="fildelable" htmlFor="">
                Name
              </label>
              <div className="input-field">
                <i className="fas fa-envelope">
                  <FaUserAlt />
                </i>
                <input
                  type="text"
                  placeholder="Name"
                  value={values.name}
                  onChange={(e) =>
                    setValues({ ...values, name: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="filde">
              <label className="fildelable" htmlFor="">
                Location
              </label>
              <div className="input-field">
                <i className="fas fa-user">
                  <FaMapMarkerAlt />
                </i>

                <input
                  type="text"
                  placeholder="Location"
                  value={values.location}
                  onChange={(e) =>
                    setValues({ ...values, location: e.target.value })
                  }
                />
              </div>
              <label className="fildelable" htmlFor="">
                Prisone Date
              </label>
              <div className="input-field">
                <i className="fas fa-lock">
                  <EventIcon />
                </i>

                <input
                  type="Date"
                  placeholder="Prisone Date"
                  value={values.prisoneDate}
                  onChange={(e) =>
                    setValues({ ...values, prisoneDate: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="filde">
              <label className="fildelable" htmlFor="">
                End Date
              </label>
              <div className="input-field">
                <i className="fas fa-envelope">
                  <DateRangeIcon />
                </i>
                <input
                  type="Date"
                  placeholder="End Date"
                  value={values.EndDate}
                  onChange={(e) =>
                    setValues({ ...values, EndDate: e.target.value })
                  }
                />
              </div>

              <label className="fildelable" htmlFor="">
                Prison
              </label>
              <div className="input-field">
                <i className="fas fa-envelope">
                  <CalendarViewWeekIcon />
                </i>
                <input
                  type="text"
                  placeholder="Enter"
                  value={values.Prison}
                  onChange={(e) =>
                    setValues({ ...values, Prison: e.target.value })
                  }
                />
              </div>
            </div>
            <button className="btn solid">
              <FaSave /> save
            </button>
            {success && <p>Add Prisoner Done </p>}

          </form>
        </div>
      </div>
    </>
  );
}
