// import React, { useState } from "react";
// import'./create.css'
// import axios from 'axios'
// import Sidebar from "../../../components/sidebar/Sidebar";
// import Topbar from "../../../components/topbar/Topbar";
// import DialpadIcon from '@mui/icons-material/Dialpad';
// import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
// import EventIcon from '@mui/icons-material/Event';
// import DateRangeIcon from '@mui/icons-material/DateRange';
// import CalendarViewWeekIcon from '@mui/icons-material/CalendarViewWeek';
// import ReduceCapacityIcon from '@mui/icons-material/ReduceCapacity';
// import { FaSave } from 'react-icons/fa';

// export default function Create(){

//     const[values,setValues] =useState({
//         id:'',
//         visitDate:'',
//         availableDate:'',
//         day:'',
//         reserveNumber:'',
//         prison:'',
//     })

//     const handleSubmit =(e) =>{
//         e.preventDefault();
//         axios.post('http://localhost:8080/api/visit/register',values)
//         .then(res => {
//             console.log(res);
           
//         })
//         .catch(err => console.log(err))
//     }
//     const styles = {
//        borderRadius: "10px",
//     padding: "20px",
//     width: "100%",
//     height: "600px",
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "space-between",
//     marginTop: '5px'
//       }


//     return(
//         <>
//         <Topbar/>
//        <div className="homeContainer">
//        <Sidebar/>
//         <div className="vcontainer">
//           <form onSubmit={handleSubmit} style={styles}>
//             <h2 style={{ marginBottom: '0px' }}>Add Visit</h2>
//                   <div className="filde" style={{ marginTop: '0px' }}>
//               <label className="fildelable" htmlFor="">ID</label>
//              <div className="input-field">
//                 <i className="fas fa-envelope"> <DialpadIcon /></i>
//                 <input
//                   type="text"
//                   placeholder="ID" onChange={e=>setValues({...values,id:e.target.value})}/>

//                     </div>
//                   <label className="fildelable" htmlFor="">Visit Date</label>
//              <div className="input-field">
//                 <i className="fas fa-envelope"><CalendarMonthIcon /></i>
//                 <input
//                   type="Date"
//                 placeholder="Visit Date" onChange={e=>setValues({...values,visitDate:e.target.value})}/>

//                     </div>
//                                         </div>

//                    <div className="filde">
//                     <label className="fildelable" htmlFor="">Available Date</label>
//                     <div className="input-field">
//                         <i className="fas fa-user"><DateRangeIcon/></i>

//               <input
//                   type="Date"
//                   className="custom-date-input"

//                   placeholder="Available Date" onChange={e=>setValues({...values,availableDate:e.target.value})}/>

//                     </div>
//                     <label className="fildelable" htmlFor="">Day</label>
//             <div className="input-field">
//                         <i className="fas fa-lock"><EventIcon/></i>

//               <input
//                 type="text"
//                 placeholder="Day" onChange={e=>setValues({...values,day:e.target.value})}/>
//                     </div>

//                     </div>
//                       <div className="filde">
//                     <label className="fildelable" htmlFor="">Reserve Number</label>
//                     <div className="input-field" >
//                         <i className="fas fa-envelope"><ReduceCapacityIcon/></i>
//               <input
//                               type="text"
//                 placeholder="Reserve Number" onChange={e=>setValues({...values,reserveNumber:e.target.value})}/>

//                     </div>
//                     <label className="fildelable" htmlFor="">Prison</label>
//             <div className="input-field">
//     <i className="fas fa-envelope"><CalendarViewWeekIcon/></i> 
//               <input
//                               type="text"
//                 placeholder="Prison" onChange={e=>setValues({...values,prison:e.target.value})}/>

//                     </div>

//                     </div>
//  <button  className="btn solid">
//               <FaSave /> save
//             </button>                </form>
//             </div>
//         </div>

//         </>
//     )

// }


import React, { useState } from "react";
import "./create.css";
import axios from "axios";
import Sidebar from "../../../components/sidebar/Sidebar";
import Topbar from "../../../components/topbar/Topbar";
import DialpadIcon from "@mui/icons-material/Dialpad";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EventIcon from "@mui/icons-material/Event";
import DateRangeIcon from "@mui/icons-material/DateRange";
import CalendarViewWeekIcon from "@mui/icons-material/CalendarViewWeek";
import ReduceCapacityIcon from "@mui/icons-material/ReduceCapacity";
import { FaSave } from "react-icons/fa";

export default function Create() {
  const [values, setValues] = useState({
    id: "",
    visitDate: "",
    availableDate: "",
    day: "",
    reserveNumber: "",
    prison: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/api/visit/register", values)
      .then((res) => {
        if (res.data.error) {
          setErrorMessage(res.data.error);
          setSuccessMessage("");
        } else {
          setSuccessMessage("Registration success");
          setErrorMessage("");
        }
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
    marginTop: "5px",
  };

  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <div className="vcontainer">
          <form onSubmit={handleSubmit} style={styles}>
            <h2 style={{ marginBottom: "0px" }}>Add Visit</h2>
          
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
                  onChange={(e) =>
                    setValues({ ...values, id: e.target.value })
                  }
                />
              </div>
              <label className="fildelable" htmlFor="">
                Visit Date
              </label>
              <div className="input-field">
                <i className="fas fa-envelope">
                  <CalendarMonthIcon />
                </i>
                <input
                  type="Date"
                  placeholder="Visit Date"
                  onChange={(e) =>
                    setValues({ ...values, visitDate: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="filde">
              <label className="fildelable" htmlFor="">
                Available Date
              </label>
              <div className="input-field">
                <i className="fas fa-user">
                  <DateRangeIcon />
                </i>

                <input
                  type="Date"
                  className="custom-date-input"
                  placeholder="Available Date"
                  onChange={(e) =>
                    setValues({ ...values, availableDate: e.target.value })
                  }
                />
              </div>
              <label className="fildelable" htmlFor="">
                Day
              </label>
              <div className="input-field">
                <i className="fas fa-lock">
                  <EventIcon />
                </i>

                <input
                  type="text"
                  placeholder="Day"
                  onChange={(e) => setValues({ ...values, day: e.target.value })}
                />
              </div>
            </div>
            <div className="filde">
              <label className="fildelable" htmlFor="">
                Reserve Number
              </label>
              <div className="input-field">
                <i className="fas fa-envelope">
                  <ReduceCapacityIcon />
                </i>
                <input
                  type="text"
                  placeholder="Reserve Number"
                  onChange={(e) =>
                    setValues({ ...values, reserveNumber: e.target.value })
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
                  placeholder="Prison"
                  onChange={(e) =>
                    setValues({ ...values, prison: e.target.value })
                  }
                />
              </div>
            </div>
            <button className="btn solid">
              <FaSave /> save
            </button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && (
              <p className="success-message">{successMessage}</p>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
