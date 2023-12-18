




// import React, { useState, useEffect } from "react";
// import axios from 'axios';
// import { FaSave } from 'react-icons/fa';
// import Sidebar from "../../../components/sidebar/Sidebar";
// import Topbar from "../../../components/topbar/Topbar";
// import { FaLock, FaMapMarkerAlt, FaUserAlt, FaCommentAlt } from "react-icons/fa";
// import DialpadIcon from '@mui/icons-material/Dialpad';
// import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
// import FolderSharedIcon from '@mui/icons-material/FolderShared';
// import TableChartIcon from '@mui/icons-material/TableChart';

// import './edit.css';

// function Edit(props) {
//   const { id } = props;

//   const [visitorData, setVisitorData] = useState({
//     ID: '',
//     Name: '',
//     Email: '',
//     Password: '',
//     Location: '',
//     Photo: '',
//     ID_Prisoner: '',
//     ID_Visite: ''
//   });

//   useEffect(() => {
//     axios.get(`http://localhost:8080/api/visiter/read/${id}`)
//       .then(res => {
//         const fetchedData = res.data[0];
//         setVisitorData({
//           ID: fetchedData.ID || '',
//           Name: fetchedData.Name || '',
//           Email: fetchedData.Email || '',
//           Password: fetchedData.Password || '',
//           Location: fetchedData.Location || '',
//           Photo: fetchedData.Photo || '',
//           ID_Prisoner: fetchedData.ID_Prisoner || '',
//           ID_Visite: fetchedData.ID_Visite || ''
//         });
//       })
//       .catch(err => console.log(err));
//   }, [id]);

//   const handleUpdate = (event) => {
//     event.preventDefault();

//     // Check if any required field is empty
//     if (!visitorData.Name || !visitorData.Email || !visitorData.Password || !visitorData.Location) {
//       console.log("Please fill in all required fields.");
//       return;
//     }

//     // Create a new object with non-null values
//     const updatedVisitorData = {
//       ID: visitorData.ID,
//       Name: visitorData.Name || '',
//       Email: visitorData.Email || '',
//       Password: visitorData.Password || '',
//       Location: visitorData.Location || '',
//       Photo: visitorData.Photo || '',
//       ID_Prisoner: visitorData.ID_Prisoner || '',
//       ID_Visite: visitorData.ID_Visite || '',
//     };

//     // Send the data to the API
//     axios
//       .put(`http://localhost:8080/api/visiter/edit/${updatedVisitorData.ID}`, {
//         Name: updatedVisitorData.Name,
//         Email: updatedVisitorData.Email,
//         Password: updatedVisitorData.Password,
//         Location: updatedVisitorData.Location,
//         Photo: updatedVisitorData.Photo,
//         ID_Prisoner: updatedVisitorData.ID_Prisoner,
//         ID_Visite: updatedVisitorData.ID_Visite,
//       })
//       .then((res) => {
//         console.log("Update response:", res.data);
//       })
//       .catch((err) => console.log(err));
//   };

//   const styles = {
//     borderRadius: "10px",
//     padding: "20px",
//     width: "100%",
//     height: "600px",
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "space-between",
//     marginTop: '5px'
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setVisitorData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   return (
//     <>
//       <Topbar />
//       <div className="homeContainer">
//         <Sidebar />
//         <div className="vcontainer">
//           <form onSubmit={handleUpdate} style={styles}>
//             <h2 style={{ marginBottom: '0px' }}>Edit Information</h2>
//             <div className="filde" style={{ marginTop: '0px' }}>
//               <label className="fildelable" htmlFor="id">ID</label>
//               <div className="input-field">
//                 <i className="fas fa-envelope"> <DialpadIcon /></i>
//                 <input
//                   type="text"
//                   id="id"
//                   placeholder="ID"
//                   name="ID"
//                   value={visitorData.ID}
//                   onChange={handleChange}
//                 />
//               </div>
//               <label className="fildelable" htmlFor="name">Name</label>
//               <div className="input-field">
//                 <i className="fas fa-envelope"><FaUserAlt /></i>
//                 <input
//                   type="text"
//                   id="name"
//                   placeholder="Name"
//                   name="Name"
//                   value={visitorData.Name}
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>
//             <div className="filde">
//               <label className="fildelable" htmlFor="email">Email</label>
//               <div className="input-field">
//                 <i className="fas fa-user"><FaCommentAlt/></i>
//                 <input
//                   type="email"
//                   id="email"
//                   placeholder="Email"
//                   name="Email"
//                   value={visitorData.Email}
//                   onChange={handleChange}
//                 />
//               </div>
//               <label className="fildelable" htmlFor="password">Password</label>
//               <div className="input-field">
//                 <i className="fas fa-lock"><FaLock/></i>
//                 <input
//                   type="password"
//                   id="password"
//                   placeholder="Password"
//                   name="Password"
//                   value={visitorData.Password}
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>
//             <div className="filde">
//               <label className="fildelable" htmlFor="location">Location</label>
//               <div className="input-field">
//                 <i className="fas fa-envelope"><FaMapMarkerAlt/></i>
//                 <input
//                   type="text"
//                   id="location"
//                   placeholder="Location"
//                   name="Location"
//                   value={visitorData.Location}
//                   onChange={handleChange}
//                 />
//               </div>
//               <label className="fildelable" htmlFor="photo">Photo</label>
//               <div className="input-field">
//                 <i className="fas fa-envelope"><AddPhotoAlternateIcon/></i> 
//                 <input
//                   type="text"
//                   id="photo"
//                   placeholder="Photo"
//                   name="Photo"
//                   value={visitorData.Photo}
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>
//             <div className="filde">
//               <label className="fildelable" htmlFor="id_Prisoner">ID Prisoner</label>
//               <div className="input-field">
//                 <i className="fas fa-envelope"><FolderSharedIcon/></i>
//                 <input
//                   type="text"
//                   id="id_Prisoner"
//                   placeholder="ID Prisoner"
//                   name="ID_Prisoner"
//                   value={visitorData.ID_Prisoner}
//                   onChange={handleChange}
//                 />
//               </div>
//               <label className="fildelable" htmlFor="id_Visite">ID Visite</label>
//               <div className="input-field">
//                 <i className="fas fa-envelope"><TableChartIcon/></i>
//                 <input
//                   type="text"
//                   id="id_Visite"
//                   placeholder="ID Visite"
//                   name="ID_Visite"
//                   value={visitorData.ID_Visite}
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>          
//             <button className="btn solid">
//               <FaSave /> Save
//             </button>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }
// export default Edit;


import React, { useState, useEffect } from "react";
import axios from 'axios';
import { FaSave } from 'react-icons/fa';
import Sidebar from "../../../components/sidebar/Sidebar";
import Topbar from "../../../components/topbar/Topbar";
import { FaLock, FaMapMarkerAlt, FaUserAlt, FaCommentAlt } from "react-icons/fa";
import DialpadIcon from '@mui/icons-material/Dialpad';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import TableChartIcon from '@mui/icons-material/TableChart';

import './edit.css';

function Edit(props) {
  const { id } = props;

  const [visitorData, setVisitorData] = useState({
    ID: '',
    Name: '',
    Email: '',
    Password: '',
    Location: '',
    Photo: '',
    ID_Prisoner: '',
    ID_Visite: ''
  });

  const [isEditDone, setIsEditDone] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/visiter/read/${id}`)
      .then(res => {
        const fetchedData = res.data[0];
        setVisitorData({
          ID: fetchedData.ID || '',
          Name: fetchedData.Name || '',
          Email: fetchedData.Email || '',
          Password: fetchedData.Password || '',
          Location: fetchedData.Location || '',
          Photo: fetchedData.Photo || '',
          ID_Prisoner: fetchedData.ID_Prisoner || '',
          ID_Visite: fetchedData.ID_Visite || ''
        });
      })
      .catch(err => console.log(err));
  }, [id]);

  const handleUpdate = (event) => {
    event.preventDefault();

    // Check if any required field is empty
    if (!visitorData.Name || !visitorData.Email || !visitorData.Password || !visitorData.Location) {
      console.log("Please fill in all required fields.");
      return;
    }

    // Create a new object with non-null values
    const updatedVisitorData = {
      ID: visitorData.ID,
      Name: visitorData.Name || '',
      Email: visitorData.Email || '',
      Password: visitorData.Password || '',
      Location: visitorData.Location || '',
      Photo: visitorData.Photo || '',
      ID_Prisoner: visitorData.ID_Prisoner || '',
      ID_Visite: visitorData.ID_Visite || '',
    };

    // Send the data to the API
    axios
      .put(`http://localhost:8080/api/visiter/edit/${updatedVisitorData.ID}`, {
        Name: updatedVisitorData.Name,
        Email: updatedVisitorData.Email,
        Password: updatedVisitorData.Password,
        Location: updatedVisitorData.Location,
        Photo: updatedVisitorData.Photo,
        ID_Prisoner: updatedVisitorData.ID_Prisoner,
        ID_Visite: updatedVisitorData.ID_Visite,
      })
      .then((res) => {
        console.log("Update response:", res.data);
        setIsEditDone(true); // Set the flag to indicate edit is done
      })
      .catch((err) => console.log(err));
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVisitorData((prevData) => ({ ...prevData, [name]: value }));
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
              <label className="fildelable" htmlFor="id">ID</label>
              <div className="input-field">
                <i className="fas fa-envelope"> <DialpadIcon /></i>
                <input
                  type="text"
                  id="id"
                  placeholder="ID"
                  name="ID"
                  value={visitorData.ID}
                  onChange={handleChange}
                />
              </div>
              <label className="fildelable" htmlFor="name">Name</label>
              <div className="input-field">
                <i className="fas fa-envelope"><FaUserAlt /></i>
                <input
                  type="text"
                  id="name"
                  placeholder="Name"
                  name="Name"
                  value={visitorData.Name}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="filde">
              <label className="fildelable" htmlFor="email">Email</label>
              <div className="input-field">
                <i className="fas fa-user"><FaCommentAlt/></i>
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  name="Email"
                  value={visitorData.Email}
                  onChange={handleChange}
                />
              </div>
              <label className="fildelable" htmlFor="password">Password</label>
              <div className="input-field">
                <i className="fas fa-lock"><FaLock/></i>
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  name="Password"
                  value={visitorData.Password}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="filde">
              <label className="fildelable" htmlFor="location">Location</label>
              <div className="input-field">
                <i className="fas fa-envelope"><FaMapMarkerAlt/></i>
                <input
                  type="text"
                  id="location"
                  placeholder="Location"
                  name="Location"
                  value={visitorData.Location}
                  onChange={handleChange}
                />
              </div>
              <label className="fildelable" htmlFor="photo">Photo</label>
              <div className="input-field">
                <i className="fas fa-envelope"><AddPhotoAlternateIcon/></i> 
                <input
                  type="text"
                  id="photo"
                  placeholder="Photo"
                  name="Photo"
                  value={visitorData.Photo}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="filde">
              <label className="fildelable" htmlFor="id_Prisoner">ID Prisoner</label>
              <div className="input-field">
                <i className="fas fa-envelope"><FolderSharedIcon/></i>
                <input
                  type="text"
                  id="id_Prisoner"
                  placeholder="ID Prisoner"
                  name="ID_Prisoner"
                  value={visitorData.ID_Prisoner}
                  onChange={handleChange}
                />
              </div>
              <label className="fildelable" htmlFor="id_Visite">ID Visite</label>
              <div className="input-field">
                <i className="fas fa-envelope"><TableChartIcon/></i>
                <input
                  type="text"
                  id="id_Visite"
                  placeholder="ID Visite"
                  name="ID_Visite"
                  value={visitorData.ID_Visite}
                  onChange={handleChange}
                />
              </div>
            </div>          
            {isEditDone && <p >Edit is done!</p>}

            <button className="btn solid">
              <FaSave /> Save
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Edit;
