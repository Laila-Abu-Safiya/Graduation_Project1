import React, { useState, useEffect } from "react";
import axios from 'axios';
import { FaSave } from 'react-icons/fa';
import Sidebar from "../../../components/sidebar/Sidebar";
import Topbar from "../../../components/topbar/Topbar";
import DialpadIcon from '@mui/icons-material/Dialpad';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EventIcon from '@mui/icons-material/Event';
import DateRangeIcon from '@mui/icons-material/DateRange';
import CalendarViewWeekIcon from '@mui/icons-material/CalendarViewWeek';
import ReduceCapacityIcon from '@mui/icons-material/ReduceCapacity';

function Edit(props) {
  const { id } = props;
  const [isEditDone, setIsEditDone] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/visit/read/${id}`)
      .then(res => {
        console.log(res);
        setValues({
          ...values,
          id: res.data[0].ID,
          visitDate: res.data[0].VisitDate,
          availableDate: res.data[0].AvailableDate,
          day: res.data[0].Day,
          reserveNumber: res.data[0].ReserveNumber,
          prison: res.data[0].Prison
        });
      })
      .catch(err => console.log(err));
  }, [id]);

  const [values, setValues] = useState({
    id: '',
    visitDate: '',
    availableDate: '',
    day: '',
    reserveNumber: '',
    prison: ''
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
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    axios.put(`http://localhost:8080/api/visit/edit/${id}`, {
      ID: values.id,
      VisitDate: values.visitDate,
      AvailableDate: values.availableDate,
      Day: values.day,
      ReserveNumber: values.reserveNumber,
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
              <label className="fildelable" htmlFor="">Visit Date</label>
              <div className="input-field">
                <i className="fas fa-envelope"><CalendarMonthIcon /></i>
                <input
                  type="text"
                  placeholder="Visit Date"
                  value={values.visitDate}
                  onChange={(e) =>
                    setValues({ ...values, visitDate: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="filde">
              <label className="fildelable" htmlFor="">Available Date</label>
              <div className="input-field">
                <i className="fas fa-user"><DateRangeIcon /></i>
                <input
                  type="text"
                  placeholder="Available Date"
                  value={values.availableDate}
                  onChange={(e) =>
                    setValues({ ...values, availableDate: e.target.value })
                  }
                />
              </div>
              <label className="fildelable" htmlFor="">Day</label>
              <div className="input-field">
                <i className="fas fa-lock"><EventIcon /></i>
                <input
                  type="text"
                  placeholder="Day"
                  value={values.day}
                  onChange={(e) =>
                    setValues({ ...values, day: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="filde">
              <label className="fildelable" htmlFor="">Reserve Number</label>
              <div className="input-field">
                <i className="fas fa-envelope"><ReduceCapacityIcon /></i>
                <input
                  type="text"
                  placeholder="Reserve Number"
                  value={values.reserveNumber}
                  onChange={(e) =>
                    setValues({ ...values, reserveNumber: e.target.value })
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

            <button className="btn solid">
              <FaSave /> save
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Edit;
