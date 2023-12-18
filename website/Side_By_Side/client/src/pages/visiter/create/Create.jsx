import React, { useState } from "react";
import './create.css';
import axios from 'axios';
import { FaSave } from 'react-icons/fa';

import Sidebar from "../../../components/sidebar/Sidebar";
import Topbar from "../../../components/topbar/Topbar";
import { FaLock, FaMapMarkerAlt, FaUserAlt, FaCommentAlt } from "react-icons/fa";
import DialpadIcon from '@mui/icons-material/Dialpad';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import TableChartIcon from '@mui/icons-material/TableChart';

export default function Create() {
  const [values, setValues] = useState({
    id: '',
    name: '',
    email: '',
    password: '',
    location: '',
    photo: '',
    id_Prisoner: '',
    id_Visite: '',
  });

  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/api/visiter/register', values)
      .then(res => {
        console.log(res.data.message);
        if (res.data.message === "Prisoner ID not found") {
          setMessage('Prisoner ID not found.');
        } else if (res.data.message === "Visitor registered successfully") {
          setMessage('Visitor registered successfully.');
          resetForm(); // Reset the form fields after successful submission
        } else {
          setMessage('Registration failed. Please try again.');
        }
      })
      .catch(err => {
        console.log(err);
        if (err.response && err.response.data && err.response.data.message) {
          setMessage(err.response.data.message);
        } else {
          setMessage('Registration failed. Please try again.');
        }
      });
  };

  const resetForm = () => {
    setValues({
      id: '',
      name: '',
      email: '',
      password: '',
      location: '',
      photo: '',
      id_Prisoner: '',
      id_Visite: '',
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
    marginTop: '5px'
  };

  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <div className="vcontainer">
          <div>
            <form onSubmit={handleSubmit} style={styles}>
              <h2 style={{ marginBottom: '0px' }}>Add Visitor</h2>
              <div className="filde" style={{ marginTop: '0px' }}>
                <label className="fildelable" htmlFor="">ID</label>
                <div className="input-field">
                  <i className="fas fa-envelope"> <DialpadIcon /></i>
                  <input type="text" placeholder="ID" value={values.id} onChange={e => setValues({ ...values, id: e.target.value })} />
                </div>
                <label className="fildelable" htmlFor="">Name</label>
                <div className="input-field">
                  <i className="fas fa-envelope"><FaUserAlt /></i>
                  <input type="text" placeholder="Name" value={values.name} onChange={e => setValues({ ...values, name: e.target.value })} />
                </div>
              </div>
              <div className="filde">
                <label className="fildelable" htmlFor="">Email</label>
                <div className="input-field">
                  <i className="fas fa-user"><FaCommentAlt /></i>
                  <input type="email" placeholder="Email" value={values.email} onChange={e => setValues({ ...values, email: e.target.value })} />
                </div>

                <label className="fildelable" htmlFor="">Password</label>
                <div className="input-field">
                  <i className="fas fa-lock"><FaLock /></i>
                  <input type="password" placeholder="Password" value={values.password} onChange={e => setValues({ ...values, password: e.target.value })} />
                </div>
              </div>
              <div className="filde">
                <label className="fildelable" htmlFor="">Location</label>
                <div className="input-field">
                  <i className="fas fa-lock"><FaMapMarkerAlt /></i>
                  <input type="text" placeholder="Location" value={values.location} onChange={e => setValues({ ...values, location: e.target.value })} />
                </div>

                <label className="fildelable" htmlFor="">Photo</label>
                <div className="input-field">
                  <i className="fas fa-lock"><AddPhotoAlternateIcon /></i>
                  <input type="text" placeholder="Photo" value={values.photo} onChange={e => setValues({ ...values, photo: e.target.value })} />
                </div>
              </div>
              <div className="filde">
                <label className="fildelable" htmlFor="">Prisoner ID</label>
                <div className="input-field">
                  <i className="fas fa-lock"><FolderSharedIcon /></i>
                  <input type="text" placeholder="Prisoner ID" value={values.id_Prisoner} onChange={e => setValues({ ...values, id_Prisoner: e.target.value })} />
                </div>

                <label className="fildelable" htmlFor="">Visite ID</label>
                <div className="input-field">
                  <i className="fas fa-lock"><TableChartIcon /></i>
                  <input type="text" placeholder="Visite ID" value={values.id_Visite} onChange={e => setValues({ ...values, id_Visite: e.target.value })} />
                </div>
              </div>
              <button type="submit" className="btn solid"><FaSave /> save</button>


              {message && <div className="message">{message}</div>}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
