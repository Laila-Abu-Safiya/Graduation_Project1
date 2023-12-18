

import React, { useState, useEffect } from "react";
import axios from 'axios';
import { FaSave } from 'react-icons/fa';
import Sidebar from "../../../components/sidebar/Sidebar";
import Topbar from "../../../components/topbar/Topbar";
import { FaMapMarkerAlt, FaUserAlt } from "react-icons/fa";
import DialpadIcon from '@mui/icons-material/Dialpad';
import EventIcon from '@mui/icons-material/Event';
import DateRangeIcon from '@mui/icons-material/DateRange';
import CalendarViewWeekIcon from '@mui/icons-material/CalendarViewWeek';

function Edit(props) {
  const { id } = props;
  const [isEditDone, setIsEditDone] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/prisoners/read/${id}`)
      .then(res => {
        console.log(res);
        const prisonerData = res.data[0];
        setValues({
          ...values,
          id: prisonerData.ID,
          name: prisonerData.Name,
          location: prisonerData.Location,
          prisonDate: prisonerData.PrisoneDate,
          endDate: prisonerData.EndDate,
          prison: prisonerData.Prison
        });
      })
      .catch(err => console.log(err));
  }, [id]);
  

  const [values, setValues] = useState({
    id: '',
    name: '',
    email: '',
    password: '',
    location: '',
    photo: '',
    id_Prisoner: '',
    id_Visite: ''
  });

  const styles = {
    borderRadius: "10px",
    padding: "20px",
    width: "100%",
    height: "600px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    marginTop: '5px'
  }

  const handleUpdate = (event) => {
    event.preventDefault();
  
    if (values.name.trim() === '') {
      console.log("Name cannot be empty");
      return;
    }
  
    axios.put(`http://localhost:8080/api/prisoners/edit/${id}`, {
      Name: values.name,
      Location: values.location,
      PrisoneDate: values.prisonDate,
      EndDate: values.endDate,
      Prison: values.prison
    })
      .then(res => {
        console.log(res);
        setIsEditDone(true); // Set the flag to indicate edit is done

      })
      .catch(err => console.log(err));
  };
  

  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />

        <div className="vcontainer">
          <form onSubmit={handleUpdate} style={styles}>
            <h2 style={{ marginBottom: '0px' }}>Edit Information</h2>
            <div className="filde" style={{ marginTop: '0px' }}>
              <label className="fildelable" htmlFor="">ID</label>
              <div className="input-field">
                <i className="fas fa-envelope"> <DialpadIcon /></i>
                <input
                  type="text"
                  placeholder="ID"
                  value={values.id}
                  onChange={(e) =>
                    setValues({ ...values, id: e.target.value })
                  }
                />
              </div>
              <label className="fildelable" htmlFor="">Name</label>
              <div className="input-field">
                <i className="fas fa-envelope"><FaUserAlt /></i>
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
              <label className="fildelable" htmlFor="">Location</label>
              <div className="input-field">
                <i className="fas fa-user"><FaMapMarkerAlt /></i>
                <input
                  type="text"
                  placeholder="Location"
                  value={values.location}
                  onChange={(e) =>
                    setValues({ ...values, location: e.target.value })
                  }
                />
              </div>
              <label className="fildelable" htmlFor="">Prisone Date</label>
              <div className="input-field">
                <i className="fas fa-lock"><EventIcon /></i>
                <input
                  type="text"
                  placeholder="Prisone Date"
                  value={values.prisonDate}
                  onChange={(e) =>
                    setValues({ ...values, prisonDate: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="filde">
              <label className="fildelable" htmlFor="">End Date</label>
              <div className="input-field">
                <i className="fas fa-envelope"><DateRangeIcon /></i>
                <input
                  type="text"
                  placeholder="End Date"
                  value={values.endDate}
                  onChange={(e) =>
                    setValues({ ...values, endDate: e.target.value })
                  }
                />
              </div>
              <label className="fildelable" htmlFor="">Prison</label>
              <div className="input-field">
                <i className="fas fa-envelope"><CalendarViewWeekIcon /></i>
                <input
                  type="text"
                  placeholder="Enter"
                  value={values.prison}
                  onChange={(e) =>
                    setValues({ ...values, prison: e.target.value })
                  }
                />
              </div>
            </div>
            {isEditDone && <p >Edit is done!</p>}

            <button className="btn solid" type="submit">
              <FaSave /> Save
            </button>

          </form>
        </div>
      </div>
    </>
  );
}

export default Edit;
